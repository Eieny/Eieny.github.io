import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import map from 'gulp-sourcemaps';
import * as dartSass from 'sass';
import clean from 'gulp-clean';
import gReplace from 'gulp-replace';
import config from './config.js';

const sass = gulpSass(dartSass);

const deployCompileSassToCss = () => {
    return gulp
        .src(config.path.src.style)
        .pipe(map.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(map.write(config.path.dest.map))
        .pipe(gulp.dest(config.path.dest.style));
};

const debugCompileSassToCss = () => {
    return gulp
        .src(config.path.src.style)
        .pipe(map.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(map.write(config.path.dest.map))
        .pipe(gulp.dest(config.path.dest.debug.style));
};

const copyPublicFiles = () => {
    return gulp
        .src(config.path.src.public)
        .pipe(gulp.dest(config.path.dest.public));
};

const copyAssets = () => {
    return gulp
        .src(config.path.src.assets)
        .pipe(gulp.dest(config.path.dest.assets));
};

const removeFiles = () => {
    return gulp.src(config.path.src.remove).pipe(clean({ force: true }));
};

const replaceHtmlSrc = () => {
    return gulp
        .src('public/*.html')
        .pipe(
            gReplace(new RegExp('src="(.*)"', 'g'), (match, group) => {
                const pathArr = group.split('/');
                const fileName = pathArr[pathArr.length - 1];
                return `src="${config.path.src.deploy.htmlSrc}${fileName}"`;
            })
        )
        .pipe(gulp.dest('public/'));
};

const replaceHtmlHref = () => {
    return gulp
        .src('public/*.html')
        .pipe(
            gReplace(new RegExp('href="(.*.css)"', 'g'), (match, group) => {
                const pathArr = group.split('/');
                const fileName = pathArr[pathArr.length - 1];
                return `href="${config.path.src.deploy.htmlHref}${fileName}"`;
            })
        )
        .pipe(gulp.dest('public/'));
};

const replaceScssUrl = () => {
    return gulp.src(config.path.src.style).pipe(
        gReplace(new RegExp('url((.*))', 'g'), (match, group) => {
            const pathArr = group.split('/');
            const fileName = pathArr[pathArr.length - 1];
            return `url(${config.path.src.deploy.css}${fileName})`;
        })
    );
};

const deployProject = gulp.series(
    replaceHtmlSrc,
    replaceHtmlHref,
    replaceScssUrl,
    gulp.parallel(deployCompileSassToCss, copyPublicFiles, copyAssets),
    removeFiles
);
const debugProject = gulp.series(debugCompileSassToCss);

export { debugProject as debug, deployProject as deploy };

import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import map from 'gulp-sourcemaps';
import * as dartSass from 'sass';
import clean from 'gulp-clean';
import config from './config.js';

const sass = gulpSass(dartSass);

const deployCompileSassToCss = () => {
    return gulp
        .src(config.path.src.style)
        .pipe(map.init())
        .pipe(sass().on('error', sass.logError))
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
    return gulp.src(config.path.src.remove).pipe(clean());
};

const deployProject = () => {
    return gulp.series(
        gulp.parallel(deployCompileSassToCss, copyPublicFiles, copyAssets),
        removeFiles
    );
};

export { debugCompileSassToCss as debug, deployProject as deploy };

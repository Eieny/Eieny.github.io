import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import map from 'gulp-sourcemaps';
import dartSass from 'sass';
import config from './config.js';

const sass = gulpSass(dartSass);
const compileSassToCss = () => {
    return gulp
        .src(config.path.src.style)
        .pipe(map.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(map.write(config.path.dist.map))
        .pipe(gulp.dest(config.path.dist.style));
};

export { compileSassToCss as compile };

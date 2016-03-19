// Dependencies
var gulp = require('gulp');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var strip = require('gulp-strip-comments');
var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var header = require('gulp-header');
var package = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' * Copyright <%= new Date().getFullYear() %> <%= pkg.author%>',
  ' * Licensed under the <%= pkg.license %> license',
  ' */',
  ''].join('\n');
var paths = {
    app: './html/app',
    lib: './html/lib',
    test: './html/test',
    dist: './html/dist'
}

// Default
gulp.task('default', ['watch']);

// Less compiling
gulp.task('less', function () {
    var files = [
        paths.app + '/**/*.less',
        '!' + paths.app + '/**/variables.less'
    ];

    return gulp.src(files)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'IE 8', 'IE 9']
        }))
        .pipe(rename(function (path) {
            path.dirname += "/../css";
        }))
        .pipe(gulp.dest(function (path) {
            return path.base;
        }));
});

// CSS distribution 
gulp.task('dist-css', function () {
    var files = [paths.dist + '/less/kacayixia.less'];

    return gulp.src(files)
        .pipe(less())
        .pipe(rename(function (path) {
            path.dirname += "/../css";
        }))
        .pipe(gulp.dest(function (path) {
            return path.base;
        }));
});

// Watch
gulp.task('watch', ['less'], function () {
    var files = [paths.app + '/**/*'];

    gulp.watch(files, ['less']);
});

// test
gulp.task('test', function () {
    var files = [paths.test + '/**/*.less'];
    return gulp.src(files)
        .pipe(less())
        .pipe(rename(function (path) {
            // path.dirname - relative path from the base directory set by gulp.src to the filename,
            // here is '/**/*.less'
            path.dirname += "/../css";
        }))
        .pipe(gulp.dest(function (path) {
            return path.base; // relative path, here is paths.test
        }));
});

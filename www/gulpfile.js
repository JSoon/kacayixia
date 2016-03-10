// Dependencies
var gulp = require('gulp');
var flatten = require('gulp-flatten');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var strip = require('gulp-strip-comments');
var rename = require('gulp-rename');
var header = require('gulp-header');
var package = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' * Copyright <%= new Date().getFullYear() %> <%= pkg.author%>',
  ' * Licensed under the <%= pkg.license %> license',
  ' */',
  ''].join('\n');
var paths = {
    app: 'html/app/',
    lib: 'html/lib/'
}

// Default
gulp.task('default', ['watch']);

// Compile less files
gulp.task('less', function () {
    var files = [
        paths.lib + 'bootstrap/3.3.6/bootstrap.css',
        paths.app + 'global/assets/variables.less',
        paths.app + 'global/assets/global.less',
        paths.app + 'index/assets/index.less'
    ];

    return gulp.src(files)
        .pipe(concat('kacayixia.less'))
        .pipe(less())
        .pipe(header(banner, {
            pkg: package
        }))
        .pipe(gulp.dest('html/dist'))
        .pipe(rename('kacayixia.min.css'))
        .pipe(cssnano())
        .pipe(header(banner, {
            pkg: package
        }))
        .pipe(gulp.dest('html/dist'));
});

// Concat & Minify CSS files
gulp.task('CSS', function () {
    var files = ['app/css/*'];

    return gulp.src(files)
        .pipe(concat('styles.css'))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('dist'))
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'IE 8', 'IE 9']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

// Concat & Minify JS files
gulp.task('JS', function () {
    var files = ['app/js/*'];

    return gulp.src(files)
        .pipe(concat('scripts.js', {
            newLine: ';'
        }))
        .pipe(strip())
        .pipe(header(banner, {
            pkg: package
        }))
        .pipe(gulp.dest('dist'))
        .pipe(rename('scripts.min.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(header(banner, {
            pkg: package
        }))
        .pipe(gulp.dest('dist'));
});

// Watch
gulp.task('watch', ['less', 'CSS', 'JS'], function () {
    var files = ['app/**/*'];

    gulp.watch(files, ['less', 'CSS', 'JS']);
});
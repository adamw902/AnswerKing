var gulp = require('gulp'),
    concat = require("gulp-concat"),
    watch = require('gulp-watch'),
    cssmin = require('gulp-clean-css'),
    sass = require('gulp-sass');

var minfConfs = {};
minfConfs.standardCss = { compatibility: 'ie8', advanced: false, aggressiveMerging: false };

gulp.task('fonts:copy', function () {
    gulp.src('node_modules/bootstrap/fonts/glyphicons-halflings-regular.*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('sass', function () {
    gulp.src([
        "src/sass/app.scss", 
        "src/sass/overrides.scss"
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin(minfConfs.standardCss))
        .pipe(concat('app.css'))
        .pipe(gulp.dest("dist/css"));
});

gulp.task('css:aggregate:lib', function () {
    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/toastr/package/toastr.min.css'
        ])
        //.pipe(cssmin(minfConfs.standardCss))
        .pipe(concat('lib.css'))
        .pipe(gulp.dest("dist/css"));
});


gulp.task('sass:watch', function () {
    gulp.watch(["sass/**/*.scss"], ['sass']);
});

gulp.task('build:all', ['fonts:copy', 'sass', 'css:aggregate:lib']);
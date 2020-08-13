'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');


gulp.task('sass', function () {
  return gulp.src("source/sass/style.scss")
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./source/css/min'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function() {
  return gulp.src('./source/*.html')
  .pipe(browserSync.reload({stream: true}))
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./source/"
        }
    });
});

gulp.task('watch', function(){
    gulp.watch('./source/sass/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./source/*.html', gulp.parallel('html'));
});

gulp.task('default', gulp.parallel('sass', 'html', 'browser-sync', 'watch'))

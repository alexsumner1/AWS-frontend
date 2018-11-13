'use strict';
 
var gulp = require('gulp');

var sass = require('gulp-sass');
var sassFile = './assets/sass/**/*.scss';
var cssOutput = './public/css';

sass.compiler = require('node-sass');
 
gulp.task('sass', function (done) {
  return gulp.src(sassFile)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssOutput));
    done();
});

gulp.task('watch', function (done) {
  gulp.watch(sassFile, gulp.series('sass'));
  done()
});  



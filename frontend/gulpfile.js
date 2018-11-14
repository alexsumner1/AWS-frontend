


// VARIABLES


var pkg = require('./package.json');

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    strip = require('gulp-strip-comments'),
    insert = require('gulp-insert')


var jsOutput = 'public/library/js';
var cssOutput = 'public/library/css';
var versionOutput = 'public/assets/version.txt';



//               STYLES TASKS



gulp.task('styles', function() {
    var sass = require('gulp-sass');

    return gulp.src(pkg.nekaiko.styleFile)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(strip.text())
        .pipe(gulp.dest(cssOutput));
});

gulp.task('styles-dev', function() {
    var sass = require('gulp-sass');

    return gulp.src(pkg.nekaiko.styleFile)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(cssOutput));
});


//               SCRIPTS TASKS


gulp.task('scripts', function() {
    return gulp.src(pkg.nekaiko.scriptFiles)
        .pipe(concat('frontend-final.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(jsOutput));
});

gulp.task('scripts-dev', function() {
    return gulp.src(pkg.nekaiko.scriptFiles)
        .pipe(concat('frontend-final.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(jsOutput));
});





gulp.task('publish', gulp.parallel('styles','scripts'));
gulp.task('publish-dev', gulp.parallel('styles-dev','scripts-dev'));


function watchFiles() {
    gulp.watch('assets/sass/**/*.scss', gulp.series('styles-dev'));
    gulp.watch('assets/js/**/*.js', gulp.series('scripts-dev'));
}

gulp.task('watch', watchFiles);
gulp.task('default', gulp.task('watch'));


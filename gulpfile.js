var gulp = require('gulp'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    templateCache = require('gulp-angular-templatecache'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    wrap = require('gulp-wrap'),
    chmod = require('gulp-chmod'),
    gettext = require('gulp-angular-gettext'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber');

const dist = "C:/Test/rs-frontend/Source/RS.WebClient.Store/plugins/lottery-reconciliation";
gulp.task('default', ['build']);
gulp.task('build', ['build-js', 'build-styles']);


gulp.task('build-views', function () {
    return gulp.src('src/**/*.html')
        .pipe(templateCache('lotteryReconciliation.views.js', {
            standalone: true,
            module: 'lotteryReconciliation.views'
        }))
        .pipe(chmod(666))
        .pipe(gulp.dest(dist));
});

gulp.task('build-js', ['translations', 'build-views'], function () {
    return gulp.src([
        dist + '/lotteryReconciliation.translations.js',
        dist + '/lotteryReconciliation.views.js',
        'src/**/*.module.js',
        'src/**/*.settings.js',
        'src/**/*.js'
    ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('lotteryReconciliation.js'))
        .pipe(ngAnnotate())
        .pipe(wrap('(function(){\n\'use strict\';\n<%= contents %>\n})();'))
        .pipe(sourcemaps.write())
        .pipe(chmod(666))
        .pipe(gulp.dest(dist));
});

gulp.task('build-styles', function () {
    return gulp.src('src/**/*.less')
        .pipe(less())
        .pipe(concat('lotteryReconciliation.css'))
        .pipe(chmod(666))
        .pipe(gulp.dest(dist));
});

gulp.task('watch', function () {
    gulp.start("build");
    gulp.watch('src/**/*.js', ['build']);
    gulp.watch('src/**/*.html', ['build']);
    gulp.watch('src/**/*.less', ['build']);
    gulp.watch('po/**/*.po', ['build']);
});

// oversetting/translation
gulp.task('pot', function () {
    return gulp.src(['src/**/*.html', 'src/**/*.js'])
        .pipe(gettext.extract('template.pot', {}))
        .pipe(gulp.dest('po/'));
});

gulp.task('translations', function () {
    return gulp.src('po/**/*.po')
        .pipe(gettext.compile())
        .pipe(concat('lotteryReconciliation.translations.js'))
        .pipe(chmod(666))
        .pipe(gulp.dest(dist));
});
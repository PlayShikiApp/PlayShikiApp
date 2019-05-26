var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    nunjucks    = require('gulp-nunjucks');
    uglify      = require('gulp-uglify');


gulp.task('script', gulp.parallel(function() {
    return gulp.src('script/*.js')
        .pipe(concat('demo.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/static/js'))
}));

gulp.task('vendor', gulp.parallel(function() {
    return gulp.src('vendor/*.js')
        .pipe(gulp.dest('app/static/js'))
}));

gulp.task('nunjucks', gulp.parallel(() =>
	gulp.src('app/templates/fragments/*')
		.pipe(nunjucks.precompile())
    .pipe(concat('templates.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/static/js'))
));


gulp.task('build', gulp.parallel(['script', 'vendor', 'nunjucks']));
gulp.task('default', gulp.parallel(['build'])); // Have gulp run the 'build' task as a default


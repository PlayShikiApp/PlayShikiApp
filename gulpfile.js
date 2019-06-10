var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    nunjucks    = require('gulp-nunjucks'),
    uglify      = require('gulp-uglify');

const { spawn } = require('child_process');

gulp.task('nunjucks', gulp.parallel(() =>
	gulp.src('app/templates/fragments/*')
		.pipe(nunjucks.precompile())
    .pipe(concat('templates.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/static/js'))
));

gulp.task('build', gulp.parallel(['nunjucks']));
gulp.task('default', gulp.parallel(['build'])); // Have gulp run the 'build' task as a default


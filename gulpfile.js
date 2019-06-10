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

gulp.task("keys", gulp.parallel(function(cb) {
  console.info('Starting python');
  var PIPE = {stdio: 'inherit'};
  spawn('python3', ["./utils/genkeys.py", "keys/key.priv", "src/keys/key.js"], PIPE).on('close', cb);
  spawn('python3', ["./utils/genkeys.py", "keys/key2.priv", "src/keys/key2.js"], PIPE).on('close', cb);
}));

gulp.task('build', gulp.parallel(['nunjucks', 'keys']));
gulp.task('default', gulp.parallel(['build'])); // Have gulp run the 'build' task as a default


/**
 * lonso @ 15-4-16_Sun.
 */
var gulp = require('gulp');
var minimist = require('minimist');
var exec = require('child_process').exec;


gulp.task('env', function () {
	var options = minimist(process.argv.slice(2), {
		string: 'env'
	});
	var execC = 'node config/mergeEnv.js ' + options.env;
	exec(execC, function (error, stdout, stderr) {
		if (error) {
			console.log('[gulp]', error.toString());
			return;
		}
		console.log(stdout, stderr)
	});
});

gulp.task('mocha', function () {
	var options = minimist(process.argv.slice(2), {
		string: 'dist'
	});

	var execC = 'node --harmony-generators /usr/local/lib/node_modules/mocha/bin/_mocha --require co-mocha ' + options.dist;
	exec(execC, function (error, stdout, stderr) {
		if (error) {
			console.log('[gulp]', error);
			return;
		} else {
			console.log('[gulp]', stdout, stderr)
		}
	});
});



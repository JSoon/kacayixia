/**
 * lonso @ 15-5-29_Sun.
 * lonso@foxmail.com
 */
var http = require('http');
var logger = require('./logger/logger.js').logger;
var os = require('os');
var exec = require('child_process').exec;
var util = require('util');
var pkg = require('./package.json');

for (var i = 0; i < os.cpus().length; i++) {
	var command = 'pm2 stop %s';
	var delCommand = 'pm2 delete %s';
	var execCommand = util.format(command, pkg.name + '_' + i);
	var execDelCommand = util.format(delCommand, pkg.name + '_' + i);
	exec(execCommand, function (err, stdout, stderr) {
		logger.info('[stop][process: %s][stdout: %s][stderr: %s]', process.pid, stdout, stderr || 'success');
	});
	exec(execDelCommand, function (err, stdout, stderr) {
		logger.info('[stop][process: %s][stdout: %s][stderr: %s]', process.pid, stdout, stderr || 'success');
	});
}

/**
 * lonso @ 15-5-29_Sun.
 * lonso@foxmail.com
 */
var http = require('http');
var config = require('./config/config.js');
var logger = require('./logger/logger.js').logger;
var os = require('os');
var exec = require('child_process').exec;
var util = require('util');
var fs = require('fs');
var path = require('path');
var pkg = require('./package.json');

for (var i = 0; i < os.cpus().length; i++) {
	var command = 'pm2 start -f -n "%s" --node-args="--harmony" -e %s  app.js --merge-logs --log-date-format="YYYY-MM-DD HH:mm:ss" -- %s';
	var logPath = config.log.logPath + '/pm2/edms.log';
	var execCommand = util.format(command, pkg.name + '_' + i, logPath, i);
	var dir = path.join(logPath, '..');
	if (!fs.existsSync(dir)) fs.mkdirSync(dir);
	exec(execCommand, function (err, stdout, stderr) {
		stdout = stdout.replace(/[\n]/ig, ',');
		logger.info('[start][process: %s][stderr: %s]', process.pid, stderr || 'success');
	});

}



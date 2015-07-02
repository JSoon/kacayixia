/**
 * lonso @ 15-4-15_Sun.
 */
'use strict';

var log4js = require('log4js');
var config = require('../config/config.js');
var fs = require('fs');

//判断日志存放路径是否存在
!fs.existsSync(config.log.logPath) && fs.mkdirSync(config.log.logPath);

log4js.loadAppender('file');
log4js.configure({
	appenders: [
		{ type: 'console' },
		{
			type: 'dateFile',
			filename: config.log.logPath + '/sudiyi_edms.log',
			pattern: "_yyyy-MM-dd",
			alwaysIncludePattern: true,
			category: 'sudiyi_edms'
		},
		//{
		//	type: 'dateFile',
		//	filename: config.log.logPath + '/sudiyi_edms_db.log',
		//	pattern: "_yyyy-MM-dd",
		//	alwaysIncludePattern: true,
		//	category: 'sudiyi_edms_db'
		//},
		{
			type: 'dateFile',
			filename: config.log.logPath + '/sudiyi_edms_cron.log',
			pattern: "_yyyy-MM-dd",
			alwaysIncludePattern: true,
			category: 'sudiyi_edms_cron'
		}
	],
	replaceConsole: true
});


var loggers = {
	logger: log4js.getLogger('sudiyi_edms'),
	//dbLogger: log4js.getLogger('sudiyi_edms_db'),
	cronLogger: log4js.getLogger('sudiyi_edms_cron')
};
loggers.logger.setLevel(config.log.logLevel);
module.exports = loggers;



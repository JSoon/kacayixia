/**
 * lonso @ 15-5-15_Sun.
 * lonso@foxmail.com
 */
var CronJob = require('cron').CronJob;
var co = require('co');
var Notification = require('../../models/user_center/notifications_model.js');
var NotificationLogs = require('../../models/user_center/notification_logs_model.js');

var logger = require('../../logger/logger.js').cronLogger;

//new CronJob('0 */5 * * * *', function () {
//	co(function* () {
//		return yield Notification.sync();
//	}).then(function () {
//			logger.info('[notification] cron success.')
//		}, function (err) {
//			logger.error('[notification]', err)
//		});
//}, null, true, "Asia/Chongqing");

//0 */5 * * * * *
//new CronJob('* * * * * * *', function () {
//	co(function* () {
//		return yield NotificationLogs.pushSync();
//	}).then(function () {
//			logger.info('[notification] cron success.')
//		}, function (err) {
//			logger.error('[notification]', err)
//		});
//}, null, true, "Asia/Chongqing");

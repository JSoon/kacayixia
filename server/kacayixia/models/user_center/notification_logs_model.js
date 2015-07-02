/**
 * lonso @ 15-5-15_Sun.
 * lonso@foxmail.com
 */
"use strict";
var Sequelize = require('sequelize');
var user_center = require('../../db/mysql.js').user_center;
var Model = require('../../db/Model.js');
var helper = require('../../utils/helper.js');
var BOSSERROR = require('../../const/boss_error.js');
var forEach = require('co-foreach');
var Users = require('./users_model.js');
var _ = require('lodash');
var constSettings = require('../../const/const.js');
var sms = require('../../utils/sms.js').send;
var logger = require('../../logger/logger.js').logger;

var validation = function (item, options, fn) {
	if (!item.courier_id || !item.mobile || !item.os || !item.uuid)
		return helper.throwError(BOSSERROR.e200001);
	else
		fn(null, item);
};

var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	notification_id: {type: Sequelize.INTEGER, unique: 'notification_logs_unique_nId_cId'},
	content: Sequelize.TEXT,
	courier_id: {type: Sequelize.INTEGER, unique: 'notification_logs_unique_nId_cId'},
	mobile: Sequelize.STRING(20),
	os: Sequelize.STRING(10),
	uuid: Sequelize.STRING(50),
	send_count: {type: Sequelize.INTEGER, defaultValue: 0}, //发送次数
	send: {type: Sequelize.BOOLEAN, defaultValue: false},
	success: {type: Sequelize.BOOLEAN, defaultValue: false},
	channel: Sequelize.INTEGER(6)//1:短信，2：推送，3：通知栏

};

var NotificationLogs = Model(user_center, 'notification_logs', schema);

var push = function *(log) {
	if (log.channel === constSettings.NOTIFICATION.CHANNEL.SMS) {
		try {
			yield sms(log.mobile, log.content);
			log.send = true;
		} catch (e) {
			logger.error('[sms][push]', e);
		}
	}

	if (log.channel === constSettings.NOTIFICATION.CHANNEL.APP) {
		console.log('推送')
	}
	log.send_count += 1;
	return  yield log.save();

};


NotificationLogs.pushSync = function *() {
	var limit = 1;
	var logs = yield NotificationLogs.findAll({
		limit: limit,
		where: {
			send: false,
			success: false,
			send_count: {$lte: 10}
		}
	});
	if (logs.length)
		yield forEach(logs, function *(log) {
			yield push(log);
		});
	else
		return

};


module.exports = NotificationLogs;
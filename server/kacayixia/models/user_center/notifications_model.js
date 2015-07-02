/**
 * lonso @ 15-5-15_Sun.
 * lonso@foxmail.com
 */
"use strict";

var Sequelize = require('sequelize');
var user_center = require('../../db/mysql.js').user_center;
var Model = require('../../db/Model.js');
var NotificationLogs = require('./notification_logs_model.js');
var helper = require('../../utils/helper.js');
var forEach = require('co-foreach');
var Couriers = require('./couriers_model.js');
var Users = require('./users_model.js');
var _ = require('lodash');
var constSettings = require('../../const/const.js');
var DBERROR = require('../../db/dbError.js');


var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	channel: Sequelize.INTEGER(6),//1:短信，2：推送，3：通知栏
	origin: Sequelize.INTEGER(6), //1:分部用户 2:app用户
	role: Sequelize.INTEGER(6),//0：普通快递员，1：管理员，2：超级管理员
	content: Sequelize.TEXT,
	isvalid: {type: Sequelize.BOOLEAN, defaultValue: true},
	send: {type: Sequelize.BOOLEAN, defaultValue: false},
	begin: Sequelize.INTEGER,
	end: Sequelize.INTEGER
};

function *insertByNotification(notification) {
	var limit = 1000;
	var logsCourierIds = _.pluck(
		yield NotificationLogs.findAll({
			where: {notification_id: notification.id}
		}), 'courier_id');
	var condition = {
		limit: limit,
		include: [
			{
				model: Users,
				as: 'users',
				attributes: ['client_os', 'mobile', 'client_uuid'],
				where: {mobile: {$ne: ''}}
			}
		],
		where: {
			origin: notification.origin
		}
	};
	if (logsCourierIds.length)
		condition.where.id = {$not: logsCourierIds};
	var couriers = yield Couriers.findAll(condition);

	if (couriers.length) {
		yield forEach(couriers,function*(courier) {
			yield NotificationLogs.create({
				notification_id: notification.id,
				content: notification.content,
				courier_id: courier.id,
				mobile: courier.users.mobile,
				os: courier.users.client_os,
				uuid: courier.users.client_uuid
			})
		}).catch(function (e) {
				if (e.name != DBERROR.ERRORNAME.UNIQUE)
					throw new Error(e)
			});
		yield insertByNotification(notification)
	} else {
		notification.send = true;
		return yield notification.save();
	}
}
var Notifications = Model(user_center, 'notifications', schema);

Notifications.sync = function*() {
	var timestamp = helper.getTimestamp();
	var notifications = yield Notifications.findAll({
		where: {
			begin: {$lte: timestamp},
			end: {$gte: timestamp},
			send: false,
			channel: {$ne: constSettings.NOTIFICATION.CHANNEL.NOTICE }
		}});
	return yield forEach(notifications, function*(notification) {
		yield insertByNotification(notification);
	})
};


module.exports = Notifications;
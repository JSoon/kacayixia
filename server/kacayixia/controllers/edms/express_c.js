/**
 * lonso @ 15-5-11_Sun.
 * lonso@foxmail.com
 */
"use strict";

var OrderLogs = require('../../models/sudiyi_business/order_logs.js');
var response = require('../../utils/response.js');
var sms = require('../../utils/sms.js');
var helper = require('../../utils/helper.js');
var constSettings = require('../../const/const.js');
var forEach = require('co-foreach');
var Users = require('../../models/user_center/users_model.js');
var Couriers = require('../../models/user_center/couriers_model.js');

exports.list = function *() {
	yield response.call(this, yield OrderLogs.getListItem.call(this))
};


exports.createInResend = function *() {
	var body = this.request.body.data;
	var jwt = yield helper.getJWT.call(this);
	yield  response.call(this, yield sms.resend(body, jwt));
};

exports.createInRepost = function *() {
	var body = this.request.body.data;
	var jwt = yield helper.getJWT.call(this);
	yield response.call(this, yield sms.repost(body, jwt));
};

/**
 * 即将超期提醒
 */
exports.createInWillExceedNotify = function *() {
	var jwt = yield helper.getJWT.call(this);
	var orders = yield OrderLogs.getListBySendTime(jwt, {}, constSettings.EXPRESS.LIST.TYPE.WILLEXCEED, true);
	yield forEach(orders, function * (order) {
		yield sms.resend({uuid: order.uuid}, jwt);
	});
	yield  response.call(this, {});
};


/**
 * 超期提醒
 */
exports.createInExceedNotify = function *() {
	var jwt = yield helper.getJWT.call(this);
	var orders = yield OrderLogs.getListBySendTime(jwt, {}, constSettings.EXPRESS.LIST.TYPE.EXCEED, true);
	yield forEach(orders, function * (order) {
		yield sms.resend({uuid: order.uuid}, jwt);
	});
	yield  response.call(this, {});
};


exports.createInUpload = function *() {
	yield response.call(this, yield helper.upload.call(this));
};

exports.mobile = function *() {
	var body = this.query.data;
	yield response.call(this, yield Users.uniqueByMobile(body.mobile));

};

exports.register = function *() {
	yield response.call(this, yield Couriers.managerRegister.call(this));
};
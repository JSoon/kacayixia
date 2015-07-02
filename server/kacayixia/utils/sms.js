/**
 * lonso @ 15-5-16_Sun.
 * lonso@foxmail.com
 */
"use strict";
var helper = require('./helper.js');
var cosuper = require('co-supertest');
var config = require('../config/config.js');
var BOSSERROR = require('../const/boss_error.js');
var constSettings = require('../const/const.js');
var logger = require('../logger/logger.js').logger;
var urlencode = require('urlencode');
var ResendModel = require('../models/sudiyi_edms/edms_resend_sms.js');
var uuid = require('node-uuid').v4;


exports.send = function * (mobile, content, ad) {
	if (!helper.checkCellPhone(mobile)) return helper.throwError(BOSSERROR.e210008);
	var data = {
		mobile: mobile + '',   //toString()
		content: content
	};

	var post = "business_type=" + constSettings.SMS.SEND.business_type + "&data=";
	post += JSON.stringify(data);
	var str = JSON.stringify(data) + constSettings.SMS.SEND.private_key;
	post += '&sign=' + (yield helper.md5(str));
	logger.info('[sms][send][mobile:%s][content:%s]', mobile, content);
	var request = cosuper(config.sms.send.host);

	var path = config.sms.send.path;
	if (ad) path += '?&ad=1';

	var res = yield request.post(path)
		.send(post)
		.end();
	if (!res.body.code)
		return
	else
		return helper.throwError(res.body)
};

exports.resend = function * (body, jwt) {
	var data = {
		uuid: body.uuid,
		user_type: constSettings.SMS.RESEND.USERTYPE,
		user_name: jwt.name,
		user_id: jwt.id,
		device_type: constSettings.SMS.RESEND.DEVICETYPE,
		action_value: constSettings.SMS.RESEND.ACTIONVALUE
	};

	logger.info('[sms][resend][content:%j]', data);

	var sign = yield helper.md5(JSON.stringify(data) + config.business.keys[config.business_type]);
	var post = {
		data: JSON.stringify(data),
		sign: sign,
		business_type: config.business_type
	};
	var request = cosuper(config.sms.order.host + ':' + config.sms.order.port);

	var res = yield request.post(config.sms.order.path)
		.send(post)
		.end();

	if (res.statusCode != 200)
		return helper.throwError(BOSSERROR.e200009);
	else
		return ''
};


exports.repost = function * (body, jwt) {
	var data = {
		uuid: body.uuid,
		user_type: constSettings.SMS.RESEND.USERTYPE,
		user_name: jwt.name,
		user_id: jwt.id,
		device_type: constSettings.SMS.RESEND.DEVICETYPE,
		action_value: constSettings.SMS.RESEND.ACTIONVALUE,
		send_to: body.old_mobile
	};
	logger.info('[sms][repost][uuid:%s][user_name:%s][send_to:%s]', body.uuid, jwt.name, body.old_mobile);

	var sign = yield helper.md5(JSON.stringify(data) + config.business.keys[config.business_type]);
	var post = {
		data: JSON.stringify(data),
		sign: sign,
		business_type: config.business_type
	};
	var resendObj = {
		id: uuid(),
		op_id: jwt.id,
		mobile: body.mobile,
		old_mobile: body.old_mobile,
		remark: body.remark,
		barcode: body.barcode,
		company_id: jwt.company_id
	};
	yield ResendModel.create(resendObj);
	var request = cosuper(config.sms.order.host + ':' + config.sms.order.port);
	var res = yield request.post(config.sms.order.path)
		.send(post)
		.end();

	if (res.statusCode != 200)
		return helper.throwError(BOSSERROR.e200009);
	else
		return ''
};

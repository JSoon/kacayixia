/**
 * lonso @ 15-5-22_Sun.
 * lonso@foxmail.com
 */
"use strict";

var helper = require('../../utils/helper.js');
var User = require('../../models/user_center/users_model.js');
var Courier = require('../../models/user_center/couriers_model.js');
var BOSSERROR = require('../../const/boss_error.js');
var constSettings = require('../../const/const.js');
var jwt = require('koa-jwt');
var config = require('../../config/config.js');
var response = require('../../utils/response.js');
var logger = require('../../logger/logger.js').logger;
var CompnayRel = require('../../models/sudiyi_edms/company_rel_model.js');


/**
 * Represents a book.
 * @method login
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
module.exports = function  *() {
	var body = this.request.body;
	var courier = yield Courier.find({
		where: {
			role: constSettings.COURIERS.ROLE.ADMIN,
			verify: constSettings.COURIERS.VERIFY.PASS,
			status: constSettings.COURIERS.STATUS.ENABLE
		},
		include: [
			{model: User, as: 'users', attributes: ['name', 'password', 'encrypt'], where: {mobile: body.data.mobile}}
		]
	});

	if (!courier)
		return helper.throwError(BOSSERROR.e210007);

	if ((yield helper.md5(body.data.password + courier.users.encrypt)) != courier.users.password)
		return helper.throwError(BOSSERROR.e210007);

	var count = yield CompnayRel.count({where: {company_id: courier.company_id}});
	var host = this.request.header.host;
	var ua = this.request.header['user-agent'];
	var token = helper.token({
		company_id: courier.company_id,
		company_name: courier.company_name,
		brand: courier.brand,
		mobile: body.data.mobile,
		id: courier.id,
		name: courier.users.name,
		host: host,
		ua: ua,
		courier: courier,
		isAdmin: !!count
	});

	logger.info('[login][r_id: %s][host: %s][ua: %s][token: %s]', this.requestId, host, ua, token);
	yield response.call(this, token);
};
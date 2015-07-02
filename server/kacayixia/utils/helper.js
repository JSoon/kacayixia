/**
 * lonso @ 15-4-16_Sun.
 * lonso@foxmail.com
 */
"use strict";
var crypto = require('crypto');
var logger = require('../logger/logger.js').logger;
var parse = require('co-body');
var config = require('../config/config.js');
var util = require('util');
var cache = require('../db/redis').cache;
var _ = require('lodash');
var moment = require('moment');
var jwt = require('koa-jwt');
var constSettings = require('../const/const.js');
var bParse = require('co-busboy');
var fs = require('fs');
var path = require('path');
var OSS = require('./aly/alyOss.js');
var co = require('co');

var throwError = exports.throwError = function (jsonError) {
	throw new Error(JSON.stringify(jsonError));
};

exports.pageItems = function *(model, query) {
	var pageIndex = query.data.pageIndex || 1;
	var pageSize = query.data.pageSize || 10;
	pageIndex = (pageIndex - 1) > 0 ? pageIndex - 1 : 0;
	return yield model.findAndCountAll({
		offset: pageIndex * pageSize,
		limit: pageSize
	})
};

/**
 * 验证手机号码
 * @param val
 * @returns {boolean}
 */
exports.checkCellPhone = function (val) {
	if (!val) return true;
	val = val.toString().replace(/(^\s+)|(\s+$)/g, "");
	var reg = /^(86)?1\d{10}$/;
	return reg.test(val);
};

/**
 * 验证座机和手机
 * @param val
 * @returns {boolean}
 */
exports.checkPhone = function (val) {
	if (!val) return false;
	val = (val).toString().replace(/(^\s+)|(\s+$)/g, "");
	var reg = /(^(\d{2,4}[-_－—]?)?\d{3,8}([-_－—]?\d{3,8})?([-_－—]?\d{1,7})?$)|(^0?1\d{10}$)/;
	return reg.test(val);
};


exports.checktIdCard = function *(idCard) {
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	return reg.test(idCard);
};


exports.checkZhCN = function *(val) {
	return (val).toString().charCodeAt() > 127;
};


var md5 = exports.md5 = function *(str) {
	var Buffer = require('buffer').Buffer;
	var buf = new Buffer(1024);
	var len = buf.write(str, 0);
	str = buf.toString('binary', 0, len);
	return crypto.createHash('md5').update(str).digest('hex');
};


exports.getTimestamp = function () {
	return moment().format('X');
};

exports.getDateToTimestamp = function (date) {
	return moment(date).format('X');
};

exports.now = function () {
	return moment().format(constSettings.DATEFORMAT.EXPORT);
};

exports.formatTimestamp = function (date) {
	return moment.unix(date).format(constSettings.DATEFORMAT.EXPORT);
};

exports.token = function (data) {
	return jwt.sign(data || {}, config.secret, {expiresInMinutes: config.tokenExpired});
};

exports.getJWT = function *() {
	return jwt.decode(this.header.authorization.split(' ')[1]);
};

exports.getStartDate = function (date) {
	return moment(date).format(constSettings.DATEFORMAT.EXPORT);
};

exports.getEndDate = function (date) {
	return moment(date).add(1, 'd').add(-1, 's').format(constSettings.DATEFORMAT.EXPORT);
};

exports.getCurrentDate = function () {
	return moment().format(constSettings.DATEFORMAT.EXPORT);
};

exports.getInfinityDate = function () {
	return moment().add(100, 'y').format(constSettings.DATEFORMAT.EXPORT);
};

exports.getInfinitesimalDate = function () {
	return moment().add(-100, 'y').format(constSettings.DATEFORMAT.EXPORT);
};


exports.upload = function *() {
	var parts = bParse(this);
	var part;
	var requestObj = {};
	var filePath = '';
	var fileName = '';
	var buffer = '';
	while (part = yield parts) {
		if (part['fieldname']) {
			var suffix = path.extname(part['filename']);
			fileName = moment().format(constSettings.DATEFORMAT.FILENAME) + parseInt(Math.random(100000000 - 1000000000) * 1000000000) + suffix;
			if (!fs.existsSync(config.tmp)) fs.mkdirSync(config.tmp);
			filePath = config.tmp + "/" + fileName;
			var stream = fs.createWriteStream(filePath);
			buffer = part._readableState.buffer[0];
			part.pipe(stream);
		} else {
			requestObj[part[0]] = part[1];
		}
	}
	try {
		requestObj['filePath'] = yield OSS.ossUpload('', fileName, buffer);
		fs.unlinkSync(filePath);
	} catch (e) {
		logger.error('[oss][upload]', e);
		var fileDate = fs.readFileSync(filePath);
		requestObj['filePath'] = yield OSS.ossUpload('', fileName, fileDate);
		fs.unlinkSync(filePath);
	}
	return requestObj;
};


exports.getTimeDiff = function (date, interval) {
	interval = interval || 'hours';
	return moment().diff(date, interval)
};


exports.countDown = function (seconds) {
	var days = Math.floor(seconds / (3600 * 24));
	var left_second_h = seconds - days * 3600 * 24;
	var hours = Math.floor(left_second_h / 3600);
	var left_second_m = left_second_h - hours * 3600;
	var minutes = Math.floor(left_second_m / 60);
	var left_second_s = left_second_m - minutes * 60;
	var text = '';
	if (days > 0) {
		text += days + '天';
	}
	if (hours > 0) {
		text += hours + '小时';
	}
	if (minutes > 0) {
		text += minutes + '分钟';
	}
	if (text == '') {
		text += parseInt(left_second_s) + '秒';
	}
	return text;
};

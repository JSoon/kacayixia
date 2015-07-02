/**
 * lonso @ 15-4-22_Sun.
 * lonso@foxmail.com
 */
"use strict";
var helper = require('../../utils/helper.js');
var config = require('../../config/config.js');
var server = require('./server.js');

module.exports = RequestHelper;


function RequestHelper() {
	this.server = server;
	return this;
}

var postData = function *(data, business_type) {
	var post = "business_type=" + business_type + "&data=";
	post += JSON.stringify(data);
	post += '&sign=' + (yield helper.md5(JSON.stringify(data) + config.business.keys[business_type]));
	return post
};


RequestHelper.prototype.postData = function *(data, business_type) {
	this.token = (yield this.login()).data;
	return yield postData(data, business_type)
};


RequestHelper.prototype.getData = function *(uri, data, business_type) {
	this.token = (yield this.login()).data;
	var sign = yield helper.md5(JSON.stringify(data) + config.business.keys[business_type]);
	return uri + '?data=' + JSON.stringify(data) + '&business_type=' + business_type + '&sign=' + sign;
};

RequestHelper.prototype.get = function *(url, data, business_type) {
	var uri = yield this.getData(url, data, business_type);
	var res = yield this.server.get(uri)
		.set('Authorization', 'Bearer ' + this.token)
		.set('Content-Type', 'application/json')
		.expect(200)
		.end();
	return res.body;
};


RequestHelper.prototype.post = function *(uri, data, business_type) {
	var post = yield this.postData(data, business_type);
	var res = yield this.server.post(uri)
		.set('Authorization', 'Bearer ' + this.token)
		.send(post)
		.expect(200)
		.end();
	return res.body;
};


RequestHelper.prototype.delete = function *(uri, data, business_type) {
	var post = yield this.postData(data, business_type);
	var res = yield server.delete(uri)
		.set('Authorization', 'Bearer ' + this.token)
		.send(post)
		.expect(200)
		.end();
	return res.body;
};

RequestHelper.prototype.login = function *() {
	var data = {
		mobile: 15680039281,
		password: 111111
	};
	var business_type = 101;
	var post = yield postData(data, business_type);
	var res = yield this.server.post('/edms/login')
		.send(post)
		.expect(200)
		.end();

	return res.body;

};
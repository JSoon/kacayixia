/**
 * lonso @ 15-5-22_Sun.
 * lonso@foxmail.com
 */
var Request = require('../helper/request.js');
var should = require('should');
var faker = require('faker');
var fs = require('fs');
var prefix = '/edms/login';
var jwt = require('koa-jwt');

faker.locale = "zh_CN";

var business_type = 101;
describe('notification', function () {
	var request = new Request();
	var id = '';
	it('create should pass', function *() {
		var data = {
			mobile: 15680039281,
			password: 111111
		};
		var body = yield request.post(prefix, data, business_type);
		id = body.data.id;
		body.code.should.equal(0);
		body.message.should.equal('success');
		console.log('TOKEN DECODE:', jwt.decode(body.data));
	});


});
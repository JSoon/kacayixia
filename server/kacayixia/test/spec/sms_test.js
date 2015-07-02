/**
 *  lonso on_mars 15-6-11.
 */
var Request = require('../helper/request.js');
var should = require('should');
var faker = require('faker');
var fs = require('fs');
var prefix = '/edms/verify/';
faker.locale = "zh_CN";

var business_type = 101;
describe('expresses', function () {
	var request = new Request();
	var id = '';


	it.only('sms send should pass', function *() {
		var data = {
			source: 'register',
			mobile: '13540088432'
		};
		var body = yield request.post('/edms/sms/', data, business_type);
		body.code.should.equal(0);
		body.message.should.equal('success');
	});


	it('sms verify should pass', function *() {
		var data = {
			source: 'register',
			mobile: '13540088432',
			captcha: 354114
		};
		var body = yield request.post(prefix, data, business_type);
		body.code.should.equal(0);
		body.message.should.equal('success');
	});







});
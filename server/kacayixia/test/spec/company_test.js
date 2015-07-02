/**
 *  lonso on_mars 15-6-15.
 */
var Request = require('../helper/request.js');
var should = require('should');
var faker = require('faker');
var fs = require('fs');
var prefix = '/edms/companies/';
faker.locale = "zh_CN";

var business_type = 101;
describe('companies', function () {
	var request = new Request();
	var id = '';
	it('checkadmin should pass', function *() {
		var data = {
			mobile: '13540750513'
		};

		var body = yield request.get(prefix + 'checkAdmin', data, business_type);
		body.message.should.equal('success');
	});


	it
	('create should pass', function *(){
		var data = {
			mobile: '13540750513',
			password: '111111'
		};
		var body = yield request.post(prefix+ 286 + '/sub', data, business_type);
		body.message.should.equal('success');
	});

	it('transfer should pass', function *(){
		var data = {
			pay_company_id: '187',
			receive_company_id: '187',
			total_fee: parseInt(Math.random(100-1000)*1000),
			remark: 'test'
		};
		var body = yield request.post(prefix+ 286 + '/transfer', data, business_type);
		body.message.should.equal('success');
	});


	it('get sub info  should pass', function *(){
		var data = {};
		var body = yield request.get(prefix+ 286 + '/sub', data, business_type);
		body.message.should.equal('success');
	});

	it.only('change password  should pass', function *(){
		var data = {
			password: '111111',
			newPwd: '111111',
			repeatNewPwd: '111111'
		};
		var body = yield request.post(prefix + 'changePassword', data, business_type);
		body.message.should.equal('success');
	});





});
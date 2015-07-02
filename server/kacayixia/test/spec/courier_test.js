/**
 * lonso @ 15-4-16_Sun.
 * lonso@foxmail.com
 */
var Request = require('../helper/request.js');
var should = require('should');
var faker = require('faker');
var fs = require('fs');
var prefix = '/edms/couriers/';
faker.locale = "zh_CN";

var business_type = 101;
describe('couriers', function () {
	var request = new Request();
	var id = '';
	it('list should pass', function *() {
		var data = {
			is_left: 0,
			name: '13'
		};

		var body = yield request.get(prefix, data, business_type);
		body.message.should.equal('success');
	});

	it('create should pass', function *(){
		var data = {
			name: 'xktest',
			mobile: '12345678910',
			idcard: 'test111111111'
		}
		var body = yield request.post(prefix, data, business_type);
		body.message.should.equal('success');
	});

	it('delete should pass', function *(){
		var id = 1;
		var data = {id: id};
		var body = yield request.delete(prefix + id, data, business_type);
		body.message.should.equal('success');
	});

	it.only('read should pass', function *(){
		var id = 1;
		var data = {start: '2015-03-17',end: '2015-06-10'};
		var body = yield request.get(prefix + id, data, business_type);
		console.log(body, "33333333333333");
	});
});


/**
 *  lonso on_mars 15-6-23.
 */
var Request = require('../helper/request.js');
var should = require('should');
var faker = require('faker');
var fs = require('fs');
var prefix = '/edms/sendOrders/';
faker.locale = "zh_CN";


var business_type = 101;
describe('couriers', function () {
	var request = new Request();
	var id = '';
	it.only('list should pass', function *() {
		var data = {

		};

		var body = yield request.get(prefix, data, business_type);
		body.message.should.equal('success');
	});

});


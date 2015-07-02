/**
 * lonso @ 15-4-16_Sun.
 * lonso@foxmail.com
 */
var Request = require('../helper/request.js');
var should = require('should');
var faker = require('faker');
var fs = require('fs');
var prefix = '/edms/expresses/';
faker.locale = "zh_CN";

var business_type = 101;
describe('expresses', function () {
	var request = new Request();
	var id = '';
	xit('create should pass', function *() {
		var data = {
			name: faker.company.companyName(),
			courier_count: parseInt(Math.random(2 - 100) * 100),
			company_count: parseInt(Math.random(2 - 100) * 100),
			fee_rules_id: parseInt(Math.random(2 - 10) * 10)
		};

		var body = yield request.post(prefix, data, business_type);
		id = body.data.id;
		body.code.should.equal(0);
		body.message.should.equal('success');
	});

	xit('update should pass', function *() {
		var data = {
			name: faker.company.companyName(),
			company_count: parseInt(Math.random(2 - 100) * 100),
			courier_count: parseInt(Math.random(2 - 100) * 100),
			fee_rules_id: parseInt(Math.random(2 - 10) * 10),
			app_display: false
		};
		var body = yield request.post(prefix + id, data, business_type);
		body.code.should.equal(0);
		body.message.should.equal('success');
	});

	xit('get should pass', function *() {
		var data = {id: id};
		var url = prefix + id;
		var body = yield request.get(url, data, business_type);
		body.code.should.equal(0);
		body.message.should.equal('success');
		body.data.id.should.not.null;
	});

	it('list should pass', function *() {
		var data = {start: '2012-5-1', end: '2016-5-1'};
		var body = yield request.get(prefix, data, business_type);
		body.code.should.equal(0);
		body.message.should.equal('success');
	});


	it('resend sms should pass', function *() {
		var data = {
			uuid: '4b2ea4ab-ebb6-42bc-bcf7-bd02ac0cd47d'
		};
		var body = yield request.post(prefix + 8871 + '/resend', data, business_type);
		body.code.should.equal(0);
		body.message.should.equal('success');
	});

	it('repost sms should pass', function *() {
		var data = {
			uuid: '4b2ea4ab-ebb6-42bc-bcf7-bd02ac0cd47d',
			mobile: '13540088432',
			old_mobile: '15208315464',
			remark: 'test',
			barcode: 'test'
		};
		var body = yield request.post(prefix + 8871 + '/repost', data, business_type);
		body.code.should.equal(0);
		body.message.should.equal('success');
	});

	it('willExceed list should pass', function *() {
		var data = { key:1,type: 'willExceed'};
		var body = yield request.get(prefix, data, business_type);
		body.code.should.equal(0);
		body.message.should.equal('success');
		console.log(body)
	});

	it('exceed list should pass', function *() {
		var data = {key: 1, type: 'exceed'};
		var body = yield request.get(prefix, data, business_type);
		body.code.should.equal(0);
		body.message.should.equal('success');
		console.log(body.data.rows[0])
	});

	it('即将超期一键提醒 should pass', function *() {
		var data = {key: 1, type: 'overDue'};
		var body = yield request.post(prefix + 286 + '/willExceedNotify', data, business_type);
		body.code.should.equal(0);
		body.message.should.equal('success');
	});

	it('超期一键提醒 should pass', function *() {
		var data = {key: 1, type: 'overDue'};
		var body = yield request.post(prefix + 286 + '/exceedNotify', data, business_type);
		body.code.should.equal(0);
		body.message.should.equal('success');
	});

	it.only('repost list should pass', function *() {
		var data = {key: 7777, type: 'repost'};
		var body = yield request.get(prefix, data, business_type);
		body.code.should.equal(0);
		body.message.should.equal('success');
	});


	it('超期一键提醒 should pass', function *() {
		var data = {key: 1, type: 'overDue'};
		var body = yield request.post(prefix + 286 + '/upload', data, business_type);
		body.code.should.equal(0);
		body.message.should.equal('success');
	});


	it('checkout mobile should pass', function *() {
		var data = {
			mobile: 13540088432

		};
		var body = yield request.get(prefix + 'mobile', data, business_type);
		body.code.should.equal(0);
		body.message.should.equal('success');
	});


	it('register should pass', function *() {
		var data = {
			mobile: '13540088431',
			name: faker.name.findName(),
			idcard: 511529198808010011,
			password: 123456,
			repeatPassword: 123456,
			brand_id: 1,
			idcard_front_image: 'idcard_front_image.com',
			idcard_back_image: 'idcard_back_image.com',
			company_id: -1,
			company_name: faker.company.companyName(),
			latitude: faker.address.latitude(),
			longitude: faker.address.longitude(),
			phone_number: '13540088431',
			licence_image: 'licence_image.com',
			city: faker.address.zipCode(),
			address: faker.address.streetAddress()

		};
		var body = yield request.post(prefix + 'register', data, business_type);
		body.code.should.equal(0);
		body.message.should.equal('success');
	});


});


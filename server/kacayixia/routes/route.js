/**
 * lonso @ 15-4-16_Sun.
 * lonso@foxmail.com
 */

var resource = require('../resource/resource.js');
var couriers = require('../controllers/edms/courier_c.js');
var express = require('../controllers/edms/express_c.js');
var upload = require('../controllers/edms/upload_c.js');
var sms = require('../controllers/edms/sms_c.js');
var company = require('../controllers/edms/company_c.js');
var edmsOrders = require('../controllers/edms/edms_order_c.js');

module.exports = routes;

function routes(app) {
	var route = resource(app, '/edms/');
	route('couriers', couriers);
	route('expresses', express, {
		actions: [
			{name: 'register', verb: 'post'},
			{name: 'mobile', verb: 'get'}
		],
		subResources: [
			{name: 'resend'},
			{name: 'repost'},
			{name: 'willExceedNotify'},
			{name: 'exceedNotify'}
		]
	});

	route('sendOrders', edmsOrders);


	route('companies', company, {
		actions: [
			{name: 'checkAdmin'},
			{name: 'changePassword', verb: 'post'},
			{name: 'getScope'}
		],
		subResources: [
			{name: 'sub'},
			{name: 'transfer'}
		]
	});


	app.post('/edms/upload', upload);
	app.post('/edms/sms', sms.send);
	app.post('/edms/verify', sms.verify);

}

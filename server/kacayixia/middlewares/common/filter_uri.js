/**
 * lonso @ 15-5-26_Sun.
 * lonso@foxmail.com
 */
"use strict";
var upload = require('../../controllers/edms/upload_c.js');
var sms = require('../../controllers/edms/sms_c.js');

module.exports = function () {
	var exportUris = ['/boss/orders/export', '/boss/withdrawals/export', '/boss/companies/export'];
	return function*(next) {
		var url = this.request.url.split('?')[0];
		if (this.method === 'POST' && url === '/edms/upload') {
			yield upload.call(this);
		} else if (this.method === 'POST' && url === '/edms/sms') {
			yield sms.send.call(this);
		} else if (!!~exportUris.indexOf(url)) {
			this.header.authorization = 'Bearer ' + this.query.token || '';
			yield* next;
		} else
			yield* next;
	}
};

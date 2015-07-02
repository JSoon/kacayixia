/**
 * lonso @ 15-4-20_Sun.
 * lonso@foxmail.com
 */
var checkSign = require('../../utils/checkSign.js');

module.exports = function *(next) {
	yield checkSign(this);
	if (this.method === 'GET') {
		this.query.data = JSON.parse(this.query.data);
	} else {
		this.request.body.data = JSON.parse(this.request.body.data);
	}

	yield *next
};
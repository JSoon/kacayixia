/**
 * lonso @ 15-4-16_Sun.
 * lonso@foxmail.com
 */
var uuid = require('node-uuid').v4;
var moment = require('moment');

module.exports = function () {
	return function*(next) {
		this.requestId = uuid();
		this.requestStart = moment().format('x');
		yield* next;
	}
};
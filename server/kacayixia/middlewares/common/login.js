/**
 * lonso @ 15-5-22_Sun.
 * lonso@foxmail.com
 */

var edmsLogin = require('../../controllers/edms/login.js');

module.exports = function () {
	return function*(next) {
		if (this.method === 'POST' && this.url === '/edms/login')
			return yield edmsLogin.call(this);
		else
			yield* next;
	}
};
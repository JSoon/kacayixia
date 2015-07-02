/**
 * lonso @ 15-4-16_Sun.
 */
'use strict';
var cosuper = require('co-supertest');
module.exports = function (host) {
	return cosuper(host);
};
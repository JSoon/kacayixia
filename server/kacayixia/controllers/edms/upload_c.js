/**
 *  lonso on_mars 15-6-10.
 */
var response = require('../../utils/response.js');
var helper = require('../../utils/helper.js');


module.exports = function *() {
	yield response.call(this, yield helper.upload.call(this));
};
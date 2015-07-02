/**
 *  lonso on_mars 15-6-23.
 */
var response = require('../../utils/response.js');
var edmsOrder = require('../../models/sudiyi_edms/edms_orders_model.js');

exports.list = function *(){
	yield response.call(this, yield edmsOrder.list.call(this));
};
/**
 * lonso @ 15-5-14_Sun.
 * lonso@foxmail.com
 */

var Sequelize = require('sequelize');
var sudiyi_emds = require('../../db/mysql.js').sudiyi_emds;
var Model = require('../../db/Model.js');
var helper = require('../../utils/helper.js');
var constSettings = require('../../const/const.js');
var forEach = require('co-foreach');
var Users = require('../../models/user_center/users_model.js');
var schema = {
	id: Sequelize.STRING(36),
	courier_id: Sequelize.INTEGER,
	company_id: Sequelize.INTEGER,
	user_id: Sequelize.INTEGER,
	sender_address: Sequelize.STRING,
	sender_mobile: Sequelize.STRING(20),
	sender_name: Sequelize.STRING(15),
	receiver_mobile: Sequelize.STRING(20),
	receiver_address: Sequelize.STRING,
	description: Sequelize.STRING,
	remark: Sequelize.STRING,
	order_id: Sequelize.STRING(30),
	reason_for_cancellation: Sequelize.STRING,
	status: Sequelize.INTEGER,
	pay_type: Sequelize.INTEGER,
	pay_time: Sequelize.INTEGER,
	prepay_id: Sequelize.STRING(32),
	barcode: Sequelize.STRING(100),
	total: Sequelize.INTEGER,
	discount: Sequelize.INTEGER,
	latitude: Sequelize.FLOAT,
	longitude: Sequelize.FLOAT
};
var EdmsOrders = Model(sudiyi_emds, 'edms_orders', schema);

EdmsOrders.list = function *() {
	var jwt = yield helper.getJWT.call(this);
	var body = this.query.data;
	var condition = EdmsOrders.page(body);
	condition.where.company_id = jwt.company_id;
	condition.where.status = body.status == constSettings.EDMSORDER.STATUS.RECEIVE ?
		constSettings.EDMSORDER.STATUS.RECEIVE : {$ne: constSettings.EDMSORDER.STATUS.RECEIVE};
	var items = yield EdmsOrders.findAndCountAll(condition);
	var rows = [];

	yield forEach(items.rows, function*(item) {
		item = JSON.parse(JSON.stringify(item));
		if (item.user_id) {
			var user = yield Users.findById(item.user_id);
			item.courier_name = ((user || {}).name) || '';
		}
		rows.push(item);
	});
	items.rows = rows;
	return items
};


module.exports = EdmsOrders;
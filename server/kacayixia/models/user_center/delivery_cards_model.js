/**
 * lonso @ 15-5-13_Sun.
 * lonso@foxmail.com
 */
var Sequelize = require('sequelize');
var user_center = require('../../db/mysql.js').user_center;
var Model = require('../../db/Model.js');
var helper = require('../../utils/helper.js');
var BOSSERROR = require('../../const/boss_error.js');

var validation = function (item, options, fn) {
	if (!item.chip_no)
		return helper.throwError(BOSSERROR.e200001);
	else
		fn(null, item);
};

var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	card_no: Sequelize.STRING(20),
	chip_no: Sequelize.STRING(20),
	user_id: Sequelize.INTEGER,
	status: Sequelize.INTEGER,
      	updated_at: Sequelize.DATE
};

var DeliveryCards = Model(user_center, 'delivery_cards', schema, true);
/**
*删除快递员时修改delivery_cards的相关信息
*@params Object user 用户对象
**/
DeliveryCards.updateFromDelCourier = function *(user){
      var delivery_cards = yield DeliveryCards.findAll({where: {user_id: user.id}});
      if (delivery_cards.length > 0){
            var delivery_card = delivery_cards[0];
            var date = new Date();
            yield delivery_card.update({status: 0,updated_at: date});
      }
};
module.exports = DeliveryCards;

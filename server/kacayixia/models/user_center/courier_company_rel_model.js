/**
 * lonso @ 15-5-12_Sun.
 * lonso@foxmail.com
 */

var Sequelize = require('sequelize');
var user_center = require('../../db/mysql.js').user_center;
var Model = require('../../db/Model.js');
var helper = require('../../utils/helper.js');
var Areas = require('../../models/sudiyi_operation/areas_model.js');
var Company = require('../user_center/company_model.js');

var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	user_id: {type:Sequelize.INTEGER, comment: '快递员id'},
	status: Sequelize.INTEGER,
	joined_at: Sequelize.INTEGER,
	left_at: Sequelize.INTEGER,
	city: Sequelize.STRING(10),
	brand: Sequelize.STRING(20),
	company_id : Sequelize.INTEGER,
	company_name: Sequelize.STRING(50),
                   updated_at: Sequelize.Date,
                   created_at:  Sequelize.Date
};

var CourierCompanyRel = Model(user_center, 'courier_company_rel', schema);

CourierCompanyRel.addAndUpdateCourier = function *(courier, jwt) {
      var ccls = yield CourierCompanyRel.findAll({
            where: {
                   user_id: courier.id,
                   company_id: jwt.company_id,
                   left_at: null
             }
      });

      var ccl = null;
      if (ccls.length > 0) {
            yield ccls[0].update({updated_at: new Date()});
            ccl = ccls[0];
      }else{
            var company = yield Company.findOne({where: {id: jwt.company_id}});
            var areas = yield Areas.findOne({where: {id: company.city}});
            var create_attr = {
                  company_name: jwt.company_name,
                  brand: jwt.brand,
                  city: areas.name,
                  user_id: courier.id,
                  company_id: jwt.company_id,
                  status: 0,
                  joined_at: helper.getTimestamp(),
                  created_at: new Date(),
                  updated_at: new Date()
             };
             ccl = yield CourierCompanyRel.create(create_attr);
      };

      return ccl;
};

/**
*删除快递员时设置快递员离职时间
*@params Object courier courier的对象
**/
CourierCompanyRel.updateLeftAt = function *(courier){
      var condition = {where: {}};
      condition.where["user_id"] = courier.id;
      condition.where["company_id"] = courier.company_id;
      condition.where["left_at"] = null;
      var ccls = yield CourierCompanyRel.findAll(condition);

      if (ccls.length > 0){
            var ccl = ccls[0];
            ccl.update({left_at: helper.getTimestamp()});
      }
};

module.exports = CourierCompanyRel;
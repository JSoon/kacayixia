/**
 *  lonso on_mars 15-6-15.
 */


var response = require('../../utils/response.js');
var Company = require('../../models/user_center/company_model.js');
var CourierCompany = require('../../models/user_center/courier_companies_model.js');
var CompanyRel = require('../../models/sudiyi_edms/company_rel_model.js');

exports.createInSub = function *() {
	yield response.call(this, yield Company.createInSub.call(this))
};

exports.checkAdmin = function *() {
	yield response.call(this, yield Company.checkAdmin.call(this))
};

exports.getScope = function *(){
      var jwt = yield helper.getJWT.call(this);
      var company_id = jwt.company_id;
      var res = {};
      var courier_company = yield CourierCompanies.find({
            where: {
                    id: company_id
             },
             attributes: ["latitude", "longitude", "manager_mobile"]
      });

      var company_rel = yield CompanyRel.find({
            where: {
                  company_id: company_id
            },
            attributes: ["open_time", "close_time", "scope"]
      });

      if (courier_company && company_rel){
             res = {
                    open_time: company_rel.open_time,
                    close_time: company_rel.close_time,
                    latitude: courier_company.latitude,
                    longitude: courier_company.longitude,
                    manager_mobile: courier_company.manager_mobile || jwt.mobile,
                    scope: company_rel.scope
             }
      }else{
            res = {}
      }

      yield response.call(this, res);
};

exports.createInTransfer = function *() {
	yield response.call(this, yield Company.transfer.call(this))
};

exports.readInSub = function *() {
	yield response.call(this, yield Company.getSubInfo.call(this))
};

exports.changePassword = function *() {
	yield response.call(this, yield Company.changePassword.call(this))
};
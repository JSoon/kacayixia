var config = {
  "version": "1.0",
  "prefix": "/boss/",
  "env": "development",
  "port": 3000,
  "cacheTime": 3600,
  "tokenExpired": 120,
  "exceedRate": 0.75,
  "tmp": "/home/xingkai/works/sudiyi_edms_new/tmp",
  "secret": "sudiyi_edms_fed66a6112e125b63ee9be1e00b10912",
  "encrypt": "et42grdy5gdg7i9f",
  "log": {
    "logPath": "/home/xingkai/works/sudiyi_edms_new/logs",
    "logLevel": "DEBUG"
  },
  "business_type": 13,
  "business": {
    "keys": {
      "1": "5GKrhKy2EwfVJ8aD",
      "13": "kvus39r74mf28d0s",
      "16": "4342609b2ec38c65",
      "101": "C95U4m1EHK40Te0X",
      "102": "Gw9YjiKNC1fY0xC2"
    }
  },
  "oss": {
    "host": "http://sudiyi-edms.oss.aliyuncs.com/",
    "region": "http://oss-cn-hangzhou.aliyuncs.com",
    "key": "V7D4p6Q1xGVcnsZe",
    "secret": "txYpqJJARxqRR8Zu1TOAtPP0O92OwK"
  },
  "mysql": {
    "user_center": {
      "host": "127.0.0.1",
      "port": 3306,
      "database": "user_center",
      "username": "root",
      "password": "123456"
    },
    "sudiyi_operation": {
      "host": "127.0.0.1",
      "port": 3306,
      "database": "sudiyi_operation",
      "username": "root",
      "password": "123456"
    },
    "sudiyi_edms": {
      "host": "127.0.0.1",
      "port": 3306,
      "database": "sudiyi_edms",
      "username": "root",
      "password": "123456"
    },
    "sudiyi_business": {
      "host": "127.0.0.1",
      "port": 3306,
      "database": "sudiyi_business",
      "username": "root",
      "password": "123456"
    }
  },
  "redis": {
    "cache": {
      "host": "127.0.0.1",
      "port": 6379,
      "opts": {
        "password": ""
      }
    }
  },
  "sms": {
    "send": {
      "host": "http://test.sms.sudiyi.cn",
      "path": "/api/sms/send"
    },
    "order": {
      "host": "http://u.sudiyi.cn",
      "port": 3700,
      "path": "/package/notify/sms"
    }
  },
  "feeRules": {
    "host": "http://112.124.50.175:3700",
    "api": "/api/fee_rules"
  }
};

module.exports = config;
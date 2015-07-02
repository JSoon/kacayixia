#快递分部管理系统V2.0
开发简要说明

代码规范参照：[参考](https://github.com/dead-horse/node-style-guide)

***

##环境设置
利用gulp进行开发，测试，生产服务器的环境切换匹配
执行命令

```javascript
    gulp env --env development
    可选参数包括:development,test,production
    配置文件信息来源于：config/env/development.js,config/env/test.js,config/env/production.js
```

##数据库同步
数据库orm使用sequelize模块，所有数据库相关的model放在models目录下，项目启动时候会去同步相应的数据库表

##测试
测试使用mocha进行测试

```javascript
    node --harmony-generators /usr/local/lib/node_modules/mocha/bin/_mocha --require co-mocha your/testcase.js
```


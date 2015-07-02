/**
 * lonso @ 15-4-15_Sun.
 */
"use strict";

var app = require('koa')();
var logger = require('./logger/logger.js').logger;
var http = require('http');
var config = require('./config/config.js');
var router = require('koa-router');
var routes = require('./routes/route.js');
var errorHandle = require('./middlewares/common/error_handle.js');
var checkSign = require('./middlewares/common/check_sign.js');
var requestId = require('./middlewares/common/request_id.js');
var cacheKey = require('./middlewares/common/routerCache.js');
var login = require('./middlewares/common/login.js');
var filterUri = require('./middlewares/common/filter_uri.js');
var checkToken = require('./middlewares/common/check_token.js');
var cache = require('./db/redis.js').cache;
var bodyParser = require('koa-bodyparser');
var jwt = require('koa-jwt');
var cors = require('kcors');
var exec = require('child_process').exec;
var util = require('util');


require('./init/init.js')().then(function () {
	logger.info('[init] db sync success');
}, function (err) {
	logger.error('[init] error', err);
});


app.use(cors());
app.use(requestId());
app.use(errorHandle);
app.use(bodyParser());
app.use(filterUri());
app.use(checkSign);
app.use(login());
app.use(jwt({secret: config.secret, key: 'token', passthrough: true}));
app.use(checkToken());
app.use(cacheKey(cache));
app.use(router(app));
routes(app);

module.exports = app;

function start() {
	var port = +config.port;
	var idx = +(process.argv[2] || 0);
	var currentPort = port + idx;
	http.createServer(app.callback()).listen(currentPort);
	logger.info('[start][process: %s][god bless kacayixia  by koa...!!!]', process.pid);
	logger.info('[start][process: %s][kacayixia on port %s]', process.pid, currentPort);
	var bindCommand = 'taskset -pc %s %s';
	var bindCpu = util.format(bindCommand, idx, process.pid);
	logger.info('[start][bindCpu: %s][command]', bindCpu);

	exec(bindCpu, function (err, stdout, stderr) {
		stdout = stdout.replace(/[\n]/ig, ',');
		logger.info('[start][taskset][process: %s][stdout: %s][stderr: %s]', process.pid, stdout, stderr || 'success');
	});
}
start();



/**
 * common 模块
 * 用于存放全局公用的代码
 */

define([
    'domReady',
    'nprogress'
], function (domReady, NProgress) {

    // 炫酷的加载条
    $(document).ready(function () {
        NProgress.start();
    });
    domReady(function () {
        NProgress.done();
    });

});

/**
 * requirejs 配置文件
 */
define(function () {

    // 配置模块路径
    require.config({
        baseUrl: '.',
        paths: {
            domReady: 'lib/requirejs-domReady/2.0.1/domReady',
            nprogress: 'lib/nprogress/0.2.0/nprogress',
            magnific: 'lib/magnific-popup/1.1.0/jquery.magnific-popup',
            dropzone: 'lib/dropzone/4.3.0/dropzone-amd-module',
            common: 'app/common/common'
        }
    });

    // 载入公共模块
    require(['common']);

    return require;

});

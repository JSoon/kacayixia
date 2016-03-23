/**
 * requirejs 配置文件
 */
define(function () {
    return require.config({
        baseUrl: './',
        paths: {
            magnific: 'lib/magnific-popup/1.1.0/jquery.magnific-popup',
            dropzone: 'lib/dropzone/4.3.0/dropzone-amd-module'
        }
    });
});

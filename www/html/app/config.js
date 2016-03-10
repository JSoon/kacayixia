/**
 * requirejs 配置文件
 */
define(function () {
  return require.config({
    baseUrl: './',
    paths: {
      magnific: 'lib/magnific-popup/1.0.0/jquery.magnific-popup',
      dropzone: 'lib/dropzone/4.0.1/dropzone-amd-module'
    }
  });
});
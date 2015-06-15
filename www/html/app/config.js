/**
 * requirejs 配置文件
 */
define(function () {
  return require.config({
    baseUrl: './',
    paths: {
      jquery: 'lib/jquery/2.1.4/jquery'
    }
  });
});
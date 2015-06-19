/*
 * sign in
 */

define(function () {

  // 登录
  var form = $('.sign-in-form'),
      loading = $('.sign-in-loading'),
      t;
  $('.JS_submit').on('click', function (e) {
    e.preventDefault();
    form.addClass('animated fadeOutDown');
    loading.fadeIn().children('li').addClass('animated fadeInUp');
  });

});
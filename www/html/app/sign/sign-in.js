/*
 * sign in
 */

define(function () {

    // 登录
    var form = $('.J_SignInForm'),
        loading = $('.J_SignInLoading');
    $('.J_Submit').on('click', function (e) {
        e.preventDefault();
        setTimeout(function () {
            form.addClass('animated fadeOutDown');
            loading.fadeIn().children('li:not(".loading")').addClass('animated fadeInUp');
        }, 500);
    });

});

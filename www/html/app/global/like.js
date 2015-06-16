/**
 * like 模块
 * 用于照片的点赞功能
 */

define(['jquery'], function ($) {

  $('.JS_like').on('click', function (e) {
    e.preventDefault();
    var heart = $(this).children('i');
    // 若未点赞，则加赞
    if (heart.hasClass('fi-heart-empty')) {
      heart.attr('class', 'fi-heart-full');
    }
    // 若已点赞，则取消赞
    else if (heart.hasClass('fi-heart-full')) {
      heart.attr('class', 'fi-heart-empty');
    }
  });

});
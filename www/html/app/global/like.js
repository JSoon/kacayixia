/**
 * like 模块
 * 用于照片的点赞功能
 */

define(['jquery'], function ($) {

  $('.JS_like').on('click', function (e) {
    e.preventDefault();
    var heart = $(this).children('i');
    // 若未点赞，则加赞
    if (heart.hasClass('fi-heart-empty-1')) {
      heart.attr('class', 'fi-heart-1');
    }
    // 若已点赞，则取消赞
    else if (heart.hasClass('fi-heart-1')) {
      heart.attr('class', 'fi-heart-empty-1');
    }
  });

});
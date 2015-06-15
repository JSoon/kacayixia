/**
 * like 模块
 * 用于照片的点赞功能
 */

define(['jquery'], function ($) {

  $('.JS_like').on('click', function (e) {
    e.preventDefault();
    var heart = $(this).children('i');
    // 若未点赞，则加赞
    if (heart.hasClass('sj-heart-empty')) {
      heart.attr('class', 'sj sj-heart-full');
    }
    // 若已点赞，则取消赞
    else if (heart.hasClass('sj-heart-full')) {
      heart.attr('class', 'sj sj-heart-empty');
    }
  });

});
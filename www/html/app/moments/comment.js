/**
 * comment 模块
 * 用于照片的评论功能
 */

define(function () {

  // 回复
  $('.JS_reply').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var replyForm = $(this).parent().next('.comment-reply');
    replyForm.on('click', function (e) {
      e.stopPropagation();
    });
    replyForm.show();
    replyForm.find('input').focus(); // auto focus after form shown
    $('body').one('click', function () {
      replyForm.hide();
    });
  });

});
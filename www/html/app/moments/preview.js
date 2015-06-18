/**
 * preview 模块
 * 用于照片的预览功能
 */

define([
  'magnific'
], function () {

  // 照片预览
  $('.JS_photo_preview').magnificPopup({
    type: 'image',
    closeBtnInside: false,
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

});
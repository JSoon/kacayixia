/**
 * my upload
 */

define([
  'dropzone'
], function () {

  // 照片上传
  $('#JS_photo_upload').dropzone({
    url: '/action',
    method: 'post',
    maxFilesize: 2, // MB
    accept: function (file, done) {
      if (file.name == "justinbieber.jpg") {
        done("Naha, you don't.");
      }
      else {
        done('upload');
      }
    }
  });

});
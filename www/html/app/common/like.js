/**
 * like 模块
 * 用于照片的点赞功能
 */

define(function() {

    $('.J_Like').on('click', function(e) {
        e.preventDefault();
        var heart = $(this);
        // 若未点赞，则加赞
        if (heart.hasClass('sj-heart-o')) {
            heart.removeClass('sj-heart-o');
            heart.addClass('sj-heart');
        }
        // 若已点赞，则取消赞
        else if (heart.hasClass('sj-heart')) {
            heart.removeClass('sj-heart');
            heart.addClass('sj-heart-o');
        }
    });

});

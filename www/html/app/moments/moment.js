/**
 * moment details
 */

define([
    'bootstrapPopup',
    'app/common/like',
    'app/moments/comment',
    'app/moments/preview'
], function() {

    $('#J_Dl480p').click(function() {
        $.bs.popup.confirm({
            title: 'title',
            info: 'Hello toast'
        });
    });

});

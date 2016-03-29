/**
 * check 模块
 * 用于美化表单中的 checkbox 和 radio
 */

define(function() {

    $('.J_Radio').click(function(e) {
        e.preventDefault();
        var input = $(this).find('input'),
            shift = $(this).find('.sj');
        input.prop('checked', true);
        // 初始化相邻元素的状态
        $(this).siblings('.J_Radio').find('.sj').attr('class', 'sj sj-unchecked');
        // 若未选中，则选中
        if (shift.hasClass('sj-unchecked')) {
            shift.removeClass('sj-unchecked');
            shift.addClass('sj-radio-checked');
        }
        // 若已选中，则取消选中
        else if (shift.hasClass('sj-radio-checked')) {
            shift.removeClass('sj-radio-checked');
            shift.addClass('sj-unchecked');
        }
    });

});

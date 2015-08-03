$(function() {
    $(':input[name = all-check]').on('click', function() {
        var checked = $(this).prop('checked');
        $(':input[name=add_goods_tobuy_choose_0]').prop('checked', checked);
    });
    $(':input[name = add_goods_tobuy_choose_0]').on('click', function() {
        var allChecked = $(":input[name=add_goods_tobuy_choose_0]:checked").length === $('input[name=add_goods_tobuy_choose_0]').length;
        $(":input[name=all-check]").prop("checked", allChecked);
    });
});
$(function() {
    $(':input[class = changes]').on('click', function() {
        var changes = $(this).prop('value');
        var number = $(':input[class = cart_goods_count]').prop('value')*1;
        if (changes === '-') {
            number = number - 1;
        }
        if (changes === '+') {
            number = number + 1;
        }
        if (number<=0) {
            number=1;
        }
        $(':input[class = cart_goods_count]').prop('value', number);
    });
});

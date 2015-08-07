$(':input[name = all-check]').on('click', function() {
    var checked = $(this).prop('checked');
    $(':input[name=add_goods_tobuy_choose_0]').prop('checked', checked);
});

$(':input[name = add_goods_tobuy_choose_0]').on('click', function() {
    var allChecked = $(":input[name=add_goods_tobuy_choose_0]:checked").length === $('input[name=add_goods_tobuy_choose_0]').length;
    $(":input[name=all-check]").prop("checked", allChecked);
});

$(':input[class = changes]').on('click', function() {
    var changes = $(this).prop('value');
    var number = $(':input[class = cart-goods-count]').prop('value')*1;
    if (changes === '-') {
        number = number - 1;
    }
    if (changes === '+') {
        number = number + 1;
    }
    if (number<=0) {
        number=1;
    }
    $(':input[class = cart-goods-count]').prop('value', number);
    var price = $(':input[class=price]').prop('value');
    var subtotal = price *number;
    $(':input[class = subtotal]').prop('value', subtotal);
    $(':input[class = total]').prop('value', subtotal);
});


$(':input[class=cart_goods_count]').on('input propertychange',function() {
    var price = $(':input[class=price]').prop('value');
    var number = $(':input[class=cart_goods_count]').prop('value');
    if (number<=0) {
        number=1;
    }
    $(':input[class = cart_goods_count]').prop('value', number);
    var subtotal = price * number;
    $(':input[class = subtotal]').prop('value', subtotal);
    $(':input[class = total]').prop('value', subtotal);
});


$("#cart_goods_count").on("keydown", function(evt) {
    var NUM1 = 57;
    var NUM2 = 48;
    var NUM3 = 8;
    var NUM4 = 46;
    var NUM5 = 9;
    var NUM6 = 37;
    var NUM7 = 39;

    if(!(evt.keyCode <= NUM1 && evt.keyCode >= NUM2
        || evt.keyCode === NUM3 || evt.keyCode === NUM4
        || evt.keyCode === NUM5 || evt.keyCode === NUM6
        || evt.keyCode === NUM7)) {
        evt.preventDefault();
    }
});

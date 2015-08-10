$(function() {
    $('.continue_cart').on('click',function() {
        $(location).attr('href','/')
    })
    $('.buy_now').on('click',function() {
        $(location).attr('href','/pay')
    })
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
        var number = parseInt($("." + $(this).prop("id")).prop('value'));
        console.log(number);
        if (changes === '-') {
            number = number - 1;
        }
        if (changes === '+') {
            number = number + 1;
        }
        if (number<=0) {
            number=1;
        }
        $("." + $(this).prop("id")).prop('value',number);
        price = $(':input[id=' + $(this).prop("id") + ']').prop('value');
        var subtotal = price * number;
        $('#' + $(this).prop("id") + '.subtotal').prop('value', subtotal);
    });
})

    $(':input[class=cart_goods_count]').on('input propertychange',function() {
        var price = $('#' + $(this).prop("id") + '.price').prop('value');
        console.log(price);
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

$(function() {
   $('.cart_goods_delete').on('click', function(evt) {
       var id = evt.toElement.id;
       console.log(id);
       $.ajax({
           url: '/delete-goods',
           type: 'delete',
           data: {
               id: id
           }, success : function(data) {
               if(data.data === 'ok') {
                   window.location.href=window.location.href;
               }
           }
       });
   });
});

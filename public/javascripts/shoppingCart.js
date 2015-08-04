$(function() {
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
});

var print = function() {
    $.get('/shopping-cart', function(shopping) {
        $('.shopping_cart_goods').empty();
        shopping.forEach(function(val) {
            $('<ul class="buycart_content cart_goods" goods_id="24124" id="cart_goods">'
                    +'<li class="buycart_content_table1">'
                        +'<input type="checkbox" class="add_goods_tobuy_choose_0" name="add_goods_tobuy_choose_0" id="add_goods_tobuy_24124">'
                    +'</li>'
                    +'<li class="buycart_content_table2">'
                        +'<a href="/product-details">'
                            +'<img src="./images/goods-detail-picture/ym2.jpg" >'
                        +'</a>'
                    +'</li>'
                    +'<li class="buycart_content_table3">'
                        +'<a href="/product-details">'
                            +'<input class="goods_name" type="text" name="name" value="'+ val.goodsName +'" readonly>'
                        +'</a>'
                    +'</li>'
                    +'<li class="buycart_content_table4">'
                        +'￥<input class="price" type="text" name="price" value="'+ val.goodsPrice +'" readonly>'
                    +'</li>'
                    +'<li class="buycart_content_table5">'
                        +'<input class="changes" type="button" name="add" value="-">'
                        +'<input id="cart_goods_count" class="cart_goods_count" name="number" type="text" value="'+ val.goodsNumber +'">'
                        +'<input class="changes" type="button" name="reduction" value="+">'
                    +'</li>'
                    +'<li class="buycart_content_table6">'
                        +'￥<input class="subtotal" type="test" name="name" value="'+(val.goodsPrice) * (val.goodsNumber)+'" readonly>'
                    +'</li>'
                    +'<li class="buycart_content_table7">'
                        +'<a class="cart_goods_delete">删除</a>'
                    +'</li>'
                +'</ul>'
            ).appendTo($('.shopping_cart_goods'));
        });
    });
};
print();

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

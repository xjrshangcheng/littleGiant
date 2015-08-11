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
        changeCount.call(this);
    });

    $('.cart_goods_delete').on('click', function(event) {
        deleteCurrentGoods.call(this, event);
    });

    $('.cart-goods-count').on('input propertychange', function() {
        changeSubtotal.call(this);
    });

    $("#cart_goods_count").on("keydown", function(event) {
        preventInvalidKeyDown(event);
    });
});

function changeSubtotal() {
    $(':input[data-id=' + $(this).data('id') + '].cart-goods-count').prop('value');
    var price = $(':input[data-id=' + $(this).data('id') + '].price').prop('value');
    var number = $(':input[data-id=' + $(this).data('id') + '].cart-goods-count').prop('value');
    if (number <= 0) {
        number = 1;
        $(':input[data-id=' + $(this).data('id') + '].cart-goods-count').prop('value', number);
    }
    var subtotal = price * number;
    $(':input[data-id=' + $(this).data('id') + '].subtotal').prop('value', subtotal);
}

function preventInvalidKeyDown(event) {
    var NUM1 = 57;
    var NUM2 = 48;
    var NUM3 = 8;
    var NUM4 = 46;
    var NUM5 = 9;
    var NUM6 = 37;
    var NUM7 = 39;

    if (!(event.keyCode <= NUM1 && event.keyCode >= NUM2 || event.keyCode === NUM3 || event.keyCode === NUM4 || event.keyCode === NUM5 || event.keyCode === NUM6 || event.keyCode === NUM7)) {
        event.preventDefault();
    }
}

function deleteCurrentGoods(event) {
    var $current = $(this);
    if (confirm("你确信要删除此条数据吗？")) {
        var id = event.toElement.id;

        $.ajax({
            url: '/delete-goods',
            type: 'delete',
            data: {
                id: id
            },
            success: function () {
                $current.closest('ul.cart-content').remove();
            }
        });
    }
}

function changeCount() {
    var changes = $(this).prop('value');
    var number = parseInt($(':input[data-id=' + $(this).data('id') + '].cart-goods-count').prop('value'));
    if (changes === '-') {
        number = number - 1;
    }
    if (changes === '+') {
        number = number + 1;
    }
    if (number <= 0) {
        number = 1;
    }
    $(':input[data-id=' + $(this).data('id') + '].cart-goods-count').prop('value', number);
    var price = $(':input[data-id=' + $(this).data('id') + '].price').prop('value');
    var subtotal = price * number;
    console.log(subtotal);
    $(':input[data-id=' + $(this).data('id') + '].subtotal').prop('value', subtotal);
}

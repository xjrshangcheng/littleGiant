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
        total();
    });

    $('.cart_goods_delete').on('click', function(event) {
        deleteCurrentGoods.call(this, event);
    });

    $('.cart-goods-count').on('input propertychange', function() {
        changeSubtotal.call(this);
        total();
    });

    $(".cart-goods-count").on("keydown", function(event) {
        preventInvalidKeyDown(event);
    });

    $(':input[class = add-goods-tobuy-choose-0],input[class = my_all_check]').on('click', function() {
        total();
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
    var ASCIININE = 57;
    var ASCIIZERO = 48;
    var ASCIIBACKSPACE = 8;
    var ASCIIPIONT = 46;
    var ASCIITAB = 9;
    var ASCIIPRECENT = 37;
    var ASCIIUPPIONT = 39;

    if (!(event.keyCode <= ASCIININE && event.keyCode >= ASCIIZERO || event.keyCode === ASCIIBACKSPACE || event.keyCode === ASCIIPIONT || event.keyCode === ASCIITAB || event.keyCode === ASCIIPRECENT || event.keyCode === ASCIIUPPIONT)) {
        event.preventDefault();
    }
}

function deleteCurrentGoods(event) {
    var $current = $(this);
    if (confirm("你确信要删除此条数据吗？")) {
        var id = event.toElement.id;

        $.ajax({
            url: '/',
            type: 'delete',
            data: {
                id: id
            },
            success: function () {
                $current.closest('ul.cart-content').remove();
                total();
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
    $(':input[data-id=' + $(this).data('id') + '].subtotal').prop('value', subtotal);
}

function total() {
    var number = 0;
    var n = $('.add-goods-tobuy-choose-0').length;
    for (var i = 0; i < n; i++) {
        if ($('.add-goods-tobuy-choose-0')[i].checked === true) {
            id = $($('.add-goods-tobuy-choose-0')[i]).data('id');
            number += $('input[data-id=' + id + '].subtotal').prop('value')*1;
        }
    }
     $('.total').prop('value', number);
}

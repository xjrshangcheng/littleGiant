$(function() {
    $(' #status').on('click', function() {
        statusChange.call(this, event);
    });

    $(' #delete').on('click', function() {
        orderDelete.call(this, event);
    });
});

function statusChange(event) {
    var $current = $(this);
    var id = $(this).data('id');
    $('#goods').on('click', function() {
        $.post("/order/alterStatus", {
            id: id
        }, function() {
            $('div[data-id=' + id + '].trading').html('交易成功');
            $('div[data-id=' + id + '].confirm').html('已确认收货');
        });
    })
}

function orderDelete(event) {
    var $current = $(this);
    var id = $(this).data('id');
    $('#deleteit').on('click', function() {
        $.post("/order/delete", {
            id: id
        }, function() {
            $current.closest('tbody').remove();
        });
    })
}

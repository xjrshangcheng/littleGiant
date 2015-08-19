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
    var id = $(this).prop('class');
    if (confirm("已经确定收货了吗?")) {
        $.post("/order/alterStatus", {
            id: id
        }, function() {
            $(' #trading.' + id + '').html('交易完成');
            $(' #confirm.' +id).html('已确认收货');
        });
    }
}

function orderDelete(event) {
    var $current = $(this);
    var id = $(this).prop('class');
    if (confirm("你确信要删除此条数据吗？")) {
        $.post("/order/delete", {
            id: id
        }, function() {
            $current.closest('tbody').remove();
        });
    }
}

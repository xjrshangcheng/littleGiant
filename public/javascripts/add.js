
$("#add_to_cart").on("click", function() {
    var id = $("#goods-code").html();
    var username = Cookie.getCookie('name');
    var number = parseInt($("#goods-number-input").prop("value")) === 0 ? 1 : $("#goods-number-input").prop("value");
    var name = $(".buy-content-text-a1").html();
    var price = $("#sales-price").html();
    var cookieName = Cookie.getCookie('name');
    var select = $("input[name='approve']:checked").val();

    if (cookieName === null) {
        $(location).attr('href', '/login');
    } else {
        $.post("/add", {
            id: id,
            username: username,
            number: number,
            name: name,
            price: price,
            select: select
        }, function(data) {
            if (data.message === "success") {
                alert("添加购物车成功");
            } else {
                alert("添加数据失败");
            }
        })
    }
})

$("#goods_number_minus").on("click", function() {
    var number = $("#goods-number-input")[0].value;

    if (number <= 2) {
        $("#goods-number-input")[0].value = 1;
    } else {
        $("#goods-number-input")[0].value = number - 1;
    }
})

$("#goods_number_plus").on("click", function() {
    var number = $("#goods-number-input")[0].value;

    $("#goods-number-input")[0].value = parseInt(number) + 1;
})

$("#goods-number-input").on("keydown", function(evt) {
    var NUM1 = 57;
    var NUM2 = 48;
    var NUM3 = 8;
    var NUM4 = 46;
    var NUM5 = 9;
    var NUM6 = 37;
    var NUM7 = 39;

    if (!(evt.keyCode <= NUM1 && evt.keyCode >= NUM2 || evt.keyCode === NUM3 || evt.keyCode === NUM4 || evt.keyCode === NUM5 || evt.keyCode === NUM6 || evt.keyCode === NUM7)) {
        evt.preventDefault();
    }
});


$(".picture").on('mousemove', function() {
    var src = this.src;
    $(".big-picture").prop("src", src);
});

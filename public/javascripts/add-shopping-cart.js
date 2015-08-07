function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

$("#add_to_cart").on("click", function() {
    var id = $("#goods_code").html();
    var username = getCookie('name');
    var number = $("#goods_number_input").prop("value");
    var name = $(".buy_content_text_a1").html();
    var price = $("#sales_price").html();
    var cookieName = getCookie('name');

    if(cookieName === null) {
        $(location).attr('href','/login');
    } else {
        $.post("/add-user-shopping-cart", {
            id : id,
            username : username,
            number : number,
            name : name,
            price : price
        }, function(data) {
            if(data.message === "success") {
                alert("添加购物车成功");
            } else {
                alert("添加数据失败");
            }
        })
    }
})


$("#goods_number_minus").on("click",function() {
    var number = $("#goods_number_input")[0].value;

    if (number <=2) {
        $("#goods_number_input")[0].value = 1;
    } else {
        $("#goods_number_input")[0].value = number - 1;
    }
})

$("#goods_number_plus").on("click",function() {
    var number = $("#goods_number_input")[0].value;

    $("#goods_number_input")[0].value = parseInt(number) + 1;
})

$("#goods_number_input").on("keydown", function(evt) {
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

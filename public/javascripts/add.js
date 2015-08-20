
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
                $("#add_to_cart").popover('show');
                window.setTimeout(function() { $("#add_to_cart").popover('destroy') }, 2000);
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
    var ASCIININE = 57;
    var ASCIIZERO = 48;
    var ASCIIBACKSPACE = 8;
    var ASCIIPIONT = 46;
    var ASCIITAB = 9;
    var ASCIIPRECENT = 37;
    var ASCIIUPPIONT = 39;

    if (!(evt.keyCode <= ASCIININE && evt.keyCode >= ASCIIZERO || evt.keyCode === ASCIIBACKSPACE || evt.keyCode === ASCIIPIONT || evt.keyCode === ASCIITAB || evt.keyCode === ASCIIPRECENT || evt.keyCode === ASCIIUPPIONT)) {
        evt.preventDefault();
    }
});


$(".picture").on('mousemove', function() {
    var src = this.src;
    $(".big-picture").prop("src", src);
});

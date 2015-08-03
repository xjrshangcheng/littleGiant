var initTable = function(data) {
    $('#cart_goods').empty();
    $(function() {
        [].forEach.call(data, function(val) {
            $("<p>" + val.id + "</p>").appendTo("#cart_goods");
        })
    })
}

var displayInfo = function() {
    $.get("/shopping_cart", {}, function(data) {
        if(data.status === 200) {
            initTable(data.data);
        }
    });
}

$(function() {

    $("#add_to_cart").on("click",function(event) {
        var googdsId = parseInt($('#goods_code').html());
        var goodsNumber = parseInt($('#goods_number_input')[0].value);

        console.log("ssssssss");
        displayInfo();
        window.open('http://localhost:3000/shoppingCart');
    })
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
    var ASCLL_57 = 57;
    var ASCLL_48 = 48;
    var ASCLL_8 = 8;
    var ASCLL_46 = 46;
    var ASCLL_9 = 9;
    var ASCLL_37 = 37;
    var ASCLL_39 = 39;

    if(!(evt.keyCode <= ASCLL_57 && evt.keyCode >= ASCLL_48
        || evt.keyCode === ASCLL_8 || evt.keyCode === ASCLL_46
        || evt.keyCode === ASCLL_9 || evt.keyCode === ASCLL_37
        || evt.keyCode === ASCLL_39)) {
        evt.preventDefault();
    }
});

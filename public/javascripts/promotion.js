$(".promotion-label").on('click',function(event) {
    var promotionId = $(this).data("id");

    $.get("/promotion/" + promotionId, {
        id: promotionId
    }, function(data) {
        if (data.status === 200) {
            init(data);
        } else {
            alert("添加数据失败");
        }
    })
})

var init = function(data) {
    $('.promotion-box').empty();
    var promotions = data.data;
    console.log(promotions);
    for(var i = 0; i < promotions.length; i ++) {
        $(  "<div class='product'>" +
                "<div class='product-wrap'>" +
                    "<div class='product-img-wrap'>" +
                        "<a href='/goods?id=" + promotions[i].id + "'"+ "class='product-img'" +">" +
                            '<img src=' + promotions[i].img +">" +
                        "</a>" +
                    "</div>" +
                    "<div class='product-img-price'>" +
                        "<em>" +
                            "<b>￥</b>" + promotions[i].price +
                        "</em>" +
                    "</div>" +
                    "<div class='product-title'>" +
                        "<a href='/goods?id=" + promotions[i].id + "'"+ "class='product-title'" +">" + promotions[i].info +
                        "</a>" +
                    "</div>" +
                "</div>" +
            "</div>").appendTo(".promotion-box");
    }
}
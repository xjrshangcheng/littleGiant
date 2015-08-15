var infoLength = 25;
$(".info-div").each(function(index, element) {
    if (element.innerHTML.length > infoLength) {
        $(element).addClass("ellipsis");
    }
});

buttonStyle();

function buttonStyle() {
    $("#previous-page").unbind("click");
    $("#previous-page.active").on("click", function() {
        $.get("/category/previousPage", function(data) {
            nowPage: $("#now-page").html(data.nowPage);
            $("#body").html("");
            data.data.forEach(function(n) {
                $("#body").prepend("<div class='col-md-3 info-margin-bottom'><div class='clearfix'><a href='/goods?id='" + n.id + "><img height='224px' src=" + n.img + " class='col-md-12 text-center img-cursor'></a></div><div class='col-md-12'><div class='pull-left col-md-6 text-center border'>$" + n.price + "</div><div class='pull-right col-md-6 text-center border'>销量：" + n.sales + "</div><a href='/goods?id=" + n.id + "'><div class='col-md-12 border info-div text-cursor'>" + n.info + "</div></a></div></div>");
            });
            buttonStyle();
        });
    });

    $("#next-page").unbind("click");
    $("#next-page.active").on("click", function() {
        $.get("/category/nextPage", function(data) {
            nowPage: $("#now-page").html(data.nowPage);
            $("#body").html("");
            data.data.forEach(function(n) {
                $("#body").prepend("<div class='col-md-3 info-margin-bottom'><div class='clearfix'><a href='/goods?id='" + n.id + "><img height='224px' src=" + n.img + " class='col-md-12 text-center img-cursor'></a></div><div class='col-md-12'><div class='pull-left col-md-6 text-center border'>$" + n.price + "</div><div class='pull-right col-md-6 text-center border'>销量：" + n.sales + "</div><a href='/goods?id=" + n.id + "'><div class='col-md-12 border info-div text-cursor'>" + n.info + "</div></a></div></div>");
            });
            buttonStyle();
        });
    });

    if ($("#now-page").html() == 1) {
        $("#previous-page").removeClass("active").addClass("disabled").unbind("click");
    } else {
        $("#previous-page").removeClass("disabled").addClass("active");
        $("#previous-page").unbind("click");
        $("#previous-page.active").on("click", function() {
            $.get("/category/previousPage", function(data) {
                nowPage: $("#now-page").html(data.nowPage);
                $("#body").html("");
                data.data.forEach(function(n) {
                    $("#body").prepend("<div class='col-md-3 info-margin-bottom'><div class='clearfix'><a href='/goods?id='" + n.id + "><img height='224px' src=" + n.img + " class='col-md-12 text-center img-cursor'></a></div><div class='col-md-12'><div class='pull-left col-md-6 text-center border'>$" + n.price + "</div><div class='pull-right col-md-6 text-center border'>销量：" + n.sales + "</div><a href='/goods?id=" + n.id + "'><div class='col-md-12 border info-div text-cursor'>" + n.info + "</div></a></div></div>");
                });
                buttonStyle();
            });
        });
    }

    if ($("#now-page").html() === $("#sum-page").html()) {
        $("#next-page").removeClass("active").addClass("disabled").unbind("click");
    } else {
        $("#next-page").removeClass("disabled").addClass("active");
        $("#next-page").unbind("click");
        $("#next-page.active").on("click", function() {
            $.get("/category/nextPage", function(data) {
                nowPage: $("#now-page").html(data.nowPage);
                $("#body").html("");
                data.data.forEach(function(n) {
                    $("#body").prepend("<div class='col-md-3 info-margin-bottom'><div class='clearfix'><a href='/goods?id='" + n.id + "><img height='224px' src=" + n.img + " class='col-md-12 text-center img-cursor'></a></div><div class='col-md-12'><div class='pull-left col-md-6 text-center border'>$" + n.price + "</div><div class='pull-right col-md-6 text-center border'>销量：" + n.sales + "</div><a href='/goods?id=" + n.id + "'><div class='col-md-12 border info-div text-cursor'>" + n.info + "</div></a></div></div>");
                });
                buttonStyle();
            });
        });
    }
}

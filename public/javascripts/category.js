var infoLength = 25;
$(".info-div").each(function(index, element) {
    if (element.innerHTML.length > infoLength) {
        $(element).addClass("ellipsis");
    }
});

if($("#body").html() === "此类无商品") {
    $("#top-page-turning").hide();
    $("#bottom-page-turning").hide();
}

buttonStyle();

function getPreviousPage(nowPage) {
    $.get("/category/previousPage", {nowPage: nowPage}, function(data) {
        $("#now-page").html(data.nowPage);
        $("#body").html("");
        data.data.forEach(function(n) {
            $("#body").prepend("<div class='col-md-3 info-margin-bottom'><div class='clearfix'><a href='/goods?id='" + n.id + "><img height='224px' src=" + n.img + " class='col-md-12 text-center img-cursor'></a></div><div class='col-md-12'><div class='pull-left col-md-6 text-center border'>$" + n.price + "</div><div class='pull-right col-md-6 text-center border'>销量：" + n.sales + "</div><a href='/goods?id=" + n.id + "'><div class='col-md-12 border info-div text-cursor'>" + n.info + "</div></a></div></div>");
        });
        buttonStyle();
    });
}

function getNextPage(nowPage) {
    $.get("/category/nextPage", {nowPage: nowPage}, function(data) {
        $("#now-page").html(data.nowPage);
        $("#body").html("");
        data.data.forEach(function(n) {
            $("#body").prepend("<div class='col-md-3 info-margin-bottom'><div class='clearfix'><a href='/goods?id='" + n.id + "><img height='224px' src=" + n.img + " class='col-md-12 text-center img-cursor'></a></div><div class='col-md-12'><div class='pull-left col-md-6 text-center border'>$" + n.price + "</div><div class='pull-right col-md-6 text-center border'>销量：" + n.sales + "</div><a href='/goods?id=" + n.id + "'><div class='col-md-12 border info-div text-cursor'>" + n.info + "</div></a></div></div>");
        });
        buttonStyle();
    });
}

function buttonStyle() {
    $("#top-previous-page").unbind("click");
    $("#bottom-previous-page").unbind("click");
    $("#top-previous-page.active").on("click", function() {
        getPreviousPage($("#now-page").html());
    });
    $("#bottom-previous-page.active").on("click", function() {
        getPreviousPage($("#now-page").html());
    })

    $("#top-next-page").unbind("click");
    $("#bottom-next-page").unbind("click");
    $("#top-next-page.active").on("click", function() {
        getNextPage($("#now-page").html());
    });
    $("#bottom-next-page.active").on("click", function() {
        getNextPage($("#now-page").html());
    })

    if ($("#now-page").html() == 1) {
        $("#top-previous-page").removeClass("active").addClass("disabled").unbind("click");
        $("#bottom-previous-page").removeClass("active").addClass("disabled").unbind("click");
    } else {
        $("#top-previous-page").removeClass("disabled").addClass("active");
        $("#bottom-previous-page").removeClass("disabled").addClass("active");
        $("#top-previous-page").unbind("click");
        $("#bottom-previous-page").unbind("click");
        $("#top-previous-page.active").on("click", function() {
            getPreviousPage($("#now-page").html());
        });
        $("#bottom-previous-page.active").on("click", function() {
            getPreviousPage($("#now-page").html());
        })
    }

    if ($("#now-page").html() === $("#sum-page").html()) {
        $("#top-next-page").removeClass("active").addClass("disabled").unbind("click");
        $("#bottom-next-page").removeClass("active").addClass("disabled").unbind("click");
    } else {
        $("#top-next-page").removeClass("disabled").addClass("active");
        $("#bottom-next-page").removeClass("disabled").addClass("active");
        $("#top-next-page").unbind("click");
        $("#bottom-next-page").unbind("click");
        $("#top-next-page.active").on("click", function() {
            getNextPage($("#now-page").html());
        });
        $("#bottom-next-page.active").on("click", function() {
            getNextPage($("#now-page").html());
        })
    }
    $(".number-page").each(function(i, n) {
        $(".number-page").each(function(i, n) {
            if($(n).html() == $("#now-page").html()) {
                $(n).addClass("font-color");
            }else{
                $(n).removeClass("font-color");
            }
        })
    });
}

var aString = "";
for(var i = 0; i < parseInt($("#sum-page").html()); i++) {
    aString += "<a class='btn btn-defaults color-font number-page'>"+(i+1)+"<a>";
}
$("#numberPageDown").html(aString);

$(".number-page").on("click", function() {
    getNextPage($(this).html()-1);
});
$(".number-page").each(function(i, n) {
    if($(n).html() == $("#now-page").html()) {
        $(n).addClass("font-color");
    }else{
        $(n).removeClass("font-color");
    }
})

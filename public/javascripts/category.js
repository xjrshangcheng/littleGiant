var infoLength = 25;
$(".info-div").each(function(index, element) {
    if (element.innerHTML.length > infoLength) {
        $(element).addClass("ellipsis");
    }
});

if ($("#body").html() === "此类无商品") {
    $(".page-turning").hide();
}

topButtonStyleClick();
bottomAStyleClick();

function getPage(path, currentPage) {
    $.get("/category/"+path, {
        currentPage: currentPage
    }, function(data) {
        $("#current-page").html(data.currentPage);
        $("#body").html("");
        data.data.forEach(function(n) {
            $("#body").prepend("<div class='col-md-3 info-margin-bottom'><div class='clearfix'><a href='/goods?id='" + n.id + "><img height='224px' src=" + n.img + " class='col-md-12 text-center img-cursor'></a></div><div class='col-md-12'><div class='pull-left col-md-6 text-center border'>$" + n.price + "</div><div class='pull-right col-md-6 text-center border'>销量：" + n.sales + "</div><a href='/goods?id=" + n.id + "'><div class='col-md-12 border info-div text-cursor'>" + n.info + "</div></a></div></div>");
        });
        topButtonStyleClick();
        bottomAStyleClick();
    });
}

function topButtonStyleClick() {
    $(".previous-page").unbind("click");
    $(".previous-page.active").on("click", function() {
        getPage("previousPage", $("#current-page").html());
    })

    $(".next-page").unbind("click");
    $(".next-page.active").on("click", function() {
        getPage("nextPage", $("#current-page").html());
    })

    if ($("#current-page").html() == 1) {
        $(".previous-page").removeClass("active").addClass("disabled").unbind("click");
    } else {
        $(".previous-page").removeClass("disabled").addClass("active");
        $(".previous-page").unbind("click");
        $(".previous-page.active").on("click", function() {
            getPage("previousPage", $("#current-page").html());
        })
    }

    if ($("#current-page").html() === $("#count-page").html()) {
        $(".next-page").removeClass("active").addClass("disabled").unbind("click");
    } else {
        $(".next-page").removeClass("disabled").addClass("active");
        $(".next-page").unbind("click");
        $(".next-page.active").on("click", function() {
            getPage("nextPage", $("#current-page").html());
        })
    }
}

function bottomAStyleClick() {
    var pageCount = parseInt($("#count-page").html());
    var currentPage = parseInt($("#current-page").html());
    var aString = "";

    if (pageCount < 8) {
        for (var i = 0; i < pageCount; i++) {
            aString += "<a class='btn btn-defaults color-font number-page'>" + (i + 1) + "</a>";
        }
    } else {
        if (currentPage < 6) {
            for (var i = 0; i < 7; i++) {
                aString += "<a class='btn btn-defaults color-font number-page'>" + (i + 1) + "</a>";
            }
            aString += "···";
        } else if (pageCount - currentPage < 4) {
            aString += "<a class='btn btn-defaults color-font number-page'>" + 1 + "</a>";
            aString += "<a class='btn btn-defaults color-font number-page'>" + 2 + "</a>";
            aString += "···";
            for (var i = pageCount - 5; i <= pageCount && i < pageCount; i++) {
                aString += "<a class='btn btn-defaults color-font number-page'>" + (i + 1) + "</a>";
            }
        } else {
            aString += "<a class='btn btn-defaults color-font number-page'>" + 1 + "</a>";
            aString += "<a class='btn btn-defaults color-font number-page'>" + 2 + "</a>";
            aString += "···";
            for (var i = currentPage - 2; i < currentPage + 3 && i < pageCount; i++) {
                aString += "<a class='btn btn-defaults color-font number-page'>" + (i + 1) + "</a>";
            }
            aString += "···";
        }
    }
    $("#numberPageDown").html(aString);

    $(".number-page").on("click", function() {
        getPage("nextPage", $(this).html() - 1);
    });

    $(".number-page").each(function(i, numberPage) {
        if ($(numberPage).html() == $("#current-page").html()) {
            $(numberPage).addClass("font-color");
        } else {
            $(numberPage).removeClass("font-color");
        }
    })
}

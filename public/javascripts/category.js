var infoLength = 25;
$(".info-div").each(function(index, element) {
    if (element.innerHTML.length > infoLength) {
        $(element).addClass("ellipsis");
    }
});

if ($("#body").html() === "此类无商品") {
    $(".paging").hide();
}

topButtonStyleClick();
bottomAStyleClick();

function getPage(path, currentPage) {
    $.get("/category/" + path, {
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

function clickToPage(className, url) {
    $(className).unbind("click");
    $(className + ".active").on("click", function() {
        getPage(url, $("#current-page").html());
    })
}

function buttonDisableOrActive(pageNumber, className, url) {
    if($("#current-page").html() == pageNumber) {
        $(className).removeClass("active").addClass("disabled").unbind("click");
    }else {
        $(className).removeClass("disabled").addClass("active");
        $(className).unbind("click");
        $(className + ".active").on("click", function() {
            getPage(url, $("#current-page").html());
        })
    }
}

function topButtonStyleClick() {
    clickToPage(".previous-page", "previousPage");
    clickToPage(".next-page", "nextPage");

    buttonDisableOrActive(1, ".previous-page", "previousPage");
    buttonDisableOrActive($("#count-page").html(), ".next-page", "nextPage");
}

function bottomAStyleClick() {
    var pageCount = parseInt($("#count-page").html());
    var currentPage = parseInt($("#current-page").html());

    $("#numberPageDown").html(pagination(pageCount, currentPage));

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

function pageCountLessThan8(pageCount) {
    var labelString = "";

    for (var i = 0; i < pageCount; i++) {
        labelString += "<a class='btn btn-defaults color-font number-page'>" + (i + 1) + "</a>";
    }
    return labelString;
}

function pageCountGreaterThan8AndCurrentPageLessThan6() {
    var labelString = "";

    for (var i = 0; i < 7; i++) {
        labelString += "<a class='btn btn-defaults color-font number-page'>" + (i + 1) + "</a>"
    }
    labelString += "···";

    return labelString;
}

function pageCountGreaterThan8AndCurrentPageIsLast4(pageCount) {
    var labelString = "";

    labelString += "<a class='btn btn-defaults color-font number-page'>1</a>";
    labelString += "<a class='btn btn-defaults color-font number-page'>2</a>";
    labelString += "···";
    for (var i = pageCount - 5; i <= pageCount && i < pageCount; i++) {
        labelString += "<a class='btn btn-defaults color-font number-page'>" + (i + 1) + "</a>";
    }

    return labelString;
}

function pageCountGreaterThan8AndCurrentPageIsMiddle(currentPage, pageCount) {
    var labelString = "";

    labelString += "<a class='btn btn-defaults color-font number-page'>1</a>";
    labelString += "<a class='btn btn-defaults color-font number-page'>2</a>";
    labelString += "···";
    for (var i = currentPage - 2; i < currentPage + 3 && i < pageCount; i++) {
        labelString += "<a class='btn btn-defaults color-font number-page'>" + (i + 1) + "</a>";
    }
    labelString += "···";

    return labelString;
}

function pagination(pageCount, currentPage) {
    if (pageCount < 8) {
        return pageCountLessThan8(pageCount);
    }

    if (currentPage < 6) {
        return pageCountGreaterThan8AndCurrentPageLessThan6();
    }

    if (pageCount - currentPage < 4) {
        return pageCountGreaterThan8AndCurrentPageIsLast4(pageCount);
    }

    return pageCountGreaterThan8AndCurrentPageIsMiddle(currentPage, pageCount);
}

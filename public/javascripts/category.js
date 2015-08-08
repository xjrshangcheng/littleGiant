var infoLength = 25;

$(".info-div").each(function(index, element) {
    if(element.innerHTML.length > infoLength) {
        $(element).addClass("ellipsis");
    }
});

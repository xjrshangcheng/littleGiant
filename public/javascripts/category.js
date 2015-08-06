$(".info-div").each(function(i, n) {
    if(n.innerHTML.length > 25) {
        $(n).addClass("ellipsis");
    }
})

$(".info-div").each(function(i, n) {
    console.log(n);
    if(n.innerHTML.length > 25) {
        $(n).addClass("ellipsis");
    }
})

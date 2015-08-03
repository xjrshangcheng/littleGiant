$(".info-div").each(function(i, n) {
    if(n.innerHTML.length > 25) {
        $(n).addClass("ellipsis");
    }
})

$.post("/categoryProdctInfo", function(result) {
    // DOTO
    console.log(result);
});

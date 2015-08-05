$(".info-div").each(function(i, n) {
    if(n.innerHTML.length > 25) {
        $(n).addClass("ellipsis");
    }
})

// $.post("/category-info", function(result) {
//     console.log(result);
// });

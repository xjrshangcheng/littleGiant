$(function() {
    // var id = location.href.split("=")[1];
    var id = 12;

    $.get("/goods" + id, {
        id : id
    }, function(data) {
        if(data.status === 400) {
            $(location).attr('href','/error');
        }
    })
})

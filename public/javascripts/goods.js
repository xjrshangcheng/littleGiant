$(function() {
    var id = location.href.split("=")[1];

    $.get("/goods" + id, {
        id: id
    }, function(data) {
        if (data.status === 400) {
            $(location).attr('href', '/error');
        }
    })
})

$.get('/goods' + id, {
    id: id
}, function(data) {
    console.log(data);
})

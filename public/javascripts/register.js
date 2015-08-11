$(function() {
    var url = $(location).attr('href');
    Cookie.setCookie('url',url);
    $('#reg-form').easyform();
})

function validation() {
    var inputName = $("#uid").val();
    $.get('/users', {
        inputName: inputName
    }, function(object) {
        if (object.message === 'user_false') {
            $("#uid").trigger("easyform-ajax", false);
        } else {
            $("#uid").trigger("easyform-ajax", true);
        }
    })
}

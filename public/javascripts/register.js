$(function() {
    $('#reg-form').easyform();
})

function validation() {
    var inputName = $("#uid").val();
    $.post('/name', {
        inputName: inputName
    }, function(object) {
        if (object.message === 'user_false') {
            $("#uid").trigger("easyform-ajax", false);
        } else {
            $("#uid").trigger("easyform-ajax", true);
        }
    })
}

var url = window.location.href;
Cookie.setCookie('url',url);

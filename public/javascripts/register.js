$(function() {
    var url = $(location).attr('href');

    Cookie.setCookie('url',url);
    $('form').submit(function (evt) {
        var inputValue = $('#psw1').val();
        var encryptedValue = hex_md5(inputValue);
        
        $('#psw1').prop('value',encryptedValue);
    });
    $('#reg-form').easyform().success = function() {
        $('#register').on('click', function() {
            $('#myModal').modal({
                keyboard: false
            })
        })
        window.setTimeout(function() {
            location.href = "login";
        }, 3000);
    }
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

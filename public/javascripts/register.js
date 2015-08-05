$(function() {
    $('#reg-form').easyform();
    $('#register').on('click', function() {
        var inputName = $('#uid').prop('value');
        var inputPwd = $('#psw1').prop('value');
        var inputEmail = $('#email').prop('value');
        $.ajax({
            url: '/registerSubmit',
            type: 'post',
            data: {
                inputName: inputName,
                inputPwd: inputPwd,
                inputEmail: inputEmail
            },
            success: function(result) {
                if (result.data === 'ok') {
                    window.location.href = "/login";
                }
            }
        })
    })
})

function test(p) {
    
    var inputName = $("#uid").val();
    $.post('/name', {
        inputName: inputName
    }, function(result) {
        if (result.data === 'user_exist') {
            var isExisted = false;
        } else {
            var isExisted = true;
        }
        $("#uid").trigger("easyform-ajax", isExisted);
    })

}

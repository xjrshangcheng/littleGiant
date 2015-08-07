$(function() {
    $('#reg-form').easyform().success = function() {
        $('#register').on('click', function() {

            $.post('/register-submit', {
                inputName: $('#uid').prop('value'),
                inputPwd: $('#psw1').prop('value'),
                inputEmail: $('#email').prop('value')
            }, function() {
                alert('注册成功，赶快登陆开始购物吧！')
                window.location.href = "/";
            })
        })
    }
})

function validation() {

    var inputName = $("#uid").val();
    var isExisted;
    $.post('/name', {
        inputName: inputName
    }, function(message) {
        if (message.data === 'user_exist') {
            isExisted = false;
        } else {
            isExisted = true;
        }
        $("#uid").trigger("easyform-ajax", isExisted);
    })
}

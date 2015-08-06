$(function() {
    $('#reg-form').easyform().success = function() {
        $('#register').on('click', function() {

            $.post('/register-submit', {
                inputName: $('#uid').prop('value'),
                inputPwd: $('#psw1').prop('value'),
                inputEmail: $('#email').prop('value')
            }, function() {
                alert('注册成功，赶快登陆开始购物吧！')
                window.location.href = "/login";
            })
        })
    }
})

function validation() {

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

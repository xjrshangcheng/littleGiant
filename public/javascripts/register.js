$(function() {
    $('#reg-form').easyform().success = function () {
        $('#register').on('click', function() {
            var inputName = $('#uid').prop('value');
            var inputPwd = $('#psw1').prop('value');
            var inputEmail = $('#email').prop('value');
            $.ajax({
                url: '/register-submit',
                type: 'post',
                data: {
                    inputName: inputName,
                    inputPwd: inputPwd,
                    inputEmail: inputEmail
                },
                success: function() {
                    alert("注册成功，马上登陆开始购物吧！");
                    $(location).attr('href','/login');
                }
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

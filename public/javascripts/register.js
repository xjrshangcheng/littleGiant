$(function() {
    $('#register').on('click',function() {
        var inputName = $('#uid').prop('value');
        var inputPwd = $('#psw1').prop('value');
        var inputEmail = $('#email').prop('value');
        $.ajax({
            url : '/registerSubmit',
            type : 'post',
            data : {
                inputName : inputName,
                inputPwd : inputPwd,
                inputEmail : inputEmail
            }
            // ,success : function(result) {
            //     if(result.data === 'ok') {
            //            window.location.href="/";
            //        }else if(result.data === 'pwd_error') {
            //            alert('密码错误');
            //         // $('#uid').prop('message','密码错误');
            //        }else if(result.data === 'username_error') {
            //            alert('用户名不存在');
            //         // $("#uid").trigger("easyform-ajax", false);
            //            // $('#psw1').prop('message','用户名不存在');
            //        }
            // }
        })
    })
})

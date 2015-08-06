$(function() {
    $('#submit').on('click', function() {
        if(checkRequired()) {
            var inputName = $('#uid').prop('value');
            var inputPwd = $('#psw1').prop('value');
            $.ajax({
                url : '/login-submit',
                type : 'post',
                data : {
                    inputName : inputName,
                    inputPwd : inputPwd
                },success : function(result) {
                    if(result.data === 'ok') {
                        $(location).attr('href','/');
                       }else if(result.data === 'pwd_error') {
                           alert('密码错误');
                       }else if(result.data === 'username_error') {
                           alert('用户名不存在');
                        // $("#uid").trigger("easyform-ajax", false);
                       }
                }
            })
        }
    })
})

function checkRequired() {
    var flag = true;
    var max = 16;
    var min = 6;
    $("[placeholder]").each(function(key,val) {
        if(val.value.length > max || val.value.length < min) {
            flag = false;
        }
    })
    return flag;
}

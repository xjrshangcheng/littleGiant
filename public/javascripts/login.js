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
                        window.history.back(-1)?window.history.back(-1):$(location).attr('href','/');
                    }else{
                        alert('用户名或密码错误');
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

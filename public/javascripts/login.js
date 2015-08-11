$(function() {
    $('#reg-form').easyform();
    $('#submit').on('click', function() {
        if(verificationLength()) {
            var inputName = $('#uid').prop('value');
            var inputPwd = $('#psw1').prop('value');
            $.ajax({
                url : '/login',
                type : 'post',
                data : {
                    inputName : inputName,
                    inputPwd : inputPwd
                },success : function(result) {
                    if(result.data === 'ok') {
                        var url = Cookie.getCookie('url');
                        if(url !== null && url.indexOf('register') !== -1) {
                            $(location).attr('href','/');
                            Cookie.delCookie('url');

                        }else{
                            Cookie.delCookie('url');
                            window.history.back(-1)?window.history.back(-1):$(location).attr('href','/');
                        }
                    }else{
                        alert('用户名或密码错误');
                    }
                }
            })
        }
    })
})

function verificationLength() {
    var flag = true;
    var MAX = 16;
    var MIN = 6;
    $("[placeholder]").each(function(key,val) {
        if(val.value.length > MAX || val.value.length < MIN) {
            flag = false;
        }
    })
    return flag;
}

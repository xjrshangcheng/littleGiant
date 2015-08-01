$(function() {
    $('#submit').on('click', function() {
    if(checkRequired()) {
        var inputName = $('#uid').prop('value');
        var inputPwd = $('#psw1').prop('value');
        // $.post('/loginSubmit', {
        //     inputName : inputName,
        //     inputPwd : inputPwd
        // }, function(result) {
        //     if(result.data === 'ok') {
        //         window.location.href="/";
        //     }else if(result.data === 'pwd_error') {
        //         // alert('密码错误');
        //         $.messager.alert('密码错误')
        //         // $('#uid').prop('message','密码错误');
        //     }else if(result.data === 'username_error') {
        //         alert('用户名不存在');
        //         // $('#psw1').prop('message','用户名不存在');
        //     }
        // })
        $.ajax({
            url : '/loginSubmit',
            type : 'post',
            data : {
                inputName : inputName,
                inputPwd : inputPwd
            },success : function(result) {
                if(result.data === 'ok') {
                       window.location.href="/";
                   }else if(result.data === 'pwd_error') {
                       alert('密码错误');
                                         // $('#uid').prop('message','密码错误');
                   }else if(result.data === 'username_error') {
                    //    alert('用户名不存在');
                    $("#uid").trigger("easyform-ajax", false);


                       // $('#psw1').prop('message','用户名不存在');
                   }
            }
        })
    }

    })
})

function checkRequired() {
    var flag = true;
    $("[placeholder]").each(function(key,val) {
        if(val.value.length > 16 || val.value.length < 6) {
            flag = false;
        }
    })
    return flag;
}

$(function() {
    $.ajax({
           url : '/success',
           type : 'get',
           success : function(result) {
             $('.nav-user').empty();
             $(' <li><a>欢迎您：' + result + '</a></li><li><a href="/" id="quit">退出</a></li>').appendTo('.nav-user');
             $('#quit').on('click', function() {
                 $.ajax({
                        url : '/quit',
                        type : 'get',
                        success : function(result) {
                           if(result.data === 'quit') {
                               $('.nav-user').empty();
                               $('<li><a href="/login" id="header-login">登陆</a></li> <li><a href="/register" id="header-register">注册</a></li>').appendTo('.nav-user');
                           }
                        }
                 })
             })
           }
    })

})

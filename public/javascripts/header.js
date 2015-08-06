$(function() {
    if(getCookie('name') !== null) {
        document.getElementById('div1').style.display='none';
        document.getElementById('div2').style.display='block';
        $('#welcome').text("欢迎您：" + getCookie('name'));
        $('#quit').on('click', function() {
            $.ajax({
                url : '/quit',
                type : 'get',
                success : function(result) {
                    if(result.data === 'quit') {
                        document.getElementById('div1').style.display='block';
                        document.getElementById('div2').style.display='none';
                    }
                }
            })
        })
    }
})

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

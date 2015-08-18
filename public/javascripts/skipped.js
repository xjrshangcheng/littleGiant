$(function() {
    var count = 3;
    var newSpan = document.createElement("span");

    document.getElementById('count-down').appendChild(newSpan);
    $("#count-down span").animate({height:"10px",width:"169px"});

    window.setInterval(function() {
        newSpan.innerHTML = count + '秒后跳转到登陆页面。';
        count--;
        if (count === -1) {
            location.href = "./login";
        }
    }, 1000);
});

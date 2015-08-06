$(function() {
    $(".picture").on('mousemove', function() {
        var src = this.src;
        $(".big-picture").prop("src",src);
    })
});

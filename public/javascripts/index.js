$(function() {
    $.get('/slidesPicture', function(data) {
        for (var i = 0; i < data.dataPath.length; i++) {
            console.log('slides-picture-' + (i+1));
            document.getElementById('slides-picture-' + (i+1)).src = data.dataPath[i];
        }
    });
});

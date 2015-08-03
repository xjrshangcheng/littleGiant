function getInfo() {
    $.get('/slides-picture', function(data) {
        document.getElementById('slides-picture').src = data.dataPath;

    });
}

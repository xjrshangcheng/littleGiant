var mysql = require('mysql');
var express = require('express');
var app = express();
var jade = require('jade');
var bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(express.static("bower_components"));

app.get('/', function(req, res) {
    res.render('index', {});
});

app.get("/category", function(req, res) {
    res.render("category");
});

app.get('/register', function(req, res) {
    res.render('register');
});

app.get('/login', function(req, res) {
    res.render('login');
});
app.get('/product-details', function(req, res) {
    res.render('product-details', {});
});

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});

var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("bower_components"));

var index = require("./router/index");
app.get('/', index);

app.get("/car", function(req, res) {
    res.render("car", {});
});

app.get("/shopping-cart", function(req, res) {
    res.render("shopping-cart", {});
});

app.get("/category", function(req, res) {
    res.render("category");
});

var login = require('./router/login');
app.use('/',login);
var header = require('./router/header');
app.use('/',header);

var categoryInfo = require('./router/category');
app.use('/',categoryInfo);

var register = require('./router/register');
app.use('/',register);

var shoppingCart = require('./router/user-shopping-cart');
app.use('/', shoppingCart)

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});

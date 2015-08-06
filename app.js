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

var category = require('./router/category')
app.use('/', category);

var login = require('./router/login');
app.use('/',login);

var header = require('./router/header');
app.use('/',header);

var register = require('./router/register');
app.use('/',register);

var shoppingTrolley = require('./router/shopping-cart');
app.use('/',shoppingTrolley);

var shoppingCart = require('./router/user-shopping-cart');
app.use('/add-user-shopping-cart', shoppingCart);

var goods = require('./router/goods');
app.use('/goods',goods);

var error = require('./router/error');
app.use('/error',error);

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});

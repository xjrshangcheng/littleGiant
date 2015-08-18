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
var index = require("./router/index");
app.get('/', index);

var category = require('./router/category')
app.use('/category', category);

var login = require('./router/login');
app.use('/login',login);

var header = require('./router/header');
app.use('/quit',header);

var register = require('./router/register');
app.use('/',register);

var skipped = require('./router/skipped');
app.use('/skipped',skipped);

var shoppingCart = require('./router/shopping-cart');
app.use('/shopping-cart',shoppingCart);

var order = require('./router/order');
app.use('/order',order);

var userShoppingCart = require('./router/add');
app.use('/add', userShoppingCart);

var pay = require('./router/pay');
app.use('/pay',pay);

var goods = require('./router/goods');
app.use('/goods',goods);

var error = require('./router/error');
app.use('/error',error);

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});

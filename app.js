var mysql = require('mysql');
var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var  Sequelize  =  require('sequelize');
var jade = require('jade');
var  sequelize  =  new  Sequelize('web_store',  'root',  'root',   {
    host: "localhost",
          dialect:   "mysql",
          port:     3306,
});

// app.engine(".html", ejs.__express);
// app.set("view engine", "html");
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

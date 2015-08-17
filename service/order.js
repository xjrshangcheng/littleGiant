var models = require('../models');
var Order = models.order;

var readOrder = function(req, res, userName) {
    var array = [];
    Order.findAll().then(function(data) {
        data.forEach(function(val) {
            array.push(val.dataValues);
        });
    }).done(function() {
        console.log(array);
        res.render('order', {
            array: array
        });
    });
};

module.exports = readOrder;

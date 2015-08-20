var models = require('../models');
var Order = models.user_order;

var read = function(req, res, userName) {
    var orders = [];
    Order.findAll({
        where: {
            user_name: userName
        }
    }).then(function(data) {
        data.forEach(function(val) {
            orders.push(val.dataValues);
        });
    }).done(function() {
        res.render('order', {
            orders: orders
        });
    });
};

var update = function(req, res, id, fiele) {
    Order.update(fiele, {
        where: {
            id: id
        }
    });
    res.end();
};

module.exports = {
    read: read,
    update: update
};

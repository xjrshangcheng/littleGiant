var models = require('../models');
var Order = models.user_order;

var readOrder = function(req, res, userName) {
    var array = [];
    Order.findAll({
        where: {
            user_name: userName
        }
    }).then(function(data) {
        data.forEach(function(val) {
            array.push(val.dataValues);
        });
    }).done(function() {
        res.render('order', {
            array: array
        });
    });
};

var deleteOrder = function(req, res, userName, id) {

};

module.exports = {
    readOrder : readOrder,
    deleteOrder : deleteOrder
};

var express = require('express');
var router = express.Router();
var db = require('../models/index')
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

var Goods = sequelize.define('goods', {
    id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    info: Sequelize.STRING,
    price: Sequelize.STRING,
    sales: Sequelize.STRING,
    detall: Sequelize.INTEGER,
    type: Sequelize.STRING,
    img: Sequelize.STRING
},{
    freezeTableName : true,
    timestamps : false
});

router.post('/category-info', function(req, res) {
    Goods.findAll().then(function(e) {
        var resultArray = [];
        e.forEach(function(n, i) {
            resultArray.push(n.dataValues);
        })

        res.send({
            status : 1,
            data : resultArray,
            message : ""
        });
    });
});

module.exports = router;

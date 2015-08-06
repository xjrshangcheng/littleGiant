var express = require('express');
var router = express.Router();
var db = require('../models/index');
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

var Goods = sequelize.define('goods', {
    id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    info: Sequelize.STRING,
    price: Sequelize.STRING,
    standard_one: Sequelize.STRING,
    standard_two: Sequelize.STRING,
    sales: Sequelize.STRING,
    detail: Sequelize.STRING,
    type: Sequelize.STRING,
    img: Sequelize.STRING,
    recommend: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

router.get('/', function(req, res) {
    var id = req.query.id;
    var goodsData = [];

    Goods.findAll({
        where : {
            id : 12
        }
    }).then(function(data) {
        if(data[0] === undefined) {
            res.send({
                status : 400,
                data : "",
                message : "no this goods"
            })
        } else {
            data.forEach(function(val) {
                goodsData.push(val.dataValues);
            })
            res.render('goods', {
                goodsData : goodsData
            });
        }
    })
});

module.exports = router;

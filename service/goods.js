var models = require('../models');
var Goods = models.goods;

var goods = function(req, res,id) {
    var goodsData = [];
    var imgDate;
    var imgDetail;

    Goods.findAll({
        where : {
            id : id
        }
    }).done(function(data) {
        if(data[0] === undefined) {
            res.render('error',{})
        } else {
            data.forEach(function(val) {
                goodsData.push(val.dataValues);
                // console.log(val.dataValues);
                imgDate = val.dataValues.more_img === null ? [] : val.dataValues.more_img.split(" ");
                imgDetail = val.dataValues.detail_img === null ? [] : val.dataValues.detail_img.split(" ");
            })
            console.log(goodsData);
            res.render('goods', {
                goodsData : goodsData,
                imgDate : imgDate,
                imgDetail : imgDetail
            });
        }
    })
};
module.exports = goods;

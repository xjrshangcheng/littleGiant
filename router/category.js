var express = require('express');
var router = express.Router();
var models = require('../models');
var Goods = models.goods;
var Category = models.category;

var ALL_CATEGORY = "所有分类";

router.get('/', function(req, res) {
    var resultGoods = [];
    var breadcrumbs = [];
    var resultSubCategories = [];
    var subCategories = [];
    var sumPage;
    var nowPage = 0;
    var pageSize = 1;

    Goods.count().then(function(i){
        sumPage = Math.ceil(i / pageSize);
    });

    breadcrumbs.push(ALL_CATEGORY);
    req.query.type = req.query.type || ALL_CATEGORY;

    // 生成breacrumbs
    Category.find({
        where: {
            name: req.query.type
        }
    }).then(function(resultCurrentCategory) {
        if(resultCurrentCategory !== null){
            Category.findAll({
                where: {
                    id: resultCurrentCategory.dataValues.path.split(".")
                }
            }).then(function(resultCategoryIds) {
                resultCategoryIds.forEach(function(resultCategory) {
                    breadcrumbs.push(resultCategory.dataValues.name);
                });
            });
        }
    });

    // 生成resultSubCategories
    Category.find({
        where: {
            name:req.query.type
        }
    }).then(function(resultCurrentCategory) {
        Category.findAll({
            where: {
                path: {
                    $like: resultCurrentCategory.dataValues.path+"%"
                },
                level:resultCurrentCategory.dataValues.level+1
            }
        }).then(function(resultCategory) {
            resultCategory.forEach(function(data) {
                resultSubCategories.push(data.dataValues.name);
            });
        });
    });

    // 生成subCategories
    Category.find({
        where: {
            name:req.query.type
        }
    }).then(function(resultCurrentCategory) {
        Category.findAll({
            where: {
                path: {
                    $like: resultCurrentCategory.dataValues.path+"%"
                }
            }
        }).then(function(resultCategory) {
            resultCategory.forEach(function(data) {
                subCategories.push(data.dataValues.name);
            });

            if (req.query.type !== ALL_CATEGORY) {
                var whereObj = {
                    where: {
                        type: subCategories
                    },
                    limit: [nowPage*pageSize, pageSize]
                };

                findGoods(res, resultGoods, breadcrumbs, resultSubCategories, nowPage + 1, sumPage, whereObj);
            } else {
                findGoods(res, resultGoods, breadcrumbs, resultSubCategories, nowPage + 1, sumPage, undefined);
            }

            nowPage++;
        });
    });
});

function findGoods(res, resultGoods, breadcrumbs, resultSubCategories, nowPage, sumPage, whereObj) {
    Goods.findAll(whereObj).then(function(result) {
        resultGoods = result.map(function(categoryRecord) {
            return categoryRecord.dataValues;
        });

        res.render("category", {
            data: resultGoods,
            breadArray: breadcrumbs,
            subCategory: resultSubCategories,
            nowPage : nowPage,
            sumPage : sumPage
        })
    });
}

module.exports = router;

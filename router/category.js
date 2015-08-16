var express = require('express');
var router = express.Router();
var models = require('../models');
var Goods = models.goods;
var Category = models.category;
var nowPage = 0;
var pageSize = 8;
var subAllCategory = [];

router.get('/', function(req, res) {
    var breadcrumbs = [];
    var subCategories = [];
    var count = 3;

    nowPage = 0;
    subAllCategory = [];
    req.query.type = req.query.type || "所有分类";

    getBreadcrumbs(req, function(data) {
        breadcrumbs.push("所有分类");
        data.forEach(function(n) {
            breadcrumbs.push(n);
        });
        count--;
        if (count === 0) {
            getSumPage(subAllCategory, pageSize, function(sum) {
                getGoodsAndResponse(subAllCategory, breadcrumbs, subCategories, sum, res);
            });
        }
    });

    getSubCategories(req, function(data) {
        subCategories = data;
        count--;
        if (count === 0) {
            getSumPage(subAllCategory, pageSize, function(sum) {
                getGoodsAndResponse(subAllCategory, breadcrumbs, subCategories, sum, res);
            });
        }
    });

    getSubAllCategories(req, function(data) {
        subAllCategory = data;
        count--;
        if (count === 0) {
            getSumPage(subAllCategory, pageSize, function(sum) {
                getGoodsAndResponse(subAllCategory, breadcrumbs, subCategories, sum, res);
            });
        }
    });
});

router.get('/previousPage', function(req, res) {
    nowPage = req.query.nowPage - 2;
    getGoodsInfo(subAllCategory, function(data) {
        nowPage++;
        res.send({
            data: data,
            nowPage: nowPage
        })
    });
});

router.get('/nextPage', function(req, res) {
    nowPage = req.query.nowPage;
    getGoodsInfo(subAllCategory, function(data) {
        nowPage++;
        res.send({
            data: data,
            nowPage: nowPage
        })
    });
});

function getSumPage(subAllCategory, pageSize, setSumpage) {
    Goods.count({
        where: {
            type: subAllCategory
        }
    }).then(function(count) {
        setSumpage(Math.ceil(count / pageSize));
    });
}

function getGoodsAndResponse(subAllCategory, breadcrumbs, subCategories, sumPage, res) {
    getGoodsInfo(subAllCategory, function(data) {
        if (data.length > 0) {
            nowPage++;
        }
        res.render("category", {
            data: data,
            breadArray: breadcrumbs,
            subCategory: subCategories,
            sumPage: sumPage,
            nowPage: nowPage
        })
    });
}

function getGoodsInfo(subAllCategory, setGoodsInfo) {
    Goods.findAll({
        where: {
            type: subAllCategory
        },
        limit: [nowPage * pageSize, pageSize]
    }).then(function(result) {
        resultGoods = result.map(function(categoryRecord) {
            return categoryRecord.dataValues;
        });

        setGoodsInfo(resultGoods);
    });
}

function getSubAllCategories(req, setSubAllCategory) {
    var subAllCategory = [];
    Category.find({
        where: {
            name: req.query.type
        }
    }).then(function(resultCurrentCategory) {
        Category.findAll({
            where: {
                path: {
                    $like: resultCurrentCategory.dataValues.path + "%"
                }
            }
        }).then(function(resultCategory) {
            resultCategory.forEach(function(data) {
                subAllCategory.push(data.dataValues.name);
            });
            setSubAllCategory(subAllCategory);
        });
    });
}

function getSubCategories(req, setSubCategory) {
    var resultSubCategories = [];

    Category.find({
        where: {
            name: req.query.type
        }
    }).then(function(resultCurrentCategory) {
        Category.findAll({
            where: {
                path: {
                    $like: resultCurrentCategory.dataValues.path + "%"
                },
                level: parseInt(resultCurrentCategory.dataValues.level) + 1
            }
        }).then(function(resultCategory) {
            resultCategory.forEach(function(data) {
                resultSubCategories.push(data.dataValues.name);
            });
            setSubCategory(resultSubCategories);
        });
    });
}

function getBreadcrumbs(req, setBreadcrumbs) {
    var breadcrumbs = [];
    Category.find({
        where: {
            name: req.query.type
        }
    }).then(function(resultCurrentCategory) {
        if (resultCurrentCategory !== null) {
            Category.findAll({
                where: {
                    id: resultCurrentCategory.dataValues.path.split(".")
                }
            }).then(function(resultCategoryIds) {
                resultCategoryIds.forEach(function(resultCategory) {
                    breadcrumbs.push(resultCategory.dataValues.name);
                });
                setBreadcrumbs(breadcrumbs);
            });
        }
    });
}

module.exports = router;

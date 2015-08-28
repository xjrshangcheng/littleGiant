var express = require('express');
var router = express.Router();
var Promotion = require('../controller/promotion-controller');
var pro = new Promotion();

router.get('/', pro.renderPromotion);

router.get('/:promotionId', pro.lablePromotion)

module.exports = router;

var express = require('express');
var router = express.Router();

router.get('/header', function(req, res) {
    res.render('header')
})

router.get('/success', function(req, res) {
    if(req.cookies.name !== undefined){
        res.send(req.cookies.name);
    }
});

router.get('/quit', function(req, res) {
    res.clearCookie('name', { path: '/' });
    res.send({
        data: 'quit'
    })
})

module.exports = router;

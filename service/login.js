var models = require('../models');
var User = models.user;
var login = function(req, res, inputName, inputPwd) {
    var result;
    var status;

    User.findAll({
        where: {
            username: inputName
        }
    }).then(function(data) {
        if (data.length > 0) {
            if (data[0].dataValues.password === inputPwd) {
                result = 'ok';
                status = 200;
                res.cookie('name', inputName, {
                    expires: new Date(Date.now() + 1000 * 60 * 60)
                });
            }
        }
    }).done(function() {
        res.send({
            status: status,
            data: result,
            message: ''
        })
    })
};
module.exports = login;

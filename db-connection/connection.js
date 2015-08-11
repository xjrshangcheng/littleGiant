var Sequelize = require('sequelize');
var sequelize = new Sequelize('little_giant', 'twer', 'twer', {
		dialect: 'mysql',
		port: 3306
	});

module.exports = sequelize;

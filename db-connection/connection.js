var Sequelize = require('sequelize');
var sequelize = new Sequelize('little_giane', 'twer', 'twer', {
		dialect: 'mysql',
		port: 3306
	});

module.exports = sequelize;

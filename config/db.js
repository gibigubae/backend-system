const { Sequelize } = require('sequelize');

const config = require('../config/config.json').development;

const sequelize = new Sequelize(config);

module.exports = sequelize;

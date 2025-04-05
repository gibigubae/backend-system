const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('connection_link',{
    dialect: 'postgres',
    logging: false,

});

module.exports = sequelize;
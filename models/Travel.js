const {DataTypes} = require('sequelize');
const sequelize = require('../config/database.js');

const User = require('./User');


const Travel = sequelize.define('Travel', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    travelPicture:{
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },

},{timestamps: true});

module.exports = Travel;
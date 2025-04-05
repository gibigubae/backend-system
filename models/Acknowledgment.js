const {DataTypes} = require('sequelize');
const db = require('../config/db');

const Acknowledgment = db.define('Acknowledgment', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    image:{
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            isUrl: true 
        }
    }
})

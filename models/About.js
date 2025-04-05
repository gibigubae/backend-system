const {DataTypes}  = require('sequelize');
const db = require('../config/db');
const About = db.define('About', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isUrl:true,
        },
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false,// Default to current date if not provided
    },
})

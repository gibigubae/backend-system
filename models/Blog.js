const {DataTypes} = require('sequelize');
const sequelize = require('../config/database.js')
const User = require('./User')

const Blog = sequelize.define('Blog', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false
    },
    ExpiredAt:{
        type: DataTypes.DATE,
        allowNull: true
    },
    createdBy:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'Users',
            key: 'id'
        }
    }
})

module.exports = Blog
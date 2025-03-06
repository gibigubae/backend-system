const { times } = require("lodash")
const sequelize = require("../config/database.js")
const {DataTypes} = require("sequelize")

const Books = sequelize.define("Books", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false
    },
    category:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    link:{
        type: DataTypes.STRING,
        allowNull: True
    },
    rent:{
        type: DataTypes.BOOLEAN,
        defaultValue: True
    },
    sell:{
        type: DataTypes.BOOLEAN,
        defaultValue: True
    },
    image:{
        type: DataTypes.STRING,
        allowNull: False
    },

},{
    timestamps: true
})

module.exports = Books;
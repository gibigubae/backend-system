const {DataTypes} = require("sequelize");
const sequelize = require("../config/database.js");

const Apostle = sequelize.define("Apostle", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
})
module.exports = Apostle
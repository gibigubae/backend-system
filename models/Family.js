// familyModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Family = sequelize.define("Family", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mother_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    father_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    family_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    family_batch:{
        type:DataTypes.DATE,
        allowNull: false
    }
}, { timestamps: true });

module.exports = Family;
                                                                                                                
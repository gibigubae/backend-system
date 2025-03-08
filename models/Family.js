// familyModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Family = sequelize.define("Family", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    hwarya_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    }
}, { timestamps: true });

module.exports = Family;
                                                                                                                
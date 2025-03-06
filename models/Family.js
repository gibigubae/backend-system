const sequelize = require("../config/database.js")
const { DataTypes } = require("sequelize")
const User = require("./User")
const Family = sequelize.define("Family", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    mother_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'Users',
            key: 'id',
        },
    },
    father_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'Users',
            key: 'id',
        },
    },

},
{timestamps: true}
)
module.exports = Family;
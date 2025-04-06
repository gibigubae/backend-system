const {DataTypes} = require('sequelize');
const db = require('../config/db');

const Field = require('./Field');
const User = db.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [6, 100]
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    studentId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: false 
    },
    degreeType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    batch: {
        type: DataTypes.STRING,
        allowNull: true
    },
    idPicture: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    classField: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Field', 
            key: 'id' 
        },
        allowNull: true
    }
},
{timestamps: true,}
);

User.associate = (models) => {
    User.belongsTo(models.Field, {
        foreignKey: 'classField',
        as: 'field'
    });
}

module.exports = {User};;
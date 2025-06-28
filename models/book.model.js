import sequelize from '../config/db.js';
import {DataTypes} from 'sequelize';

const Book = sequelize.define("Book", {
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
        allowNull: true,
    },
    rent:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    sell:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull:false,
    }

},{
    timestamps: true
})

export default Book;
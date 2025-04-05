const {DataTypes} = require('sequelize');
const  {db} = require('../config/db');

const Quote = db.define('Quote', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    
    quote: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image:{
        
        type: DataTypes.STRING, 
        allowNull: false
    },
    source:{
        type: DataTypes.STRING, 
        allowNull: false, 
    },
})

module.exports = Quote
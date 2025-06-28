import  DataTypes  from 'sequelize';
import  sequelize from '../config/db.js' ;

const Quote = sequelize.define('Quote', {
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

export default Quote;
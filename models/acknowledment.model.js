import  DataTypes  from 'sequelize';
import  sequelize from '../config/db.js' ;

const Acknowledgment = sequelize.define('Acknowledgment', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    image:{
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            isUrl: true 
        }
    }
})
export default Acknowledgment;

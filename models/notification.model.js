import  DataTypes  from 'sequelize';
import  sequelize from '../config/db.js' ;

const Notification = sequelize.define('Notification', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING(255), 
        allowNull:false,
    },
    type:{
        type:DataTypes.ENUM('info', 'warning', 'error'), 
        allowNull:false,
    },
    created_by:{
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'Users', 
            key: 'id', 
        }
    },
},{
    timestamps:true,
})

export default Notification
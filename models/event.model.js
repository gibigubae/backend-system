import  DataTypes  from 'sequelize';
import  sequelize from '../config/db.js' ;

const Event = sequelize.define('Event', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    title:{
        type: DataTypes.STRING(100),
        allowNull: false, 
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false, 
    },
    image:{
        type: DataTypes.STRING(255), 
        allowNull: true, 
    },
    time:{
        type: DataTypes.TIME, 
        allowNull: false, 
    },
    created_by:{
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'Users', 
            key: 'id', 
        }
    },
    location:{
        type: DataTypes.STRING(255),
        allowNull: false, 
    },
    specialEvent:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: false, 
    },
    
},
    {
        timestamps: true,
    }
)
export default Event;

import  DataTypes  from 'sequelize';
import  sequelize from '../config/db.js' ;
const About = sequelize.define('About', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isUrl:true,
        },
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
})
export default About
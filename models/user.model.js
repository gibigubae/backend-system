import  DataTypes  from 'sequelize';
import  sequelize from '../config/db.js' ;
import BookHold from './bookHold.model.js';

const User = sequelize.define("User", {
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
    image:{
        type:DataTypes.STRING,
        allowNull:true
    },
    idPicture:{
        type:DataTypes.STRING,
        allowNull:true
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
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    classField: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Fields', 
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
User.hasMany(BookHold, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});




export default User;
const {DataTypes} = require("sequelize")
const sequelize = require("../config/database.js")


const User = sequelize.define("User", {
    id:{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    fullName:{
        type : DataTypes.STRING,
        allowNull : false
    },
    studentId:{
        type : DataTypes.STRING,
        allowNull : false,
        unique: true
    },
    gender:{
        type: DataTypes.STRING,
        allowNull:false
    },
    buildingBlock:{
        type: DataTypes.STRING,
        allowNull:true
    },
    dormNumber:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    studentPicture:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    batch:{
        type:DataTypes.STRING,
        allowNull:false
    },
    degreeType:{
        type:DataTypes.STRING,
        allowNull:true
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},
{
    timestamps: true
}
)

module.exports = User
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
    },
    gender:{
        type: DataTypes.STRING,
        allowNull:true,
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
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    idPicture:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    batch:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    degreeType:{
        type:DataTypes.STRING,
        allowNull:true
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    approve:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    level:{
        type:DataTypes.INTEGER,
        defaultValue:1,
        allowNull:true
    }
},
{
    timestamps: true
}
)

module.exports = User
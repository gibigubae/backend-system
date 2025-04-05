const {DataTypes} = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    rent:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: false ,
    },
    sell:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: false ,
    },
    rentPrice:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true, 
        validate: {
            min: 0
        }
    },
    sellPrice:{ 
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true, 
        validate: {
            min: 0
        }
    },
    description:{
        type: DataTypes.TEXT,
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


    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};

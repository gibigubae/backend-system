const {DataTypes} = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Acknowledments', {
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Acknowledgments'); 
  }
};

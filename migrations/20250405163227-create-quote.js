module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Quotes', {
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Quotes');
  }
};

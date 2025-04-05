module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Abouts', {
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
        allowNull: false,// Default to current date if not provided
    },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Abouts');
  }
};

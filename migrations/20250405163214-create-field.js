module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Fields', {
    id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    pictures: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    mainDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Fields');
  }
};

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); // Ensure correct Sequelize instance
require('dotenv').config(); // If needed, ensure that your .env variables are loaded here

// Import models
const Apostle = require("./Apostle.js");
const User = require("./User.js");
const Family = require("./Family.js");
const Blog = require("./Blog.js");
const Travel = require("./Travel.js");

// Now define associations after all models are imported

// Define relationships between models

// Apostle - User (One-to-many)
User.belongsTo(Apostle, { foreignKey: 'apostleId' });
Apostle.hasMany(User, { foreignKey: 'apostleId' });

// User - Travel (One-to-many)
User.hasMany(Travel, { foreignKey: 'userId' });

// User - Family (One-to-many)
User.belongsTo(Family, { foreignKey: 'familyId' });
Family.hasMany(User, { foreignKey: 'familyId' });



// Mother and Father associations (Many-to-one, self-referencing within Family)
Family.belongsTo(User, { as: 'mother', foreignKey: 'mother_id' });
Family.belongsTo(User, { as: 'father', foreignKey: 'father_id' });

// Sync the database (now that associations are set)
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Databases and models are synced");
  })
  .catch((err) => {
    console.log("Error syncing the database:", err);
  });

module.exports = {
  User,
  Apostle,
  Family,
  Blog,
  Travel,
};

// server.js
const express = require('express');
const sequelize = require('./config/db');  // Ensure correct path
const User = require('./models/User');    // Correct import for the User model

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Run migrations before starting the server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

async function createUser() {
  try {
    const user = await User.create({
      firstName: 'Jane',
      middleName: "Tets",
      lastName: 'Doe',
      email: 'janedoe@example.com',
      password: 'securepassword',
      phone: '987654321',
      studentId: 'S98765',
      degreeType: 'Masters',
    });
    console.log('User created:', user);
  } catch (err) {
    console.error('Error creating user:', err);
  }
}

createUser();

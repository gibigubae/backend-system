const express = require('express');
const sequelize = require('./config/db');
const User = require('./models/User');

const app = express();
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Function to create a user (for testing)
async function createUser() {
  try {
    const user = await User.create({
      firstName: 'Jane',
      middleName: 'Tets',
      lastName: 'Doe',
      email: 'janedoe@example.com',
      password: 'securepassword',
      idPicture: 'idPicture.jpg',
      phone: '987654321',
      studentId: 'S98765',
      degreeType: 'Masters',
    });
    console.log('✅ User created:', user.toJSON());
  } catch (err) {
    console.error('❌ Error creating user:', err);
  }
}

// Connect to the database and start the server
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected');
    return createUser();
  })
  .then(() => {
    app.listen(3000, () => {
      console.log('🚀 Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('❌ Error connecting to the database:', err);
  });

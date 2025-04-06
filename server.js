const express = require('express');
const sequelize = require('./config/db');
const fileUpload = require('express-fileupload');
const app = express();
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 } 
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// // Function to create a user (for testing)
// async function createUser() {
//   try {
//     const user = await User.create({
//       firstName: 'Jane',
//       middleName: 'Tets',
//       lastName: 'Doe',
//       email: 'janedoe@example.com',
//       password: 'securepassword',
//       idPicture: 'idPicture.jpg',
//       phone: '987654321',
//       studentId: 'S98765',
//       degreeType: 'Masters',
//     });
//     const users = await User.findAll();
//     console.log('📋 All users:', users.map(user => user.toJSON()));
//     console.log('✅ User created:', user.toJSON());
//   } catch (err) {
//     console.error('❌ Error creating user:', err);
//   }
// }

// Connect to the database and start the server
sequelize.authenticate()
    .then(() => {
        console.log('✅ Database connected');
        return sequelize.sync(); // Sync the database
    })
    .then(() => {
        console.log('✅ Database synchronized');
        app.listen(3000, () => {
            console.log('🚀 Server is running on port 3000');
        });
    })
    .catch((err) => {
        console.error('❌ Error connecting to the database:', err);
    });

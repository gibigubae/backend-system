const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadDir = path.join(__dirname, 'uploads');

// Check if the folder exists, if not, create it
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create folder if it doesn't exist
    console.log("✅ 'uploads' folder created successfully.");
} else {
    console.log("✅ 'uploads' folder already exists.");
}
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const familyRoutes = require('./routes/familyRoutes');
const travelRoutes = require('./routes/travelRoutes')
// Middleware to parse JSON and url encoded
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Mount user routes
app.use('/api/users', userRoutes);
app.use('/api/families', familyRoutes);
app.use('/api/travels', travelRoutes);
// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
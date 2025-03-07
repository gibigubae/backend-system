const express = require('express');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

// Middleware to parse JSON
app.use(express.json());

// Mount user routes
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
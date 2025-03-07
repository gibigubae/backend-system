const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const familyRoutes = require("./routes/familyRoutes");
const blogRoute = require("./routes/blogRoutes");

// Middleware to parse JSON
app.use(express.json());

// Mount user routes
app.use("/api/users", userRoutes);
app.use("/api/families", familyRoutes);
app.use("/api/blogs", blogRoute);
// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

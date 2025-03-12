const { Travel } = require("../models");
const { User } = require("../models"); // Ensure correct import

const createTravel = async (req, res) => {
  try {
    const { name, description, price, date } = req.body;
    const travelPicture = req.file ? req.file.filename : null;
    console.log("Received data:", req.body);  // Log the incoming data

    // Check if all required fields are provided
    if (!name || !description || !price || !date  || !travelPicture) {
      return res.status(422).json({
        message: "Please provide all required fields.",
        success: false,
        error: true,
      });
    }

    // Check if the user is an admin
    const admin = req.user.isAdmin;

    // Check if the travel package already exists
    const existingTravel = await Travel.findOne({ where: { name } });
    if (existingTravel) {
      return res.status(400).json({
        message: "Travel package already exists.",
        success: false,
        error: true,
      });
    }

    // Create the new travel package
    const newTravel = await Travel.create({ name, description, price, date , image});
    if (!admin){
      res.status(401).json({
        message: "Unauthorized to create travel package.",
        success: false,
        error: true,
      });
    }

    
   

    console.log("Travel package created:", newTravel);  // Log the created travel package

    res.status(201).json({
      message: "Travel package created successfully.",
      travel: newTravel,
      success: true,
      error: false,

    });
  } catch (error) {
    console.error("Error creating travel package:", error);  // Log error if any
    res.status(500).json({ message: "Error creating travel package.", error: error.message });
  }
};



// Get all travel packages with pagination
const getAllTravels = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const travels = await Travel.findAll({ offset, limit: parseInt(limit) });
    const totalTravels = await Travel.count();

    res.status(200).json({
      travels,
      currentPage: page,
      totalPages: Math.ceil(totalTravels / limit),
      totalTravels,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving travel packages.", error: error.message });
  }
};

// Get a single travel package by ID
const getTravelById = async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format.", success: false, error: true });
    }

    const travel = await Travel.findByPk(req.params.id);
    if (!travel) {
      return res.status(404).json({ message: "Travel package not found.", success: false, error: true });
    }
    res.status(200).json(travel);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving travel package.", error: error.message });
  }
};

// Update a travel package (Admins only)
const updateTravel = async (req, res) => {
  try {
    const { name, description, price, date, createdBy } = req.body;
    const travel = await Travel.findByPk(req.params.id);

    if (!travel) {
      return res.status(404).json({ message: "Travel package not found.", success: false, error: true });
    }



    if (
      travel.name === name &&
      travel.description === description &&
      travel.price === price &&
      new Date(travel.date).getTime() === new Date(date).getTime() &&
      travel.createdBy === createdBy
    ) {
      return res.status(400).json({ message: "No changes detected. Already up to date.", success: false, error: true });
    }

    await travel.update({ name, description, price, date, createdBy });
    res.status(200).json({ message: "Travel package updated successfully.", travel, success: true, error: false });
  } catch (error) {
    res.status(500).json({ message: "Error updating travel package.", error: error.message });
  }
};

// Delete a travel package (Admins only)
const deleteTravel = async (req, res) => {
  try {
    const travel = await Travel.findByPk(req.params.id);
    if (!travel) {
      return res.status(404).json({ message: "Travel package not found.", success: false, error: true });
    }

    await travel.destroy();
    res.status(200).json({ message: "Travel package deleted successfully.", success: true, error: false });
  } catch (error) {
    res.status(500).json({ message: "Error deleting travel package.", error: error.message });
  }
};

module.exports = { createTravel, updateTravel, deleteTravel, getAllTravels, getTravelById };

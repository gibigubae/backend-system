// familyController.js
const Family = require("../models/Family"); 

const createFamily = async (req, res) => {
    //only admin can create family
    if(!req.user.isAdmin){
        return res.status(403).json({ message: "Only admin can create family" });
    }
    try {
        const {mother_id, father_id, family_name } = req.body;
        
        const newFamily = await Family.create({
            mother_id,
            father_id,
            family_name
        });

        return res.status(201).json(newFamily);
    } catch (error) {
        return res.status(500).json({ message: "Error creating family", error: error.message });
    }
};

const getFamilyById = async (req, res) => {

    try {
        const family = await Family.findByPk(req.params.id);
        
        if (!family) {
            return res.status(404).json({ message: "Family not found" });
        }

        return res.status(200).json(family);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching family", error: error.message });
    }
};

const deleteFamily = async (req, res) => {
    if(!req.user.isAdmin){
        return res.status(403).json({ message: "Only admin can delete family" });
    }
    try {
        const family = await Family.findByPk(req.params.id);
        
        if (!family) {
            return res.status(404).json({ message: "Family not found" });
        }

        await family.destroy();
        return res.status(200).json({ message: "Family deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting family", error: error.message });
    }
};

module.exports = { createFamily, getFamilyById, deleteFamily };

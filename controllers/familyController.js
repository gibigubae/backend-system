// familyController.js
const Family = require("../models/Family"); 

const createFamily = async (req, res) => {
    try {
        const { admin_id, hwarya_id, mother_id, father_id, family_name } = req.body;
        
        const newFamily = await Family.create({
            admin_id,
            hwarya_id,
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

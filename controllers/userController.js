const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { cloudinary } = require('../config/cloudinary');
require('dotenv').config();

const registerUser = async (req, res) => {
    const { firstName, middleName, lastName, email, password, phone, studentId } = req.body;
    const idPicture = req.files ? req.files.idPicture : null;
    
    if (!firstName || !middleName || !lastName || !email || !password || !phone || !studentId || !idPicture) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    
    const secret_key = process.env.JWT_SECRET_KEY;
    
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const existingId = await User.findOne({ where: { studentId } });
        if (existingId){
            return res.status(400).json({ message: 'Student ID already exists' });
        }
        let idPictureUrl = "";

        if (idPicture) {
            // Create a promise to handle the Cloudinary upload properly
            idPictureUrl = await new Promise((resolve, reject) => {
                const stream = require('stream');
                const bufferStream = new stream.PassThrough();
                bufferStream.end(idPicture.data); 
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'idPictures',
                        use_filename: true,
                        unique_filename: false,
                        overwrite: true,
                        resource_type: 'auto', 
                    },
                    (error, result) => {
                        if (error) {
                            console.error('Error uploading image:', error);
                            return reject('Error uploading image');
                        }

                        resolve(result.secure_url);
                    }
                );
                
                bufferStream.pipe(uploadStream); // Fix by piping the stream, not passing the stream itself
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
            firstName,
            middleName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            idPicture: idPictureUrl,
            studentId
        });

        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            secret_key,
            { expiresIn: '48h' }
        );

        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                phone: newUser.phone,
                studentId: newUser.studentId,
                idPicture: newUser.idPicture,
            },
            token
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const loginUser = async (req, res) => {
    const {email, firstName, password, studentId} = req.body;
    if (!email || !password || !(firstName || studentId)) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    const secret_key = process.env.JWT_SECRET_KEY;
    try{
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'User email not found' });
        }

        if (firstName){
            const name = await User.findOne({ where: { firstName } });
            if (!name) {
                return res.status(400).json({ message: 'User name not found' });
            }
        }
        if(studentId){
            const id = await User.findOne({ where: { studentId } });
            if (!id) {
                return res.status(400).json({ message: 'User ID not found' });
            }
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            secret_key,
            { expiresIn: '48h' }
        );
        return res.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                studentId: user.studentId,
                idPicture: user.idPicture,
            },
            token
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getUser = async(req,res)=>{
    id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Please provide an ID' });
    }
    try{
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({
            message: 'User found',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                studentId: user.studentId,
                idPicture: user.idPicture,
            },
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = { registerUser ,loginUser, getUser};

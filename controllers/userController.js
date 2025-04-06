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
    
    const secret_key = process.env.JWT_SECRET;
    
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
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

module.exports = { registerUser };

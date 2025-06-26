import User from  '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from '../config/env.js';

export const signUp = async (req, res, next) => {
    const { firstName, middleName, lastName, email, password, phone, studentId } = req.body;
    // const idPicture = req.files ? req.files.idPicture : null;

    try {
        if (!firstName || !middleName || !lastName || !email || !password || !phone || !studentId ) {
            let error = new Error('Registeration field missed');
            error.statusCode = 404
            throw error;
        }
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            let error = new Error('User already exists');
            error.statusCode = 490
            throw error;
        }
        const existingId = await User.findOne({ where: { studentId } });
        if (existingId){
            let error = new Error('ID already exists');
            error.statusCode = 490
            throw error;
        }
        // let idPictureUrl = "";

        // if (idPicture) {
        //     // Create a promise to handle the Cloudinary upload properly
        //     idPictureUrl = await new Promise((resolve, reject) => {
        //         const stream = require('stream');
        //         const bufferStream = new stream.PassThrough();
        //         bufferStream.end(idPicture.data); 
        //         const uploadStream = cloudinary.uploader.upload_stream(
        //             {
        //                 folder: 'idPictures',
        //                 use_filename: true,
        //                 unique_filename: false,
        //                 overwrite: true,
        //                 resource_type: 'auto', 
        //             },
        //             (error, result) => {
        //                 if (error) {
        //                     console.error('Error uploading image:', error);
        //                     return reject('Error uploading image');
        //                 }

        //                 resolve(result.secure_url);
        //             }
        //         );
                
        //         bufferStream.pipe(uploadStream); 
        //     });
        // }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            firstName,
            middleName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            studentId
        });

        const token = jwt.sign({ id: user.id},JWT_SECRET_KEY,{ expiresIn: '48h' });

        return res.status(201).json({
            message: 'User created successfully',
            user,
            token
        });

    } catch (err) {
        console.error(err);
        next(err)
    }
}

export const signIn = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        if (!email || !password ) {
            let error = new Error('Eamil or password not found');
            error.statusCode = 404
            throw error;
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            let error = new Error('user not found');
            error.statusCode = 404
            throw error;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            let error = new Error('invalid credential');
            error.statusCode = 401
            throw error;
        }
        const token = jwt.sign({ userId: user.id },JWT_SECRET_KEY,{ expiresIn: JWT_EXPIRES_IN});
        return res.status(200).json({
            message: 'User logged in successfully',
            data: {
                user,
                token
            },
        });
    }catch(err){
        console.error(err);
        next(err)

    }
};


// export const signOut = async (req, res, next) =>{

// }
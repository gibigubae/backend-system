import User from  '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from '../config/env.js';
import sequelize from '../config/db.js';
import {uploadToCloudinary} from '../utils/cloudinary.util.js'

export const signUp = async (req, res, next) => {
    const t = await sequelize.transaction();
    const { firstName, middleName, lastName, email, password, phone, studentId } = req.body;
    const image = req.files?.image?.[0]?.buffer || null;
    const idImage = req.files?.idImage?.[0]?.buffer || null;
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
        let imageUrl;
        if (image) {
            imageUrl = await uploadToCloudinary(image,'personalImages')
        }
        let idPictureUrl;
        if (idImage) {
            idPictureUrl = await uploadToCloudinary(idImage,'idImages')
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            firstName,
            middleName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            image:imageUrl || null,
            idPicture:idPictureUrl || null,
            studentId
        },{transaction:t});
        await t.commit();
        const token = jwt.sign({ userId: user.id},JWT_SECRET_KEY,{ expiresIn: JWT_EXPIRES_IN });
        
        return res.status(201).json({
            message: 'User created successfully',
            user,
            token
        });

    } catch (err) {
        console.error(err);
        await t.rollback();
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




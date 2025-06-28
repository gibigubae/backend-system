import sequelize from '../config/db.js';
import User from  '../models/user.model.js'
import { uploadToCloudinary } from '../utils/cloudinary.util.js';
import bcrypt from 'bcrypt';

export const getUser = async ( req, res, next )=>{
    try{
        const id = req.params.id;
        const isAdmin = await User.findByPk(id).isAdmin;
        if (!id) {
            const error = new Error('Id not found');
            error.statusCode = 404;
            throw error;
        }
        if(!isAdmin && id != req.user.id){
            let error = new Error('Not authorized');
            error.statusCode = 401
            throw error;
        }
        const user = await User.findOne({ where: { id } });
        if (!user) {
            let error = new Error('user not found');
            error.statusCode = 404
            throw error;
        }
        return res.status(200).json({
            message: 'User found successfull',
            user
        });
    }catch(err){
        next(err)

    }
}
export const getAllUser = async ( req, res, next )=>{
    try{
        const user = await User.findByPk(req.user.id);

        if(!user || !user.isAdmin){
            let error = new Error('Not authorized');
            error.statusCode = 401
            throw error;
        }
        const users = await User.findAll();

        return res.status(200).json({
            message: 'User found successfull',
            users
        });
    }catch(err){
        next(err)

    }
}

export const deleteUser = async ( req, res, next )=>{
    const t = await sequelize.transaction();
    try{
        const id = req.params.id;
        if (!id) {
            let error = new Error('id not provided');
            error.statusCode = 404
            throw error;
        }
        const user = await User.findByPk(id,{transaction:t});

        if (!user) {
            let error = new Error('user not found');
            error.statusCode = 404
            throw error;
        }

        if ((req.user.isAdmin && !user.isAdmin )|| req.user.id == user.id){
            await user.destroy({transaction:t});
            await t.commit();
            return res.status(200).json({ message: 'User deleted successfully' });
        }else{
            let error = new Error('You are not authorized to delete the user');
            error.statusCode = 401
            throw error;
        }
    }catch(err){
        await t.rollback();
        next(err)
    }
}

export const updateUser = async (req, res, next) => {
    const t = await sequelize.transaction();

    const {
        firstName,
        middleName,
        lastName,
        email,
        password,
        phone,
        studentId,
        isAdmin,
        degreeType,
        batch,
        status,
        classField
    } = req.body;

    const image = req.files?.image?.[0]?.buffer || null;
    const idImage = req.files?.idImage?.[0]?.buffer || null;

    const id = req.params.id;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        if (!req.user.isAdmin && req.user.id != user.id ){
            const error = new Error('Not authorized');
            error.statusCode = 404;
            throw error;
        }

        let imageUrl = user.image;
        if (image) {
            imageUrl = await uploadToCloudinary(image, 'personalImages');
        }

        let idPictureUrl = user.idPicture;
        if (idImage) {
            idPictureUrl = await uploadToCloudinary(idImage, 'idImages');
        }

        let hashedPassword = user.password;
        if (password && password.length >= 6) {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        
        const updatedUser = await user.update({
            firstName: firstName ?? user.firstName,
            middleName: middleName ?? user.middleName,
            lastName: lastName ?? user.lastName,
            email: email ?? user.email,
            password: hashedPassword,
            phone: phone ?? user.phone,
            image: imageUrl,
            idPicture: idPictureUrl,
            studentId: studentId ?? user.studentId,
            isAdmin:  isAdmin || user.isAdmin,
            degreeType: degreeType || user.degreeType,
            batch: batch || user.batch,
            status: status || user.status,
            classField: classField || user.classField
        }, { transaction: t });

        await t.commit();


        return res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser,
            
        });

    } catch (err) {
        console.error(err);
        await t.rollback();
        next(err);
    }
};
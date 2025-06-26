import sequelize from '../config/db.js';
import User from  '../models/user.model.js'

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
            return res.status(400).json({ message: 'Please provide an ID' });
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


import sequelize from "../config/db.js";
import Book from "../models/book.model.js";
import BookHold from "../models/bookHold.model.js";
import User from "../models/user.model.js";

export const createHold = async ( req, res, next )=>{
    const t = await sequelize.transaction();
    const { userId, bookId } = req.body;
    try{
        const user = await User.findByPk(userId);
        const book = await Book.findByPk(bookId);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 15);
        if( !user ){
            const error = new Error('User not found')
            error.statusCode = 404;
            throw error;
        }

        if( !book ){
            const error = new Error('Book not found')
            error.statusCode = 404;
            throw error;
        }

        if(!book.rent){
            const error = new Error('Book not available to rent')
            error.statusCode = 404;
            throw error;
        }
        if(book.quantity == 0){
            const error = new Error('Not avialabe item to reserve a book')
            error.statusCode = 404;
            throw error; 
        }
        const bookhold = await BookHold.create({
            userId,
            bookId,
            expiresAt
        },{transaction:t})
        await t.commit();

        return res.status(201).json({
            message: 'Book Hold sucessfull',
            bookhold,
            user,
            book
        })

    }catch(err){
        await t.rollback();
        next(err)
    }
}


export const getAllHold = async ( req, res, next )=>{
    try{
         const bookholds = await BookHold.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'firstName', 'email'] 
                },
                {
                    model: Book,
                    as: 'book', 
                    attributes: ['id', 'title', 'author']
                }
            ]
        });

        return res.status(200).json({
            success:true,
            bookholds
        })

    }catch(err){
        next(err)
    }
}

export const getHoldByBook = async ( req, res, next )=>{
    try{
         const bookId = req.params.bookId;
         const bookholds = await BookHold.findAll({
            where:{bookId},
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'firstName', 'email'] 
                },
                {
                    model: Book,
                    as: 'book', 
                    attributes: ['id', 'title', 'author']
                }
            ]
        });

        return res.status(200).json({
            success:true,
            bookholds
        })

    }catch(err){
        next(err)
    }
}




export const deleteHold = async ( req, res, next )=>{

    const t = await sequelize.transaction();
    try{
        const id = req.params.id;
        if (!id) {
            let error = new Error('id book not found');
            error.statusCode = 404
            throw error;
        }
        if(!req.user.isAdmin){
            let error = new Error('You are not authorized to delete the reservation');
            error.statusCode = 401
            throw error;
        }
        const hold = await BookHold.findByPk(id,{transaction:t});

        if (!hold) {
            let error = new Error('reservation not found');
            error.statusCode = 404
            throw error;
        }

      
        await hold.destroy({transaction:t});
        await t.commit();
        return res.status(200).json({ message: 'reservation deleted successfully' });

        
    }catch(err){
        await t.rollback();
        next(err)
    }
}

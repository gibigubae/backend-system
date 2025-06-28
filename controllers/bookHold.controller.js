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
            bookhold
        })

    }catch(err){
        await t.rollback();
        next(err)
    }
}

export const getHold = async ( req, res, next )=>{
    try{
        const bookId = req.params.bookId;;
        const bookhold = await BookHold.findAll({where:{bookId}});

        if (!bookhold || bookhold.length === 0) {
            const error = new Error('Reserved Book not Found');
            error.statusCode = 409;
            throw error;
        }

        return res.status(200).json({
            success:true,
            bookhold
        })

    }catch(err){
        next(err)
    }
}

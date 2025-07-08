import sequelize from '../config/db.js';
import Book from '../models/book.model.js';
import { uploadToCloudinary } from '../utils/cloudinary.util.js';

export const getBook = async ( req, res, next )=>{
    try{
        const id = req.params.id;
        if (!id) {
            const error = new Error('Id not provided');
            error.statusCode = 404;
            throw error;
        }
        const book = await Book.findByPk(id);
        if (!book) {
            let error = new Error('book not found');
            error.statusCode = 404
            throw error;
        }
        return res.status(200).json({
            message: 'Book found successfull',
            book
        });
    }catch(err){
        next(err)

    }
}


export const createBook = async ( req, res, next )=>{
    const t = await sequelize.transaction()
    const image = req.file ? req.file.buffer : null;
    try{
        if(!req.user.isAdmin){
            let error = new Error('You are not authorized to create a book');
            error.statusCode = 401
            throw error;
        }
        const { title,price,quantity, author, category, description, link, rent, sell } = req.body;
        let imageUrl = ''
        if (image) {
            imageUrl = await uploadToCloudinary(image,'bookImages')
        }
        if(!title || !price || !quantity|| !author || !category || !description){
            const error = new Error('missing fields in create book');
            error.statusCode = 404;
            throw error;
        }
      
        const book = await Book.create({
            title,
            description,
            author,
            category,
            quantity,
            price,
            link: link || null,
            rent: rent || null,
            sell: sell || null,
            image: imageUrl|| null,
            
        },{transaction:t})

        await t.commit();
        return res.status(200).json({
            message: 'Book Created successfull',
            book
        });
        

    }catch(err){
        console.log(err)
        await t.rollback();
        next(err)

    }
}
export const getAllBook = async ( req, res, next )=>{
    try{
        const books = await Book.findAll();

        if(!books){
            let error = new Error('Books not found');
            error.statusCode = 404
            throw error;
        }


        return res.status(200).json({
            message: 'All book found successfull',
            books
        });
    }catch(err){
        next(err)

    }
}

export const deleteBook = async ( req, res, next )=>{
    const t = await sequelize.transaction();
    try{
        const id = req.params.id;
        if (!id) {
            let error = new Error('id book not found');
            error.statusCode = 404
            throw error;
        }
        if(!req.user.isAdmin){
            let error = new Error('You are not authorized to delete the book');
            error.statusCode = 401
            throw error;
        }
        const book = await Book.findByPk(id,{transaction:t});

        if (!book) {
            let error = new Error('book not found');
            error.statusCode = 404
            throw error;
        }

      
        await book.destroy({transaction:t});
        await t.commit();
        return res.status(200).json({ message: 'Book deleted successfully' });

        
    }catch(err){
        await t.rollback();
        next(err)
    }
}



export const updateBook = async ( req, res, next )=>{
    const t = await sequelize.transaction()
    const image = req.file ? req.file.buffer : null;
    try{
        const id = req.params.id;

        const { title, price, quantity,author, category, description, link, rent, sell } = req.body;
        if (!id) {
            let error = new Error('id not found');
            error.statusCode = 404
            throw error;
        }
        if(!req.user.isAdmin){
            let error = new Error('You are not authorized to delete the book');
            error.statusCode = 401
            throw error;
        }
        let imageUrl = ''
        if (image) {
            imageUrl = await uploadToCloudinary(image,'bookImages')
        }
        const book = await Book.findByPk(id,{transaction:t});
       
        const new_book = await book.update({
            title:title || book.title,
            description: description || book.description,
            author: author || book.title,
            category: category || book.category ,
            link: link || book.link,
            rent: rent || book.rent,
            sell: sell || book.sell,
            price: price || book.price,
            image: imageUrl|| book.image,
            quantity: quantity || book.quantity
            
        },{transaction:t})

        await t.commit();
        return res.status(200).json({
        message: 'Book updated successfull',
        new_book
        });
        
 

    }catch(err){
        console.log(err)
        await t.rollback();
        next(err)

    }
}

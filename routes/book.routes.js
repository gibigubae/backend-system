import { Router } from 'express'
import authorize from '../middlewares/auth.middleware.js';
import { createBook, deleteBook, getAllBook, getBook, updateBook } from '../controllers/book.controller.js';
import upload from '../utils/multer.util.js';



const bookRouter = Router();
bookRouter.get('/',authorize,getAllBook);
bookRouter.get('/:id',authorize,getBook);
bookRouter.post('/',authorize,upload.single('image'),createBook);
bookRouter.delete('/:id',authorize,deleteBook);
bookRouter.patch('/:id',authorize,upload.single('image'),updateBook)


export default bookRouter;
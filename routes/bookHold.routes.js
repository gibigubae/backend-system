import { Router } from 'express';
import { createHold, deleteHold, getAllHold,getHoldByBook } from '../controllers/bookHold.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const bookHoldRouter = Router();

bookHoldRouter.get('/',authorize,getAllHold);
bookHoldRouter.get('/:bookId',authorize,getHoldByBook);
bookHoldRouter.delete('/:id',authorize,deleteHold);
bookHoldRouter.post('/',authorize,createHold)


export default bookHoldRouter;
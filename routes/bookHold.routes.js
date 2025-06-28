import { Router } from 'express';
import { createHold, getHold } from '../controllers/bookHold.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const bookHoldRouter = Router();

bookHoldRouter.get('/',authorize,);
bookHoldRouter.get('/:bookId',authorize,getHold);
bookHoldRouter.delete('/:id',authorize,);
bookHoldRouter.post('/',authorize,createHold)


export default bookHoldRouter;
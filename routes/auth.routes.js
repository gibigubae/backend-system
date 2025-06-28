import {Router } from 'express'
import { signUp, signIn } from '../controllers/auth.controller.js';
import upload from '../utils/multer.util.js';
const authRouter = Router();

authRouter.post(
    '/sign-up',
    upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'idImage', maxCount: 1 }
    ]),
    signUp
);
authRouter.post('/sign-in',signIn);

export default authRouter;

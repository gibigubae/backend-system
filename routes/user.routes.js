import { Router } from 'express';
import { getUser, deleteUser, getAllUser, updateUser} from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';
import upload from '../utils/multer.util.js';

const userRouter = Router();

userRouter.get("/",authorize,getAllUser)
userRouter.get("/:id",authorize,getUser); 
userRouter.delete("/:id",authorize,deleteUser);
userRouter.patch(
    '/:id',
    authorize,
    upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'idImage', maxCount: 1 }
    ]),
    updateUser
);



export default userRouter
import { Router } from 'express';
import { getUser, deleteUser, getAllUser} from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';


const userRouter = Router();

userRouter.get("/",authorize,getAllUser)
userRouter.get("/:id",authorize,getUser); 
userRouter.delete("/:id",authorize,deleteUser);



export default userRouter
import { JWT_SECRET_KEY } from '../config/env.js';
import User  from '../models/user.model.js'
import jwt from 'jsonwebtoken';

const authorize = async (req, res, next) => {
  try{
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }

      if(!token){
        const error = new Error("Token not found");
        error.statusCode = 404;
        throw error;
      }

      const decoded = jwt.verify(token,JWT_SECRET_KEY)
      const user = await User.findByPk(decoded.userId);

      if(!user){
        const error = new Error("User not found different token may be used");
        error.statusCode = 404;
        throw error;
      }

      req.user = user;
      next();

  }catch(err){
    next(err)
  }
}

export default authorize;
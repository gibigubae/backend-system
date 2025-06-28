import  express from 'express';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import databaseConnection from './database/sequlize.js'
import { PORT } from './config/env.js';
import bookRouter from './routes/book.routes.js';
import bookHoldRouter from './routes/bookHold.routes.js';
import './jobs/cleanupExpiredHolds.js';


const port = PORT || 5500;

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())




app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/books',bookRouter);
app.use('/api/v1/bookHold',bookHoldRouter)
app.use(errorMiddleware)

app.listen(port,()=>{
    databaseConnection();
    console.log(`Gibi gubae backend system is live on http://localhost:${PORT}`)
})

// Connect to the database and start the server

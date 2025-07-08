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
import './models/index.model.js';

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

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const swaggerOptions = {
  definition: {
    openapi: '3.0.4',
    info: {
      title: 'Backednd API',
      version: '1.0.0',
      description: 'Gibigubae Documentation Example'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
  },
  apis: ['./api-docs/*.js'], 
};


const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




app.listen(port,()=>{
    databaseConnection();
    console.log(`Gibi gubae backend system is live on http://localhost:${PORT}`)
})



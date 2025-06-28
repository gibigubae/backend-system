import {config} from 'dotenv';

config({path:`.env.${process.env.NODE_ENV || 'development'}.local`})

export const {
    DB_PORT,
    DB_PASSWORD,
    DB_HOST,
    DB_DATABASE,
    DB_USERNAME,
    DB_DIALECT,
    JWT_SECRET_KEY,
    NODE_ENV,
    JWT_EXPIRES_IN,
    PORT,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env;

import { Sequelize } from 'sequelize';
import { DB_DATABASE, DB_DIALECT, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from './env.js';


const sequelize = new Sequelize({
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": DB_DIALECT
});

export default sequelize;

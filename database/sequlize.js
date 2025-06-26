import sequelize from '../config/db.js';

const databaseConnection = async ()=>{
    try{
        await sequelize.authenticate();
        console.log('Database connected');
        await sequelize.sync();
        console.log('Database synced');
    }catch(err){
        console.log(err);
        process.exit(1);
    }
} 
export default databaseConnection;

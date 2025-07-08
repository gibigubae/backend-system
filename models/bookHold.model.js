import sequelize from '../config/db.js';
import {DataTypes} from 'sequelize';


const BookHold = sequelize.define("BookHold", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' }
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Books', key: 'id' }
    },

    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,

    }
},
{
    timestamps:true
}
);



export default BookHold;
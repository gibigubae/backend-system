// models/index.js
import User from './user.model.js';
import BookHold from './bookHold.model.js';
import Book from './book.model.js'; // if you have it


User.hasMany(BookHold, { foreignKey: 'userId', onDelete: 'CASCADE' });
BookHold.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

Book.hasMany(BookHold, { foreignKey: 'bookId', onDelete: 'CASCADE' });
BookHold.belongsTo(Book, { foreignKey: 'bookId', onDelete: 'CASCADE' });

export {
  User,
  BookHold,
  Book
};

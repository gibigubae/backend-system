import sequelize from '../config/db.js';

import Field from '../models/field.model.js';
import User from '../models/user.model.js';
import About from '../models/about.model.js';
import Acknowledgment from '../models/acknowledment.model.js';
import Book from '../models/book.model.js';
import Event from '../models/event.model.js';
import Leader from '../models/leader.model.js';
import Notification from '../models/notification.model.js';
import Product from '../models/product.model.js';
import Quote from '../models/quote.model.js';
import BookHold from '../models/bookHold.model.js';

const databaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    await Field.sync({ alter: true });
    console.log('Field table synced');

    await User.sync({ alter: true });
    console.log('User table synced');

    await Promise.all([
      About.sync({ alter: true }),
      Acknowledgment.sync({ alter: true }),
      Book.sync({ alter: true }),
      BookHold.sync({ alter:true }),
      Event.sync({ alter: true }),
      Leader.sync({ alter: true }),
      Notification.sync({ alter: true }),
      Product.sync({ alter: true }),
      Quote.sync({ alter: true }),
    ]);
    console.log('Other models synced');

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default databaseConnection;

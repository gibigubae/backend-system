import BookHold from "../models/bookHold.model.js";
import Book from "../models/book.model.js"
import cron from 'node-cron';
import { Op } from "sequelize";


cron.schedule('0 * * * *', async () => {


  try {
    const now = new Date();
    const expireHolds = await BookHold.findAll({
      where: {
        expiresAt: {
          [Op.lt]: now, 
        },
      },
    });

    for(const hold of expireHolds){
        const eachBook = await Book.findByPk(hold.bookId);
        eachBook.quantity += 1;
        await eachBook.save()
    }

    const deletedCount = await BookHold.destroy({
      where: {
        expiresAt: {
          [Op.lt]: now,
        },
      },
    });
    console.log(`Deleted ${deletedCount} expired holds.`);
  } catch (err) {
    console.error('Failed to delete expired holds:', err);
  }
});

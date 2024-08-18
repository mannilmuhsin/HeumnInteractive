const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

exports.borrowBook = async (req, res) => {
  const { bookId } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (book.copies <= 0) {
      return res.status(400).json({ error: 'Book not available' });
    }
    const borrow = new Borrow({ user: req.user.id, book: bookId });
    await borrow.save();
    book.copies -= 1;
    await book.save();
    res.status(201).json(borrow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  const { borrowId } = req.body;
  try {
    const borrow = await Borrow.findByIdAndUpdate(borrowId, { returnDate: new Date() });
    const book = await Book.findById(borrow.book);
    book.copies += 1;
    await book.save();
    res.json({ message: 'Book returned' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.borrowHistory = async (req, res) => {
  try {
    const history = await Borrow.find({ user: req.user.id }).populate('book');
    res.json(history);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.mostBorrowedBooks = async (req, res) => {
  try {
    const books = await Borrow.aggregate([
      { $group: { _id: '$book', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $lookup: { from: 'books', localField: '_id', foreignField: '_id', as: 'book' } },
      { $unwind: '$book' }
    ]);
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.activeMembers = async (req, res) => {
  try {
    const members = await Borrow.aggregate([
      { $group: { _id: '$user', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' }
    ]);
    res.json(members);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.bookAvailability = async (req, res) => {
  try {
    const books = await Book.aggregate([
      {
        $facet: {
          totalBooks: [{ $count: 'total' }],
          borrowedBooks: [
            { $match: { copies: { $lt: 1 } } },
            { $count: 'borrowed' }
          ],
          availableBooks: [
            { $match: { copies: { $gte: 1 } } },
            { $count: 'available' }
          ]
        }
      }
    ]);
    res.json(books[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

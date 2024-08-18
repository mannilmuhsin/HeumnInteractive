const User = require('../models/User');
const Book = require('../models/Book');
const Borrow = require('../models/Borrow');

module.exports = {
  users: async () => {
    return await User.find();
  },
  books: async () => {
    return await Book.find();
  },
  borrowHistory: async (_, args, context) => {
    return await Borrow.find({ user: context.user.id }).populate('book');
  },
  addUser: async ({ name, email, password }) => {
    const user = new User({ name, email, password });
    return await user.save();
  },
  addBook: async ({ title, author, ISBN, publicationDate, genre, copies }) => {
    const book = new Book({ title, author, ISBN, publicationDate, genre, copies });
    return await book.save();
  },
  borrowBook: async ({ bookId }, context) => {
    const book = await Book.findById(bookId);
    if (book.copies <= 0) throw new Error('Book not available');
    const borrow = new Borrow({ user: context.user.id, book: bookId });
    await borrow.save();
    book.copies -= 1;
    await book.save();
    return borrow;
  },
  returnBook: async ({ borrowId }) => {
    const borrow = await Borrow.findByIdAndUpdate(borrowId, { returnDate: new Date() });
    const book = await Book.findById(borrow.book);
    book.copies += 1;
    await book.save();
    return borrow;
  }
};

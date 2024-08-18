const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  const { title, author, ISBN, publicationDate, genre, copies } = req.body;
  try {
    const book = new Book({ title, author, ISBN, publicationDate, genre, copies });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listBooks = async (req, res) => {
  const { genre, author } = req.query;
  const query = {};
  if (genre) query.genre = genre;
  if (author) query.author = author;

  try {
    const books = await Book.find(query).limit(10).skip(0);
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

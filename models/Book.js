const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, required: true, unique: true },
  publicationDate: { type: Date },
  genre: { type: String },
  copies: { type: Number, default: 1 }
});

module.exports = mongoose.model('Book', BookSchema);

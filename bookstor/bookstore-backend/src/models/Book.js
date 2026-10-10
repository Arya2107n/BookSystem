const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    author: { type: String, required: [true, 'Author is required'], trim: true },
    genre: { type: String, trim: true },
    price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price cannot be negative'] },
    stock: { type: Number, default: 0, min: [0, 'Stock cannot be negative'] },
    publishedYear: { type: Number },
    isbn: { type: String, unique: true, sparse: true, trim: true },
  },
  { timestamps: true }
);

bookSchema.index({ title: 1 });
bookSchema.index({ author: 1 });

module.exports = mongoose.model('Book', bookSchema);

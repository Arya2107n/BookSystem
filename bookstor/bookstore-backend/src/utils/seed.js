require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../models/Book');

const books = [
  { title: 'Atomic Habits', author: 'James Clear', genre: 'Self-help', price: 499, stock: 20, publishedYear: 2018, isbn: '9780735211292' },
  { title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', price: 299, stock: 35, publishedYear: 1988, isbn: '9780062315007' },
  { title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', genre: 'Biography', price: 250, stock: 40, publishedYear: 1999, isbn: '9788173711466' },
  { title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', genre: 'Finance', price: 350, stock: 25, publishedYear: 1997, isbn: '9781612680194' },
  { title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'History', price: 599, stock: 15, publishedYear: 2011, isbn: '9780062316097' },
  { title: 'Deep Work', author: 'Cal Newport', genre: 'Self-help', price: 450, stock: 18, publishedYear: 2016, isbn: '9781455586691' },
  { title: 'The Psychology of Money', author: 'Morgan Housel', genre: 'Finance', price: 399, stock: 30, publishedYear: 2020, isbn: '9780857197689' },
  { title: "Harry Potter and the Philosopher's Stone", author: 'J.K. Rowling', genre: 'Fantasy', price: 550, stock: 50, publishedYear: 1997, isbn: '9780747532699' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', price: 320, stock: 22, publishedYear: 1960, isbn: '9780061120084' },
  { title: '1984', author: 'George Orwell', genre: 'Dystopian', price: 275, stock: 28, publishedYear: 1949, isbn: '9780451524935' },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', price: 420, stock: 17, publishedYear: 1937, isbn: '9780547928227' },
  { title: 'Think and Grow Rich', author: 'Napoleon Hill', genre: 'Self-help', price: 199, stock: 45, publishedYear: 1937, isbn: '9781585424337' },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Book.deleteMany();
    await Book.insertMany(books);
    console.log(`Seeded ${books.length} books`);
  } catch (err) {
    console.error(err.message);
  } finally {
    await mongoose.disconnect();
  }
})();

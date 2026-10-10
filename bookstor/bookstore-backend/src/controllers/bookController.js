const Book = require('../models/Book');

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// CREATE
exports.createBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};

// READ ALL: search + filter + sort + pagination
exports.getBooks = async (req, res, next) => {
  try {
    const {
      search,
      genre,
      author,
      minPrice,
      maxPrice,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (search) {
      const safe = escapeRegex(String(search));
      filter.$or = [
        { title: { $regex: safe, $options: 'i' } },
        { author: { $regex: safe, $options: 'i' } },
      ];
    }

    if (genre) filter.genre = { $regex: `^${escapeRegex(String(genre))}$`, $options: 'i' };
    if (author) filter.author = { $regex: escapeRegex(String(author)), $options: 'i' };

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const allowedSort = ['title', 'author', 'price', 'stock', 'publishedYear', 'createdAt'];
    const sortField = allowedSort.includes(sort) ? sort : 'createdAt';
    const sortOrder = order === 'asc' ? 1 : -1;

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit) || 10, 1), 100);
    const skip = (pageNum - 1) * limitNum;

    const [books, total] = await Promise.all([
      Book.find(filter).sort({ [sortField]: sortOrder }).skip(skip).limit(limitNum),
      Book.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      hasNext: pageNum < totalPages,
      hasPrev: pageNum > 1,
      count: books.length,
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

// READ ONE
exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
};

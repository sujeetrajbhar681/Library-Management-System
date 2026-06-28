const Book = require('../Model/Book');

// GET all books (with optional search)
const getAllBooks = async (req, res) => {
    try {
        const search = req.query.search || '';
        let query = {};
        if (search) {
            query = { title: { $regex: search, $options: 'i' } };
        }
        const books = await Book.find(query).sort({ createdAt: -1 });
        res.render('books/index', {
            books,
            search,
            success: req.query.success || '',
            error: req.query.error || ''
        });
    } catch (err) {
        res.redirect('/books?error=Failed to fetch books');
    }
};

// GET add book form
const getAddBook = (req, res) => {
    res.render('books/add', { error: '' });
};

// POST add new book
const addBook = async (req, res) => {
    try {
        const { title, author, category, isbn, publicationYear, quantity, availableCopies } = req.body;
        await Book.create({ title, author, category, isbn, publicationYear, quantity, availableCopies });
        res.redirect('/books?success=Book added successfully');
    } catch (err) {
        let errorMsg = 'Failed to add book';
        if (err.code === 11000) errorMsg = 'ISBN already exists';
        res.render('books/add', { error: errorMsg });
    }
};

// GET edit book form
const getEditBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.redirect('/books?error=Book not found');
        res.render('books/edit', { book, error: '' });
    } catch (err) {
        res.redirect('/books?error=Failed to load book');
    }
};

// PUT update book
const updateBook = async (req, res) => {
    try {
        const { title, author, category, isbn, publicationYear, quantity, availableCopies } = req.body;
        await Book.findByIdAndUpdate(req.params.id, {
            title, author, category, isbn, publicationYear, quantity, availableCopies
        }, { new: true, runValidators: true });
        res.redirect('/books?success=Book updated successfully');
    } catch (err) {
        let errorMsg = 'Failed to update book';
        if (err.code === 11000) errorMsg = 'ISBN already exists';
        const book = await Book.findById(req.params.id);
        res.render('books/edit', { book, error: errorMsg });
    }
};

// DELETE book
const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect('/books?success=Book deleted successfully');
    } catch (err) {
        res.redirect('/books?error=Failed to delete book');
    }
};

module.exports = { getAllBooks, getAddBook, addBook, getEditBook, updateBook, deleteBook };

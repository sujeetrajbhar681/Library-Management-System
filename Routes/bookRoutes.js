const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    getAddBook,
    addBook,
    getEditBook,
    updateBook,
    deleteBook
} = require('../Controller/bookController');

router.get('/', getAllBooks);
router.get('/add', getAddBook);
router.post('/add', addBook);
router.get('/edit/:id', getEditBook);
router.put('/edit/:id', updateBook);
router.delete('/delete/:id', deleteBook);

module.exports = router;

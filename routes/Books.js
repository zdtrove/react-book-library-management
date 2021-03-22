const router = require('express').Router()
const BooksController = require('../controllers/BooksController')
const auth = require('../middlewares/auth')
const { validateUpdateBook, validateAddBook } = require('../middlewares/validator')

router.get('/books', BooksController.getBooks)
router.post('/books/insertBooks', auth, BooksController.insertBooks)
router.post('/book', auth, validateAddBook(), BooksController.addBook)
router.put('/book/:bookId', auth, validateUpdateBook(), BooksController.updateBook);
router.delete('/book/:bookId', auth, BooksController.deleteBook);

module.exports = router
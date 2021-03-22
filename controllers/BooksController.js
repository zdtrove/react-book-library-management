const Book = require('../models/Book')
const HttpStatus = require('http-status-codes');
const { validationResult } = require('express-validator');
const config = require('../config')

module.exports = {
    getBooks: async (req, res) => {
        try {
            let { start } = req.query
            let querySearch = {}
            if (req.query.title) {
                querySearch.title = {
                    $regex: req.query.title
                }
            }
            if (req.query.categories) {
                querySearch.categories = {
                    $regex: req.query.categories
                }
            }
            if (req.query.price) {
                querySearch.price = {
                    $lte: req.query.price
                }
            }
            const books = await Book.find(querySearch).skip(parseInt(start)).limit(config.PER_PAGE).select().sort({_id: -1})
            let total = null;
            await Book.countDocuments(querySearch, function( err, count){
                total = count;
            })
            res.json({ books: books, total: total })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errors: { msg: "Server Error" } });
        }
    },
    insertBooks: async (req, res) => {
        try {
            let data = []
            for (let i = 1; i < 100; i++) {
                data.push({
                    title: `New Book __${i}`,
                    price: Math.round(Math.random() * 1000)
                })
            }
            await Book.insertMany(data);
            res.json(data);
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errors: { msg: "Server Error" } });
        }
    },
    addBook: async (req, res) => {
        const image = req.files.image
        image.mv(`./uploads/${image.name}`, err => {
            if (err) {
                console.error(err);
            } else {
                console.log('upload success')
            }
        })
        const imageName = image.name;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            let errs = {};
            result.errors.forEach(err => {
                errs[err.param] = err.msg;
            });
            return res.status(HttpStatus.BAD_REQUEST).json({ errors: errs });
        }
        try {
            const { title, price, inStore, categories } = req.body;
            const newBook = Book({ title, price, inStore, categories, image: imageName });
            await newBook.save(err => {
                if (err) return res.status(HttpStatus.BAD_REQUEST).json({ errors: { email: err } });
            });
            res.json(newBook);
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({ errors: { msg: err } });
        }
    },
    updateBook: async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            let errs = {};
            result.errors.forEach(err => {
                errs[err.param] = err.msg;
            });
            return res.status(HttpStatus.BAD_REQUEST).json({ errors: errs });
        }
        const { title, price, inStore, categories } = req.body;
        const bookUpdate = { title, price, inStore, categories };
        try {
            let book = await Book.findById(req.params.bookId);
            if (!book) {
                return res.status(HttpStatus.BAD_REQUEST).json({ msg: 'Book not found' });
            }
            book = await Book.findByIdAndUpdate(req.params.bookId, { $set: bookUpdate }, { new: true });
            res.json(book);
        } catch (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errors: { msg: 'Server Error' } });
        }
    },
    deleteBook: async (req, res) => {
        try {
            let book = await Book.findById(req.params.bookId);
            if (!book) {
                return res.status(HttpStatus.BAD_REQUEST).json({errors: {msg: 'Book not found'}});
            }
            await Book.findByIdAndRemove(req.params.bookId);
            res.json({success: {msg: 'Book removed'}});
        } catch (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({errors: {msg: 'Server Error'}});
        }
    },
}
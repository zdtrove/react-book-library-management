const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'images/product-1.PNG'
    },
    price: {
        type: Number,
        required: true
    },
    inCart: {
        type: Boolean,
        default: false
    },
    count: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    inStore: {
        type: Number,
        default: 5
    },
    categories: {
        type: String,
        default: 'Category 1'
    }
})

const BookModel = mongoose.model('book', BookSchema)

module.exports = BookModel
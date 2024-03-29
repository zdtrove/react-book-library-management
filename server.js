if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const fileUpload = require('express-fileupload');
const { MONGODB_URL_LOCAL } = require('./config');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(fileUpload());
app.use("/uploads", express.static(__dirname + '/uploads'));

// Connect MongoDB
mongoose.connect(MONGODB_URL_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('Connected to MongoDB'));

// Routes
app.use('/api/auth', require('./routes/Users'));
app.use('/api/books', require('./routes/Books'));

// Run server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express'); // imports express
const connectDB = require('./config/db'); // for connecting db

const app = express(); // creates instance of express

// Connects Database
connectDB();

// get for testing
app.get('/', (req, res, next) => {
    res.send('API Running');
})


// Port will listen on environment variable first, or 5000
const PORT = process.env.PORT || 5000;

// Starts server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
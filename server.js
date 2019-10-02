const express = require('express'); // imports express
const connectDB = require('./config/db'); // for connecting db

const app = express(); // creates instance of express

// Connects to MongoDB Database through AtlasDB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

/*
// Get Route for Testing
app.get('/', (req, res, next) => {
    res.send('API Running');
})
*/

// Routing
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/drives', require('./routes/api/drives'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

// Port will listen on environment variable first, or 5000
const PORT = process.env.PORT || 5000;

// Starts server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

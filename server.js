const express = require('express'); // imports express
const connectDB = require('./config/db'); // for connecting db
const path = require('path'); // for manipulating path routing

const app = express(); // creates instance of express

// Connects to MongoDB Database through AtlasDB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Routing
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/drives', require('./routes/api/drives'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

// Serve static assests in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // Serves index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
  });
}

// Port will listen on environment variable first, or 5000
const PORT = process.env.PORT || 5000;

// Starts server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

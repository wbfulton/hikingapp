// imports express
const express = require('express');
// creates instance of express
const app = express();
// port will listen on environment variable first, or 5000
const PORT = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
    res.send('API Running');
})

// starts server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
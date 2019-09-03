const express = require('express'); // imports express
const router = express.Router(); // creates router

// @route  GET api/posts
// @desc   Test route
// @access Public
router.get('/', (req, res, next) => {
    res.send('posts route');
})

module.exports = router;
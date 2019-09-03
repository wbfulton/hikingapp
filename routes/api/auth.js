const express = require('express'); // imports express
const router = express.Router(); // creates router

// @route  GET api/auth
// @desc   Test route
// @access Public
router.get('/', (req, res, next) => {
    res.send('auth route');
})

module.exports = router;
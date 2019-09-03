const express = require('express'); // imports express
const router = express.Router(); // creates router

// @route  GET api/users
// @desc   Test route
// @access Public
router.get('/', (req, res, next) => {
    res.send('user route');
})

module.exports = router;
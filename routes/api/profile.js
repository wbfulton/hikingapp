const express = require('express'); // imports express
const router = express.Router(); // creates router

// @route  GET api/profile
// @desc   Test route
// @access Public
router.get('/', (req, res, next) => {
    res.send('profile route');
})

module.exports = router;
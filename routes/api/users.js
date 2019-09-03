const express = require('express'); // imports express
const router = express.Router(); // creates router

// @route  POST api/users
// @desc   Register user
// @access Public
router.post('/', (req, res, next) => {
    console.log(req,body)
    res.send('user route');
})

module.exports = router;
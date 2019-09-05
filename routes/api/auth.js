const express = require('express'); // imports express
const router = express.Router(); // creates router

// Import password encryption
const bcrypt = require('bcryptjs'); // imports bcryptjs

// Import Validation and Authentication
const auth = require('../../middleware/auth'); // imports custom auth method
const { check, validationResult } = require('express-validator'); // for validation
const jwt = require('jsonwebtoken'); // imports jwt
const config = require('config'); // imports config file

// Import Model
const User = require('../../models/User');

// @route  GET api/auth
// @desc   Gets authenticated user information
// @access Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route  POST api/auth
// @desc   Authenticate user and get token (login)
// @access Public
router.post('/', 
[ // checks required fields
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], // handles routing and database validation
async (req, res) => {

    // checks and sends req.body data errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res
            .status(400)
            .json({ errors: errors.array() });
    }

    const { email, password} = req.body; // pull variables out

    try {
        // gets user with that email
        let user = await User.findOne({ email });

        // checks if user with that email exists
        if(!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // checks if pasword matches
        const isMatch = await bcrypt.compare(password, user.password);

        // throws error if password does not match
        if(!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // creates payload with user id
        const payload = {
            user: {
                id: user.id
            }
        }

        // signs jwt for auth, change time to 360000 before deployment
        // returns jwt
        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 3600000000 }, 
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})


module.exports = router;
const express = require('express'); // imports express
const router = express.Router(); // creates router
const gravatar = require('gravatar'); // imports gravatar
const bcrypt = require('bcryptjs'); // imports bcryptjs
const jwt = require('jsonwebtoken'); // imports jwt
const config = require('config'); // imports config
const { check, validationResult } = require('express-validator'); // for validation

const User = require('../../models/User'); // mongoose User model

// @route  POST api/users
// @desc   Register user
// @access Public
router.post('/', 
[ // checks required fields
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password',
        'Please enter a password with more than 6 characters')
        .isLength({ min: 6 })
], // handles routing and database validation
async (req, res, next) => {

    // sends errors if they exist
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res
            .status(400)
            .json({ errors: errors.array() });
    }

    const { name, email, password} = req.body; // pull variables out

    try {
        // Sees if user exists
        let user = await User.findOne({ email });

        if(user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'User already exists' }] });
        }

        // Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200', // default size
            r: 'pg', // rating
            d: 'mm' // default photo
        });

        // creates new instance of user with model
        user = new User({
            name,
            email,
            avatar,
            password
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        // saves user to the database
        await user.save();

        // Return jsonwebtoken
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
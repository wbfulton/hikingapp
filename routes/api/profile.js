const express = require('express'); // imports express
const router = express.Router(); // creates router
const auth = require('../../middleware/auth'); // imports middlware
const { check, validationResult } = require('express-validator'); // for validation

// Imported Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get('/me', auth, async (req, res, next) => {
    try {
        // finds profile with user id from JWT, adds name and avatar fields
        const profile = await Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Sever Error')
    }
})

// @route  POST api/profile
// @desc   Create or update user profile
// @access Private
router.post('/', 
[ 
    auth, 
    check('type', 'Type is required')
        .not()
        .isEmpty(),
    check('skills', 'Skills is required')
        .not()
        .isEmpty()
], 
async (req, res) => {
    // returns errors if type or skills are empty
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    // sets all profile fields to variables
    const {
        grade,
        type,
        skills,
        resort,
        bio,
        driver,
        facebook,
        twitter,
        instagram
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (grade) profileFields.grade = grade;
    if (type) profileFields.type = type;
    if (resort) profileFields.resort = resort;
    if (bio) profileFields.bio = bio;
    if (driver) profileFields.driver = driver;
    if (skills) {
        // maps through skills list and transforms into array
        // while mapping it trims off whitespace
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {}
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.twitter = facebook;
    if(instagram) profileFields.social.twitter = instagram;
    
    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if(profile) { // Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields }, 
                { new: true}
                );

            return res.json(profile);
        } else { // Create
            profile = new Profile(profileFields);
            await Profile.save();
        }
        res.json(profile);

    } catch (err){
        if(err){
            console.error(err.message);
            res.statuss(500).send('Server Error');
        }
    }
})

module.exports = router;
const express = require('express'); // imports express
const router = express.Router(); // creates router

// Import Validation and Authentication
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// Imported Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post')

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get('/me', auth, async (req, res, next) => {
  try {
    // finds profile with user id from JWT, adds name and avatar fields
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/profile
// @desc   Get all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    // adds name and avatar from user collection
    const profiles = await Profile.find().populate('user', ['name', 'avatar', 'messenger']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    // adds name and avatar from user collection
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    // checks if a profile exists
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    // if the Id is not valid, there is no profile
    //  it is not a server error
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route  POST api/profile
// @desc   Create or Update user profile
// @access Private
router.post(
  '/',
  // verification middleware
  [
    auth,
    [
      check('type', 'Type is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty(),
      check('driver', 'Driver is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // returns errors if type or skills are empty
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // sets all profile fields to variables
    const {
      grade,
      type,
      skills,
      resort,
      pass,
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
    if (pass) profileFields.pass = pass;
    if (bio) profileFields.bio = bio;
    if (driver) profileFields.driver = driver;
    if (skills) {
      // maps through skills list and transforms into array
      // while mapping it trims off whitespace
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true },
          (useFindAndModify = false)
        );

        return res.json(profile);
      } else {
        // Create
        profile = new Profile(profileFields);
        await profile.save();
      }
      res.json(profile);
    } catch (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  }
);

// @route  DELETE api/profile
// @desc   Delete profile, user & posts
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove users posts
    await Post.deleteMany({ user: req.user.id });

    // @todo - remove users drives

    // Remove profile with id in token
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

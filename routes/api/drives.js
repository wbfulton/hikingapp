const express = require('express'); // imports express
const router = express.Router(); // creates router

// Import Validation and Authentication
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// Import Models
const User = require('../../models/User');
const Profile = require('../../models/Profile')
const Drive = require('../../models/Drive');

// @route  Get api/drives
// @desc   Gets all drives
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        // gets all drives and sorts them by the date they leave
        const drives = await Drive.find().sort({ leavingDate : -1 });
        res.json(drives);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  Get api/drives/:id
// @desc   Gets a drive by id
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        // gets all drives and sorts them by the date they leave
        const drive = await Drive.findById(req.params.id);

        if(!drive) return res.status(404).json({ msg: 'Drive not found'});

        res.json(drive);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') return res.status(404).json({ msg: 'Drive not found'});
        res.status(500).send('Server Error');
    }
});

// @route  GET api/drives/dashboard/me
// @desc   Get drives a user made and has taken a part of
// @access Private
router.get('/dashboard/me', auth, async (req, res) => {
    try {
        // gets all posts that have a userID in thier group
        const drives = await Drive.find({ 'group.user' : req.user.id }).sort({ date: -1 });

        res.json(drives);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST api/drives
// @desc   Create a drive and initialize group for that drive
// @access Private
router.post('/', 
[ 
    auth, 
    [
        check('leavingDate', 'Date is required')
            .not()
            .isEmpty(),
        check('leavingTime', 'Time is required')
            .not()
            .isEmpty(),
        check('resort', 'Resort is required')
            .not()
            .isEmpty(),
        check('seats', 'Seats are required')
            .not()
            .isEmpty(),
        check('description', 'Description is required')
            .not()
            .isEmpty(),
    ]
], 
async (req, res) => {
    // returns errors if any fields are empty
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const profile = await Profile.findOne({ user : req.user.id });

        const newDrive = new Drive ({
            user : req.user.id,
            name : user.name,
            avatar : user.avatar,
            leavingDate : req.body.leavingDate,
            resort : req.body.resort,
            seats : req.body.seats,
            description : req.body.description,
            group : [ { // initialzies group array with the driver
                user : req.user.id,
                name : user.name,
                avatar : user.avatar,
                grade : profile.grade,
                type : profile.type,
                skills : profile.skills
            }]
        });

        // save drive to database
        const drive = await newDrive.save();

        res.json(drive);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;
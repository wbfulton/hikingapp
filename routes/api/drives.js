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
        check('leavingDate', 'Date is required')
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
            leavingTime : req.body.leavingTime,
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
        // if an invlid objectId is sent
        if(err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Drive not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route  PUT api/drives/:id
// @desc   Update a drives info
// @access Private
router.put('/:id', 
[ 
    auth, 
    [
        check('leavingDate', 'Date is required')
            .not()
            .isEmpty(),
        check('leavingDate', 'Date is required')
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
        let drive = await Drive.findById(req.params.id);

        // Check if drive exists
        if(!drive) return res.status(404).json({ msg: 'Drive not found' });

        // Checks if drive belongs to user
        if(drive.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not Authorized' });
        }

        // sets all drive fields to variables
        const {
            leavingDate,
            leavingTime,
            resort,
            seats,
            description,
        } = req.body;

        // all fields are required
        let driveFields = {};
        driveFields.user = req.user.id;
        driveFields.avatar = user.avatar;
        driveFields.leavingDate = leavingDate;
        driveFields.leavingTime = leavingTime;
        driveFields.resort = resort;
        driveFields.seats = seats;
        driveFields.description = description;
        
        drive = await Drive.findOneAndUpdate(
            { _id: req.params.id }, 
            { $set: driveFields }, 
            { new: true},
            useFindAndModify = false);

        return res.json(drive);
    } catch (err) {
        console.error(err.message);
        // if an invalid objectId is sent
        if(err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Drive not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/drives/:id
// @desc   Deletes a drive
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const drive = await Drive.findById(req.params.id);

        // Check if drive exists
        if(!drive) return res.status(404).json({ msg: 'Drive not found'});

        // Check user
        if(drive.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized'});
        }

        await drive.remove();

        res.json({ msg: 'Drive removed'});
    } catch (err) {
        console.error(err.message);
        // if an invlid objectId is sent
        if(err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Drive not found' });
        }
    }
});

// @route  PUT api/drives/join/:id
// @desc   Joins a drive
// @access Private
router.put('/join/:id', auth, async (req, res) => {
    try {
        const drive = await Drive.findById(req.params.id);
        const user = await User.findById(req.user.id);
        const profile = await Profile.findOne({ user: req.user.id });

        // Check if drive exists
        if(!drive) return res.status(404).json({ msg: 'Drive not found' });

        // Check if user already joined drive
        if(drive.group.filter(join => join.user.toString() === user.id).length > 0){
            return res.status(400).json({ msg: 'Drive already joined' })
        }

        // Creating object to add to array
        // Necessary in case user has not created a profile
        const joinFields = {};
        joinFields.user = user.id;
        joinFields.name = user.name;
        joinFields.avatar = user.avatar;
        if(profile.grade) joinFields.grade = profile.grade;
        if(profile.type) joinFields.type = profile.type;
        if(profile.skills) joinFields.skills = profile.skills;

        drive.group.unshift(joinFields);

        await drive.save();

        res.json(drive.group);  
    } catch (err) {
        console.error(err.message);
        // if an invalid objectId is sent
        if(err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Drive not found' });
        }
    }
});

// @route  PUT api/drives/join/:id
// @desc   Leaves a drive
// @access Private
router.put('/leave/:id', auth, async (req, res) => {
    try {
        const drive = await Drive.findById(req.params.id);

        // Check if drive exists
        if(!drive) return res.status(404).json({ msg: 'Drive not found' });

        // Check if user joined drive
        if(drive.group.filter(join => join.user.toString() === req.user.id).length === 0){
            return res.status(400).json({ msg: 'Drive not joined' })
        }

        // Get remove index
        const removeIndex = drive.group
            .map(join => join.user.toString())
            .indexOf(req.user.id);

        drive.group.splice(removeIndex, 1);

        await drive.save();

        res.json(drive.group);  
    } catch (err) {
        console.error(err.message);
        // if an invalid objectId is sent
        if(err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Drive not found' });
        }
    }
});

// @route  POST api/drives/comment/:id
// @desc   Comment on a post
// @access Private
router.post('/comment/:id', 
// verfication middleware
[ 
    auth, 
    [
        check('text', 'Text is required')
            .not()
            .isEmpty()
    ]
], 
async (req, res) => {
    // returns errors if text is empty
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const drive = await Drive.findById(req.params.id);

        const newComment = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });
        
        drive.comments.unshift(newComment);

        // saves post to database
        await drive.save();

        res.json(drive.comments);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') return res.status(404).json({ msg: 'Drive not found'});
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/drives/comment/:id/:comment_id
// @desc   Delete comment on a post
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const drive = await Drive.findById(req.params.id);
        
        // Pull our comment
        const comment = drive.comments.find(comment => comment.id === req.params.comment_id);

        // Make sure comment exists
        if(!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        // Check user
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Get remove index
        const removeIndex = drive.comments
            .map(comment => comment.user.toString())
            .indexOf(req.user.id);
        
        drive.comments.splice(removeIndex, 1);

        // saves post to database
        await drive.save();

        res.json(drive.comments);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') return res.status(404).json({ msg: 'Drive not found'});
        res.status(500).send('Server Error');
    }
});

module.exports = router;
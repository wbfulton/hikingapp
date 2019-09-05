const express = require('express'); // imports express
const router = express.Router(); // creates router

// Import Validation and Authentication
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// Import Models
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route  GET api/posts
// @desc   Get all posts
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        // gets all dates by most recent
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/posts/:id
// @desc   Get post by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) return res.status(404).json({ msg: 'Post not found'});

        res.json(post);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found'});
        res.status(500).send('Server Error');
    }
});


// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post('/', 
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
        return res.status(400).json( { erros: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });
        
        // saves post to database
        const post = await newPost.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/posts
// @desc   Delete a post
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if post exists
        if(!post) return res.status(404).json({ msg: 'Post not found'});

        // Check user
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized'});
        }

        await post.remove();

        res.json({ msg: 'Post removed'});
    } catch (err) {
        console.error(err.message);
        if(err.kind ==='ObjectId') return res.status(404).json({ msg: 'Post not found'});
        res.status(500).send('Server Error');
    }
});

module.exports = router;
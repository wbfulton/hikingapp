const mongoose = require('mongoose'); // imports mongoose

// PostSchema holds a User model
// Required Fields type, skills, driver
// Optional Fields grade, resort, pass, bio, social links (twitter, facebook, instagram)
// Default field date timestamped to current time
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  grade: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  exp: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  hike: {
    type: String
  },
  passes: {
    type: [String]
  },
  bio: {
    type: String
  },
  driver: {
    type: Boolean,
    default: false
  },
  social: {
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);

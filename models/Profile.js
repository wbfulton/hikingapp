const mongoose = require('mongoose'); // imports mongoose

// create the Profile Schema contains:
//      grade
//      type is board or ski,
//      skills
//      resort is favorite resort
//      bio
//      driver, indicates if they are a driver or not
//      social, media links
//      date, date created
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
  skills: {
    type: [String],
    required: true
  },
  resort: {
    type: String
  },
  pass: {
    type: String
  },
  bio: {
    type: String
  },
  driver: {
    type: Boolean,
    default: false
  },
  social: [
    {
      twitter: {
        type: String
      },
      facebook: {
        type: String
      },
      instagram: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);

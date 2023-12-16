const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Student', 'Teacher'],
    required: true
  },
  instituteName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Add a regex pattern for email validation if needed
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

const User = mongoose.model('users', userSchema);
module.exports = User;

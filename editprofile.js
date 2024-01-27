const express = require('express');
const User = require('./userModel');
const mongoose = require('mongoose');

const router = express.Router();

router.post('/', async (req, res) => {
  if(!req.session.isAuth){
    console.log("not auth");
    return res.status(400);

  }
  try {
    const { username, institute, className, sectionName } = req.body;
    console.log(req.body);

    if (!username || !institute || !className || !sectionName) {
      return res.status(400).json({ success: false, message: 'Please fill in all fields' });
    }
    await mongoose.connect("mongodb://localhost:27017/manashealth");
    const userEmail = req.session.userData.email; // Assuming you have user information in the request

    await User.findOneAndUpdate(
      {email:userEmail},
      { username, instituteName:institute, className, sectionName },
    );

    return res.status(200).json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error editing user profile:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;

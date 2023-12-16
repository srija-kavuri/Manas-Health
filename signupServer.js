const express=require('express')
const mongoose = require('mongoose');
const User = require('./userModel.js')

const router=express.Router();

router.post('/', async (req, res) => {
  console.log(req.body); // Access form data
  const username = req.body.username;
  const category = req.body.category;
  const instituteName = req.body.schoolName;
  const email = req.body.email;
  const password = req.body.password;

  const userData = { username, category, instituteName, email, password };
  // console.log(userData);

  try {
    await mongoose.connect("mongodb://localhost:27017/manashealth");
    // Use await with insertMany to handle the promise
    await User.insertMany([userData]);

    console.log('User inserted successfully!');
    res.send('Success');
  } catch (error) {
    if (error.code === 11000) {
      console.error('Duplicate key error:', error.errmsg);
      res.status(400).send(`Account with the email already exists.`);
    } else {
      // Handle other MongoDB errors
      console.error('MongoDB error:', error);
      res.status(500).send('Internal Server Error.');
    }
  }finally{
    await mongoose.disconnect();
    console.log('mongoose disconnected');
  }
});

module.exports=router;
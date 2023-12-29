const express=require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./userModel.js');
const sendMail=require('./OTP/sendOtp.js');

const router=express.Router();

router.post('/', async (req, res) => {
  const username = req.body.username;
  const category = req.body.category;
  const instituteName = req.body.schoolName;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const userData = { username, category, instituteName, email,hashedPassword};
    await mongoose.connect("mongodb://localhost:27017/manashealth");
    console.log("mongoose connected");
    const findUser = await User.findOne({email});
    if(findUser){
      res.status(400).send(`Account with the email already exists.`);
    }else{
      req.session.userData=userData;
      otp = sendMail.generateOTP(4);
      sendMail.sendOTP(email, username);
      req.session.otp=otp;
      res.send("Success");
    }
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
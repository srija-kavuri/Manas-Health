const express = require('express');
const mongoose = require('mongoose');
const sendEmail = require('OTP/sendOtp.js');
const sendMail = express.Router();
const verifyOTP = express.Router();
const changePassword = express.Router();

sendMail.post('/sendMail', async (res, req)=>{
  email = req.body.email;
  try{
    await mongoose.connect("mongodb://localhost:27017/manashealth");
    const findUser = await User.findOne({email});
    if(findUser){
      req.session.userData = findUser;
      username = findUser.username;
      otp=sendEmail.generateOTP(4);
      await sendEmail.sendOTP(email, username);
      req.session.otp=otp;
      return res.send("sent");
    }

    res.send("email not found");
  }catch(error){
    res.send("Error sending mail. Plase try again.");
    console.log(error);
  }finally{
    await mongoose.disconnect();
  }
})

verifyOTP.post('/verifyOTP', (res,req)=>{
  userEnteredOtp = req.body.otp;
  if(req.session.otp===userEnteredOtp){
    res.send("verified");
  }else{
    res.send("wrong Otp");
  }
})

changePassword.post('/change', (req, res)=>{
  
})
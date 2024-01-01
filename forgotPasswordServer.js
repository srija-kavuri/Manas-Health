const express = require('express');
const mongoose = require('mongoose');
const User = require('./userModel.js');
const bcrypt = require('bcrypt');

const sendEmail = require('./OTP/sendOtp.js');
const sendForgotPasswordMail = express.Router();
const verifyForgotPasswordOTP = express.Router();
const changePassword = express.Router();

sendForgotPasswordMail.post('/', async (req, res)=>{
  const email = req.body.email;
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

verifyForgotPasswordOTP.post('/', (req,res)=>{
  const userEnteredOtp = req.body.otp;
  if(req.session.otp===String(userEnteredOtp)){
    res.send("verified");
  }else{
    res.send("wrong Otp");
  }
})

changePassword.post('/',async (req, res)=>{
  const newPassword = req.body.newPassword;
  const oldPassword = req.session.userData.hashedPassword;
  try{
    await mongoose.connect("mongodb://localhost:27017/manashealth");
    const isValid = await bcrypt.compare(newPassword, oldPassword);
    if(isValid){
      res.send("new password and old password can't be same");
    }else{
      const hashedPassword = await bcrypt.hash(newPassword, 12);
        await User.findOneAndUpdate(
          {email:req.session.userData.email},{hashedPassword: hashedPassword});
          res.send("successfully updated");
    }
    }catch(error){
    console.log("Error comparing the passwords", error);
    }finally{
      mongoose.disconnect();
    }
})

module.exports = {
  sendForgotPasswordMail,
  verifyForgotPasswordOTP,
  changePassword
};
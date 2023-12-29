const express=require('express');
const router=express.Router();
const User = require('../userModel');
const mongoose = require('mongoose');

router.post('/', async (req,res)=>{
  userEnteredOTP=req.body.otp;
  console.log(userEnteredOTP);
  if(userEnteredOTP===req.session.otp){
    console.log("verified");
    try{
      await mongoose.connect("mongodb://localhost:27017/manashealth");
      await User.create(req.session.userData);
      req.session.isAuth = true;
      req.session.cookie.maxAge = null;
      console.log('User inserted successfully!');
      res.send('verified');
    }finally{
      await mongoose.disconnect();
      console.log('mongoose disconnected');
    }  
  }else{
    res.send("Wrong otp");
  }
})

module.exports = router;
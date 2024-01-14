const express=require('express')
const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const User = require('./userModel.js');

const router=express.Router();

router.post('/', async (req,res)=>{
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;
  const remember = req.body.remember;
  try{
    await mongoose.connect("mongodb://localhost:27017/manashealth");
    const findUser = await User.findOne({email: reqEmail});

    if(findUser){
      try{
        const isValid = await bcrypt.compare(reqPassword, findUser.hashedPassword);
        if(isValid){
          req.session.isAuth = true;
          req.session.userData = {email:reqEmail};
          if(remember){
            req.session.cookie.maxAge=1000*60*60*24;
          }
          if(findUser.category == 'Teacher'){
            req.session.category = 'Teacher';
          }else{
            req.session.category = 'Student';
          }
          return res.redirect('/home');

        } 
        else res.send('Wrong password');
      }catch(compareError){
        console.log("Error comparing the password.",compareError);
      }
    }else{
      res.send('user not found');
    }
  }catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }finally{
    mongoose.disconnect();
  }
})
module.exports = router;

const express=require('express')
const mongoose = require('mongoose');
const User = require('./userModel.js')

const router=express.Router();

router.post('/', async (req,res)=>{
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;

  try{
    await mongoose.connect("mongodb://localhost:27017/manashealth");
    
    const findUser = await User.findOne({email: reqEmail})

    if(findUser){
      if(reqPassword===findUser.password){
        res.send('success');
      }else{
        res.send('Wrong password');
      }
    }else{
      res.send('user not found');
    }
  }catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }finally{
    await mongoose.disconnect();
    console.log('mongoose disconnected');
  }
})
module.exports = router;

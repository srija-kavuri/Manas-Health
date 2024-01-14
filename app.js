const express=require('express');
const path=require('path');
const mongoose = require('mongoose');
const session = require("express-session");
const mongodbSession=require("connect-mongodb-session")(session);
const login=require('./loginServer.js')
const signup=require('./signupServer.js')
const verify=require('./OTP/veifyOtp.js');
const User = require('./userModel.js');
const {sendForgotPasswordMail, verifyForgotPasswordOTP, changePassword} = require('./forgotPasswordServer.cjs');
const modelPredictions = require('./mlModel/modelPredictions.js');

const app=express();
const port=5500;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoUri = 'mongodb://localhost:27017/manashealth';

const store = new mongodbSession({
  uri:mongoUri,
  collection:'mySessions',
});

app.use(
  session({
    secret:"This is a secret key",
    resave:false,
    saveUninitialized:false,
    store: store,
  })
)

app.use(express.static(path.join(__dirname,'public')));
app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname,'public', 'index.html'));
});

app.use('/api/getPredictions', modelPredictions);

app.use('/api/login', login);

app.use('/api/signup', signup);

app.use('/api/verify', verify);

app.use('/api/sendForgotPasswordMail', sendForgotPasswordMail);
app.use('/api/verifyForgotPasswordOTP', verifyForgotPasswordOTP);
app.use('/api/changePassword', changePassword);

app.get('/login',(req,res)=>{
  res.sendFile(path.join(__dirname,'public', 'login/login.html'));
})

app.get('/signup', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'signup/signup.html'));
})

app.get('/verification', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'signup/verification.html'));
})

app.get('/forgotPassword', (req, res)=>{
  res.sendFile(path.join(__dirname, 'public', 'login/forgotPassword.html'));
})

app.get('/home', (req,res)=>{
  if(req.session.isAuth){
    if(req.session.category === 'Teacher'){
      res.status(302).sendFile(path.join(__dirname,'public', 'teacher/teacher.html'), (err)=>{
        if(err){
          console.log(err);
        }
    })
    }else if(req.session.category === 'Student'){
      res.status(302).sendFile(path.join(__dirname,'public', 'home/home.html'));

    }
  }else{
    res.redirect('/login');
  }
})


app.get('/api/userDetails', async (req, res)=>{
  if(req.session.isAuth){
    try{
      await mongoose.connect(mongoUri);
      const findUser = await User.findOne({email: req.session.userData.email});
      userDetails = {username:findUser.username, email:findUser.email, institute:findUser.instituteName};
      res.json(userDetails);
    }catch(error){
      console.error("error fetching user details", error);
  }
  }else{
    console.log("not authenticated");
    res.send("not authenticated");
  }
})

app.get('/api/logout', (req,res)=>{
  if(req.session.isAuth){
    req.session.destroy((error)=>{
      if(error){
        res.status(500).send('Internal server error');
      }else{
        res.clearCookie('connect.sid');
        res.status(200).send("Success");
      }
    })
  }
})
app.listen(port,'::',async ()=>{
  await mongoose.connect(mongoUri)
    .catch(err=>{
    console.error(err);
})
  console.log(`Server is listening at http://localhost:${port}`);
});

const express=require('express');
const path=require('path');
const mongoose = require('mongoose');
const session = require("express-session");
const mongodbSession=require("connect-mongodb-session")(session);
const login=require('./loginServer.js')
const signup=require('./signupServer.js')
const verify=require('./OTP/veifyOtp.js');

const app=express();
const port=5500;

mongoUri = 'mongodb://localhost:27017/manashealth';
mongoose.connect(mongoUri)
.then(()=>console.log("mongoose connected"));

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

app.use('/login', login);

app.use('/signup', signup);

app.use('/verify', verify);

app.get('/loginPage',(req,res)=>{
  res.sendFile(path.join(__dirname,'public', 'login/login.html'));
})

app.get('/signupPage', (req,res)=>{
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
    res.sendFile(path.join(__dirname,'public', 'home.html'));
  }else{
    res.redirect('/loginPage');
  }
})

app.get('/logout', (req,res)=>{
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
app.listen(port,'::',()=>{
  console.log(`Server is listening at http://localhost:${port}`);
});

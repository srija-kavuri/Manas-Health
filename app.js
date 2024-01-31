const express=require('express');
const path=require('path');
const mongoose = require('mongoose');
const session = require("express-session");
const mongodbSession=require("connect-mongodb-session")(session);
const login=require('./loginServer.js')
const signup=require('./signupServer.js')
const {verify, changeEmail, resendOTP}=require('./OTP/veifyOtp.js');
const {test, getQuestions} = require('./mlModel/questionServer.js');
const User = require('./userModel.js');
const resultData = require('./results/resulServer.js');
const editProfile = require('./editprofile.js');
const getStudents = require('./teacherServer.js');
const  {progress, getProgress} = require('./progressServer.js');
const {sendForgotPasswordMail, verifyForgotPasswordOTP, changePassword} = require('./forgotPasswordServer.js');
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
app.use('/api/changeemail', changeEmail);
app.use('/api/resendotp', resendOTP);

app.use('/api/sendForgotPasswordMail', sendForgotPasswordMail);
app.use('/api/verifyForgotPasswordOTP', verifyForgotPasswordOTP);
app.use('/api/changePassword', changePassword);

app.use('/test', test);
app.use('/api/getQuestions', getQuestions);

app.use('/api/getStudents', getStudents);
app.use('/progress', progress);
app.use('/api/student/progress', getProgress);

app.get('/login',(req,res)=>{
  res.sendFile(path.join(__dirname,'public', 'login/login.html'));
})

app.get('/signup', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'signup/signup.html'));
})

app.get('/verification', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'signup/emailverification.html'));
})

app.get('/forgotPassword', (req, res)=>{
  res.sendFile(path.join(__dirname, 'public', 'login/forgotPassword.html'));
})


app.get('/home', (req,res)=>{

  if(req.session.isAuth){
    if(req.session.category === 'Teacher'){
      return res.status(302).sendFile(path.join(__dirname,'public', 'teacher/teacher.html'), (err)=>{
        if(err){
          console.log(err);
        }
    })
    }else if(req.session.category === 'Student'){
      return res.status(302).sendFile(path.join(__dirname,'public', 'home/home.html'));
    }
  }else{
    return res.redirect('/login');
  }
})

app.get('/articles', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'articles/articles.html'));
})

app.get('/resources', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'resources/resources.html'));
})

app.get('/help', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'resources/resources.html'));
})

app.get('/api/userDetails', async (req, res)=>{
  if(req.session.isAuth){
    try{
      await mongoose.connect(mongoUri);
      const findUser = await User.findOne({email: req.session.userData.email});
      let userDetails;
      if(req.session.category==="Teacher"){
        userDetails = {username:findUser.username, email:findUser.email, institute:findUser.instituteName};
      }else if(req.session.category==="Student"){
        userDetails = {username:findUser.username, email:findUser.email, institute:findUser.instituteName, className: findUser.className, sectionName:findUser.sectionName};
      }
      res.json(userDetails);
    }catch(error){
      console.error("error fetching user details", error);
  }
  }else{
    console.log("not authenticated");
    res.send("not authenticated");
  }
})

app.get('/result', (req, res)=>{
  res.sendFile(path.join(__dirname, 'public', 'result/result.html'));
})

app.use('/api/result', resultData);

app.use('/api/editProfile', editProfile);

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

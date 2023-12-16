const express=require('express')
const path=require('path')
const mongoose = require('mongoose');
const bodyParser=require('body-parser')
const login=require('./loginServer.js')
const signup=require('./signupServer.js')
const User=require('./userModel.js')

const app=express();
const port=5500;

app.use(express.static(path.join(__dirname,'public')))
app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname,'public', 'index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/login', login);

app.use('/signup', signup);


app.listen(port,'::',()=>{
  console.log(`Server is listening at http://localhost:${port}`);
});

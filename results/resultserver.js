const express=require('express');
const path=require('path');

const result = express.Router();

result.get("/result", (req,res)=>{
  res.sendFile(path.join(__dirname,'public', 'reult/result.html'));
})


const { json } = require('body-parser');
const express=require('express');
const path=require('path');
const fs = require('fs').promises;
const auth = require('../checkauth.js');



const resultData = express.Router();

resultData.get("/", auth, async (req,res)=>{
  let result = (req.query.result).trim();
  result = result.toLowerCase();
  try{
  const jsonData =await fs.readFile('./results/resultmessages.json', 'utf-8');
  data = JSON.parse(jsonData);
  message = data[result];
  if(message){
    res.json({success:true, data:message});
  }else{
    res.json({success:false, message: "data not found"});
  }
}catch(error){
  console.log("Error reading json file", error);
}
})

module.exports = resultData;


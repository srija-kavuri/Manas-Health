const axios = require('axios');
const express =require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const resultsModel = require('./resultsModel');
const router = express.Router();


router.post('/',cors(), async (req,res)=>{

    if(!req.session.isAuth){
        return res.json({success:false, message:"please login to access"});
    }
  const category = req.body.category;
  const date = req.body.date;

  let userInputs;
    if (category === "general_test") {
        let generalTestInputs;
        console.log('General test');
        userInputs = [req.session.userData.age];
        generalTestInputs = req.body.userInputs;
        generalTestInputs.forEach((input,index) => {
            if(input===0){
                generalTestInputs[index]=1;
            }else generalTestInputs[index]=0;      
        });
        console.log(userInputs);
      if(userInputs.length===0){
        console.error("Couldn't find the age of the user");
        return res.json({success:false, message:"Couldn't find the age of the user"});
      }
      userInputs.push(...(generalTestInputs));
    }else{
        userInputs = req.body.userInputs;
    }
console.log(userInputs)

    try {
        const response = await axios.post('http://127.0.0.1:5000/predict', {category, userInputs});
        const {score, severity_level} = response.data;

        if(!score&&!severity_level){
            return res.status(500).json({success:false, message:"internal server error"});
        }
        await mongoose.connect("mongodb://localhost:27017/manashealth");
        const email = req.session.userData.email;
        // const email="valli@gmail.com";
        const findUser = await resultsModel.findOne({email});
        if(findUser){
            findUser.currentStatus[category] = severity_level
            findUser.results.push({
                category,
                userInputs,
                score,
                severity_level,
                date
            })
            findUser.save()
            .catch(error=>{
                console.error("error updating the user", error);
            })
        }else{
            newResults = new resultsModel({
                email: email,
                results:[{
                    category: category,
                    userInputs: userInputs,
                    score,
                    severity_level,
                    date
                }],
                currentStatus : {
                    [category]:severity_level
                }})
            newResults.save()
            // .then(savedUser=>{console.log("user saved successfully", savedUser)})
            .catch(error=>{console.error( "error saving the user results", error)})
        }
        return res.json({success:true, score,severity_level});
    } catch (error) {
        console.error('Error making prediction request:', error.message);
        throw error;
    }
})

module.exports = router;

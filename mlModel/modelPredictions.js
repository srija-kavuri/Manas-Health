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
  let inputs = req.body.userInputs
  const date = req.body.date;
//   const date = 'datae';

  let userInputs;
if (category === "general_test") {
  console.log('General test');
  userInputs = [req.session.userData.age];
  //reversing 0 and 1
  let generalTestInputs = inputs.map(input => (input === '0'||input===0 ? '1' : '0'));
    //checking if age of the user in present
  if (userInputs.length === 0) {
    console.error("Couldn't find the age of the user");
    return res.json({ success: false, message: "Couldn't find the age of the user" });
  }

  // Push reversed generalTestInputs into userInputs
  userInputs.push(...generalTestInputs);
  console.log(userInputs);
}

    else{
        userInputs = inputs;
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
            findUser.currentStatus[category] = {severity_level, score,date};
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
                    [category]:{severity_level, score,date}
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

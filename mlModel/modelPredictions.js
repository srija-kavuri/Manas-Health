const axios = require('axios');
const express =require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const resultsModel = require('./resultsModel');
const router = express.Router();


router.post('/',cors(), async (req,res)=>{

    // if(!req.session.isAuth){
    //     console.log("unauthorized");
    //     return res.send("please login to access");
    // }
  const {category, userInputs} = req.body;
    try {
        const response = await axios.post('http://127.0.0.1:5000/predict', {category, userInputs});
        const {score, severity_level} = response.data;
        await mongoose.connect("mongodb://localhost:27017/manashealth");
        const email = "valli@gmail.com";
        //const email = req.session.userData.email;
        const findUser = await resultsModel.findOne({email});
        if(findUser){
            findUser.currentStatus[category] = severity_level
            findUser.results.push({
                category,
                userInputs,
                score,
                severity_level
            })
            findUser.save()
            // .then(updatedResults=>{
            //     console.log("user results updated successfully", updatedResults);
            // })
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
                    severity_level
                }],
                currentStatus : {
                    [category]:severity_level
                }})
            newResults.save()
            // .then(savedUser=>{console.log("user saved successfully", savedUser)})
            .catch(error=>{console.error( "error saving the user results", error)})
        }
        return res.json({score,severity_level});
    } catch (error) {
        console.error('Error making prediction request:', error.message);
        throw error;
    }
})

module.exports = router;

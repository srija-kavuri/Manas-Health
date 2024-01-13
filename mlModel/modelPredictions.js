const axios = require('axios');
const express =require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const resultsModel = require('./resultsModel');
const router = express.Router();

router.post('/',cors(), async (req,res)=>{
    if(!req.session.isAuth){
        return res.send("please login to access");
    }
  const {userInputs} = req.body;
    try {
        const response = await axios.post('http://127.0.0.1:5000/predict', userInputs);
        await mongoose.connect("mongodb://localhost:27017/manashealth");
        email=req.session.useData.email;
        const findUser = await resultsModel.findOne({email});
        if(findUser){
            findUser.results.push({
                userInputs: userInputs,
                result: response.data.predictions,
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
                    userInputs: userInputs,
                    result: response.data.predictions,
                }]
            })
            newResults.save()
            // .then(savedUser=>{console.log("user saved successfully", savedUser)})
            .catch(error=>{console.error( "error saving the user results", error)})
        }
        return res.send(response.data.predictions);
    } catch (error) {
        console.error('Error making prediction request:', error.message);
        throw error;
    }
})

module.exports = router;

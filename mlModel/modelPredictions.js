const axios = require('axios');
const express =require('express');
const cors = require('cors');
const resultsModel = require('./resultsModel');
const router = express.Router();

router.post('/',cors(), async (req,res)=>{
  console.log("recived req");
  console.log("this is received userreq", req.body);
  const {userInputs} = req.body;
  console.log("this is userinputs",userInputs);
    try {
        const response = await axios.post('http://127.0.0.1:5000/predict', userInputs);
        
        console.log(response.data.predictions);
        return res.send(response.data.predictions);
    } catch (error) {
        console.error('Error making prediction request:', error.message);
        throw error;
    }
})

module.exports = router;

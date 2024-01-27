const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); 
const resultsModel = require('./mlModel/resultsModel');

const progress = express.Router();
const getProgress = express.Router();

progress.get('/:email', async (req, res) => {
  const myParam = req.params.email;
  if (myParam) {
    res.status(302).sendFile(path.join(__dirname, 'public', 'home/progress.html'));
  } else {
    res.status(400).send('Bad Request: myParam is missing');
  }
});


getProgress.get('/:email', async (req, res) => {
  let progressEmail;
  if(req.session.category==='Student'){
    progressEmail = req.session.userData.email;
  }
  else{
    progressEmail = req.params.email;
  }
  try {
    await mongoose.connect("mongodb://localhost:27017/manashealth");
    const studentProgress = await resultsModel.findOne({
      email: progressEmail,
    });
    if (studentProgress) {
      res.status(200).json({ success: true, progress: studentProgress.results });
    }else{
      res.status(404).json({success:false, message: "cannot find progress of the given student"});
    }
  } catch (error) {
    console.error("Error getting student progress:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = {
  progress, getProgress
}
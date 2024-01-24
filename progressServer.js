const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Import the 'path' module
const resultsModel = require('./mlModel/resultsModel');

const progress = express.Router();
const setProgressParam = express.Router();
const getProgress = express.Router();

progress.get('/', async (req, res) => {
  res.status(302).sendFile(path.join(__dirname, 'public', 'home/progress.html'));
});

setProgressParam.get('/:email', (req, res) => {
  const myParam = req.params.email;
  if (myParam) {
    req.session.progressEmail = myParam;
    res.redirect('/progress');
  } else {
    res.status(400).send('Bad Request: myParam is missing');
  }
});

getProgress.get('/', async (req, res) => {
  if (req.session.category === "Student") {
    req.session.progressEmail = req.session.userData.email;
  }
  try {
    await mongoose.connect("mongodb://localhost:27017/manashealth");
    const studentProgress = await resultsModel.findOne({
      email: req.session.progressEmail,
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
  progress, setProgressParam, getProgress
}
const mongoose = require('mongoose');

const resultsModel = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },

  results: {
    type: [{
      category: String,
      userInputs: Array,
      score: String,
      severity_level: String,
      date: String
    }],
    default: [],
    required: true,
  },

  currentStatus:{
    type: {
      depression:String,
      anxiety:String,
      autism:String,
      stress:String,
      dyslexia:String,
      ptsd:String,
      adhd:String,
      general_test:String,
    },
    required: true,
    default: {}
  }
})

const userResults = mongoose.model('reults', resultsModel);
module.exports = userResults;
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
      severity_level: String
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
    },
    required: true,
    default: {depression:"",
      anxiety:"",
      autism:"",
      stress:"",
      dyslexia:""}
  }
})

const userResults = mongoose.model('reults', resultsModel);
module.exports = userResults;
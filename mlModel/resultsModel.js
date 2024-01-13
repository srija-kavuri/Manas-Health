const mongoose = require('mongoose');

const resultsModel = new mongoose.Schema({
  email:{
    type: String,
    required: true
  },

  results: {
    type: [{
      userInputs: Array,
      result: String
    }],
    default: [],
    required: true,
  },

  currentStatus:{
    type: String,
    required: true,
    default: "-"
  }
})

const userResults = mongoose.model('reults', resultsModel);
module.exports = userResults;
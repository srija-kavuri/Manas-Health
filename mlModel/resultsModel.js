const mongoose = require('mongoose');

const resultsModel = new mongoose.SchemaType({
  email:{
    type: String,
    required: true
  },

  results: {
    type: Object,
    required: true
  }
})

const userResults = mongoose.model('reults', resultsModel);
module.exports = userResults;
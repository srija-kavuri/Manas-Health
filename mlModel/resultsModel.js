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
      depression:{
        type:{
          severity_level:String,
          score:String,
          date:String,
        }
      },
      anxiety:{
        type:{
          severity_level:String,
          score:String,
          date:String,
        }
      },
      autism:{
        type:{
          severity_level:String,
          score:String,
          date:String,
        }
      },
      stress:{
        type:{
          severity_level:String,
          score:String,
          date:String,
        }
      },
      dyslexia:{
        type:{
          severity_level:String,
          score:String,
          date:String,
        }
      },
      ptsd:{
        type:{
          severity_level:String,
          score:String,
          date:String,
        }
      },
      adhd:{
        type:{
          severity_level:String,
          score:String,
          date:String,
        }
      },
      general_test:{
        type:{
          severity_level:String,
          score:String,
          date:String,
        }
      },
    },
    
    required: true,
    default: {},
    _id:false
  },
})

const userResults = mongoose.model('results', resultsModel);
module.exports = userResults;
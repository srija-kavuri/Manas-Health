const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const feedbackSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

router.post('/feedback', async (req, res) => {
    try {
        const { message } = req.body;

        // Validate that the 'message' field is present
        if (!message) {
            return res.status(400).json({ error: 'Message is required.' });
        }
        
          mongoose.connect('mongodb://localhost:27017/manashealth')
        
        // Create a new feedback instance
        const newFeedback = new Feedback({
            message
        });

        // Save the feedback to the database
        const savedFeedback = await newFeedback.save();

        // Respond with the saved feedback
        res.status(201).json(savedFeedback);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }finally{
      mongoose.disconnect();
    }
});

module.exports = router;

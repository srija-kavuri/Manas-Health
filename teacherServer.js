const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./userModel');
const resultsModel = require('./mlModel/resultsModel');
router.post('/', async (req, res) => {
  try {
    const className = req.body.className;
    const sectionName = req.body.sectionName;

    await mongoose.connect("mongodb://localhost:27017/manashealth");
    const users = await User.find({
      category: "Student",
      className: className,
      sectionName: sectionName
    });

    // Check if any students were found
    if (users.length > 0) {
      const students = [];

      for (const student of users) {
        let email = student.email;
        const userResult = await resultsModel.findOne({ email });
        students.push({ Name: student.username, progress: student.email, currentStatus: userResult.results.currentStatus });
      }
      res.status(200).json({ success: true, students: students });
    } else {
      res.status(404).json({ success: false, message: 'No students found for the given class and section.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

module.exports = router;
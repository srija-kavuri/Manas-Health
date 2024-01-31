const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./userModel.js');
const sendMail = require('./OTP/sendOtp.js');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const { username, category, school, email, password, className, sectionName,birthday } = req.body;

        if (!username || !category || !email || !school || !password) {
            console.log("Field(s) are empty");
            return res.status(400).send("Field(s) are empty");
        }

        if (category === "Student" && (!className || !sectionName || !birthday)) {
            console.log("Field(s) are empty for student");
            return res.status(400).send("Field(s) are empty for student");
        }

        await mongoose.connect("mongodb://localhost:27017/manashealth");

        const findUser = await User.findOne({ email });

        if (findUser) {
            return res.status(400).json({ success: false, message: `Account with the email already exists.` });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        let userData;
        let age;
        if (category === "Student") {
            const birthdateString = req.body.birthday;
            const birthdate = new Date(birthdateString);

        // Get the current date
            const currentDate = new Date();

        // Calculate the age
            age = currentDate.getFullYear() - birthdate.getFullYear();

        // Adjust the age if the birthday hasn't occurred yet this year
            if (
            currentDate.getMonth() < birthdate.getMonth() ||
            (currentDate.getMonth() === birthdate.getMonth() &&
                currentDate.getDate() < birthdate.getDate())
            ) {
            age--;
            }

            userData = { username, category, instituteName: school, email, hashedPassword, className, sectionName: sectionName.toUpperCase(), age };
        } else {
            userData = { username, category, instituteName: school, email, hashedPassword };
        }

        req.session.userData = userData;

        const otp = await sendMail.sendOTP(email, username);

        req.session.otp = otp;

        return res.status(200).json({ success: true });
    } catch (error) {
        if (error.code === 11000) {
            console.error('Duplicate key error:', error.errmsg);
            return res.status(400).json({ success: false, message: `Account with the email already exists.` });
        } else {
            // Handle other MongoDB errors
            console.error('MongoDB error:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error.' });
        }
    } finally {
        await mongoose.disconnect();
    }
});

module.exports = router;

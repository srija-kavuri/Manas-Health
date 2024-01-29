const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./userModel.js');
const sendMail = require('./OTP/sendOtp.js');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { username, category, school, email, password, className, sectionName } = req.body;

        if (!username || !category || !email || !school || !password) {
            console.log("Field(s) are empty");
            return res.status(400).send("Field(s) are empty");
        }

        if (category === "Student" && (!className || !sectionName)) {
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
        if (category === "Student") {
            userData = { username, category, instituteName: school, email, hashedPassword, className, sectionName: sectionName.toUpperCase() };
        } else {
            userData = { username, category, instituteName: school, email, hashedPassword };
        }

        req.session.userData = userData;

        const otp = await sendMail.sendOTP(email, username);

        console.log(otp);
        req.session.otp = otp;
        console.log(req.session.otp);

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
        console.log('mongoose disconnected');
    }
});

module.exports = router;

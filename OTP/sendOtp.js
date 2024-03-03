const express = require('express');
const nodemailer = require('nodemailer');

function generateOTP(length) {
  const digits = '0123456789';
  let OTP = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * digits.length);
    OTP += digits[index];
  }
  console.log("OTP generated:", OTP);
  return OTP;
}

async function sendOTP(email, name) {
  console.log("Sending OTP to:", email);

  try {
    const otp = generateOTP(4);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || "vallivirat999@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "qtzn bnnf wnmc motp",
      },
    });

    const info = await transporter.sendMail({
      from: 'valli <vallivirat999@gmail.com>',
      to: email,
      subject: "Verification for Manashealth",
      html: `
        <h1>Hello, ${name}</h1>
        <p>Your One Time Verification Password is ${otp}.</p>
        <span>Please do not share it with anyone. Have a good day:)</span>
      `,
    });

    console.log("OTP sent successfully");
    return otp;
  } catch (err) {
    console.error('Error sending OTP email:', err);
    throw new Error('Failed to send OTP via email Error code: EMAIL_SEND_ERROR}');
  }
}

module.exports = {
  sendOTP,
  generateOTP,
};

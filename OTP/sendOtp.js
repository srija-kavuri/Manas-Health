const express=require('express')
const nodemailer = require("nodemailer");

function generateOTP(length) {
  const digits = '0123456789';
  let OTP = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * digits.length);
    OTP += digits[index];
  }

  return OTP;
}

async function sendOTP(email, name) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
      port: 465, // Port for SMTP (usually 465)
      secure: true, // Usually true if connecting to port 465
      auth: {
        user: "vallivirat999@gmail.com", // Your email address
        pass: "qtzn bnnf wnmc motp", // Password (for gmail, your app password)
        // ⚠️ For better security, use environment variables set on the server for these values when deploying
      },
    });

    async function sendEmail(){
      try{
        let info = await transporter.sendMail({
          from: 'valli <vallivirat999@gmail.com>',
          to: email,
          subject: "Verification for Manashealth",
          html: `
          <h1>Hello, ${name}</h1>
          <p>Your One Time Verification Password is ${otp}.</p>
          <s>Please do not share it with anyone. Have a good day:)</s>
          `,
        })
        return info;
      }catch(err){
        console.log('Error sending mail');
    }
        
    };
    // Define and send message inside transporter.sendEmail() and await info about send from promise:
   
    info= await sendEmail();
    console.log(`message sent ${otp}`); // Random ID generated after successful send (optional)
    }

module.exports={
  sendOTP,
  generateOTP,
}
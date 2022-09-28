const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
app.use(express.json());

exports.email = async (hrEmail, adminEmail, message) => {
   let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: 'shivamsingh4949@gmail.com',
         pass: 'aglciasqgeqfttqf'

      }
   });


   let deatils = {

      from: 'shivamsingh4949@gmail.com',
      to: hrEmail,
      cc: adminEmail,
      subject: 'Mail From Job-Portal',
      text: message,

   }

   let info = transporter.sendMail(deatils, (err) => {
      if (err) throw err;
      console.log("succesfully sent");
   })

}
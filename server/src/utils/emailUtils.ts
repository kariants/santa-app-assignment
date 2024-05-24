// Use at least Nodemailer v4.1.0
import nodemailer from 'nodemailer';
import 'dotenv/config'
import { Message } from '../types/Message.js';

// Create a SMTP transporter object
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    // these are in .env, wouldnt normally put plaintext here in code.
    // user: 'joan.koepp@ethereal.email'
    // password: 'sFYdUj8rVwYZuppkbq'
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

export const sendEmails = (messages: Message[]) => {
  messages.forEach((message: Message) => {
    // just plaintext email for now
    let emailTemplate = {
      from: 'do_not_reply@northpole.com',
      to: 'santa@northpole.com',
      subject: `Message to Santa from ${message.sender}`,
      text: `Senders address: ${message.address} and message: '${message.message}'`,
    }
  
    transporter.sendMail(emailTemplate, (err: any, info: any) => {
      if (err) {
          console.log('Error occurred. ' + err.message);
          return process.exit(1);
      }
    
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
}



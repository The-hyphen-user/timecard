// const formData = require('form-data');
import formData from 'form-data';
// const Mailgun = require('mailgun.js');
import Mailgun from 'mailgun.js';
import dotenv from 'dotenv';

dotenv.config();


const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere' });

// mg.messages.create('sandbox-123.mailgun.org', {
//     from: "Excited User <mailgun@sandbox-123.mailgun.org>",
//     to: ["test@example.com"],
//     subject: "Hello",
//     text: "Testing some Mailgun awesomeness!",
//     html: "<h1>Testing some Mailgun awesomeness!</h1>"
// })
//     .then(msg => console.log(msg)) // logs response data
//     .catch(err => console.log(err)); // logs any error

const sendEmail = (data) => {
    try {
        const { from, to, subject, text, html } = data;
        mg.messages.create('sandbox-123.mailgun.org', {
            from,
            to,
            subject,
            text,
            html
        })
    } catch (error) {
        console.log(error)
    }
}

export default sendEmail;
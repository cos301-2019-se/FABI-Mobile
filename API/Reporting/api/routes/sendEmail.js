const express = require('express');
const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates');
const path = require('path');
const Promise = require('bluebird');
const config = require('./config.js');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            EMAIL SETTINGS 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.user,
      pass: config.pass
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                        Generate Sample Reference Number
/**
 * @summary Generate a reference number for the sample and send the reference number to the client.
 * @description Generate reference number, load email template, send email with reference number 
 *  1. Generate the Reference Number (random 4 digit number)
 *  2. Load the email template (using Promise)
 *  3. Send Email
 */
/////////////////////////////////////////////////////////////////////
function sendEmail(org, pass) {
      
// (1) Generate the Reference Number (random 4 digit number)
      

      /// TEMPORAORY  ////////////////////////////////
      const mailObject = {
            from: 'FABI_WepApp',
            to: 'novacapstone@gmail.com',
            subject: "Temoprary Password",
            text: `You have been added to the FABI system for organization ${org} , your temporary password is: ${pass}`
      }

      transporter.sendMail(mailObject, (error, info) => {
        if (error)
          console.log(error);
        else
          console.log('Email sent: ' + info.response);
      });
      /////////////////////////////////////////////////////

// (2) Load the email template (using Promise) - (Call the LoadTemplate function)
    //   loadTemplate('ReferenceNumber', info).then((results) => {
    //     return Promise.all(results.map((result) => {
    //    // (3) Send Email (call sendEmail() function)
    //         sendEmail({
    //                 from: 'FABI_WepApp',
    //                 to: 'u16224940@tuks.co.za',
    //                 subject: result.email.subject,
    //                 html: result.email.html,
    //                 text: result.email.text
    //         });
    //     }));
    // }).then(() => {
    //     console.log('Yay!');
    // });
 
}

// (3) Send Email

// (2) Load the email template (using Promise)
function loadTemplate(templateName, info) {
    let template = new EmailTemplate(path.join(__dirname, 'templates', templateName));
        return new Promise((resolve, reject) => {
            template.render(info, (err, result) => {
                if (err) reject(err);
                else resolve({
                    email: result
                });
            });
        });
}


module.exports = sendEmail;

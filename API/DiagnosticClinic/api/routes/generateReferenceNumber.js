const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates');
const path = require('path');
const Promise = require('bluebird');
const config = require('../config.js');


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
function generate(result) {
      
// (1) Generate the Reference Number (random 4 digit number)
      let refNum ='ref-' + new Date().getTime();

      /// TEMPORAORY  ////////////////////////////////
      const mailObject = {
            from: 'FABI_WepApp',
            to: 'novacapstone@gmail.com',
            subject: "Sample Reference Number",
            text: `Thank you for your sample submission. Your reference number is: ${refNum}. Your prediagnosis is ${result}.` 
      }

      transporter.sendMail(mailObject, (error, info) => {
        if (error)
          console.log(error);
        else
          console.log('Email sent: ' + info.response);
      });

      return refNum;
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
function sendEmail (obj) {
    transporter.sendMail(obj, (error, info) => {
        if (error) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(500).json({                            
                success: false,
                error: {
                    code: 500,
                    title: "INTERNAL_SERVER_ERROR",
                    message: error.message
                }
            });
          console.log(error);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json({                              
                success: true,
                data: {
                    code: 200,
                    title: "SUCCESS",
                    message: "Email successfully sent",
                    content: {
                        referenceNumber: refNum
                    }
                }
            });
          console.log('Email sent: ' + info.response);
        }
      });
}

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


module.exports = generate;

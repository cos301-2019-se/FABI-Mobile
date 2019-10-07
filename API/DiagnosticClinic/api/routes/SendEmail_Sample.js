const express = require('express');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const path = require('path');
const config = require('../config');

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


const sendSampleSubmission = function(refNumber, email, fname, surname, prediagnosis) {

    transporter.use('compile', hbs({
        viewEngine: {
            viewPath: path.resolve(__dirname, 'templates', 'SampleSubmission'),
            extName: '.hbs',
            defaultLayout: false
        },
        viewPath: path.resolve(__dirname, 'templates', 'SampleSubmission'),
        extName: '.hbs'
    }));
    
    let mailOptions = {
        from: 'FABI',
        // to: email,
        to: email,                              
        subject: "FABI Mobile | Sample Submission",
        text: "",
        template: 'html',
        context: {
            refNumber: refNumber,
            fname: fname,
            surname: surname,
            prediagnosis: prediagnosis
        }
    };
    
    return transporter.sendMail(mailOptions, (error, info) => {
        if (error)
            console.log(error);
        else
            console.log('Email Sent');
    });

}


module.exports = {
    sendSampleSubmission: sendSampleSubmission
};
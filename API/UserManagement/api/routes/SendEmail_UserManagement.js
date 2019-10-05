const express = require('express');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const path = require('path');

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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                        EMAIL ORGANIZATION REQUEST DENIED
/**
 * This function sends an email to the organization to notify them that their registration was denied
 *
 * @param {*} orgName Organization name
 * @param {*} email Organization email
 * @param {*} reason Reason for denial 
 * @returns
 */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const sendOrganizationRequestDenied = function(orgName, email, reason) {

    transporter.use('compile', hbs({
        viewEngine: {
            viewPath: path.resolve(__dirname, 'templates', 'RequestDenied_Organization'),
            extName: '.hbs',
            defaultLayout: false
        },
        viewPath: path.resolve(__dirname, 'templates', 'RequestDenied_Organization'),
        extName: '.hbs'
    }));
    
    let mailOptions = {
        from: 'FABI',
        // to: email,
        to: email,                             
        subject: "FABI Mobile | Registration Denied",
        text: "",
        template: 'html',
        context: {
            orgName: orgName,
            reason: reason
        }
    };
    
    return transporter.sendMail(mailOptions, (error, info) => {
        if (error)
            console.log(error);
        else
            console.log('Email Sent');
    });

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                        EMAIL ORGANIZATION REQUEST SUCCESS
/**
 * This function will send an email to the organization notifying them of successful registration. Their
 *  temporary pin will be sent
 *
 * @param {*} orgName Organization name
 * @param {*} email Organization email (Admin email)
 * @param {*} fname Organization's admin name
 * @param {*} surname Organization's admin surame
 * @param {*} pass Temporary password
 * @returns
 */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const sendOrganizationTemporaryPin = function(orgName, email, fname, surname, pass) {

    transporter.use('compile', hbs({
        viewEngine: {
            viewPath: path.resolve(__dirname, 'templates', 'RequestSuccess_Organization'),
            extName: '.hbs',
            defaultLayout: false
        },
        viewPath: path.resolve(__dirname, 'templates', 'RequestSuccess_Organization'),
        extName: '.hbs'
    }));
    
    let mailOptions = {
        from: 'FABI',
        // to: email,
        to: email,                              
        subject: "FABI Mobile | Registration Success",
        text: "",
        template: 'html',
        context: {
            orgName: orgName,
            fname: fname,
            surname: surname,
            pass: pass
        }
    };
    
    return transporter.sendMail(mailOptions, (error, info) => {
        if (error)
            console.log(error);
        else
            console.log('Email Sent');
    });

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              EMAIL USER TEMPORARY PIN
/**
 *
 *
 * @param {*} orgName User organization
 * @param {*} email user email
 * @param {*} fname user first name
 * @param {*} surname user surname
 * @param {*} pass user temporary password
 * @param {*} role user's role  
 * @returns
 */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const sendUserTemporaryPin = function(orgName, email, fname, surname, pass, role) {

    transporter.use('compile', hbs({
        viewEngine: {
            viewPath: path.resolve(__dirname, 'templates', 'MemberRegistration'),
            extName: '.hbs',
            defaultLayout: false
        },
        viewPath: path.resolve(__dirname, 'templates', 'RequestSuccess_Organization'),
        extName: '.hbs'
    }));
    
    let mailOptions = {
        from: 'FABI',
        // to: email,
        to: email,                              
        subject: "FABI Mobile | Temporary Password",
        text: "",
        template: 'html',
        context: {
            details: `Organization: ${orgName}. Role: ${role}`,
            fname: fname,
            surname: surname,
            pass: pass
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
    sendOrganizationRequestDenied: sendOrganizationRequestDenied,
    sendOrganizationTemporaryPin: sendOrganizationTemporaryPin,
    sendUserTemporaryPin: sendUserTemporaryPin
};

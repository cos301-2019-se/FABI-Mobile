const express = require('express');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const path = require('path');
const config = require('./config');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            EMAIL SETTINGS 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const transporterSent = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.user,
      pass: config.pass
    }
});

const transporterRecieved = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.user,
      pass: config.pass
    }
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                        EMAIL ORGANIZATION REQUEST SENT 
/**
 * This function sends an email to the organization, informing them that their request to 
 *  register has been sent to FABI
 *
 * @param {*} orgName Organizations name 
 * @param {*} email Organizations email
 * @returns
 */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const sendOrganizationRequestToOrg = function(orgName, email) {

    transporterSent.use('compile', hbs({
        viewEngine: {
            viewPath: path.resolve(__dirname, 'routes', 'templates', 'RequestSent_Organization'),
            extName: '.hbs',
            defaultLayout: false
        },
        viewPath: path.resolve(__dirname, 'routes', 'templates', 'RequestSent_Organization'),
        extName: '.hbs'
    }));
    
    let mailOptions = {
        from: 'FABI',
        // to: email,
        to: email,
        subject: "FABI Mobile | Request Sent",
        text: "",
        template: 'requestSent',
        context: {
            orgName: orgName
        }
    };
    
    return transporterSent.sendMail(mailOptions, (error, info) => {
        if (error)
            console.log(error);
        else
            console.log('Email Sent');
    });

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                        EMAIL FABI ORGANIZATION REQUEST 
/**
 * This function will send an email to the FABI SuperUser to inform them that the organization has requested
 *  to register for FABI mobile
 *
 * @param {*} orgName Organization name
 * @param {*} fname Organization's admin name
 * @param {*} surname Organization's admin surame
 * @param {*} email Organization's admin email
 * @returns
 */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const sendOrganizationRequestToFABI = function(orgName, fname, surname, email) {

    transporterRecieved.use('compile', hbs({
        viewEngine: {
            viewPath: path.resolve(__dirname, 'routes', 'templates', 'OrganizationRequestReceived_FABI'),
            extName: '.hbs',
            defaultLayout: false
        },
        viewPath: path.resolve(__dirname, 'routes', 'templates', 'OrganizationRequestReceived_FABI'),
        extName: '.hbs'
    }));
    
    let mailOptions = {
        from: 'FABI',
        // to: email,
        to: 'novacapstone@gmail.com',                               /////////////////////////////////// change to super user ////////////////////////////////
        subject: "FABI Mobile | Organization Requested to Register",
        text: "",
        template: 'requestReceived',
        context: {
            orgName: orgName,
            details: `Administrator: \n Name: ${fname} ${surname} \n Email: ${email} `
        }
    };
    
    return transporterRecieved.sendMail(mailOptions, (error, info) => {
        if (error)
            console.log(error);
        else
            console.log('Email Sent');
    });

}

module.exports = {
    sendOrganizationRequestToOrg: sendOrganizationRequestToOrg,
    sendOrganizationRequestToFABI: sendOrganizationRequestToFABI
};

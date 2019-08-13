const express = require('express');
const router = express.Router();
const request = require("request");
const bcrypt = require('bcrypt-nodejs');
const admin = require('firebase-admin');
const mail = require('../sendEmail');
const EmailTemplate = require('email-templates');
const nodemailer = require('nodemailer');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', requestOrganizationAccount);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  EMAIL SETTINGS 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'u17074526@gmail.com@tuks.co.za',
      pass: 'Vodacom218151'
    }
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  ORGANIZATION
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const organization;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          Request Organization Account
/**
 * @summary Create a new organization with data recieved depending on whether the FABI super user
 *          verifies the new account.
 * @description  REQUEST DATA REQUIRED: organization name, organization details, admin details
 *  1. Check if all required data is received and that it is correct.
 *      - IF NOT: return Error Response
 *  2. Send verification email.
 *  3. Verify account or don't verify account.
 *  4. Add Organization to Organizations collection and create admin within admin collection int that organization
 *      - IF ERROR: return Error Response
 *  5. Push data to the database.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function requestOrganizationAccount(req, res){

// (1) 
    if (req.body.admin.name == undefined || req.body.admin.name == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "Admin name expected"
        });
    }
    if (req.body.admin.surname == undefined || req.body.admin.surname == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "Admin surname expected"
        });
    }
    if (req.body.admin.email == undefined || req.body.admin.email == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "Admin email expected"
        });
    }
    if (req.body.orgName == undefined || req.body.orgName == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "Organization Name Expected"
        });
    }

    setOrganization(req.body.orgName);
    let tempOrganization = req.body;

    const mailObject = {
        from: 'FABI_WepApp',
        to: 'novacapstone@gmail.com',
        subject: "Organization Account Verification",
        text: `Organization ${organization} has requested to create an account with FABI. 
        Click on the appropriate button to verify or not verify the new organization's account: `,
        html: `<button onclick="verifyAccount()">Verify Account Creation</button><button onclick="dontVerifyAccount()">Don't Verify Account Creation</button>`
    }

    transporter.sendMail(mailObject, (error, info) => {
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
                        orgName: organization
                    }
                }
            });
        }
      });

}

function setOrganization(org){
    this.organization = org;
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
        } 
        else {
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
                        orgName: organization
                    }
                }
            });
        }
    });
}

function verifyAccount(){

}

function dontVerifyAccount(){

}

function generatePassword(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = router;
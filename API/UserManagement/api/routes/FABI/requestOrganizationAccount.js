const express = require('express');
const router = express.Router();
const request = require("request");
const bcrypt = require('bcrypt-nodejs');
const admin = require('firebase-admin');
const mail = require('../sendEmail');
<<<<<<< HEAD:API/UserManagement/api/routes/FABI/createOrganization.js
const log = require('../../sendLogs');
=======
const EmailTemplate = require('email-templates');
const nodemailer = require('nodemailer');
>>>>>>> develop:API/UserManagement/api/routes/FABI/requestOrganizationAccount.js

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
<<<<<<< HEAD:API/UserManagement/api/routes/FABI/createOrganization.js
 * @summary Create a new organization with data recieved
 * @description  REQUEST DATA REQUIRED: organization fname, organization details, admin details
=======
 * @summary Create a new organization with data recieved depending on whether the FABI super user
 *          verifies the new account.
 * @description  REQUEST DATA REQUIRED: organization name, organization details, admin details
>>>>>>> develop:API/UserManagement/api/routes/FABI/requestOrganizationAccount.js
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

<<<<<<< HEAD:API/UserManagement/api/routes/FABI/createOrganization.js
function addOrganization(req, res)
{


// (1) 
    if (req.body.admin.fname == undefined || req.body.admin.fname == '') {
=======
function requestOrganizationAccount(req, res){

// (1) 
    if (req.body.admin.name == undefined || req.body.admin.name == '') {
>>>>>>> develop:API/UserManagement/api/routes/FABI/requestOrganizationAccount.js
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
<<<<<<< HEAD:API/UserManagement/api/routes/FABI/createOrganization.js
            message: "Admin fname expected"
=======
            message: "Admin name expected"
>>>>>>> develop:API/UserManagement/api/routes/FABI/requestOrganizationAccount.js
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
<<<<<<< HEAD:API/UserManagement/api/routes/FABI/createOrganization.js
            message: "Organization fname Expected"
        });
    }

        // (2)
        var docRef  = db.collection('Organizations').doc(req.body.orgName);
        var pendingRef  = db.collection('Organizations').doc('Pending').collection('Organizations').doc(req.body.orgName);

        // (3)
        const salt = bcrypt.genSaltSync(10);
        var pass = generatePassword(10);
        const qs = {
            orgName : req.body.orgName,
            admin : {
                fname: req.body.admin.fname,
                surname: req.body.admin.surname,
                email: req.body.admin.email,
                id : new Date().getTime().toString(),
                userType: "OrganizationAdmin"
            }
        }

        // (4)
        pendingRef.get().then(doc => {
            //(2)
            if(typeof(doc.data()) === 'undefined')
            {
                docRef.set(qs).then(() => {
                    qs.admin.password = bcrypt.hashSync(pass, salt)
                    adminRef = db.collection('Organizations').doc(req.body.orgName).collection('Members').doc(qs.admin.id).set(qs.admin).then(()=>{
                        res.setHeader('Content-Type', 'application/problem+json');
                        res.setHeader('Content-Language', 'en');
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                        success: true,
                        code: 200,
                        title: "SUCCESS",
                        message: "Created Organization",
                        data: {
                                orgName: req.body.orgName,
                                tempPassword: pass
                        }
                })
                mail(req.body.orgName + ' Admin', pass);
                log({
                    type: 'USER',
                    action: 'AddMemberToOrg',
                    details: '1563355277876',
                    user: qs.admin.id,
                    org1: 'FABI',
                    org2: req.body.orgName,
                    action: '/createOrganization'
                });
            });
            });
        }
        else
        {
            pendingRef.delete().then(() => {
                docRef.set(qs).then(() => {
                    qs.admin.password = bcrypt.hashSync(pass, salt)
                    adminRef = db.collection('Organizations').doc(req.body.orgName).collection('Members').doc(qs.admin.id).set(qs.admin).then(()=>{
                        res.setHeader('Content-Type', 'application/problem+json');
                        res.setHeader('Content-Language', 'en');
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                            success: true,
                            code: 200,
                            title: "SUCCESS",
                            message: "Created Organization",
                            data: {
                                    orgName: req.body.orgName,
                                    tempPassword: pass
                            }
                        })
                mail(req.body.orgName + ' Admin', pass);
                log({
                    type: 'USER',
                    action: 'AddMemberToOrg',
                    details: '1563355277876',
                    user: qs.admin.id,
                    org1: 'FABI',
                    org2: req.body.orgName,
                    action: '/createOrganization'
                });
            });
            });
        })
    }
    }).catch((err) => {
        console.log("Database connection error: " + err);
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(500).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 500,
            title: "INTERNAL SERVER ERROR",
            message: "Error Connecting to User Database"  
=======
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
>>>>>>> develop:API/UserManagement/api/routes/FABI/requestOrganizationAccount.js
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
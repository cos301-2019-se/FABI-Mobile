const express = require('express');
const router = express.Router();
const request = require("request");
const bcrypt = require('bcrypt-nodejs');
const admin = require('firebase-admin');
const mail = require('../SendEmail_UserManagement');
const log = require('../../sendLogs');
const auth = require('../../loginAuth');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', addOrganization);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Add Organization
/**
 * @summary Create a new organization with data recieved
 * @description  REQUEST DATA REQUIRED: organization fname, organization details, admin details
 *  1. Check if all required data is received and that it is correct.
 *      - IF NOT: return Error Response
 *  2. Connect to DB.
 *      - IF ERROR: return Error Response
 *  3. Encrypt Password.
 *  4. Add Organization to Organizations collection and create admin within admin collection int that organization
 *      - IF ERROR: return Error Response
 *  5. Push data to the database.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

async function addOrganization(req, res)
{

    if(await auth.authSuperUser(req.headers.authorization)){
        // (1) 
        if (req.body.admin.fname == undefined || req.body.admin.fname == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "Admin fname expected"
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
                mail.sendOrganizationTemporaryPin(qs.orgName, qs.admin.email, qs.admin.fname, qs.admin.surname, pass);
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
                mail.sendOrganizationTemporaryPin(qs.orgName, qs.admin.email, qs.admin.fname, qs.admin.surname, pass);
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
            });
        });
    }
    else
    {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(403).json({                                  // ******* RESPONSE STATUS? ************
            success: true,
            code: 403,
            title: "NOT AUTHORIZED",
            message: "your authentication token is not valid",
        });
    }

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

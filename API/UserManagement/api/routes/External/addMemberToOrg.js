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
router.post('/', addMember);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Add Member
/**
 * @summary Add Member to orginization
 * @description  REQUEST DATA REQUIRED: Organization fname, Member fname, email, surname
 *  1. Check if all required data is received and that it is correct.
 *      - IF NOT: return Error Response
 *  2. Generate and Encrypt Password.
 *  3. Connect to DB.
 *      - IF ERROR: return Error Response
 *  4. Add Member to given organization
 *      - IF ERROR: return Error Response
 *  5. Send appropriate response message.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();
//[END config]
async function addMember(req, res)
{
    if(await auth.authOrgAdmin(req.headers.authorization)){
        // (1)
        var userTypes = ['OrganizationAdmin', 'Member'];
        if (req.body.member.fname == undefined || req.body.member.fname == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "User fname expected"
            });
        }
        else if (req.body.member.surname == undefined || req.body.member.surname == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "User surname expected"
            });
        }
        else if (req.body.member.email == undefined || req.body.member.email == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "User email expected"
            });
        }
        else if (req.body.orgName == undefined || req.body.member.orgName == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "orgName expected"
            });
        }
        else if (req.body.userType == undefined || req.body.member.userType == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "userType expected"
            });
        }
        else if(!userTypes.includes(req.body.userType)) {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "User type of new user is not supported"
            });
        }

        // (2)
        const salt = bcrypt.genSaltSync(10);
        var pass = generatePassword(10);
        const qs = {
            fname: req.body.member.fname,
            surname: req.body.member.surname,
            email: req.body.member.email,
            password: bcrypt.hashSync(pass, salt),
            id : new Date().getTime().toString(),
            userType: req.body.userType
        }
        var checkRef = db.collection('Organizations').doc(req.body.orgName).collection('Members').where('email', '==', qs.email);

        checkRef.get().then(doc => {
            if(!doc.empty)
            {
                res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                        success: false,
                        code: 400,
                        title: "BAD_REQUEST",
                        message: "User email already exists"
                    });
            }
            else{
                var docRef  = db.collection('Organizations').doc(req.body.orgName).collection('Members').doc(qs.id);
        
        //(4)
                docRef.set(qs).then(() => {

                //(5)
                    res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: true,
                    code: 200,
                        title: "SUCCESS",
                        message: "Added Member",
                        data: {
                            message : "Member Added to Organization",
                            orgName : req.body.orgName,
                            tempPassword : pass}
                        
                    });
                    mail(req.body.orgName + ' Member', pass);
                    log({
                        type: 'USER',
                        action: 'AddMemberToOrg',
                        details: '1563355277876',
                        user: qs.id,
                        org1: 'FABI',
                        org2: req.body.orgName,
                        action: '/addmemberToOrg'
                    });
                });
            }
        });
        // (3)
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

    // (2)
    const salt = bcrypt.genSaltSync(10);
    var pass = generatePassword(10);
    const qs = {
        fname: req.body.member.fname,
        surname: req.body.member.surname,
        email: req.body.member.email,
        password: bcrypt.hashSync(pass, salt),
        id : new Date().getTime().toString(),
        userType: req.body.userType
    }
    var checkRef = db.collection('Organizations').doc(req.body.orgName).collection('Members').where('email', '==', qs.email);

    checkRef.get().then(doc => {
        if(!doc.empty)
        {
            res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                    success: false,
                    code: 400,
                    title: "BAD_REQUEST",
                    message: "User email already exists"
                });
        }
        else{
            var docRef  = db.collection('Organizations').doc(req.body.orgName).collection('Members').doc(qs.id);
    
    //(4)
            docRef.set(qs).then(() => {

            //(5)
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                success: true,
                code: 200,
                    title: "SUCCESS",
                    message: "Added Member",
                    data: {
                        message : "Member Added to Organization",
                        orgName : req.body.orgName,
                        tempPassword : pass}
                    
                });
                mail.sendUserTemporaryPin(req.body.orgName, qs.email, qs.fname, qs.surname, pass, qs.userType);
                log({
                    type: 'USER',
                    action: 'AddMemberToOrg',
                    details: '1563355277876',
                    user: qs.id,
                    org1: 'FABI',
                    org2: req.body.orgName,
                    action: '/addmemberToOrg'
                });
            });
        }
    });
    // (3)
    

}

//Function to generate password
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

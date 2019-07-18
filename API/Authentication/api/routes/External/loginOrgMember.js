const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const admin = require('firebase-admin');
const config = require('../config');
const log = require('../../sendLogs');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', loginMember);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Login Organization Member
/**
 * @summary Login Organization Member
 * @description  REQUEST DATA REQUIRED: email, password, organization name
 *  
 *  1. check that all data has been recieved and is in the correct format
 *  2. connect to database
 *      - IF connection fails then return 500 server error
 *  3. get login data from the database
 *     - IF empty then return username not found 
 *     - IF undefined then return username not found
 *  4. compare encrypted password from database to given password
 *     - IF passwords match then return 200 and verified
 *     - IF passwords do not match then return NOT AUTHORIZED
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function loginMember(req, res)
{
// (1)
    if (req.body.email == undefined || req.body.email == '') {
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

    if (req.body.password == undefined || req.body.password == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "User password expected"
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
            message: "organization name expected"
        });
    }
    //(2)
    var docRef  = db.collection('Organizations').doc(req.body.orgName).collection('Members').where('email', '==', req.body.email);
    collectionRef = db.collection('Organizations').doc(req.body.orgName);

    //(3)
    collectionRef.get().then(doc => 
    {
        if(doc.empty)
        {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(404).json({                                  // ******* RESPONSE STATUS? ************
                    success: false,
                    code: 404,
                    title: "NOT FOUND",
                    message: "Not Authenticated: Organization with given name not found"
            });
        }
        else{
            docRef.get().then(doc =>
                {
                    if(doc.empty)
                    {
                        res.setHeader('Content-Type', 'application/problem+json');
                        res.setHeader('Content-Language', 'en');
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.status(404).json({                                  // ******* RESPONSE STATUS? ************
                            success: false,
                            code: 404,
                            title: "NOT FOUND",
                            message: "Not Authenticated: User with given email not found"
                        
                        });
                    }
                    else{
                        var member;
                        doc.forEach(element => {
                            member = element.data();
                        });
                        //(4)
                        bcrypt.compare(req.body.password, member.password, (err, valid) =>
                        {
                            delete member.password;
                            if(valid)
                            {
                                res.setHeader('Content-Type', 'application/json');
                                res.setHeader('Content-Language', 'en');
                                res.setHeader("Access-Control-Allow-Origin", "*");
                                res.status(200).json({
                                    success: true,
                                    code: 200,
                                    title: "AUTHORIZED",
                                    message: "Authenticated",
                                    token: bcrypt.hashSync(config.DiagnosticToken, bcrypt.genSaltSync(10)),
                                    userDetails : member
                                    
                                });
                                log({
                                    type: 'ACCL',
                                    statusCode: '200',
                                    details: 'Logged In for organization: ' + req.body.orgName,
                                    user: member.id
                                });
                            }
                            else{
                                res.setHeader('Content-Type', 'application/problem+json');
                                res.setHeader('Content-Language', 'en');
                                res.setHeader("Access-Control-Allow-Origin", "*");
                                res.status(401).json({
                                    success: false,
                                    code: 401,
                                    title: "UNAUTHORIZED",
                                    message: "Not-Authenticated : Incorrect Password"
                                });
                            }
                        });
                    }
        });}     
}).catch((err) => {
    console.log(err);
    res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(500).json({
                    success: false,
                    code: 500,
                    title: "SERVER ERROR",
                    message: "Internal Server Error"
                });
                log({
                    type: 'ERRL',
                    statusCode: '500',
                    details: 'Error connecting to database'
                });
});

}

module.exports = router;

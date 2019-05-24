const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const admin = require('firebase-admin');
const config = require('../config');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', loginAdmin);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Login Organization Admin
/**
 * @summary Login Organization Admin
 * @description  REQUEST DATA REQUIRED: email, password, organization name
 *  1. Check if all required data is received and that it is correct.
 *      - IF NOT: return Error Response
 *  2. Connect to DB.
 *      - IF ERROR: return Error Response
 *  4. Add Organization to Organizations collection and create admin within admin collection int that organization
 *      - IF ERROR: return Error Response
 *  5. Send appropriate response message.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function loginAdmin(req, res)
{
// (1) Check if all required data is received and that it is correct.
    if (req.body.email == undefined || req.body.email == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "User email expected"
            }
        });
    }

    if (req.body.password == undefined || req.body.password == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "User password expected"
            }
        });
    }

    if (req.body.orgName == undefined || req.body.orgName == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "organization name expected"
            }
        });
    }
    
    var docRef  = db.collection('Organizations').doc(req.body.orgName).collection('Admins').doc(req.body.email);
    collectionRef = db.collection('Organizations').doc(req.body.orgName).collection('Admins');

    collectionRef.get().then(collection => 
    {
        if(collection.empty)
        {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(404).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                error: {
                    code: 404,
                    title: "NOT FOUND",
                    message: "Not Authenticated: Organization with given name not found"
                }
            });
        }
        else{
            docRef.get().then(doc =>
                {
                    if(typeof doc.data() === 'undefined')
                    {
                        res.setHeader('Content-Type', 'application/problem+json');
                        res.setHeader('Content-Language', 'en');
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.status(404).json({                                  // ******* RESPONSE STATUS? ************
                        success: false,
                        error: {
                            code: 404,
                            title: "NOT FOUND",
                            message: "Not Authenticated: User with given email not found"
                        }
                        });
                    }
                    else{
                        bcrypt.compare(req.body.password, doc.data().password, (err, valid) =>
                        {
                            if(valid)
                            {
                                res.setHeader('Content-Type', 'application/json');
                                res.setHeader('Content-Language', 'en');
                                res.setHeader("Access-Control-Allow-Origin", "*");
                                res.status(200).json({
                                    success: true,
                                    data: {
                                        code: 200,
                                        title: "AUTHORIZED",
                                        message: "Authenticated",
                                        token: bcrypt.hashSync(config.OrgAdminToken, bcrypt.genSaltSync(10))
                                    }
                                });
                            }
                            else{
                                res.setHeader('Content-Type', 'application/problem+json');
                                res.setHeader('Content-Language', 'en');
                                res.setHeader("Access-Control-Allow-Origin", "*");
                                res.status(400).json({
                                    success: false,
                                    error: {
                                        code: 401,
                                        title: "UNAUTHORIZED",
                                        message: "Not-Authenticated : Incorrect Password"
                                    }
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
                    error: {
                        code: 500,
                        title: "SERVER ERROR",
                        message: "Internal Server Error"
                    }
                });
});

}

module.exports = router;

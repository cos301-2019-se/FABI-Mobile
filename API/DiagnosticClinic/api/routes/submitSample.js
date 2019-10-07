const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const refNumberGenerator = require('./generateReferenceNumber');
const buildTree = require('../buildTree');
const predict = require('../predict');
const auth = require('../loginAuth');
const mail = require('./SendEmail_Sample');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', submitForm);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Submit Sample
/**
 * @summary submit a sample to the diagnostic clinic
 * @description  REQUEST DATA REQUIRED: all form data
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

async function submitForm(req, res)
{
    if(await auth.authClinicAdmin(req.headers.authorization)||await auth.authOrgMember(req.headers.authorization)||await auth.authSuperUser(req.headers.authorization)||await auth.authCCAdmin(req.headers.authorization)||await auth.authOrgAdmin(req.headers.authorization)||await auth.authStaff(req.headers.authorization)){
        if (req.body.userID == undefined || req.body.userID == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "User ID is required"
            });
        }

        else if (req.body.orgName == undefined || req.body.orgName == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "No organization Name Submitted"
            });
        }

        else if (req.body.data == undefined || req.body.data == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "Data to be submitted missing"
            });
        }
        else{
            result = predict(req.body.data).then((result => {
                refnum = refNumberGenerator(result);
                req.body.referenceNumber = refnum;
                sampleRef = db.collection('Diagnostic').doc('Samples').collection('Processing').doc(refnum);
                req.body.status = 'submitted';
                sampleRef.set(req.body).then(()=>
                {
                    console.log("Hello");
                    if(req.body.orgName == 'FABI')
                    {
                        mailRef = db.collection('Organizations').doc(req.body.orgName).collection('Staff').doc(req.body.userID);
                    }
                    else
                    {
                        mailRef = db.collection('Organizations').doc(req.body.orgName).collection('Members').doc(req.body.userID);
                    }

                    mailRef.get().then(doc => {
                        console.log(doc.data());
                        mail.sendSampleSubmission(refnum, doc.data().email, doc.data().fname, doc.data().surname, result);
                        res.setHeader('Content-Type', 'application/problem+json');
                        res.setHeader('Content-Language', 'en');
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                        success: true,
                            code: 200,
                            title: "SUCCESS",
                            message : "form succesfully submitted",
                            data: {
                                referenceNumber : refnum,
                                prediagnosis: result
                            }
                        });
                    });
                });
            })
            );
        }
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


module.exports = router;

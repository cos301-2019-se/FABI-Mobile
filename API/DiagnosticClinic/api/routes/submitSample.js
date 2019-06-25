const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const refNumberGenerator = require('./generateReferenceNumber');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', submitForm);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             submit sample
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

function submitForm(req, res)
{
    refnum = refNumberGenerator();
    sampleRef = db.collection('Diagnostic').doc('Samples').collection('Pending').doc(refnum);
    
    sampleRef.set(req.body).then(()=>
    {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json({                                  // ******* RESPONSE STATUS? ************
        success: true,
            code: 200,
            title: "SUCCESS",
            message : "form succesfully submitted",
            data: {
                referenceNumber : refnum
            }
        });
    })
}


module.exports = router;

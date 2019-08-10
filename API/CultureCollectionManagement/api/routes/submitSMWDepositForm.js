const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const log = require('../sendLogs');
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

    else{

    
    id = new Date().getTime().toString();
    sampleRef = db.collection('CultureCollection').doc('CMWDeposit').collection('Forms').doc(id);
    req.body.status = 'submitted';
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
            }
        });
        log({
            type: "ACCL",
            statusCode: "200",
            details: "/submitCMWRevitalizationFrom",
            user: req.body.userID
        });
    })
}
}


module.exports = router;

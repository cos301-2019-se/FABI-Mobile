const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const log = require('../sendLogs');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getAllStaff);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get All Processing Forms
/**
 * @summary Get all Processing Forms submitted
 * @description  REQUEST DATA REQUIRED: null
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function getAllStaff(req, res) {

    //(1)
    var staffRef = db.collection('CultureCollection').doc('CMWProcessing').collection('Forms');
    staffRef.get().then(snapshot => {
            var qs = {forms : []}

            //(2)
            snapshot.forEach(doc => {
                qs.forms.push(doc.data());
            })
            
            //(4)
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
            success: true,
            code: 200,
            title: "SUCCESS",
            message: "List of Processing Forms",
            data: {
                qs
            }
    
        });
        log({
            type: "ACCL",
            statusCode: "200",
            details: "/getAllProcessingForms",
            user: req.body.userID
        });
    });
}
module.exports = router;
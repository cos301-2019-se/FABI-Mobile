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
//                                             Get All Fabi Admins
/**
 * @summary Get all staff assotiated with FABI
 * @description  REQUEST DATA REQUIRED: null
 *
 *  1. Connect to DB.
 *      - IF ERROR: return Error Response
 *  2. Retrieve list from database
 *  3. remove password information from data to be sent
 *  4. Send appropriate response message.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function getAllStaff(req, res) {

    //(1)
    var staffRef = db.collection('CultureCollection').doc('CMWRevitalization').collection('Forms');
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
            message: "List of Revitalization Forms",
            data: {
                qs
            }
    
        });
        log({
            type: "ACCL",
            statusCode: "200",
            details: "/getAkkRevitalizationForms",
            user: req.body.userID
        });
    });
}
module.exports = router;
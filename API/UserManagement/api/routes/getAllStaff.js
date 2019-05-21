const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getAllStaff);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get Org Details
/**
 * @summary Get all staff assotiated with FABI
 * @description  REQUEST DATA REQUIRED: null
 *
 *  1. Connect to DB.
 *      - IF ERROR: return Error Response
 *  2. Encrypt Password.
 *  3. Add Organization to Organizations collection and create admin within admin collection int that organization
 *      - IF ERROR: return Error Response
 *  4. Send appropriate response message.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function getAllStaff(req, res) {
    var staffRef = db.collection('Organizations').doc('FABI').collection('Staff');
    staffRef.get().then(snapshot => {
            var qs = {researchers : []}

            snapshot.forEach(doc => {
                qs.researchers.push(doc.data());
            })
        
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
            success: true,
            error: {
                code: 200,
                title: "SUCCESS",
                message: "List of FABI staff",
                content: {
                    staff: qs
                }
            }
        });
    });
}
module.exports = router;
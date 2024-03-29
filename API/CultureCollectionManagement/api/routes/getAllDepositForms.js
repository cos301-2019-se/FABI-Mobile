const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const log = require('../sendLogs');
const auth = require('../loginAuth');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getAllStaff);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get All Deposit Forms
/**
 * @summary Get all CMW deposit forms submitted FABI
 * @description  REQUEST DATA REQUIRED: null
 *
 *  1. Connect to DB.
 *      - IF ERROR: return Error Response
 *  2. Retrieve list from database
 *  3. Send appropriate response message.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

async function getAllStaff(req, res) {

    //(1)
    if(await auth.authCCAdmin(req.headers.authorization)||await auth.authSuperUser(req.headers.authorization)||await auth.authStaff(req.headers.authorization)){
        var staffRef = db.collection('CultureCollection').doc('CMWDeposit').collection('Forms');
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
                message: "List of Deposit Forms",
                data: {
                    qs
                }
        
            });
            log({
                type: "ACCL",
                statusCode: "200",
                details: "/getAllDepostiForms",
                user: req.body.userID
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
module.exports = router;
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', addDoc);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Add Member
/**
 * @summary Add Member to orginization
 * @description  REQUEST DATA REQUIRED: Organization name, Member name, email, surname
 *  1. Check if all required data is received and that it is correct.
 *      - IF NOT: return Error Response
 *  2. Connect to DB.
 *      - IF ERROR: return Error Response
 *  3. Encrypt Password.
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

function addDoc(req, res)
{
// (1) Check if all required data is received and that it is correct.
    if (req.body.databaseName == undefined || req.body.databaseName == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "database name expected"
            }
        });
    }
    if (req.body.data == undefined || req.body.data == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "data expected"
            }
        });
    }

// (2) Connect to DB
    req.body.data.forEach(item => {
        console.log(item);
        var docRef  = db.collection('Databases').doc(req.body.databaseName).collection('Data').doc(item.num);
        docRef.set(item).then(() => {
            console.log("reocrd added");
        });

    });

    res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
            success: true,
            data: {
                code: 200,
                title: "SUCCESS",
                message: "Added Data",
                content: {message : "Data submitted to " + req.body.databaseName,
                    databaseName : req.body.databaseName}
                }
            });
}
module.exports = router;

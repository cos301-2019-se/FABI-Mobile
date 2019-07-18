const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', addDoc);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Add Document
/**
 * @summary Add Member to orginization
 * @description  REQUEST DATA REQUIRED: Organization name, Member name, email, surname
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
            code: 400,
            title: "BAD_REQUEST",
            message: "database name expected"
        });
    }
    if (req.body.data == undefined || req.body.data == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "data expected"
        });
    }

// (2) Connect to DB
    req.body.data.id = item.id = new Date().getTime().toString();
    var docRef  = db.collection('Databases').doc(req.body.databaseName).collection('Data').doc(req.body.data.id);
    docRef.set(req.body.data).then(() => {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json({                                  // ******* RESPONSE STATUS? ************
            success: true,
            code: 200,
            title: "SUCCESS",
            message : "Data submitted to " + req.body.databaseName,
            data: {
                databaseName : req.body.databaseName
            }
    });
    log({
        type: "DBML",
        action: "addDoc",
        details: {databaseName: req.body.databaseName, id: req.body.data.id} 
    });
});

}

module.exports = router;

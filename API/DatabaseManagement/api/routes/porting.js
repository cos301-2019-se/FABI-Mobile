const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const log = require('../sendLogs');
const auth = require('../loginAuth');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', addDoc);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                Porting
/**
 * @summary Submit JSON array into Database
 * @description  REQUEST DATA REQUIRED: Database name, Data to be submitted
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

async function addDoc(req, res)
{
    if(await auth.authSuperUser(req.headers.authorization)||await auth.authStaff(req.headers.authorization)){
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

        db.collection("Databases").doc(req.body.databaseName).set({name : req.body.databaseName}).then(()=> {
            var ids = [];
            req.body.data.forEach(item => {
                item.id = new Date().getTime().toString();
                console.log(item);
                ids.push(item.id);
                var docRef  = db.collection('Databases').doc(req.body.databaseName).collection('Data').doc(item.id);
                docRef.set(item).then(() => {
                    console.log("record added");
                });
            });

            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                success: true,
                code: 200,
                title: "SUCCESS",
                message : "Data submitted to " + req.body.databaseName,
                data: {
                    databaseName : req.body.databaseName,
                    newIdArray : ids
                }
            });
            log({
                type: "DBML",
                action: "/porting",
                details: req.body.databaseName,
                user: '1563355277876',
                org1: 'FABI'
            });
        })
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

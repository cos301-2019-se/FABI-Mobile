const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const auth = require('../loginAuth');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getAllSamples);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get  Samples
/**
 * @summary Get all samples
 * @description  REQUEST DATA REQUIRED: none
 *  
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

async function getAllSamples(req, res) {
    if(await auth.authClinicAdmin(req.headers.authorization)||await auth.authSuperUser(req.headers.authorization)){

        var staffRef = db.collection('Diagnostic').doc('Samples').collection('Processing');
        staffRef.get().then(snapshot => {
            if(snapshot.empty)
            {
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************                    
                    success: false,
                    code: 200,
                    title: "NOT FOUND",
                    message: "No samples found",
                    data : {}
                });
            }
            else{
                var data = {samples : []}
                    
                snapshot.forEach(doc => {
                    data.samples.push(doc.data());
                })

                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: true,
                    code: 200,
                    title: "SUCCESS",
                    message: "List of samples",
                    data
                });
            }
        }).catch((err) =>
        {
            console.log("Database connection error: " + err);
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(500).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 500,
                title: "INTERNAL SERVER ERROR",
                message: "Error Connecting to User Database"
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
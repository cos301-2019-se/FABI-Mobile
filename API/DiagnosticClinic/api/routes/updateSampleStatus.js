const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const bcrypt = require('bcrypt-nodejs');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', updateMember);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Update Sample Status
/**
 * @summary Update the status of a sample with the given reference numeber
 * @description  REQUEST DATA REQUIRED: reference number, new status
 *  
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function updateMember(req, res) {
    
    //(1)
    if (req.body.refNum == undefined || req.body.refNum == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "Reference number of sample to update required"
            
        });
    }
    if (req.body.status == undefined || req.body.status == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "New status of sample to update required"
            
        });
    }


    var docRef = db.collection('Diagnostic').doc('Samples').collection('Processing').doc(req.body.refNum);

    docRef.get().then(doc =>{
        //(2)
        if(typeof(doc.data()) === 'undefined')
        {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 200,
                title: "NOT FOUND",
                message: "Sample does not exist",
                data : {}
            });
        }
        else{
            

                var updateRef = db.collection('Diagnostic').doc('Samples').collection('Processing').doc(req.body.refNum);
                
                //(5)
                updateRef.update({status : req.body.status}).then(() => {

                    res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                        success: true,
                        code: 200,
                        title: "SUCCESS",
                        message: "Sample Status Updated",
                        data: {
                                
                        }
                });
            
        })}}).catch((err) =>{
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

module.exports = router;

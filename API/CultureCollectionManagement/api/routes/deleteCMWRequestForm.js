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
//                                             Update Deposit Status
/**
 * @summary update the status of a submitted form
 * @description  REQUEST DATA REQUIRED: status to update to
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
    else if (req.body.formID == undefined || req.body.formID == ''){
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "Form ID is required"
        });
    }
    else{
        var memRef = db.collection('CultureCollection').doc('CMWRequest').collection('Forms').doc(req.body.formID);
        memRef.get().then(doc => {
            //(2)
            if(typeof(doc.data()) === 'undefined')
            {
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(404).json({                                  // ******* RESPONSE STATUS? ************
                    success: false,
                    code: 404,
                    title: "NOT FOUND",
                    message: "Form does not exist"
                });
            }
                qs = doc.data();
                delete qs.password;
                //(3)
                memRef.delete().then(() => {
                    res.setHeader('Content-Type', 'application/problem+json');
                                res.setHeader('Content-Language', 'en');
                                res.setHeader("Access-Control-Allow-Origin", "*");
                                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                                    success: true,
                                    code: 200,
                                    title: "SUCCESS",
                                    message: "Deleted CMW Request Form",
                                    data: 
                                        qs
                                    
                                
                            });
                        
                });
                
        });
    }
}
module.exports = router;
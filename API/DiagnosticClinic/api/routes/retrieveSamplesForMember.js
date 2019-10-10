const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const auth = require('../loginAuth');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getMember);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get Samples for User
/**
 * @summary Get Samples submitted by given user ID 
 * @description  REQUEST DATA REQUIRED: userID
 * 
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

//(1)
async function getMember(req, res) {
    if(await auth.authClinicAdmin(req.headers.authorization)||await auth.authOrgMember(req.headers.authorization)||await auth.authSuperUser(req.headers.authorization)||await auth.authStaff(req.headers.authorization)){
        if (req.body.userID == undefined || req.body.userID == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "userID expected"
            });
        }

        //(2)
        var memRef = db.collection('Diagnostic').doc('Samples').collection('Processing').where('userID', '==', req.body.userID);
        memRef.get().then(doc => {
            if(doc.empty)
            {
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: false,
                    code: 200,
                    title: "NOT FOUND",
                    message: "No samples for given member found",
                    data : {}
                });
            }
            else{
                samples = [];
                doc.forEach(element => {
                    samples.push(element.data());
                });
                //(3)
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: true,
                    code: 200,
                    title: "SUCCESS",
                    message: "Samples for member Found",
                    data: {
                        samples   
                    }
                });
            }
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
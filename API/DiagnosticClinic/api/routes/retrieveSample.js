const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const auth = require('../loginAuth');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getSample);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get Sample
/**
 * @summary Get Sample with given reference number
 * @description  REQUEST DATA REQUIRED: sample reference number
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();


async function getSample(req, res) {
    if(await auth.authClinicAdmin(req.headers.authorization)||await auth.authOrgMember(req.headers.authorization)||await auth.authSuperUser(req.headers.authorization)||await auth.authCCAdmin(req.headers.authorization)||await auth.authOrgAdmin(req.headers.authorization)||await auth.authStaff(req.headers.authorization)){

        if (req.body.refNum == undefined || req.body.refNum == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "Reference number expected"
            });
        }

        var memRef = db.collection('Diagnostic').doc('Samples').collection('Processing').doc(req.body.refNum);
        memRef.get().then(doc => {
            if(typeof(doc.data()) === 'undefined')
            {
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: false,
                    code: 200,
                    title: "NOT FOUND",
                    message: "Sample with given Reference number does not exist",
                    data : {}
                });
            }
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: true,
                    code: 200,
                    title: "SUCCESS",
                    message: "Sample Found",
                    data: {
                        sample : doc.data()
                    }
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
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getMember);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get Organization Member
/**
 * @summary Get User assotiated with Organization
 * @description  REQUEST DATA REQUIRED: user email, organization
 *  1. check that email of user and organization is recieved
 *  2. retrieve user data of given user
 *  3. remove user password from data to be sent
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

//(1)
function getMember(req, res) {
    
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
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "NOT FOUND",
                message: "No samples for given member found"
            });
        }
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
    });
}
module.exports = router;
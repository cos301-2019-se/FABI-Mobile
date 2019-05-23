const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getOrgDetails);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get Org Details
/**
 * @summary Get details of given org, should be secure such that only the org admin or superuser can read details
 * @description  REQUEST DATA REQUIRED: Organization name
 *  1. Check if all required data is received and that it is correct.
 *      - IF NOT: return Error Response
 *  2. Connect to DB.
 *      - IF ERROR: return Error Response
 *  3. Encrypt Password.
 *  4. Add Organization to Organizations collection and create admin within admin collection int that organization
 *      - IF ERROR: return Error Response
 *  5. Send appropriate response message.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function getOrgDetails(req, res) {
    
    if (req.body.orgName == undefined || req.body.orgName == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "orgName of organization to retrieve is required"
            }
        });
    }

    var getRef = db.collection('Organizations').doc(req.body.orgName);

    getRef.get().then(doc => {
            if(isEmptyObject(doc.data())){
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(404).json({                                  // ******* RESPONSE STATUS? ************
                    success: false,
                    error: {
                        code: 404,
                        title: "FAILURE",
                        message: "Organization not found"
                    }
                });
            }
            else
            {
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: true,
                    data: {
                        code: 200,
                        title: "SUCCESS",
                        message: "Organization Found",
                        content: {
                            details : doc.data()
                        }
                    }
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
            error: {
                code: 500,
                title: "FAILURE",
                message: "Error Connecting to User Database"
            }
        });
    });
}

module.exports = router;

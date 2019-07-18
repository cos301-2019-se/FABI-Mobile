const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const log = require('../../sendLogs');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getOrgDetails);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Remove Organization
/**
 * @summary Get details of given org, should be secure such that only the org admin or superuser can read details
 * @description  REQUEST DATA REQUIRED: Organization name
 *  1. Check if all required data is received and that it is correct.
 *      - IF NOT: return Error Response
 *  2. Connect to DB.
 *      - IF ERROR: return Error Response
 *  3. Check if org exists
 *  4. Delete Organizaion 
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function getOrgDetails(req, res) {
    //(1)
    if (req.body.orgName == undefined || req.body.orgName == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "orgName of organization to retrieve is required"
        });
    }

    //(2)
    var getRef = db.collection('Organizations').doc(req.body.orgName);

    getRef.get().then(doc => {
            //(3)
            if(typeof(doc.data()) === 'undefined'){
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(404).json({                                  // ******* RESPONSE STATUS? ************
                    success: false,
                    code: 404,
                    title: "NOT FOUND",
                    message: "Organization not found"
                });
            }
            else
            {
                //(4)
                db.collection('Organizations').doc(req.body.orgName).delete().then(() => {
                    res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                        success: true,
                        code: 200,
                        title: "SUCCESS",
                        message: "Organization Succesfully Deleted",
                        data: {
                            details : doc.data()
                        }
                    });
                })
                log({
                    type: 'USER',
                    action: 'AddMemberToOrg',
                    details: '1563355277876',
                    user: doc.data().admin.id,
                    org1: 'FABI',
                    org2: req.body.orgName,
                    action: '/removeOrg'
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

module.exports = router;

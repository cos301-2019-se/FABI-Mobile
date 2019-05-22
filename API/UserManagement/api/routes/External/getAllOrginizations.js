const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getAllOrgMembers);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get Org Details
/**
 * @summary Get all members associated with an organization
 * @description  REQUEST DATA REQUIRED: null
 *
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function getAllOrgMembers(req, res) {
    
    var orgRef = db.collection('Organizations');
    orgRef.get().then(snapshot => {
        if(snapshot.empty)
        {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************                    success: false,
                error: {
                    code: 400,
                    title: "NOT FOUND",
                    message: "No organizations found"
                }
            });
        }
        else{
            var qs = {Organizations : []}
                
            snapshot.forEach(doc => {
                qs.Organizations.push(doc.data());
            })

            qs.Organizations.forEach(doc => {
                delete doc.admin;
            })

            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                success: true,
                data: {
                    code: 200,
                    title: "SUCCESS",
                    message: "List of Organizations",
                    content: {
                        qs
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
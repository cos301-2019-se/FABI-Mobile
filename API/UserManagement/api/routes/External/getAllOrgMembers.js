const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getAllOrgMembers);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get Org Members
/**
 * @summary Get all members associated with an organization
 * @description  REQUEST DATA REQUIRED: Org Name
 *  
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function getAllOrgMembers(req, res) {
    
    if (req.body.orgName == undefined || req.body.orgName == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "orgName of members to be retrieved expected"
            }
        });
    }
    
    var staffRef = db.collection('Organizations').doc(req.body.orgName).collection('Members');
    staffRef.get().then(snapshot => {
        if(snapshot.empty)
        {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************                    success: false,
                error: {
                    code: 400,
                    title: "NOT FOUND",
                    message: "No organization with given name found"
                }
            });
        }
        else{
            var qs = {members : []}
                
            snapshot.forEach(doc => {
                qs.members.push(doc.data());
            })
            
            qs.members.forEach(doc=>
            {
                delete doc.password;
            })

            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                success: true,
                data: {
                    code: 200,
                    title: "SUCCESS",
                    message: "List of " + req.body.orgName + " members",
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
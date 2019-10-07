const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const auth = require('../../loginAuth');
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
 *  1. check that an org name has been provided
 *  2. retrieve all the org members from the database
 *  3. push the details of all the members to a JSON object
 *  4. remove the password details from the data to be sent
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

async function getAllOrgMembers(req, res) {
    
    if(await auth.authOrgAdmin(req.headers.authorization)||await auth.authSuperUser(req.headers.authorization))
    {
        //(1)
    
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
        
        //(2)
        var orgRef = db.collection('Organizations').doc(req.body.orgName);
        orgRef.get().then(doc => {
            if(typeof(doc.data()) === 'undefined')
            {
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(404).json({                                  // ******* RESPONSE STATUS? ************                    
                    success: false,
                    code: 404,
                    title: "NOT FOUND",
                    message: "No organization with given name found"
                });
            }
            else
            {

            var staffRef = db.collection('Organizations').doc(req.body.orgName).collection('Members');
            staffRef.get().then(snapshot => {
                
                if(snapshot.empty)
                {
                    res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(200).json({                                  // ******* RESPONSE STATUS? ************                    
                        success: false,
                        code: 200,
                        title: "SUCCESS",
                        message: "No Data for organization found",
                        data : {}
                    });
                }
                else{
                    var data = {members : []}
                    
                    //(3)
                    snapshot.forEach(doc => {
                        data.members.push(doc.data());
                    })
                    
                    //(4)
                    data.members.forEach(doc=>
                    {
                        delete doc.password;
                    })

                    res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                        success: true,
                        code: 200,
                        title: "SUCCESS",
                        message: "List of " + req.body.orgName + " members",
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
                    title: "INTERNAL SERVERE ERROR",
                    message: "Error Connecting to User Database"
                    
                });
            });
        }});
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
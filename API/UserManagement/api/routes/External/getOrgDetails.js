const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const auth = require('../../loginAuth');
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
 *  2. Get the details of given org
 *  3. Remove admin details from the data to be sent
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

async function getOrgDetails(req, res) {
    //(1)
    if(await auth.authSuperUser(req.headers.authorization)||await auth.authOrgAdmin(req.headers.authorization)){
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

                if(typeof doc.data === undefined){
                    res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                        success: false,
                        code: 200,
                        title: "FAILURE",
                        message: "Organization not found"   
                    });
                }
                else
                {
                    //(3)
                    //delete doc.data.admin.password;

                    res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                        success: true,
                        code: 200,
                        title: "SUCCESS",
                        message: "Organization Found",
                        data:
                        {
                            details : doc.data()  
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
                code: 500,
                title: "INTERNAL SERVER ERROR",
                message: "Error Connecting to User Database"
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

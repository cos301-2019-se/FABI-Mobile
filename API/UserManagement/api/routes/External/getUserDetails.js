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
 * @description  REQUEST DATA REQUIRED: user ID, organization
 *  1. check that ID of user and organization is recieved
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
    if (req.body.id == undefined || req.body.id == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "User id expected"
        });
    }
    else if (req.body.orgName == undefined || req.body.orgName == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "orgName expected"
        });
    }

    //(2)
    else{
    if(req.body.orgName == 'FABI')  {
        var memRef = db.collection('Organizations').doc(req.body.orgName).collection('Staff').doc(req.body.id);
        memRef.get().then(doc => {

            if(doc.data() === undefined)
            {
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: false,
                    code: 200,
                    title: "NOT FOUND",
                    message: "User does not exist",
                    data: {}
                });
            }
            else{
                //(3)
                var member = doc.data();
                delete member.password;
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: true,
                    code: 200,
                    title: "SUCCESS",
                    message: "Organization Member Found",
                    data: 
                        member   
                 
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
        });;
    }
    else {
        var memRef = db.collection('Organizations').doc(req.body.orgName).collection('Members').doc(req.body.id);
        memRef.get().then(doc => {
            if(doc.data() === undefined)
            {
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: false,
                    code: 200,
                    title: "NOT FOUND",
                    message: "User does not exist",
                    data: {}
                });
            }
                //(3)
            else{
                var member = doc.data();
                delete member.password;
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: true,
                    code: 200,
                    title: "SUCCESS",
                    message: "Organization Member Found",
                    data: 
                        member       
                    
            })}
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
    }
}
}
module.exports = router;
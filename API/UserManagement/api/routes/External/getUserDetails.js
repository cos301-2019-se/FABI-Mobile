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
    if (req.body.orgName == undefined || req.body.orgName == '') {
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

    if(req.body.orgName == 'FABI')  {
        var memRef = db.collection('Organizations').doc(req.body.orgName).collection('Staff').doc(req.body.id);
        memRef.get().then(doc => {
            console.log(doc);
            console.log(doc.data());
            if(typeof(doc.data()) === undefined)
            {
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                    success: false,
                    code: 400,
                    title: "NOT FOUND",
                    message: "User does not exist"
                });
            }
                //(3)
                member = doc.data();
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
        });
    }
    else {
        var memRef = db.collection('Organizations').doc(req.body.orgName).collection('Members').doc(req.body.id);
        memRef.get().then(doc => {
            if(typeof(doc.data()) === undefined)
            {
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                    success: false,
                    code: 400,
                    title: "NOT FOUND",
                    message: "User does not exist"
                });
            }
                //(3)
                member = doc.data();
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
        });
    }
}
module.exports = router;
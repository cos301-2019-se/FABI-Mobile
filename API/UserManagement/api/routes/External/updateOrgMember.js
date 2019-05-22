const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', updateMember);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get Org Details
/**
 * @summary Update a Member memebr associated with Organization
 * @description  REQUEST DATA REQUIRED: origional email of user to be updated ,fields which are to be changed, name of Organization
 *  
 * 1. check valid details have been submitted
 * 2. check if user to update exists, else return error
 * 3. if email needs to be changed, delete copy details into new document with new email as the key
 * 4. update the other fields 
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function updateMember(req, res) {
    
    if (req.body.orgName == undefined || req.body.orgName == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "Organization of User to update required"
            }
        });
    }

    if (req.body.email == undefined || req.body.email == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "email of User to update required"
            }
        });
    }

    if (req.body.fields == undefined || req.body.fields == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "fields to update required"
            }
        });
    }

    var docRef = db.collection('Organizations').doc(req.body.orgName).collection('Members').doc(req.body.email);
    newMail = req.body.email;

    docRef.get().then(doc =>{
        if(typeof(doc.data()) === 'undefined')
        {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                error: {
                    code: 400,
                    title: "NOT FOUND",
                    message: "User does not exist"
                }
            });
        }
        else{
            if(req.body.fields.hasOwnProperty('email')){
                newMail = req.body.fields.email;
                newRef = db.collection('Organizations').doc(req.body.orgName).collection('Members').doc(req.body.fields.email);
                newRef.set(doc.data()).then(() => {
                    var updateRef = db.collection('Organizations').doc(req.body.orgName).collection('Members').doc(newMail);
                    docRef.delete();
                    updateRef.update(req.body.fields).then(() => {

                    res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                        success: true,
                        data: {
                            code: 200,
                            title: "SUCCESS",
                            message: "User Updated",
                            content: {
                            
                            }
                    }
                    });
                })});
            }
            else{
                var updateRef = db.collection('Organizations').doc(req.body.orgName).collection('Members').doc(newMail);
                
                updateRef.update(req.body.fields).then(() => {

                    res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                        success: true,
                        data: {
                            code: 200,
                            title: "SUCCESS",
                            message: "User Updated",
                            content: {
                                
                            }
                    }
                });
            
        })}}}).catch((err) =>{
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

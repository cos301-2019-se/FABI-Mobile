const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const bcrypt = require('bcrypt-nodejs');
const log = require('../../sendLogs');
const auth = require('../../loginAuth');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', updateStaff);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Update Staff
/**
 * @summary Update a Staff Member associated with FABI
 * @description  REQUEST DATA REQUIRED: origional email of user to be updated ,fields which are to be changed, name of Organization
 *  
 * 1. check valid details have been submitted
 * 2. check if user to update exists, else return error 
 * 3. IF password needs to be updated, return error response stating password cannot be updated
 * 4. IF email needs to be changed, delete copy details into new document with new email as the key
 * 5. update the other fields 
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

async function updateStaff(req, res) {
    if(await auth.authSuperUser(req.headers.authorization)||await auth.authStaff(req.headers.authorization)){
        //(1)
        if (req.body.id == undefined || req.body.id == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "id of User to update required"
            });
        }

        if (req.body.fields == undefined || req.body.fields == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "Fields to update required"
            });
        }

        
        var docRef = db.collection('Organizations').doc('FABI').collection('Staff').doc(req.body.id);
        newMail = req.body.email;

        docRef.get().then(doc =>{
            //(2)
            if(typeof(doc.data()) === 'undefined')
            {
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: false,
                    code: 200,
                    title: "NOT FOUND",
                    message: "User does not exist"
                });
            }
            else{
                //(3)
                
                    //(4)
                    if(req.body.fields.hasOwnProperty('password'))
                    {
                        res.setHeader('Content-Type', 'application/problem+json');
                            res.setHeader('Content-Language', 'en');
                            res.setHeader("Access-Control-Allow-Origin", "*");
                            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                                success: true,
                                code: 200,
                                title: "FAILURE",
                                message: "CANNOT UPDATE PASSWORD USING THIS ENDPOINT"
                            });

                        //const salt = bcrypt.genSaltSync(10);
                        //req.body.fields.password = bcrypt.hashSync(req.body.fields.password, salt);
                    }

                    var updateRef = db.collection('Organizations').doc('FABI').collection('Staff').doc(req.body.id);
                    
                    //(5)
                    updateRef.update(req.body.fields).then(() => {

                        db.collection('Organizations').doc('FABI').collection('Staff').doc(req.body.id).get().then( doc => {
                            res.setHeader('Content-Type', 'application/problem+json');
                            res.setHeader('Content-Language', 'en');
                            res.setHeader("Access-Control-Allow-Origin", "*");
                            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                                success: true,
                                code: 200,
                                title: "SUCCESS",
                                message: "User Updated",
                                data : doc.data()
                            });
                        });
                    
                    log({
                        type: 'USER',
                        action: 'AddMemberToOrg',
                        details: req.body.id,
                        user: req.body.id,
                        org1: 'FABI',
                        org2: 'FABI',
                        action: '/updateStaffMember'
                    });
            })}}).catch((err) =>{
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

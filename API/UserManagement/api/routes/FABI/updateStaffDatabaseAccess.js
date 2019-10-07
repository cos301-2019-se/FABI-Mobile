const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const bcrypt = require('bcrypt-nodejs');
const log  = require('../../sendLogs');
const auth = require('../../loginAuth');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', updateStaff);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Update Staff Database Access
/**
 * @summary Update database access of a staff memebr associated with FABI 
 * @description  REQUEST DATA REQUIRED: origional email of user to be updated ,fields which are to be changed
 *  
 * 1. check valid details have been submitted
 * 2. check if user to update exists, else return error
 * 3. update the access 
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

async function updateStaff(req, res) {
    if(await auth.authSuperUser(req.headers.authorization)){
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

        if (req.body.databases == undefined || req.body.databases == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "Databases to update required"
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
                res.status(404).json({                                  // ******* RESPONSE STATUS? ************
                    success: false,
                    code: 404,
                    title: "NOT FOUND",
                    message: "User does not exist"
                });
            }
            else{
                //(3)
                
                    //(4)

                    var updateRef = db.collection('Organizations').doc('FABI').collection('Staff').doc(req.body.id);
                    
                    //(5)
                    updateRef.update(req.body.databases).then(() => {

                        res.setHeader('Content-Type', 'application/problem+json');
                        res.setHeader('Content-Language', 'en');
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                            success: true,
                            code: 200,
                            title: "SUCCESS",
                            message: "User Updated",
                            data: {
                                
                            }
                    });
                    log({
                        type: 'USER',
                        action: 'AddMemberToOrg',
                        details: '1563355277876',
                        user: req.body.id,
                        org1: 'FABI',
                        org2: 'FABI',
                        action: '/udateStaffDatabaseAccess',
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

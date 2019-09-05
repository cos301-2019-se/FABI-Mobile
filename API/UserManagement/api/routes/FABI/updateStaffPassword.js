const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const bcrypt = require('bcrypt-nodejs');
const log = require('../../sendLogs');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', updateStaff);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Update Staff Member Password
/**
 * @summary Update a memebr associated with Organization
 * @description  REQUEST DATA REQUIRED: new password, old password, userid, Organization name
 *  
 * 1. check valid details have been submitted
 * 2. check if user to update exists, else return error
 * 3. Check that submitted password is valid
 * 4. update password
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function updateStaff(req, res) {
    
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

    else if (req.body.newPass == undefined || req.body.newPass == '') {
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
    else if (req.body.oldPass == undefined || req.body.oldPass == '') {
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

    else{
        var docRef = db.collection('Organizations').doc('FABI').collection('Staff').doc(req.body.id);
        
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
                    const salt = bcrypt.genSaltSync(10);
                    req.body.newPass = bcrypt.hashSync(req.body.newPass, salt);
                    bcrypt.compare(req.body.oldPass, doc.data().password, (err, valid) =>
                    {
                        if(valid)
                        {
                            docRef.update({password : req.body.newPass}).then(() => {

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
                        })}
                        else
                        {
                            res.setHeader('Content-Type', 'application/problem+json');
                            res.setHeader('Content-Language', 'en');
                            res.setHeader("Access-Control-Allow-Origin", "*");
                            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                                success: false,
                                code: 200,
                                title: "INVALID PASSWORD",
                                message: "Invalid password provided"
                            });
                        }
                    
                    //(5)
                    
                    log({
                        type: 'USER',
                        details: '1563355277876',
                        user: req.body.id,
                        org1: 'FABI',
                        org2: 'FABI',
                        action: '/updateStaffPassword'
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
}
module.exports = router;

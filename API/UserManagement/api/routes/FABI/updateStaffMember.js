const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const bcrypt = require('bcrypt-nodejs');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', updateStaff);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Update Staff Member
/**
 * @summary Update a staff memebr associated with FABI
 * @description  REQUEST DATA REQUIRED: origional email of user to be updated ,fields which are to be changed
 *  
 * 1. check valid details have been submitted
 * 2. check if user to update exists, else return error
 * 3. IF email needs to be changed, delete copy details into new document with new email as the key
 * 4. IF password needs to be changed, encrypt password
 *  5. update the other fields 
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function updateStaff(req, res) {
    
    //(1)
    if (req.body.email == undefined || req.body.email == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "email of User to update required"
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
            message: "fields to update required"
        });
    }

    
    var docRef = db.collection('Organizations').doc('FABI').collection('Staff').doc(req.body.email);
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
            if(req.body.fields.hasOwnProperty('email')){
                //(4)
                if(req.body.fields.hasOwnProperty('password'))
                {
                    const salt = bcrypt.genSaltSync(10);
                    req.body.fields.password = bcrypt.hashSync(req.body.fields.password, salt);
                }
                newMail = req.body.fields.email;
                newRef = db.collection('Organizations').doc('FABI').collection('Staff').doc(req.body.fields.email);
                //(5)
                newRef.set(doc.data()).then(() => {
                    var updateRef = db.collection('Organizations').doc('FABI').collection('Staff').doc(newMail);
                    docRef.delete();
                    updateRef.update(req.body.fields).then(() => {

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
                })});
            }
            else{
                //(4)
                if(req.body.fields.hasOwnProperty('password'))
                {
                    const salt = bcrypt.genSaltSync(10);
                    req.body.fields.password = bcrypt.hashSync(req.body.fields.password, salt);
                }

                var updateRef = db.collection('Organizations').doc('FABI').collection('Staff').doc(newMail);
                
                //(5)
                updateRef.update(req.body.fields).then(() => {

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
            
        })}}}).catch((err) =>{
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

module.exports = router;

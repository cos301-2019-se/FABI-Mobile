/*const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getAllStaff);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get All Fabi Staff
/**
 * @summary Get all staff assotiated with FABI
 * @description  REQUEST DATA REQUIRED: null
 *
 *  1. Connect to DB.
 *      - IF ERROR: return Error Response
 *  2. Retrieve list of each catagory of staff from database using nested callbacks
 *  3. remove password information from data to be sent
 *  4. Send appropriate response message.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
/*const db = admin.firestore();

function getAllStaff(req, res) {
    var qs = {
            admins : [],
            staff: [], 
            cultureCurators : [],
            diagnosticClinicAdmins: []
        }
    //(1)
    res.setHeader('Content-Type', 'application/problem+json');
    res.setHeader('Content-Language', 'en');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(400).json({                                  // ******* RESPONSE STATUS? ************
        success: false,
        code: 400,
        title: "BAD_REQUEST",
        message: "THIS FUNCTION IS DEPRECATDED, please use the new getAllStaff functionality"
    });*/
    /*
    var adminRef = db.collection('Organizations').doc('FABI').collection('Staff').where('userType','==','SuperUser');
    adminRef.get().then(snapshot => {
            //(2)
            snapshot.forEach(doc => {
                qs.admins.push(doc.data());
            });
            //(3)
            qs.admins.forEach(doc => {
                delete doc.password;
            });
            
            staffRef = db.collection('Organizations').doc('FABI').collection('Staff').where('userType' ,'==', 'Staff');
            staffRef.get().then(snapshot1 => {
                snapshot1.forEach(doc => {
                    qs.staff.push(doc.data());
                })
                //(3)
                qs.staff.forEach(doc => {
                    delete doc.password;
                })

                    ccRef = db.collection('Organizations').doc('FABI').collection('Staff').where('userType', '==', 'CultureAdmin' );
                    ccRef.get().then(snapshot3 =>{
                        snapshot3.forEach(doc => {
                            qs.cultureCurators.push(doc.data());
                        })
                        //(3)
                        qs.cultureCurators.forEach(doc => {
                            delete doc.password;
                        })
                        
                        dcRef = db.collection('Organizations').doc('FABI').collection('Staff').where('userType', '==', 'ClinicAdmin');
                        dcRef.get().then( snapshot4  => {
                            snapshot4.forEach(doc => {
                                qs.diagnosticClinicAdmins.push(doc.data());
                            })
                            //(3)
                            qs.diagnosticClinicAdmins.forEach(doc => {
                                delete doc.password;
                            })

                            //(4)
                            res.setHeader('Content-Type', 'application/problem+json');
                            res.setHeader('Content-Language', 'en');
                            res.setHeader("Access-Control-Allow-Origin", "*");
                            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                            success: true,
                            code: 200,
                            title: "SUCCESS",
                            message: "List of FABI Staff",
                            data: {
                                qs
                            }
                        });
                        
                    });
                });
            }
        );
    });
    
}
//module.exports = router;*/

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getAllStaff);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get All Staff
/**
 * @summary Get all staff assotiated with FABI
 * @description  REQUEST DATA REQUIRED: null
 *
 *  1. Connect to DB.
 *      - IF ERROR: return Error Response
 *  2. Retrieve list from database
 *  3. remove password information from data to be sent
 *  4. Send appropriate response message.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function getAllStaff(req, res) {

    //(1)
    var staffRef = db.collection('Organizations').doc('FABI').collection('Staff');
    staffRef.get().then(snapshot => {
            var qs = {staff : []}

            //(2)
            snapshot.forEach(doc => {
                qs.staff.push(doc.data());
            })
            //(3)
            qs.staff.forEach(doc => {
                delete doc.password;
            })
            
            //(4)
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
            success: true,
            code: 200,
            title: "SUCCESS",
            message: "List of FABI staff",
            data: {
                qs
            }
    
        });
    });
}
module.exports = router;
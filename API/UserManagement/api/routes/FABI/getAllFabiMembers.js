const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getAllStaff);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get All Fabi Admins
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
const db = admin.firestore();

function getAllStaff(req, res) {
    var qs = {
            admins : [],
            staff: [], 
            databaseAdmins : [],
            cultureCurators : [],
            diagnosticClinicAdmins: []
        }
    //(1)
    var adminRef = db.collection('Organizations').doc('FABI').collection('Admin');
    adminRef.get().then(snapshot => {
            
            //(2)
            snapshot.forEach(doc => {
                qs.admins.push(doc.data());
            })
            //(3)
            qs.admins.forEach(doc => {
                delete doc.password;
            })
            
            staffRef = db.collection('Organizations').doc('FABI').collection('Staff');
            staffRef.get().then(snapshot1 => {

                snapshot1.forEach(doc => {
                    qs.staff.push(doc.data());
                })
                //(3)
                qs.staff.forEach(doc => {
                    delete doc.password;
                })
                dbAdminRefRef = db.collection('Organizations').doc('FABI').collection('DatabaseAdmin');
                dbAdminRefRef.get().then(snapshot2 => {
                    
                    snapshot2.forEach(doc => {
                        qs.databaseAdmins.push(doc.data());
                    })
                    //(3)
                    qs.databaseAdmins.forEach(doc => {
                        delete doc.password;
                    })

                    ccRef = db.collection('Organizations').doc('FABI').collection('CultureCurator');
                    ccRef.get().then(snapshot3 =>{
                        
                        snapshot3.forEach(doc => {
                            qs.cultureCurators.push(doc.data());
                        })
                        //(3)
                        qs.cultureCurators.forEach(doc => {
                            delete doc.password;
                        })
                        
                        dcRef = db.collection('Organizations').doc('FABI').collection('ClinicAdmin');
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
    });
}
module.exports = router;
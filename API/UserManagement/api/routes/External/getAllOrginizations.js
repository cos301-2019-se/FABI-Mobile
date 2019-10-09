const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const auth = require('../../loginAuth');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getAllOrganizations);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get all Organizations
/**
 * @summary Get all Organizzations registered with the system
 * @description  REQUEST DATA REQUIRED: null
 *  
 * 1. retrieve list of orgs from database
 *      - IF no orgs found return error message
 * 2. push orgs to JSON array
 * 3. remove admin details from data to be sent
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function getAllOrganizations(req, res) {
    
        //(1)
        var orgRef = db.collection('Organizations');
        orgRef.get().then(snapshot => {
            if(snapshot.empty)
            {
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************                    
                    success: false,
                    code: 200,
                    title: "NOT FOUND",
                    message: "No organizations found"
                    
                });
            }
            else{
                var data = {Organizations : []}
                //(2)
                snapshot.forEach(doc => {
                    data.Organizations.push(doc.data());
                })
                //(3)
                //data.Organizations.forEach(doc => {
                //  delete doc.admin;
                //})

                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: true,
                    code: 200,
                    title: "SUCCESS",
                    message: "List of Organizations",
                    data
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


module.exports = router;
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const log = require('../sendLogs');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getAllOrgMembers);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Retrive Datatabase and Return as JSON Object
/**
 * @summary Get all data from given database
 * @description  REQUEST DATA REQUIRED: Database Name
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function getAllOrgMembers(req, res) {
    //(1)
    if (req.body.databaseName == undefined || req.body.databaseName == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "database name of data to be retrieved expected"
            }
        });
    }
    
    //(2)
    var orgRef = db.collection('Databases').doc(req.body.databaseName);
    orgRef.get().then(doc => {
        if(typeof(doc) === 'undefined')
        {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json({                                  // ******* RESPONSE STATUS? ************                    
                success: false,
                code: 200,
                title: "NOT FOUND",
                message: "No database with given name found",
                data: {}
            });
        }
        else
        {

        var staffRef = db.collection('Databases').doc(req.body.databaseName).collection('Data');
        staffRef.get().then(snapshot => {
            
            if(snapshot.empty)
            {
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************                    
                    success: false,
                    code: 200,
                    title: "SUCCESS",
                    message: "No Data for database found",
                    data : {}
                });
            }
            else{
                var data = {docs : []}
                
                //(3)
                snapshot.forEach(doc => {
                    data.docs.push(doc.data());
                })
                

                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: true,
                    code: 200,
                    title: "SUCCESS",
                    message: "Data from " + req.body.databaseName,
                    data
                     
                });
                log({
                    type: "DBML",
                    action: "/retrieveDatabase",
                    details: req.body.databaseName,
                    user: '1563355277876',
                    org1: 'FABI'
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
            message: "Error Connecting to Database"
            
        });
        log({
            type: "ERRL",
            statusCode: "500",
            details: "Error connection to database"
        });
    });
}});
}


module.exports = router;
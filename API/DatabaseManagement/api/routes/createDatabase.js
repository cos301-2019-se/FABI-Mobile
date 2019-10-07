const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const bcrypt = require('bcrypt-nodejs');
const log = require('../sendLogs');
const auth = require('../loginAuth');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', createDatabase);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Create Database
/**
 * @summary Create a new empty database
 * @description  REQUEST DATA REQUIRED: database name, admin details
 *  
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

async function createDatabase(req, res)
{

    if(await auth.authSuperUser(req.headers.authorization)||await auth.authStaff(req.headers.authorization)){
        // (1) Check if all required data is received and that it is correct.
        if (req.body.admin.name == undefined || req.body.admin.name == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "Admin name expected"
            });
        }
        if (req.body.admin.surname == undefined || req.body.admin.surname == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "Admin surname expected"
            });
        }
        if (req.body.admin.surname == undefined || req.body.admin.surname == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "Admin surname expected"
            });
        }
        if (req.body.databaseName == undefined || req.body.databaseName == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "Database name expected"
            });
        }

        const qs = {
            databaseName : req.body.databaseName,
            admin : {
                fname: req.body.admin.name,
                surname: req.body.admin.surname,
                email: req.body.admin.email,
            }
        }
    // (2) Connect to DB
        

        adminRef = db.collection('Databases').doc(req.body.databaseName).collection('Admins').doc(req.body.admin.email).set(qs.admin).then(()=>{
                    res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                        success: true,
                        code: 200,
                        title: "SUCCESS",
                        message: "Database Created, Admin Set",
                        data: {
                            databaseName: req.body.databaseName,
                            tempPassword: pass
                        }
                        
            }
            );
            log({
                type: "DBML",
                action: "/createDatabase",
                details: req.body.databaseName,
                user: '1563355277876',
                org1: 'FABI'
            });
        }).catch((err) => {
            console.log("Database connection error: " + err);
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(500).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 500,
                title: "INTERNAL SERVER ERROR",
                message: "Error Connecting to Database"
            });
            log({
                type: "ERRL",
                statusCode: "502",
                details: "Error connecting to database"
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

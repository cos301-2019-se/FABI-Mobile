const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const admin = require('firebase-admin');
const config = require('../config');
const log = require('../../sendLogs');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', loginAdmin);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Login Admin
/**
 * @summary Login FABI Admin User
 * @description  REQUEST DATA REQUIRED: email, password
 *  
 *  1. check that all data has been recieved and is in the correct format
 *  2. connect to database
 *      - IF connection fails then return 500 server error
 *  3. get login data from the database
 *     - IF empty then return username not found 
 *     - IF undefined then return username not found
 *  4. compare encrypted password from database to given password
 *     - IF passwords match then return 200 and verified
 *     - IF passwords do not match then return NOT AUTHORIZED
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function loginAdmin(req, res)
{
// (1) 
    if (req.body.email == undefined || req.body.email == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "User email expected"
        });
    }

    if (req.body.password == undefined || req.body.password == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "User password expected"
        });
    }
    
    //(2)
    var docRef  = db.collection('Organizations').doc('FABI').collection('Staff').where('email', '==', req.body.email);

    //(3)
    docRef.get().then(doc =>
    {
        if(doc.empty)
        {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(404).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 404,
                title: "NOT FOUND",
                message: "Not Authenticated: User with given email not found"
            });
        }
        else{
            //(4)
            var member;
            doc.forEach(element => {
                member = element.data();
            });

            bcrypt.compare(req.body.password, member.password, (err, valid) =>
            {
                delete member.password
                if(valid)
                {
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(200).json({
                        success: true,
                        code: 200,
                        title: "AUTHORIZED",
                        message: "Authenticated",
                        token: bcrypt.hashSync(config.SuperUserToken, bcrypt.genSaltSync(10)),
                        userDetails: member
                    });
                    log({
                        type: 'ACCL',
                        statusCode: '200',
                        details: 'Logged In FABI Staff',
                        user: member.id
                    });
                }
                else{
                    res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(401).message("TEST").json({
                        success: false,
                        code: 401,
                        title: "UNAUTHORIZED",
                        message: "Not-Authenticated : Incorrect Password"
                    });
                }
            });
        }  
}).catch((err) => {
    console.log(err);
    res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(500).json({
                    success: false,
                    code: 500,
                    title: "SERVER ERROR",
                    message: "Internal Server Error"
                });
                log({
                    type: 'ERRL',
                    statusCode: '500',
                    details: 'Error connecting to database',
                });
});

}

module.exports = router;

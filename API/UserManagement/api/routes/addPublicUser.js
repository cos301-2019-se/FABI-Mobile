const next = require("mongodb");

const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const request = require("request");
const fs = require('fs');
const bcrypt = require('bcrypt-nodejs');
const admin = require('firebase-admin');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Handle POST request 
router.get('/', addUser);

// Handle POST request 
router.post('/', addUser);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Add Public User
/**
 * @summary Add a Public User with the data recieved in the request.
 * @description  REQUEST DATA REQUIRED: name, surname, email, password
 *  1. Check if all required data is received and that it is correct.
 *      - IF NOT: return Error Response
 *  2. Connect to DB.
 *      - IF ERROR: return Error Response
 *  3. Encrypt Password.
 *  4. Add Public User to public_users collection.
 *      - IF ERROR: return Error Response
 *  5. Send appropriate response message.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////
'use strict';

// [START config]
const db = admin.firestore();

function addUser(req, res)
{
// Store request data is qs
    const salt = bcrypt.genSaltSync(10);
    const qs = {
        fname: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt)
    }

// (1) Check if all required data is received and that it is correct. 
    if (qs.fname == undefined || qs.fname == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "User name expected"
            }
        });
    }
    if (qs.surname == undefined || qs.surname == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "User surname expected"
            }
        });
    }
    if (qs.email == undefined || qs.email == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "User email expected"
            }
        });
    }
    if (qs.password == undefined || qs.password == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "User password expected"
            }
        });
    }

    // Check if valid email format   (************ CLIENT SIDE? ***************)
    // var regEx = [A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/igm;
    // "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$"
    // "^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
    // if(!regEx.test(qs.email)) {
    //     res.setHeader('Content-Type', 'applicagion/problem+json');
    //     res.setHeader('Content-Language', 'en');
    //     res.status(400).json({                                  // ******* RESPONSE STATUS? ************
    //         success: false,
    //         error: {
    //             code: 400,
    //             title: "BAD_REQUEST",
    //             message: "User password expected"
    //         }       
    //     });
    // }


// (2) Connect to DB

    var docRef  = db.collection('Users').doc('FABI').collection('satff').doc('staff').doc(qs.email);
    docRef.set(qs).then(() => {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json({                                  // ******* RESPONSE STATUS? ************
            success: true,
            error: {
                code: 200,
                title: "SUCCESS",
                message: "Public User Added",
                content: {message : "Public User Added"}
            }
        });
        console.log("Client Added");
    });

}

module.exports = router;

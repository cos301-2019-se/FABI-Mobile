const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const request = require("request");
const fs = require('fs');
const bcrypt = require('bcrypt-nodejs');
const MongoClient = require('mongodb').MongoClient;
const model = require('./crud.js');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            CONNECTION TO MONGO DB 
const url = "mongodb+srv://dbAdmin:GhSyKfzRfJdr2NSo@capstone-test-wfnzw.mongodb.net/test?retryWrites=true";////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const client = new MongoClient(url, { useNewUrlParser: true });


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request 
//router.get('/', authenticate, logAuthentication);

// Handle POST request 
router.post('/', authenticate);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               Authenticate User
/**
 * @summary Authenticated a Public User based on the data received.
 * @description  REQUEST DATA REQUIRED: email, password
 *  1. Check if all required data is received and that it is correct.
 *      - IF NOT: return Error Response
 *  2. Connect to DB.
 *      - IF ERROR: return Error Response
 *  3. Check if email exists in the DB:
 *      - IF NOT: return UNAUTHORISED Response
 *  4. Check if password and email are valid (password matches)
 *      - IF NOT: return UNAUTHORISED Response
 *  5. Send appropriate response message.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////
function authenticate(req, res, next) {
    
// Store request data in qs
    const qs = {
        email: req.body.email,
        password: req.body.password
    };

// (1) Check if all required data is received and that it is correct.
    if (qs.email == undefined || qs.email == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                               
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "User email expected"
            }
        });
    }
    else if (qs.password == undefined || qs.password == '') {
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
    // else {    //////// TEMPORARY ///////////
    //     res.setHeader('Content-Type', 'application/json');
    //     res.setHeader('Content-Language', 'en');
    //     res.status(200).json({                                  // ******* RESPONSE STATUS? ************
    //         success: true,
    //         data: {
    //             code: 200,
    //             title: "AUTHORIZED",
    //             message: "Authenticated"
    //         }
    //     });
    //     res.locals.email = qs.email;
    //     res.locals.description = "Authenticated";
    //     res.locals.success = true;
    //     next();
    // }

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




            
            //define collection


        // (3) Check if email exists in the DB:
        client.connect(() => {
            model.read(qs, res, next);
            client.close();
        });



}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              Log Authentication
/**
 * @description  Log the authentication request
 *
 * @param {*} res Used to access global variables (res.locals)
 */
/////////////////////////////////////////////////////////////////////
/*function logAuthentication(req, res)
{
    if(res.locals.email != '' && res.locals.email != undefined){

        //get timestamp
        var today = new Date();
        var date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();
        var time = ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2) + ":" + ("0" + today.getSeconds()).slice(-2);
        var dateTime = date + ' ' + time;
        
        var log = {
            "logType" : "publicUserAuthentication",
            "email" : res.locals.email,
            "description" : res.locals.description,
            "success" : res.locals.success,
            "timestamp" : dateTime
        }

        if (fs.existsSync("logs.txt")) {
            var jsonString = "," + JSON.stringify(log);
        
        } else {
            var jsonString = JSON.stringify(log);
        }


        // **************************************************
        //              Write JSON to textfile       
        // -------------------------------------------------  
        fs.appendFile("logs.txt", jsonString, function(err, data) {
            if (err) console.log(err);
            else {
                 console.log("Successfully Logged to Log File.");
            }
        });
        // **************************************************
    }
}*/

module.exports = router;

const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const request = require("request");
const fs = require('fs');
const bcrypt = require('bcrypt-nodejs');
const MongoClient = require('mongodb').MongoClient;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          CONNECTION TO MONGO DB 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const url = "mongodb+srv://dbAdmin:GhSyKfzRfJdr2NSo@capstone-test-wfnzw.mongodb.net/test?retryWrites=true";
const client = new MongoClient(url, { useNewUrlParser: true });


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
function addUser(req, res)
{
// Store request data is qs
    const qs = {
        fname: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password
    }

// (1) Check if all required data is received and that it is correct. 
    if (qs.fname == undefined || qs.fname == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                
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
        res.status(400).json({                               
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
        res.status(400).json({                                
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
        res.status(400).json({                              
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
    //     res.status(400).json({                                  
    //         success: false,
    //         error: {
    //             code: 400,
    //             title: "BAD_REQUEST",
    //             message: "User password expected"
    //         }       
    //     });
    // }


// (2) Connect to DB
    client.connect((err) => {
    
    // Error: return server error
        if (err) {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(500).json({                            
                success: false,
                error: {
                    code: 500,
                    title: "INTERNAL_SERVER_ERROR",
                    message: `Error connecting to database :  ${err}` 
                }
            });
            client.close();
        }
        else {
            
        // (3) Encrypt Password
            let password, salt, hashPass;
            password = qs.password;
            salt = bcrypt.genSaltSync();
            hashPass = bcrypt.hashSync(password,salt);

        // (4) Add Public User to public_users collection.   
            var myobj = { name: qs.fname, surname: qs.surname, email: qs.email, password: hashPass};
            client.db("test").collection("public_users").insertOne(myobj, function(err) {
            // Error: return server error
                if (err) {
                    res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(500).json({                              
                        success: false,
                        error: {
                            code: 500,
                            title: "INTERNAL_SERVER_ERROR",
                            message: `Error adding to collection :  ${err.message}` 
                        }
                    });
                    client.close();
                }
            // (5) Send appropriate response message.
                console.log("1 document inserted");
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(200).json({                                 
                        success: false,
                        data: {
                            code: 200,
                            title: "SUCCESS",
                            message: `Public User Added` 
                        }
                    });
                    client.close();
            });
        }

    });

}

module.exports = router;

const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const request = require("request");
const fs = require('fs');
const bcrypt = require('bcrypt-nodejs');
const MongoClient = require('mongodb').MongoClient;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            CONNECTION TO MONGO DB 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const url = "mongodb+srv://dbAdmin:<password>@capstone-test-wfnzw.mongodb.net/test?retryWrites=true";
const client = new MongoClient(url, { useNewUrlParser: true });


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request 
router.get('/', submit);

// Handle POST request 
router.post('/', submit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                     Submit Form To The Diagnosis Clinic 
/**
 * @summary Get the sample form and store the form data (submit it to the clinic)
 * @description REQUEST DATA REQUIRED: sample diagnosis form fields
 *  1. Check if all required data is received and that it is correct.
 *      - IF NOT: return Error Response
 *  2. Generate Reference Number (Call generateReferenceNumber api function)
 *  3. Send appropriate response message.
 *
 * @param {*} res Used to send response to the request
 * @param {*} req Used to receive request information ('body' gets request json)
 */
/////////////////////////////////////////////////////////////////////
function submit(req, res) {
    
    console.log("DATA: " + req.body);

// Store request data in qs
    const qs = {
        data: req.body   
    }

// (1) Check if all required data is received and that it is correct.
    if (qs.data == undefined || qs.data == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "No form data received"
            }
        });

    } else {
        var options = {
            method: 'POST',
            url: 'https://fabi-web-app.herokuapp.com/generateReferenceNumber',
            headers: { 
                'cache-control': 'no-cache',
                'Content-Type': 'application/json' 
            },
            // body: jsonObject,
            json: true
        };
 
    // (2) Generate Reference Number (Call generateReferenceNumber api function) 
        request(options, (err, response, body) => {
            if(err) {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: true,
                    data: {
                        code: 200,
                        title: "SUCCESS",
                        message: "Form Submitted",
                        content: {
                            emailSent: false,
                            referenceNumber: err.message
                        }
                    }
                });
            } else {
            // (3) Send appropriate response message.
                if(body.success == false) {
                    var refNum = body.error.message;
                } else {
                    var refNum = body.data.content.referenceNumber;
                }
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: true,
                    data: {
                        code: 200,
                        title: "SUCCESS",
                        message: "Form Submitted",
                        content: {
                            emailSent: body.success,
                            referenceNumber: refNum
                        }
                    }
                });
            }
        })
    }
}

module.exports = router;

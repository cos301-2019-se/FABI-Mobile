var express = require('express');
var mysql = require('mysql');
const router = express.Router();
const request = require("request");
var fs = require('fs');
var querystring = require('querystring');
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
router.get('/', getLogs);

// Handle POST request 
router.post('/', getLogs);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                   Get Logs
/**
 * @summary Return all the system logs.
 * @description  Get the logs from the log text file and return them to the userin JSON format. 
 *  1. Read log objects from log file
 *  2. Create JSON array containing all log objects 
 *  3. Return the logs to the client in the response message, in JSON format
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////
function getLogs(req, res) {

// (1) Read log objects from log file
    fs.readFile('logs.txt', (err, contents) => {    
        if(err) {
          res.setHeader('Content-Type', 'application/problem+json');
          res.setHeader('Content-Language', 'en');
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.status(500).json({                                  // ******* RESPONSE STATUS? ************
              success: false,
              error: {
                  code: 500,
                  title: "INTERNAL_SERVER_ERROR",
                  message: "Could not read log file"
              }
          });
        }
        else{
      // (2) Create JSON array containing all log objects 
          var jsonString = `{"logs":[ ${contents} ]}`;
          var jsonObj = JSON.parse(jsonString);

      // (3) Return the logs to the client in the response message, in JSON format
          res.setHeader('Content-Type', 'application/problem+json');
          res.setHeader('Content-Language', 'en');
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.status(200).json({                                  // ******* RESPONSE STATUS? ************
              success: false,
              data: {
                  code: 200,
                  title: "SUCCESS",
                  message: "Logs retrieved",
                  content: jsonObj
              }
          });
      }
      });
}
    


////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

module.exports = router;
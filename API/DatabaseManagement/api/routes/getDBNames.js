const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const log = require('../sendLogs');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Retrive Datatabase Names and Return as JSON Object
/**
 * @summary Get all members associated with an organization
 * @description  REQUEST DATA REQUIRED:
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////
// Handle POST request
router.post('/', getDatabaseNames);

const db = admin.firestore();

function getDatabaseNames(req, res)
{
    var staffRef = db.collection('Databases')
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
                    message: "No Data for databases found",
                    data : {}
                });
            }
            else{
                var data = {docs : []}
                
                //(3)
                snapshot.forEach(doc => {
                    data.docs.push(doc.id);
                })
                

                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: true,
                    code: 200,
                    title: "SUCCESS",
                    message: "Database Names",
                    data
                     
                });
        }
    })
}
module.exports = reouter;
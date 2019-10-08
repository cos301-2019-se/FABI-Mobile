const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const log = require('../sendLogs');
const auth = require('../loginAuth');
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

async function getDatabaseNames(req, res)
{
    if(await auth.authSuperUser(req.headers.authorization)||await auth.authStaff(req.headers.authorization)){
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
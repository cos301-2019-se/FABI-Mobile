const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const log = require('../../sendLogs');
const auth = require('../../loginAuth');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', addOrganization);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get Admin Types
/**
 * @summary Returns a list of Admin Types to be used
 * @description  REQUEST DATA REQUIRED:
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

async function addOrganization(req, res)
{
    if(await auth.authSuperUser(req.headers.authorization)){
        admins = ['SuperUser', 'ClinicAdmin', 'Staff','CultureAdmin']
                
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json({                                  // ******* RESPONSE STATUS? ************
            success: true,
            code: 200,
            title: "SUCCESS",
            message: "Created Organization",
            data: {
                    adminTypes: admins
            }
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

module.exports = router
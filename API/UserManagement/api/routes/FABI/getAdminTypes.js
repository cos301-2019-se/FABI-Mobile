const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const log = require('../../sendLogs');

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

function addOrganization(req, res)
{
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
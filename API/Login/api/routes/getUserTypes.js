const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getUserTypes);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get All User Types
/**
 * @summary Get all usertypes found on the system
 * @description  REQUEST DATA REQUIRED: null
 * 
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
userTypes = {
    1 : "SuperUser",
    2 : "ClinicAdmin",
    3 : "Staff",
    4 : "CultureAdmin",
    5 : "Member",
    6 : "OrganizationAdmin"
}

function getUserTypes(req, res) {
    

            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                success: true,
                code: 200,
                title: "SUCCESS",
                message: "List of User Types",
                data : userTypes
        })
}

module.exports = router;
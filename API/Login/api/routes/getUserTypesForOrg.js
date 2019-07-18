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
 * @summary Get all members associated with an organization
 * @description  REQUEST DATA REQUIRED: null
 * 
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
userTypesFABI = {
    1 : "admin",
    2 : "databaseAdmin",
    3 : "fabiStaff"
}

userTypesOrg = 
{
    1 : "orgAdmin",
    2 : "orgMember"
}

function getUserTypes(req, res) {
    if (req.body.orgName == undefined || req.body.orgName == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "organization name expected"
        });
    }
    else{
        if(req.body.orgName === "FABI")
        {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                success: true,
                code: 200,
                title: "SUCCESS",
                message: "List of User Types",
                data : userTypesFABI
            }) 
        }
        else
        {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                success: true,
                code: 200,
                title: "SUCCESS",
                message: "List of User Types",
                data : userTypesOrg
            })
        }    
    }
            
}

module.exports = router;
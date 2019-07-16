const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const admin = require('firebase-admin');
const mail = require('../sendEmail');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', addStaff);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Add Staff
/**
 * @summary Add staff member to FABI orginization
 * @description  REQUEST DATA REQUIRED: Staff Details
 *  1. Check if all required data is received and that it is correct.
 *      - IF NOT: return Error Response
 *  2. Encrypt Password.
 *  3. Connect to DB.
 *      - IF ERROR: return Error Response
 *  
 *  4. Push to the database.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function addStaff(req, res)
{


// (1)
    if (req.body.staff.name == undefined || req.body.staff.name == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "User name expected"
        });
    }
    if (req.body.staff.surname == undefined || req.body.staff.surname == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "User surname expected"
        });
    }
    if (req.body.staff.email == undefined || req.body.staff.email == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "User email expected"
            
        });
    }
    if (req.body.databases == undefined || req.body.databases == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "Databases the user has access to required"
        });
    }
    if (req.body.userType == undefined || req.body.userType == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "User type of new user is required"
        });
    }
// (2)
const salt = bcrypt.genSaltSync(10);
var pass = generatePassword(10);
const qs = {
    fname: req.body.staff.name,
    surname: req.body.staff.surname,
    email: req.body.staff.email,
    password: bcrypt.hashSync(pass, salt),
    databases : req.body.databases,
    id : new Date().getTime().toString(),
    userType : req.body.userType
}

// (3) 
var docRef  = db.collection('Organizations').doc('FABI').collection('Staff').doc(qs.id);    

    //(4)
    docRef.set(qs).then(() => {
        res.setHeader('Content-Type', 'application/problem+json');
    res.setHeader('Content-Language', 'en');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({                                  // ******* RESPONSE STATUS? ************
        success: true,
        code: 200,
        title: "SUCCESS",
        message: "FABI Staff Added",
        data: {
            orgName : req.body.orgName,
            tempPassword : pass
        }
    });
    console.log("Staff Added to FABI");
    mail('FABI Staff - ' + qs.userType, pass);
});

}

function generatePassword(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
module.exports = router;

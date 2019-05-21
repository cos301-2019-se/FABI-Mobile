const express = require('express');
const router = express.Router();
const request = require("request");
const bcrypt = require('bcrypt-nodejs');
const admin = require('firebase-admin');

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
 *  2. Connect to DB.
 *      - IF ERROR: return Error Response
 *  3. Encrypt Password.
 *  4. Add Organization to Organizations collection and create admin within admin collection int that organization
 *      - IF ERROR: return Error Response
 *  5. Send appropriate response message.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function addStaff(req, res)
{
// Store request data is qs
    const salt = bcrypt.genSaltSync(10);
    var pass = generatePassword(10);
    const qs = {
        fname: req.body.staff.name,
        surname: req.body.staff.surname,
        email: req.body.staff.email,
        password: bcrypt.hashSync(pass, salt)
    }

// (1) Check if all required data is received and that it is correct.
    if (req.body.staff.name == undefined || req.body.staff.name == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "User name expected"
            }
        });
    }
    if (req.body.staff.surname == undefined || req.body.staff.surname == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "User surname expected"
            }
        });
    }
    if (req.body.staff.email == undefined || req.body.staff.email == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "User email expected"
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
    //     res.status(400).json({                                  // ******* RESPONSE STATUS? ************
    //         success: false,
    //         error: {
    //             code: 400,
    //             title: "BAD_REQUEST",
    //             message: "User password expected"
    //         }
    //     });
    // }


// (2) Connect to DB

    var docRef  = db.collection('Organizations').doc('FABI').collection('Staff').doc(qs.email);
    docRef.set(qs).then(() => {
        res.setHeader('Content-Type', 'application/problem+json');
    res.setHeader('Content-Language', 'en');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({                                  // ******* RESPONSE STATUS? ************
        success: true,
        error: {
            code: 200,
            title: "SUCCESS",
            message: "FABI Staff Added",
            content: {message : "Staff Added to FABI Organization",
                orgName : req.body.orgName,
                tempPassword : pass}
        }
    });
    console.log("Staff Added to FABI");
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

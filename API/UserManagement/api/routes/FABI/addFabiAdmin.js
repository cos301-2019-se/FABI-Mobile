const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const admin = require('firebase-admin');
const auth = require('../../loginAuth');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', addAdmin);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Add Admin - Not in use anymore
/**
 * @summary Add FABI Superuser to FABI orginization
 * @description  REQUEST DATA REQUIRED: fname and email for now
 *  1. Check if all required data is received and that it is correct.
 *      - IF NOT: return Error Response
 *  2. Encrypt Password.
 *  3. Connect to DB.
 *      - IF ERROR: return Error Response
 *  4. Send appropriate response message.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function addAdmin(req, res)
{
    res.setHeader('Content-Type', 'application/problem+json');
    res.setHeader('Content-Language', 'en');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(400).json({                                  // ******* RESPONSE STATUS? ************
        success: false,
        code: 400,
        title: "BAD_REQUEST",
        message: "THIS FUNCTION IS DEPRECATDED, please use the new addStaff functionality"
    });
/*
// (1)
    if (req.body.admin.fname == undefined || req.body.admin.fname == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "User fname expected"
        });
    }
    else if (req.body.admin.surname == undefined || req.body.admin.surname == '') {
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
    else if (req.body.admin.email == undefined || req.body.admin.email == '') {
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
    else if (req.body.type == undefined || req.body.type == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "Type of admin required"
        });
    }
    else if (req.body.databases == undefined || req.body.databases == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "Databases the user has acces to required"
        });
    }
    else{
    //(2)
        const salt = bcrypt.genSaltSync(10);
        var pass = generatePassword(10);
        const qs = {
            fname: req.body.admin.fname,
            surname: req.body.admin.surname,
            email: req.body.admin.email,
            password: bcrypt.hashSync(pass, salt),
            id : new Date().getTime().toString(),
            databases: req.body.databases,
            type: req.body.type
        }
        // (3)
        var docRef  = db.collection('Organizations').doc('FABI').collection('Admin').doc(qs.id);
        
        //(4)
        docRef.set(qs).then(() => {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                success: true,
                code: 200,
                title: "SUCCESS",
                message: "FABI Admin Added",
                data: {
                        orgName : req.body.orgName,
                        tempPassword : pass
                }
        });
        console.log("Admin Added to FABI");
        mail('FABI Admin', pass);
        });
    }
    */
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

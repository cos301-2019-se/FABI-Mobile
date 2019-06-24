const express = require('express');
const router = express.Router();
const request = require("request");
const bcrypt = require('bcrypt-nodejs');
const admin = require('firebase-admin');
const mail = require('../sendEmail');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', addOrganization);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Add Organization
/**
 * @summary Create a new organization with data recieved
 * @description  REQUEST DATA REQUIRED: organization name, organization details, admin details
 *  1. Check if all required data is received and that it is correct.
 *      - IF NOT: return Error Response
 *  2. Connect to DB.
 *      - IF ERROR: return Error Response
 *  3. Encrypt Password.
 *  4. Add Organization to Organizations collection and create admin within admin collection int that organization
 *      - IF ERROR: return Error Response
 *  5. Push data to the database.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function addOrganization(req, res)
{


// (1) 
    if (req.body.admin.name == undefined || req.body.admin.name == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "Admin name expected"
        });
    }
    if (req.body.admin.surname == undefined || req.body.admin.surname == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "Admin surname expected"
        });
    }
    if (req.body.admin.email == undefined || req.body.admin.email == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "Admin email expected"
        });
    }
    if (req.body.orgName == undefined || req.body.orgName == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "Organization Name Expected"
        });
    }

        // (2)
        var docRef  = db.collection('Organizations').doc(req.body.orgName);
        
        // (3)
        const salt = bcrypt.genSaltSync(10);
        var pass = generatePassword(10);
        const qs = {
            orgName : req.body.orgName,
            admin : {
                fname: req.body.admin.name,
                surname: req.body.admin.surname,
                email: req.body.admin.email,
                password: bcrypt.hashSync(pass, salt)
            }
        }

        // (4)
        docRef.set(qs).then(() => {
            adminRef = db.collection('Organizations').doc(req.body.orgName).collection('Admins').doc(req.body.admin.email).set(qs.admin).then(()=>{
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                success: true,
                code: 200,
                title: "SUCCESS",
                message: "Created Organization",
                data: {
                        orgName: req.body.orgName,
                        tempPassword: pass
                }
        })
        mail(req.body.orgName + ' Admin', pass);
    });
        console.log("New Organization Added");
    }).catch((err) => {
        console.log("Database connection error: " + err);
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(500).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 500,
            title: "INTERNAL SERVER ERROR",
            message: "Error Connecting to User Database"  
        });
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

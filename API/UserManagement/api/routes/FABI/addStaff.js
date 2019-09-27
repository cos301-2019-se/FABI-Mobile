const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const admin = require('firebase-admin');
const mail = require('../sendEmail');
const log = require('../../sendLogs');
const auth = require('../../loginAuth');
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


async function addStaff(req, res)
{
    userTypes = ['SuperUser', 'ClinicAdmin', 'CultureAdmin', 'Staff'];
    if(await auth.authSuperUser(req.headers.authorization)){
        // (1)
        if (req.body.staff.fname == undefined || req.body.staff.fname == '') {
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
        else if (req.body.staff.surname == undefined || req.body.staff.surname == '') {
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
        else if (req.body.staff.email == undefined || req.body.staff.email == '') {
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
        else if (req.body.databases == undefined || req.body.databases == '') {
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
        else if (req.body.userType == undefined || req.body.userType == '') {
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
        else if(!userTypes.includes(req.body.userType)) {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "User type of new user is not supported"
            });
        }
        else{
        // (2)
            const salt = bcrypt.genSaltSync(10);
            var pass = generatePassword(10);
            const qs = {
                fname: req.body.staff.fname,
                surname: req.body.staff.surname,
                email: req.body.staff.email,
                password: bcrypt.hashSync(pass, salt),
                databases : req.body.databases,
                id : new Date().getTime().toString(),
                userType: req.body.userType
            }

            var checkRef = db.collection('Organizations').doc('FABI').collection('Staff').where('email', '==', qs.email);

            checkRef.get().then(doc => {
                if(!doc.empty)
                {
                    res.setHeader('Content-Type', 'application/problem+json');
                        res.setHeader('Content-Language', 'en');
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                            success: false,
                            code: 400,
                            title: "BAD_REQUEST",
                            message: "User email already exists"
                        });
                }
                else{
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

                        mail('FABI Staff - ' + qs.userType, pass);
                        log({
                            type: 'USER',
                            action: 'AddMemberToOrg',
                            details: '1563355277876',
                            user: qs.id,
                            org1: 'FABI',
                            org2: 'FABI',
                            action: '/addStaff'
                        });
                    });
                }
            });
        }
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

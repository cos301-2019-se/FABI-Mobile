const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const bcrypt = require('bcrypt-nodejs');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', createDatabase);

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
 *  5. Send appropriate response message.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function createDatabase(req, res)
{
// Store request data is qs
const salt = bcrypt.genSaltSync(10);
    var pass = generatePassword(10);
    const qs = {
        databaseName : req.body.databaseName,
        admin : {
            fname: req.body.admin.name,
            surname: req.body.admin.surname,
            email: req.body.admin.email,
            password: bcrypt.hashSync(pass, salt)
        }
    }
// (1) Check if all required data is received and that it is correct.
    if (req.body.admin.name == undefined || req.body.admin.name == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "Admin name expected"
            }
        });
    }
    if (req.body.admin.surname == undefined || req.body.admin.surname == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "Admin surname expected"
            }
        });
    }
    if (req.body.admin.surname == undefined || req.body.admin.surname == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "Admin surname expected"
            }
        });
    }
    if (req.body.databaseName == undefined || req.body.databaseName == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "Database name expected"
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
    

    adminRef = db.collection('Databases').doc(req.body.databaseName).collection('Admins').doc(req.body.admin.email).set(qs.admin).then(()=>{
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                success: true,
                data: {
                    code: 200,
                    title: "SUCCESS",
                    message: "Created Database",
                    content: {
                        message: "Database Created, Admin Set",
                        databaseName: req.body.databaseName,
                        tempPassword: pass
                    }
                }
        });
    }).catch((err) => {
        console.log("Database connection error: " + err);
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(500).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 500,
                title: "FAILURE",
                message: "Error Connecting to Database"
            }
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

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', updateStaff);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get Org Details
/**
 * @summary Update a staff memebr associated with FABI
 * @description  REQUEST DATA REQUIRED: origional email of user to be updated ,fields which are to be changed
 *
 *  1. Connect to DB.
 *      - IF ERROR: return Error Response
 *  2. Encrypt Password.
 *  3. Add Organization to Organizations collection and create admin within admin collection int that organization
 *      - IF ERROR: return Error Response
 *  4. Send appropriate response message.
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function updateStaff(req, res) {
    if(req.body.fields.hasOwnProperty('email'))
        newMail = deleteOldRecord(req, res);
    else
        newMail = doc.body.email;
    
    docRef = db.collection('Organizations').doc('FABI').collection('Staff').doc(newMail);

    docRef.update(fields);

    res.setHeader('Content-Type', 'application/problem+json');
    res.setHeader('Content-Language', 'en');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({                                  // ******* RESPONSE STATUS? ************
        success: true,
        error: {
            code: 200,
            title: "SUCCESS",
            message: "User Updated",
            content: {
                
            }
        }
    });

}

function deleteOldRecord(req, res)
{
    docRef = db.collection('Organizations').doc('FABI').collection('Staff').doc(req.body.email);

    docRef.get().then(doc =>{
        newRef = db.collection('Organizations').doc('FABI').collection('Staff').doc(req.body.fields.email);
        newRef.set(doc.data());
    });
    return req.body.fields.email;
}
module.exports = router;
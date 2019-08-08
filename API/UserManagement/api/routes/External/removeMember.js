const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const log = require('../../sendLogs');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', removeMember);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Get Organization Member
/**
 * @summary Get User assotiated with Organization
 * @description  REQUEST DATA REQUIRED: user email, organization
 *  1. check that user email and organization are given
 *  2. check that the user exists
 *  3. remove the user from the database (set inactive in future)
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();


function removeMember(req, res) {
    //(1)
    if (req.body.id == undefined || req.body.id == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "User id expected"
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
            message: "orgName expected"
        });
    }

    var memRef = db.collection('Organizations').doc(req.body.orgName).collection('Members').doc(req.body.id);
    memRef.get().then(doc => {
        //(2)
        if(typeof(doc.data()) === 'undefined')
        {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(404).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 404,
                title: "NOT FOUND",
                message: "User does not exist"
            });
        }
            qs = doc.data();
            console.log(qs);
            delete qs.password;
            //(3)
            db.collection('Organizations').doc(req.body.orgName).collection('Members').doc(req.body.id).delete().then(() => {
                res.setHeader('Content-Type', 'application/problem+json');
                            res.setHeader('Content-Language', 'en');
                            res.setHeader("Access-Control-Allow-Origin", "*");
                            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                                success: true,
                                code: 200,
                                title: "SUCCESS",
                                message: "Organization Member Deleted",
                                data: {
                                        Member : qs
                                }
                            });
            });
            log({
                type: 'USER',
                action: '/removeMember',
                details: '1563355277876',
                user: qs.id,
                org1: 'FABI',
                org2: req.body.orgName,
            });
            
    });


}
module.exports = router;
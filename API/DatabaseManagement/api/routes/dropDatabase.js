const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const log = require('../sendLogs');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', getOrgDetails);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Remove Organization
/**
 * @summary Get details of given org, should be secure such that only the org admin or superuser can read details
 * @description  REQUEST DATA REQUIRED: Organization name
 *  1. Check if all required data is received and that it is correct.
 *      - IF NOT: return Error Response
 *  2. Connect to DB.
 *      - IF ERROR: return Error Response
 *  3. Check if org exists
 *  4. Delete Organizaion 
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

function getOrgDetails(req, res) {
    //(1)
    if (req.body.dbName == undefined || req.body.dbName == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "dbName of database to drop is required"
        });
    }

    //(2)
    var getRef = db.collection('Databases').doc(req.body.dbName);

    getRef.get().then(doc => {
            //(3)
            if(typeof(doc.data()) === 'undefined'){
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                    success: false,
                    code: 200,
                    title: "NOT FOUND",
                    message: "database not found",
                    data : {}
                });
            }
            else
            {
                
                deleteCollection(db, req.body.dbName, 1000).then(() => {
                    res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                        success: true,
                        code: 200,
                        title: "SUCCESS",
                        message: "Database Succesfully Dropped",
                        data: {}
                    });
                }).catch(err)
                {
                    res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                        success: true,
                        code: 200,
                        title: "SUCCESS",
                        message: "Database Was Not Succesfully Dropped",
                        data: err
                    });
                }

                log({
                    type: "DBML",
                    action: "/dropDatabase",
                    details: req.body.databaseName,
                    user: '1563355277876',
                    org1: 'FABI'
                })
            }  
    })/*.catch((err) =>
    {
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
    });*/
}

function deleteCollection(db, collectionPath, batchSize) {
    let collectionRef = db.collection("Databases").doc(collectionPath).collection("Data");
    let query = collectionRef.orderBy('__name__').limit(batchSize);
  
    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
query.get()
    .then((snapshot) => {
    // When there are no documents left, we are done
    if (snapshot.size == 0) {
        return 0;
    }

    // Delete documents in a batch
    let batch = db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });

    return batch.commit().then(() => {
        return snapshot.size;
    });
    }).then((numDeleted) => {
    if (numDeleted === 0) {
        resolve();
        return;
    }

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
    })
    .catch(reject);
}
  
  
  

module.exports = router;

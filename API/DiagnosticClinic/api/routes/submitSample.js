const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const refNumberGenerator = require('./generateReferenceNumber');
const buildTree = require('../buildTree');
const predict = require('../predict');
const auth = require('../loginAuth');
const mail = require('./SendEmail_Sample');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', submitForm);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Submit Sample
/**
 * @summary submit a sample to the diagnostic clinic
 * @description  REQUEST DATA REQUIRED: all form data
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]
const db = admin.firestore();

async function submitForm(req, res)
{
    if(await auth.authClinicAdmin(req.headers.authorization)||await auth.authOrgMember(req.headers.authorization)||await auth.authSuperUser(req.headers.authorization)||await auth.authCCAdmin(req.headers.authorization)||await auth.authOrgAdmin(req.headers.authorization)||await auth.authStaff(req.headers.authorization)){
        if (req.body.userID == undefined || req.body.userID == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "User ID is required"
            });
        }

        else if (req.body.orgName == undefined || req.body.orgName == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "No organization Name Submitted"
            });
        }

        else if (req.body.data == undefined || req.body.data == '') {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                code: 400,
                title: "BAD_REQUEST",
                message: "Data to be submitted missing"
            });
        }
        else{
            console.log(req.body);
            
            result = predict(getPredictionData(req)).then((result => {
                refnum = refNumberGenerator(result);
                req.body.referenceNumber = refnum;
                sampleRef = db.collection('Diagnostic').doc('Samples').collection('Processing').doc(refnum);
                req.body.status = 'submitted';
                sampleRef.set(req.body).then(()=>
                {
                    
                    if(req.body.orgName == 'FABI')
                    {
                        mailRef = db.collection('Organizations').doc(req.body.orgName).collection('Staff').doc(req.body.userID);
                    }
                    else
                    {
                        mailRef = db.collection('Organizations').doc(req.body.orgName).collection('Members').doc(req.body.userID);
                    }

                    mailRef.get().then(doc => {
                        mail.sendSampleSubmission(refnum, doc.data().email, doc.data().fname, doc.data().surname, result);
                        res.setHeader('Content-Type', 'application/problem+json');
                        res.setHeader('Content-Language', 'en');
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                        success: true,
                            code: 200,
                            title: "SUCCESS",
                            message : "form succesfully submitted",
                            data: {
                                referenceNumber : refnum,
                                prediagnosis: result
                            }
                        });
                    });
                });
            })
            );
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

function getPredictionData(req)
{
    FormData = {
        Location : req.body.data.sample.plantation_details.farm,
        Province : req.body.data.sample.plantation_details.province,
        Genus : req.body.data.sample.sample_details.plant_genus,
        Species : req.body.data.sample.sample_details.plant_species,
        Asym_Dis : 'D',
        NurseryField : 'N',
    }
    var root = req.body.data.sample.types.filter( function(item){return (item.type=='root');} );
    var collar = req.body.data.sample.types.filter( function(item){return (item.type=='Root-Collar');} );
    var stem = req.body.data.sample.types.filter( function(item){return (item.type=='Stem');} );
    var growth = req.body.data.sample.types.filter( function(item){return (item.type=='Growth-Tip');} );
    var neeldes = req.body.data.sample.types.filter( function(item){return (item.type=='Needles/Leaves');} );
    var type = ''
    req.body.data.sample.types.forEach( doc => {
        type += doc.type + ',';
    })
    type = type.substring(0, type.length - 1);
    
    if(!root.length)
        FormData.Roots = 'Healthy'
    else
        FormData.Roots = root[0].symptoms
    
    if(!collar.length)
        FormData['Root-Collar'] = 'Healthyy'
    else
        FormData['Root-Collar'] = collar[0].symptoms

    if(!stem.length)
        FormData.Stem = 'Health'
    else
        FormData.Stem = stem[0].symptoms

    if(!growth.length)
        FormData.GrowthTip = 'Healthy'
    else
        FormData.GrowthTip = growth[0].symptoms

    if(!neeldes.length)
        FormData['Needles-Leaves'] = 'Alive'
    else
        FormData['Needles-Leaves'] = neeldes[0].symptoms

    FormData.SampleType = type
    console.log(FormData)
    return FormData
}

module.exports = router;

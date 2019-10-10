const express = require('express');
const router = express.Router();
const request = require('request');
const admin = require('firebase-admin');
const db = admin.firestore();
const login = require('../loginAuth.js');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET/POST REQUEST HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle POST request
router.post('/', loginAdmin);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Login User
/**
 * @summary Login User
 * @description  REQUEST DATA REQUIRED: email, password, user type (fabiAdmin, fabiStaff, databaseAdmin, orgAdmin, orgMember)
 *  
 * check which user type is being requested, then send that data to the appropriate authentication url, return response
 *
 * @param {*} res Used to send response to the client
 * @param {*} req Used to receive request data ('body' gets request json data)
 */
/////////////////////////////////////////////////////////////////////

// [START config]


function loginAdmin(req, res)
{
// (1) Check if all required data is received and that it is correct.
    if (req.body.email == undefined || req.body.email == '') {
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

    if (req.body.password == undefined || req.body.password == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            code: 400,
            title: "BAD_REQUEST",
            message: "User password expected"
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
            message: "User Type expected"
        });
    }
    
    var qs = {
        email : req.body.email,
        password : req.body.password,
        orgName : req.body.orgName
    };
    
    try{
        if(req.body.orgName === 'FABI')
        {
            orgRef = db.collection('Organizations').doc('FABI').collection('Staff').where('email', '==', req.body.email);

            orgRef.get().then(snapshot => {
                
                if(snapshot.empty){
                    res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                        success: false,
                        code: 200,
                        title: "NOT FOUND",
                        message: "User does not exist"
                    });
                }
                else{
                    member = {}
                    snapshot.forEach(doc => {
                        member = doc.data();
                    })

                    var token = null;
                    delete member.password
                    switch(member.userType)
                    {
                        case 'SuperUser':
                                console.log(member)
                                login.loginSuperUser(req.body).then(response => {
                                    if(response.statusCode != '200')
                                    {
                                        res.setHeader('Content-Type', 'application/problem+json');
                                        res.setHeader('Content-Language', 'en');
                                        res.setHeader("Access-Control-Allow-Origin", "*");
                                        res.status(401).json({                                  // ******* RESPONSE STATUS? ************
                                            success: true,
                                            code: 401,
                                            title: "NOT AUTHENTICATED",
                                            message: "LOGIN FAILED",
                                            data : JSON.parse(response.body)
                                        })
                                    }
                                    else{
                                        res.setHeader('Content-Type', 'application/problem+json');
                                        res.setHeader('Content-Language', 'en');
                                        res.setHeader("Access-Control-Allow-Origin", "*");
                                        res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                                            success: true,
                                            code: 200,
                                            title: "SUCCESS",
                                            message: "LOGGED IN",
                                            token : JSON.parse(response.body).access_token,
                                            userDetails : member
                                        })

                                    }
                                });
                            break;

                        case 'ClinicAdmin':

                                login.loginClinicAdmin(req.body).then(response => {
                                    if(response.statusCode != '200')
                                    {
                                        res.setHeader('Content-Type', 'application/problem+json');
                                        res.setHeader('Content-Language', 'en');
                                        res.setHeader("Access-Control-Allow-Origin", "*");
                                        res.status(401).json({                                  // ******* RESPONSE STATUS? ************
                                            success: true,
                                            code: 401,
                                            title: "NOT AUTHENTICATED",
                                            message: "LOGIN FAILED",
                                            data : JSON.parse(response.body)
                                        })
                                    }
                                    else{
                                        res.setHeader('Content-Type', 'application/problem+json');
                                        res.setHeader('Content-Language', 'en');
                                        res.setHeader("Access-Control-Allow-Origin", "*");
                                        res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                                            success: true,
                                            code: 200,
                                            title: "SUCCESS",
                                            message: "LOGGED IN",
                                            token : JSON.parse(response.body).access_token,
                                            userDetails : member
                                        })
                                        
                                    }
                                });
                            break;

                        case 'Staff':

                                login.loginStaff(req.body).then(response => {
                                    
                                    if(response.statusCode != '200')
                                    {
                                        res.setHeader('Content-Type', 'application/problem+json');
                                        res.setHeader('Content-Language', 'en');
                                        res.setHeader("Access-Control-Allow-Origin", "*");
                                        res.status(401).json({                                  // ******* RESPONSE STATUS? ************
                                            success: true,
                                            code: 401,
                                            title: "NOT AUTHENTICATED",
                                            message: "LOGIN FAILED",
                                            data : JSON.parse(response.body)
                                        })
                                    }
                                    else{
                                        res.setHeader('Content-Type', 'application/problem+json');
                                        res.setHeader('Content-Language', 'en');
                                        res.setHeader("Access-Control-Allow-Origin", "*");
                                        res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                                            success: true,
                                            code: 200,
                                            title: "SUCCESS",
                                            message: "LOGGED IN",
                                            token : JSON.parse(response.body).access_token,
                                            userDetails : member
                                        })
                                        
                                    }
                                });
                            break;

                        case 'CultureAdmin':

                                login.loginCCAdmin(req.body).then(response => {
                                    if(response.statusCode != '200')
                                    {
                                        res.setHeader('Content-Type', 'application/problem+json');
                                        res.setHeader('Content-Language', 'en');
                                        res.setHeader("Access-Control-Allow-Origin", "*");
                                        res.status(401).json({                                  // ******* RESPONSE STATUS? ************
                                            success: true,
                                            code: 401,
                                            title: "NOT AUTHENTICATED",
                                            message: "LOGIN FAILED",
                                            data : JSON.parse(response.body)
                                        })
                                    }
                                    else{
                                        res.setHeader('Content-Type', 'application/problem+json');
                                        res.setHeader('Content-Language', 'en');
                                        res.setHeader("Access-Control-Allow-Origin", "*");
                                        res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                                            success: true,
                                            code: 200,
                                            title: "SUCCESS",
                                            message: "LOGGED IN",
                                            token : JSON.parse(response.body).access_token,
                                            userDetails : member
                                        })
                                        
                                    }
                                });
                            break;

                    }

                }
            })
        }
        else
        {
            orgRef = db.collection('Organizations').doc(req.body.orgName).collection('Members').where('email', '==', req.body.email);

            orgRef.get().then(snapshot => {
                
                if(snapshot.empty){
                    res.setHeader('Content-Type', 'application/problem+json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                        success: false,
                        code: 200,
                        title: "NOT FOUND",
                        message: "User does not exist"
                    });
                }
                else{
                    member = {}
                    snapshot.forEach(doc => {
                        member = doc.data()
                    })
                    delete member.password;
                    req.body.email = req.body.email + ',' + req.body.orgName;
                    switch(member.userType)
                    {
                        case 'OrganizationAdmin':

                                login.loginOrgAdmin(req.body).then(response => {
                                    if(response.statusCode != '200')
                                    {
                                        res.setHeader('Content-Type', 'application/problem+json');
                                        res.setHeader('Content-Language', 'en');
                                        res.setHeader("Access-Control-Allow-Origin", "*");
                                        res.status(401).json({                                  // ******* RESPONSE STATUS? ************
                                            success: true,
                                            code: 401,
                                            title: "NOT AUTHENTICATED",
                                            message: "LOGIN FAILED",
                                            data : JSON.parse(response.body)
                                        })
                                    }
                                    else{
                                        res.setHeader('Content-Type', 'application/problem+json');
                                        res.setHeader('Content-Language', 'en');
                                        res.setHeader("Access-Control-Allow-Origin", "*");
                                        res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                                            success: true,
                                            code: 200,
                                            title: "SUCCESS",
                                            message: "LOGGED IN",
                                            token : JSON.parse(response.body).access_token,
                                            userDetails : member
                                        })

                                    }
                                });
                            break;
                        
                            case 'Member':

                                    login.loginOrgMember(req.body).then(response => {
                                        if(response.statusCode != '200')
                                        {
                                            res.setHeader('Content-Type', 'application/problem+json');
                                            res.setHeader('Content-Language', 'en');
                                            res.setHeader("Access-Control-Allow-Origin", "*");
                                            res.status(401).json({                                  // ******* RESPONSE STATUS? ************
                                                success: true,
                                                code: 401,
                                                title: "NOT AUTHENTICATED",
                                                message: "LOGIN FAILED",
                                                data : {
                                                    "code": 400,
                                                    "error": "invalid_grant",
                                                    "error_description": "User credentials are invalid"
                                                }
                                            })
                                        }
                                        else{
                                            res.setHeader('Content-Type', 'application/problem+json');
                                            res.setHeader('Content-Language', 'en');
                                            res.setHeader("Access-Control-Allow-Origin", "*");
                                            res.status(200).json({                                  // ******* RESPONSE STATUS? ************
                                                success: true,
                                                code: 200,
                                                title: "SUCCESS",
                                                message: "LOGGED IN",
                                                token : JSON.parse(response.body).access_token,
                                                userDetails : member
                                            })
    
                                        }
                                    });
                                break;
                    }

                }
            })
        }
    }catch(err) {
        console.log(err);
        res.end();
    }
}

module.exports = router;

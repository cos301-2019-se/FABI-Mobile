const express = require('express');
const router = express.Router();
const request = require('request');
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
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "User email expected"
            }
        });
    }

    if (req.body.password == undefined || req.body.password == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "User password expected"
            }
        });
    }

    if (req.body.userType == undefined || req.body.userType == '') {
        res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS? ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "User Type expected"
            }
        });
    }
    
    var qs = {
        email : req.body.email,
        password : req.body.password,
        orgName : req.body.orgName
    };
    
    var options = {
        method: 'POST',
        hostname: 'authentication-dot-api-fabi.appspot.com',
        headers: {
          'Content-Type': 'application/json'
        },
        body : qs,
        json : true
      };
    
    try{
        if(req.body.userType === 'admin')
        {
            options.path = '/loginAdmin';
            request.post('https://authentication-dot-api-fabi.appspot.com/loginAdmin', options, (error, response, body) => {
                if(error)
                {
                    console.log(error)
                }
                else{
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(response.statusCode).json(body);
                }
            })
        }
        else if(req.body.userType === 'databaseAdmin')
        {
            options.path = '/loginDatabaseAdmin';
            request.post('https://authentication-dot-api-fabi.appspot.com/loginDatabaseAdmin', options, (error, response, body) => {
                if(error)
                {
                    console.log(error)
                }
                else{
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(response.statusCode).json(body);
                }
            })
        }
        else if(req.body.userType === 'fabiStaff')
        {
            options.path = '/loginFabiStaff';
            request.post('https://authentication-dot-api-fabi.appspot.com/loginFabiStaff', options, (error, response, body) => {
                if(error)
                {
                    console.log(error)
                }
                else{
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(response.statusCode).json(body);
                }
            })
        }
        else if(req.body.userType === 'orgAdmin')
        {
            options.path = '/loginOrgAdmin';
            request.post('https://authentication-dot-api-fabi.appspot.com/loginOrgAdmin', options, (error, response, body) => {
                if(error)
                {
                    console.log(error)
                }
                else{
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(response.statusCode).json(body);
                }
            })
        }
        else if(req.body.userType === 'orgMember')
        {
            options.path = '/loginOrgMember';
            request.post('https://authentication-dot-api-fabi.appspot.com/loginOrgMember', options, (error, response, body) => {
                if(error)
                {
                    console.log(error)
                }
                else{
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(response.statusCode).json(body);
                }
            })
        }
        else{
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                error: {
                    code: 400,
                    title: "BAD_REQUEST",
                    message: "User Type not supported"
                }
            });
        }
    }catch(err) {
        console.log(err);
        res.end();
    }
}

module.exports = router;

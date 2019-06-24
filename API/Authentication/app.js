/////////////////////////////////////////////////////////
/*          Backend Authentication Module              */ 
/////////////////////////////////////////////////////////
//node modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const displayHTML = require('./api/routes/displayHTML');

//fabi modules
const loginAdminRoute = require('./api/routes/FABI/loginAdmin');
const loginFabiStaffRoute = require('./api/routes/FABI/loginStaff');
const loginDatabaseAdminRoute = require('./api/routes/FABI/loginDatabaseAdmin');

//External modules
const loginOrgAdminRoute = require('./api/routes/External/loginOrgAdmin');
const loginOrgMemberRoute = require('./api/routes/External/loginOrgMember');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Prevent CORS violation
app.use(cors());

app.use('/',displayHTML);
app.use('/loginAdmin', loginAdminRoute);
app.use('/loginFabiStaff', loginFabiStaffRoute);
app.use('/loginOrgAdmin', loginOrgAdminRoute);
app.use('/loginOrgMember', loginOrgMemberRoute);
app.use('/loginDatabaseAdmin', loginDatabaseAdminRoute);

//Error handling when url doesn't exist
// app.use((req, res, next) => {
//     const error = new Error('Not found');
//     error.status = 404;
//     next(error);
// });

//Error handling for thrown error
app.use((error, req, res, next) => {
    // res.status(error.status || 500);
    // res.json({
    //     error: {
    //         message: error.message
    //     }
    // }); 
    console.log(error.message);
});

module.exports = app;

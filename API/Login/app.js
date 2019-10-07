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

const loginRoute = require("./api/routes/login");
const getUserTypesRoute = require('./api/routes/getUserTypes');
const getUserTypesOrgRoute = require('./api/routes/getUserTypesForOrg');
const registerNewOrgRoute = require('./api/routes/registerNewOrg');

const loginTesterRoute = require('./api/routes/loginTester');
const AuthTesterRoute = require('./api/routes/AuthTester');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Prevent CORS violation
app.use(cors());

app.use('/',displayHTML);
app.use('/login', loginRoute);
app.use('/getUserTypes', getUserTypesRoute);
app.use('/getUserTypesForOrg', getUserTypesOrgRoute);
app.use('/registerNewOrganization', registerNewOrgRoute);

app.use('/loginTester', loginTesterRoute);
app.use('/authTester', AuthTesterRoute);

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

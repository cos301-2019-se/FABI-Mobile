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

<<<<<<< HEAD:API/Logging/app.js
//log modules
const loggingUSER = require('./api/routes/USER');
const loggingDBML = require('./api/routes/DBML');
const loggingDGCL = require('./api/routes/DGCL');
const loggingACCL = require('./api/routes/ACCL');
const loggingERRL = require('./api/routes/ERRL');
const getLogs = require('./api/routes/getLogs');
=======
//fabi modules
const createDatabaseRoute = require('./api/routes/createDatabase');
const addDocRoute = require('./api/routes/addDoc');
const portingRoute = require('./api/routes/porting');
const retrieveDatabaseRoute = require('./api/routes/retrieveDatabase');
>>>>>>> remotes/origin/API:API/DatabaseManagement/app.js

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Prevent CORS violation
app.use(cors());

app.use('/',displayHTML);
<<<<<<< HEAD:API/Logging/app.js
app.use('/USER', loggingUSER);
app.use('/DBML', loggingDBML);
app.use('/DGCL', loggingDGCL);
app.use('/ACCL', loggingACCL);
app.use('/ERRL', loggingERRL);
app.use('/getLogs', getLogs);
=======
app.use('/createDatabase', createDatabaseRoute);
app.use('/addDoc', addDocRoute);
app.use('/porting', portingRoute);
app.use('/retrieveDatabase', retrieveDatabaseRoute);

>>>>>>> remotes/origin/API:API/DatabaseManagement/app.js

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

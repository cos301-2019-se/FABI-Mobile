const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const authenticatePublicUserRoute = require('./api/routes/authenticatePublicUser');
const displayHTML = require('./api/routes/displayHTML');
const addPublicUserRoute = require('./api/routes/addPublicUser');
const getLogsRoute = require('./api/routes/getLogs');
const gererateReferenceNumberRoute = require('./api/routes/generateReferenceNumber');
const submitFormRoute = require('./api/routes/submitForm');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Prevent CORS violation
app.use(cors());

//Send any requests with authenticateNFC to the correct route
app.use('/authenticatePublicUser', authenticatePublicUserRoute);
app.use('/',displayHTML);
app.use('/addPublicUser',addPublicUserRoute);
app.use('/getLogs',getLogsRoute);
app.use('/generateReferenceNumber',gererateReferenceNumberRoute);
app.use('/submitForm',submitFormRoute);


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
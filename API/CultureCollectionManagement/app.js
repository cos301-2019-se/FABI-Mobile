const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const displayHTML = require('./api/routes/displayHTML');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Prevent CORS violation
app.use(cors());

const revitalizationRoute = require('./api/routes/submitCMWRevitalizationForm');
const requestRoute = require('./api/routes/submitCMWRequestForm');
const depositRoute = require('./api/routes/submitSMWDepositForm');
const getDepositRoute = require('./api/routes/getAllDepositForms');
const getRequestRoute = require('./api/routes/getAllRequestForms');
const getRevitalizationRoute = require('./api/routes/getAllRevitalizationForms');
const updateDepositStatusRoute = require('./api/routes/updateDepositStatus');
const getProcessingFormsRoute = require('./api/routes/getAllProcessingForms');
const submitCMWProcessingFormRoute = require('./api/routes/submitCMWProcessingForm');
const deleteCMWDepositFormRoute = require('./api/routes/deleteCMWDepositForm');
const deleteCMWProcessingFormRoute = require('./api/routes/deleteCMWProcessingForm');
const deleteCMWRequestFormRoute = require('./api/routes/deleteCMWRequestForm');
const deleteCMWRevitalizationFormRoute = require('./api/routes/deleteCMWRevitalizationForm');

app.use('/submitCMWRevitalizationForm', revitalizationRoute);
app.use('/submitCMWDepositForm', depositRoute);
app.use('/submitCMWRequestForm', requestRoute);
app.use('/getAllDepositForms', getDepositRoute);
app.use('/getAllRequestForms', getRequestRoute);
app.use('/getAllRevitalizationForms', getRevitalizationRoute);
app.use('/updateDepositStatus', updateDepositStatusRoute);
app.use('/getAllProcessingForms', getProcessingFormsRoute);
app.use('/submitCMWProcessingForm', submitCMWProcessingFormRoute);
app.use('/deleteCMWRevitalizationForm',deleteCMWRevitalizationFormRoute);
app.use('/deleteCMWDepositForm',deleteCMWDepositFormRoute);
app.use('/deleteCMWRequestForm',deleteCMWRequestFormRoute);
app.use('/deleteCMWProcessingForm',deleteCMWProcessingFormRoute);

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
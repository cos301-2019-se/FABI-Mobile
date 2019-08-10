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

const submitSampleRoute = require('./api/routes/submitSample');
const retrieveSampleRoute = require('./api/routes/retrieveSample');
const retrieveAllOrgSamplesRoute = require('./api/routes/retrieveAllOrgSamples');
const retrieveAllSamplesRoute = require('./api/routes/retrieveAllSamples');
const updateSampleStatusRoute = require('./api/routes/updateSampleStatus');
const retriveSamplesForMemberRoute = require('./api/routes/retrieveSamplesForMember');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Prevent CORS violation
app.use(cors());

app.use('/',displayHTML);
app.use('/submitSample', submitSampleRoute);
app.use('/retrieveSample', retrieveSampleRoute);
app.use('/retrieveAllSamples', retrieveAllSamplesRoute);
app.use('/retrieveAllOrgSamples', retrieveAllOrgSamplesRoute);
app.use('/updateSampleStatus', updateSampleStatusRoute);
app.use('/retrieveSamplesForMember', retriveSamplesForMemberRoute);

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

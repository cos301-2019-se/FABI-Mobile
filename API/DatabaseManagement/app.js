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
const createDatabaseRoute = require('./api/routes/createDatabase');
const addDocRoute = require('./api/routes/addDoc');
const portingRoute = require('./api/routes/porting');
const retrieveDatabaseRoute = require('./api/routes/retrieveDatabase');
const getDBNamesRoute = require('./api/routes/getDBNames');
const dropDatabaseRoute = require('./api/routes/dropDatabase');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Prevent CORS violation
app.use(cors());

app.use('/',displayHTML);
app.use('/createDatabase', createDatabaseRoute);
app.use('/addDoc', addDocRoute);
app.use('/porting', portingRoute);
app.use('/retrieveDatabase', retrieveDatabaseRoute);
app.use('/getDBNames', getDBNamesRoute);
app.use('/dropDatabase', dropDatabaseRoute);


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

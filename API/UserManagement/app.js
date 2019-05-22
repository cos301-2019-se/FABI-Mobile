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
const createOrganizationRoute = require('./api/routes/FABI/createOrganization');
const addStaffRoute = require('./api/routes/FABI/addStaff');
const getAllStaffRoute = require('./api/routes/FABI/getAllStaff');
const updateStaffMemberRoute = require('./api/routes/FABI/updateStaffMember');

//External modules
const addMemberToOrgRoute = require('./api/routes/External/addMemberToOrg');
const getOrgDetailsRoute = require('./api/routes/External/getOrgDetails');
const getAllOrgMembersRoute = require('./api/routes/External/getAllOrgMembers');
const getAllOrgsRoute = require('./api/routes/External/getAllOrginizations');
const updateOrgMemberRoute = require('./api/routes/External/updateOrgMember');
const getOrgMemberRoute = require('./api/routes/External/getOrgMember');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Prevent CORS violation
app.use(cors());

app.use('/',displayHTML);
app.use('/createOrganization', createOrganizationRoute);
app.use('/addMemberToOrg', addMemberToOrgRoute);
app.use('/addStaff', addStaffRoute);
app.use('/getOrgDetails', getOrgDetailsRoute);
app.use('/getAllStaff', getAllStaffRoute);
app.use('/updateStaffMember', updateStaffMemberRoute);
app.use('/getAllOrgMembers', getAllOrgMembersRoute);
app.use('/getAllOrganizations', getAllOrgsRoute);
app.use('/updateorgMember', updateOrgMemberRoute);
app.use('/getOrgMember', getOrgMemberRoute);

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

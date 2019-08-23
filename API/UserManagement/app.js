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
const addAdminRoute = require('./api/routes/FABI/addFabiAdmin');
const addDatabaseAdminRoute = require('./api/routes/FABI/addFabiDatabaseAdmin');
const removeOrgRoute = require('./api/routes/FABI/removeOrg');
const removeStaffRoute = require('./api/routes/FABI/removeStaff');
const getAllFabiAdminsRoute = require('./api/routes/FABI/getAllFabiAdmins');
const getAllDatabaseAdminsRoute = require('./api/routes/FABI/getAllDatabaseAdmins');
const getAllFabiMembersRoute = require('./api/routes/FABI/getAllFabiMembers');
const updateAdminDatabaseAccessRoute = require('./api/routes/FABI/updateAdminDatabaseAccess');
const updateAdminDetailsRoute = require('./api/routes/FABI/updateAdminDetails');
const updateStaffDatabaseAccessRoute = require('./api/routes/FABI/updateStaffDatabaseAccess');
<<<<<<< HEAD
=======
const getAdminTypesRoute = require('./api/routes/FABI/getAdminTypes');
const updateStaffPassowordRoute = require('./api/routes/FABI/updateStaffPassword');
>>>>>>> develop

//External modules
const addMemberToOrgRoute = require('./api/routes/External/addMemberToOrg');
const getOrgDetailsRoute = require('./api/routes/External/getOrgDetails');
const getAllOrgMembersRoute = require('./api/routes/External/getAllOrgMembers');
const getAllOrgsRoute = require('./api/routes/External/getAllOrginizations');
const updateOrgMemberRoute = require('./api/routes/External/updateOrgMember');
const getUserDetailsRoute = require('./api/routes/External/getUserDetails');
const removeMemberRoute = require('./api/routes/External/removeMember');
const updateOrgMemberPasswordRoute = require('./api/routes/External/updateOrgMemberPassword');

const getPendingOrgsRoute = require('./api/routes/External/getAllPendingOrganizations');

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
app.use('/getUserDetails', getUserDetailsRoute);
app.use('/addFabiAdmin', addAdminRoute);
app.use('/addFabiDatabaseAdmin', addDatabaseAdminRoute);
app.use('/removeOrg', removeOrgRoute);
app.use('/removeMember', removeMemberRoute);
app.use('/removeStaff', removeStaffRoute);
app.use('/getAllFabiAdmins', getAllFabiAdminsRoute);
app.use('/getAllDatabaseAdminsRoute', getAllDatabaseAdminsRoute);
app.use('/getAllFabiMembers', getAllFabiMembersRoute);
app.use('/updateAdminDetails', updateAdminDetailsRoute);
app.use('/updateAdminDatabaseAccess', updateAdminDatabaseAccessRoute);
app.use('/updateStaffDatabaseAccess', updateStaffDatabaseAccessRoute);
<<<<<<< HEAD
=======
app.use('/getAdminTypes', getAdminTypesRoute);
app.use('/updateStaffPassword', updateStaffPassowordRoute);
app.use('/updateOrgMemberPassword', updateOrgMemberPasswordRoute);
app.use('/getAllPendingOrganizations', getPendingOrgsRoute);
>>>>>>> develop

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

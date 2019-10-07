/////////////////////////////////////////////////////////
/*          Backend Authentication Module              */ 
/////////////////////////////////////////////////////////
//node modules
const express = require('express');
const app = express();
const displayHTML = require('./api/routes/displayHTML');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const oAuth2Server = require("node-oauth2-server");

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

app.superuser_oauth = oAuth2Server({
    model: require('./api/routes/SuperUserAuthModel'),
    grants: ['password'],
    debug: true
});

app.staff_oauth = oAuth2Server({
    model: require('./api/routes/StaffAuthModel'),
    grants: ['password'],
    debug: true
});

app.clinicadmin_oauth = oAuth2Server({
    model: require('./api/routes/ClinicAdminAuthModel'),
    grants: ['password'],
    debug: true
});

app.ccadmin_oauth = oAuth2Server({
    model: require('./api/routes/CCAdminAuthModel'),
    grants: ['password'],
    debug: true
});

app.orgadmin_oauth = oAuth2Server({
    model: require('./api/routes/OrgAdminAuthModel'),
    grants: ['password'],
    debug: true
});

app.orgmember_oauth = oAuth2Server({
    model: require('./api/routes/OrgMemberAuthModel'),
    grants: ['password'],
    debug: true
});

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

//Authentication Routes
//Super User
app.use(app.superuser_oauth.errorHandler());
app.post('/loginSuperUser', app.superuser_oauth.grant(), () => {});
app.post('/authenticateSuperUser', app.superuser_oauth.authorise(), (req, res) => { 
	
	if(req.oauth.bearerToken.userId == null){
		
		res.setHeader('Content-Type', 'application/problem+json');
		res.setHeader('Content-Language', 'en');
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.status(401).json({                                  // ******* RESPONSE STATUS ************
			success: false,
			code: 401,
			title: "UNAUTHORIZED",
			message: "Invalid Token"
		});
		
	}else{

		res.setHeader('Content-Type', 'application/problem+json');
		res.setHeader('Content-Language', 'en');
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.status(200).json({                                  // ******* RESPONSE STATUS ************
			success: true,
			code: 200,
			title: "SUCCESS",
			message: "Valid Token"
		});
	}
	// console.log("Aeron is useless"); 
	
});

//Staff
app.use(app.staff_oauth.errorHandler());
app.post('/loginStaff', app.staff_oauth.grant(), () => {});
app.post('/authenticateStaff', app.staff_oauth.authorise(), (req, res) => { 
	
	if(req.oauth.bearerToken.userId == null){
		
		res.setHeader('Content-Type', 'application/problem+json');
		res.setHeader('Content-Language', 'en');
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.status(401).json({                                  // ******* RESPONSE STATUS ************
			success: false,
			code: 401,
			title: "UNAUTHORIZED",
			message: "Invalid Token"
		});
		
	}else{

		res.setHeader('Content-Type', 'application/problem+json');
		res.setHeader('Content-Language', 'en');
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.status(200).json({                                  // ******* RESPONSE STATUS ************
			success: true,
			code: 200,
			title: "SUCCESS",
			message: "Valid Token"
		});
	} 
	
});

//Clinic Admin
app.use(app.clinicadmin_oauth.errorHandler());
app.post('/loginClinicAdmin', app.clinicadmin_oauth.grant(), () => {});
app.post('/authenticateClinicAdmin', app.clinicadmin_oauth.authorise(), (req, res) => { 
	
	if(req.oauth.bearerToken.userId == null){
		
		res.setHeader('Content-Type', 'application/problem+json');
		res.setHeader('Content-Language', 'en');
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.status(401).json({                                  // ******* RESPONSE STATUS ************
			success: false,
			code: 401,
			title: "UNAUTHORIZED",
			message: "Invalid Token"
		});
		
	}else{

		res.setHeader('Content-Type', 'application/problem+json');
		res.setHeader('Content-Language', 'en');
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.status(200).json({                                  // ******* RESPONSE STATUS ************
			success: true,
			code: 200,
			title: "SUCCESS",
			message: "Valid Token"
		});
	} 
	
});

//CC Admin
app.use(app.ccadmin_oauth.errorHandler());
app.post('/loginCultureAdmin', app.ccadmin_oauth.grant(), () => {});
app.post('/authenticateCultureAdmin', app.ccadmin_oauth.authorise(), (req, res) => { 
	
	if(req.oauth.bearerToken.userId == null){
		
		res.setHeader('Content-Type', 'application/problem+json');
		res.setHeader('Content-Language', 'en');
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.status(401).json({                                  // ******* RESPONSE STATUS ************
			success: false,
			code: 401,
			title: "UNAUTHORIZED",
			message: "Invalid Token"
		});
		
	}else{

		res.setHeader('Content-Type', 'application/problem+json');
		res.setHeader('Content-Language', 'en');
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.status(200).json({                                  // ******* RESPONSE STATUS ************
			success: true,
			code: 200,
			title: "SUCCESS",
			message: "Valid Token"
		});
	} 
	
});

//Org Admin
app.use(app.orgadmin_oauth.errorHandler());
app.post('/loginOrganizationAdmin', app.orgadmin_oauth.grant(), () => {});
app.post('/authenticateOrganizationAdmin', app.orgadmin_oauth.authorise(), (req, res) => { 
	
	if(req.oauth.bearerToken.userId == null){
		
		res.setHeader('Content-Type', 'application/problem+json');
		res.setHeader('Content-Language', 'en');
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.status(401).json({                                  // ******* RESPONSE STATUS ************
			success: false,
			code: 401,
			title: "UNAUTHORIZED",
			message: "Invalid Token"
		});
		
	}else{

		res.setHeader('Content-Type', 'application/problem+json');
		res.setHeader('Content-Language', 'en');
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.status(200).json({                                  // ******* RESPONSE STATUS ************
			success: true,
			code: 200,
			title: "SUCCESS",
			message: "Valid Token"
		});
	} 
	
});

//Org Member
app.use(app.orgmember_oauth.errorHandler());
app.post('/loginOrganizationMember', app.orgmember_oauth.grant(), () => {});
app.post('/authenticateOrganizationMember', app.orgmember_oauth.authorise(), (req, res) => { 
	
	if(req.oauth.bearerToken.userId == null){
		
		res.setHeader('Content-Type', 'application/problem+json');
		res.setHeader('Content-Language', 'en');
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.status(401).json({                                  // ******* RESPONSE STATUS ************
			success: false,
			code: 401,
			title: "UNAUTHORIZED",
			message: "Invalid Token"
		});
		
	}else{

		res.setHeader('Content-Type', 'application/problem+json');
		res.setHeader('Content-Language', 'en');
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.status(200).json({                                  // ******* RESPONSE STATUS ************
			success: true,
			code: 200,
			title: "SUCCESS",
			message: "Valid Token"
		});
	} 
	
});


//Error handling for thrown error
app.use((error, req, res, next) => {
    console.log(error.message);
});

module.exports = app;

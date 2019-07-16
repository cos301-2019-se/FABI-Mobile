const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.get("/", getLog );

const db = admin.firestore();

function getLog(req, res){
	
	if(req.body.Log.type == undefined || req.body.Log.type == '' ){
		res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "Log type expected"
            }
        });
		
	}else if(req.body.Log.before == undefined){
		res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "Log before date expected"
            }
        });
		
	}else if(req.body.Log.after == undefined){
		res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "Log after date expected"
            }
        });
		
	}else if(req.body.Log.type == "DBML"){
		
		var LogRef = db.collection('Logging').doc('DBML').collection('logs');
		LogRef.get().then(snapshot => {
			var qs = {Logs : []}

			snapshot.forEach(doc => {
				qs.Logs.push(doc.data());
			})
		
			res.setHeader('Content-Type', 'application/problem+json');
			res.setHeader('Content-Language', 'en');
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.status(200).json({                                  // ******* RESPONSE STATUS ************
				success: true,
				data: {
					code: 200,
					title: "SUCCESS",
					message: "Database CRUD logs",
					content: {
						data: qs
					}
				}
			});
		});
		
		
	}else if(req.body.Log.type == "USER"){
		
		var LogRef = db.collection('Logging').doc('USER').collection('logs');
		LogRef.get().then(snapshot => {
			var qs = {Logs : []}

			snapshot.forEach(doc => {
				qs.Logs.push(doc.data());
			})
		
			res.setHeader('Content-Type', 'application/problem+json');
			res.setHeader('Content-Language', 'en');
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.status(200).json({                                  // ******* RESPONSE STATUS ************
				success: true,
				data: {
					code: 200,
					title: "SUCCESS",
					message: "User CRUD logs",
					content: {
						data: qs
					}
				}
			});
		});
		
		
	}else if(req.body.Log.type == "ERRL"){
		
		var LogRef = db.collection('Logging').doc('ERRL').collection('logs');
		LogRef.get().then(snapshot => {
			var qs = {Logs : []}

			snapshot.forEach(doc => {
				qs.Logs.push(doc.data());
			})
		
			res.setHeader('Content-Type', 'application/problem+json');
			res.setHeader('Content-Language', 'en');
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.status(200).json({                                  // ******* RESPONSE STATUS ************
				success: true,
				data: {
					code: 200,
					title: "SUCCESS",
					message: "Error logs",
					content: {
						data: qs
					}
				}
			});
		});
		
		
	}else if(req.body.Log.type == "ACCL"){
		
		var LogRef = db.collection('Logging').doc('ACCL').collection('logs');
		LogRef.get().then(snapshot => {
			var qs = {Logs : []}

			snapshot.forEach(doc => {
				qs.Logs.push(doc.data());
			})
		
			res.setHeader('Content-Type', 'application/problem+json');
			res.setHeader('Content-Language', 'en');
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.status(200).json({                                  // ******* RESPONSE STATUS ************
				success: true,
				data: {
					code: 200,
					title: "SUCCESS",
					message: "Access logs",
					content: {
						data: qs
					}
				}
			});
		});
		
		
	}else if(req.body.Log.type == "DGCL"){
		
		var LogRef = db.collection('Logging').doc('DGCL').collection('logs');
		LogRef.get().then(snapshot => {
			var qs = {Logs : []}

			snapshot.forEach(doc => {
				qs.Logs.push(doc.data());
			})
		
			res.setHeader('Content-Type', 'application/problem+json');
			res.setHeader('Content-Language', 'en');
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.status(200).json({                                  // ******* RESPONSE STATUS ************
				success: true,
				data: {
					code: 200,
					title: "SUCCESS",
					message: "Diagnostic Clinic logs",
					content: {
						data: qs
					}
				}
			});
		});
		
		
	}else{
		res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "Did not recognise Log type"
            }
        });
	}
	
}

module.exports = router;

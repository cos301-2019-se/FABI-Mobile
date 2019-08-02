const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.post("/", addLog );

const db = admin.firestore();

function addLog(req, res){
	
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
		
	}else if(req.body.Log.action == undefined || req.body.Log.action == '' ){
		res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "Log action expected"
            }
        });
		
	}else if(req.body.Log.details == undefined || req.body.Log.details == '' ){
		res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "Log details expected"
            }
        });
		
	}else if(req.body.Log.user == undefined || req.body.Log.user == '' ){
		res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "Log user expected"
            }
        });
		
	}else if(req.body.Log.org1 == undefined || req.body.Log.org1 == '' ){
		res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "org1 expected"
            }
        });
		
	}else if(req.body.Log.org2 == undefined ){
		res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "org2 expected"
            }
        });
		
	}else if(req.body.Log.moreInfo == undefined ){
		res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "Log moreInfo heading expected"
            }
        });
		
	}else if(req.body.Log.type == "USER"){
		
		var datetime = new Date().toString();
		
		const logEntry = {
			type: req.body.Log.type,
			action: req.body.Log.action,
			details: req.body.Log.details,
			date: new Date().getTime().toString(),
			dateString: datetime,
			user: req.body.Log.user,
			org1: req.body.Log.org1,
			org2: req.body.Log.org2,
			moreInfo: req.body.Log.moreInfo
		}
		
		var docRef  = db.collection('Logging').doc('USER').collection('logs').doc(logEntry.date);
		docRef.set(logEntry).then(() => {
			res.setHeader('Content-Type', 'application/problem+json');
			res.setHeader('Content-Language', 'en');
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.status(200).json({                                  // ******* RESPONSE STATUS ************
				success: true,
				data: {
					code: 200,
					title: "SUCCESS",
					message: "User CRUD log created",
				}
			});
		});	
		
		var notif = {
			id: logEntry.date
		}
		
		var staffRef = db.collection('Organizations').doc('FABI').collection('Staff');
		staffRef.get().then(snapshot => {
			
			snapshot.forEach(doc => {
				
                var staffdoc = db.collection('Organizations').doc('FABI').collection('Staff').doc(doc.id).collection('notifications').doc(notif.id);
				
				staffdoc.set(notif).then(() => { 
					
				});
				
            })
			
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

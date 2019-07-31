const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

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
		
	}else if(req.body.Log.statusCode == undefined || req.body.Log.statusCode == '' ){
		res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "Log statusCode expected"
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
		
	}else if(req.body.Log.type == "ACCL"){
		
		var datetime = new Date().toString();
		
		const logEntry = {
			type: req.body.Log.type,
			statusCode: req.body.Log.statusCode,
			details: req.body.Log.details,
			date: new Date().getTime().toString(),
			dateString: datetime,
			user: req.body.Log.user,
			moreInfo: req.body.Log.moreInfo
		}
		
		var docRef  = db.collection('Logging').doc('ACCL').collection('logs').doc(logEntry.date);
		docRef.set(logEntry).then(() => {
			res.setHeader('Content-Type', 'application/problem+json');
			res.setHeader('Content-Language', 'en');
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.status(200).json({                                  // ******* RESPONSE STATUS ************
				success: true,
				data: {
					code: 200,
					title: "SUCCESS",
					message: "Access log created",
				}
			});
		});	
		

		var notif = {
			id: logEntry.date
		}
		
		var staffRef = db.collection('Organizations').doc('FABI').collection('Staff');
		staffRef.get().then(snapshot => {
			
			snapshot.forEach(doc => {
				var type = db.collection('Organizations').doc('FABI').collection('Staff').doc(doc.id).get().then( doc2 => {
					if(doc2.data().userType == 'SuperUser' || doc2.data().userType == 'Admin'){
						var staffdoc = db.collection('Organizations').doc('FABI').collection('Staff').doc(doc.id).collection('notifications').doc(notif.id);
						//doc.collection('notifications').doc(notif.id);
						staffdoc.set(notif).then(() => { 
							//dont need anything here
						});
					}	
					
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
                message: "Did not recognise Log"
            }
        });
	}
	
}

module.exports = router;

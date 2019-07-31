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
		
		// --------------ANYTHING ELSE ????? ------------------
		
	}else if(req.body.Log.type == "DGCL"){
		
		var datetime = new Date().toString();
		
		const logEntry = {
			type: req.body.Log.type,
			date: new Date().getTime().toString(),
			dateString: datetime,
			user: req.body.Log.user,
			// anything else ?????
		}
		
		var docRef  = db.collection('Logging').doc('DGCL').collection('logs').doc(logEntry.date);
		docRef.set(logEntry).then(() => {
			res.setHeader('Content-Type', 'application/problem+json');
			res.setHeader('Content-Language', 'en');
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.status(200).json({                                  // ******* RESPONSE STATUS ************
				success: true,
				data: {
					code: 200,
					title: "SUCCESS",
					message: "Diagnostic Clinic log created",
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
                message: "Did not recognise Log type"
            }
        });
	}
	
}

module.exports = router;

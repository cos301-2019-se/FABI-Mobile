const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.post("/", getUserLogs );

const db = admin.firestore();

function getUserLogs(req, res){
	
	if(req.body.userID == undefined || req.body.userID == ''){
		
		res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                  // ******* RESPONSE STATUS ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "userID expected"
            }
        });
		
	}else{
		
		var userLogs = db.collection('Organizations').doc('FABI').collection('Staff').doc(req.body.userID).collection('notifications');
		userLogs.get().then(snapshot => {
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
					message: "User notification log IDs",
					content: {
						data: qs
					}
				}
			});
		});
		
	}
	
}

module.exports = router;

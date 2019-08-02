const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.post("/", deleteUserLogs );

const db = admin.firestore();

function deleteUserLogs(req, res){
	
	if(req.body.logIDs.length == undefined || req.body.logIDs.length == 0){
		
		res.setHeader('Content-Type', 'application/problem+json');
        res.setHeader('Content-Language', 'en');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(400).json({                                   // ******* RESPONSE STATUS ************
            success: false,
            error: {
                code: 400,
                title: "BAD_REQUEST",
                message: "array of logIDs expected"
            }
        });
		
	}else if(req.body.userID == undefined || req.body.userID == ''){
		
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
		
		for(var x =0; x < req.body.logIDs.length; x++){
			
			var delLog = db.collection('Organizations').doc('FABI').collection('Staff').doc(req.body.userID).collection('notifications').doc(req.body.logIDs[x] );
			delLog.delete().then(function() {
				res.setHeader('Content-Type', 'application/problem+json');
				res.setHeader('Content-Language', 'en');
				res.setHeader("Access-Control-Allow-Origin", "*");
				res.status(200).json({                                  // ******* RESPONSE STATUS ************
					success: true,
					data: {
						code: 200,
						title: "SUCCESS",
						message: "User logs deleted"
					}
				});
			});
		}
		
	}
	
}

module.exports = router;

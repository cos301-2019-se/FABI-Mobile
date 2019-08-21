module.exports = function(log){
	
	if(log.type == "ACCL"){
		
		var qs = {
			Log: {
				type: log.type,
				statusCode: log.statusCode,
				details: Log.details,
				user: Log.user,
				moreInfo: Log.moreInfo
			}
		};
		
		var options = {
			method: 'POST',
			hostname: 'logging-dot-api-fabi.appspot.com',
			headers: {
			  'Content-Type': 'application/json'
			},
			body : qs,
			json : true
		};
		
		try{
			options.path = '/ACCL';
<<<<<<< HEAD
            request.post('***REMOVED***/ACCL', options, (error, response, body) => {
=======
            request.post('***REMOVED***/ACCL', options, (error, response, body) => {
>>>>>>> API
                if(error){
                    console.log(error)
                }else{
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(response.statusCode).json(body);
                }
            })
			
		}catch(err){
			console.log(err);
			res.end();
		}	
		
	}else if(log.type == "ERRL" ){
		
		var qs = {
			Log: {
				type: log.type,
				statusCode: log.statusCode,
				details: Log.details,
				user: Log.user,
				moreInfo: Log.moreInfo
			}
		};
		
		var options = {
			method: 'POST',
			hostname: 'logging-dot-api-fabi.appspot.com',
			headers: {
			  'Content-Type': 'application/json'
			},
			body : qs,
			json : true
		};
		
		try{
			options.path = '/ERRL';
<<<<<<< HEAD
            request.post('***REMOVED***/ERRL', options, (error, response, body) => {
=======
            request.post('***REMOVED***/ERRL', options, (error, response, body) => {
>>>>>>> API
                if(error){
                    console.log(error)
                }else{
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(response.statusCode).json(body);
                }
            })
			
		}catch(err){
			console.log(err);
			res.end();
		}
		
	}else if(log.type == "USER" ){
		
		var qs = {
			Log: {
				type: log.type,
				action: log.action,
				details: Log.details,
				user: Log.user,
				org1: Log.org1,
				org2: Log.org2,
				moreInfo: Log.moreInfo
			}
		};
		
		var options = {
			method: 'POST',
			hostname: 'logging-dot-api-fabi.appspot.com',
			headers: {
			  'Content-Type': 'application/json'
			},
			body : qs,
			json : true
		};
		
		try{
			options.path = '/USER';
<<<<<<< HEAD
            request.post('***REMOVED***/USER', options, (error, response, body) => {
=======
            request.post('***REMOVED***/USER', options, (error, response, body) => {
>>>>>>> API
                if(error){
                    console.log(error)
                }else{
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(response.statusCode).json(body);
                }
            })
			
		}catch(err){
			console.log(err);
			res.end();
		}
		
		
	}else if(log.type == "DBML" ){
		
		var qs = {
			Log: {
				type: log.type,
				action: log.action,
				details: Log.details,
				user: Log.user,
				org1: Log.org1,
				org2: Log.org2,
				moreInfo: Log.moreInfo
			}
		};
		
		var options = {
			method: 'POST',
			hostname: 'logging-dot-api-fabi.appspot.com',
			headers: {
			  'Content-Type': 'application/json'
			},
			body : qs,
			json : true
		};
		
		try{
			options.path = '/DBML';
<<<<<<< HEAD
            request.post('***REMOVED***/DBML', options, (error, response, body) => {
=======
            request.post('***REMOVED***/DBML', options, (error, response, body) => {
>>>>>>> API
                if(error){
                    console.log(error)
                }else{
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Content-Language', 'en');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.status(response.statusCode).json(body);
                }
            })
			
		}catch(err){
			console.log(err);
			res.end();
		}
		
	}else if(log.type == "DGCL" ){
		
		
	}

}
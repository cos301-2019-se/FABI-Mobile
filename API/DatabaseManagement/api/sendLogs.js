const request = require('request');

module.exports = function(log){
	
	if(log.type == "ACCL"){
		
		var qs = {
			Log: {
				type: log.type,
				statusCode: log.statusCode,
				details: log.details,
				user: log.user,
				moreInfo: log.moreInfo,
				moreInfo : ''
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
            request.post('https://logging-dot-api-fabi.appspot.com/ACCL', options, (error, response, body) => {
                if(error){
					console.log(error)

                }
            })
			
		}catch(err){
			console.log(err);
			
		}	
		
	}else if(log.type == "ERRL" ){
		
		var qs = {
			Log: {
				type: log.type,
				statusCode: log.statusCode,
				details: log.details,
				user: log.user,
				moreInfo: log.moreInfo,
				moreInfo : ''
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
            request.post('https://logging-dot-api-fabi.appspot.com/ERRL', options, (error, response, body) => {
                if(error){
                    console.log(error)
                }
            })
			
		}catch(err){
			console.log(err);
			
		}
		
	}else if(log.type == "USER" ){
		
		console.log('sending logs');
		var qs = {
			Log: {
				type: log.type,
				action: log.action,
				details: log.details,
				user: log.user,
				org1: log.org1,
				org2: log.org2,
				moreInfo : ''
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
            request.post('https://logging-dot-api-fabi.appspot.com/USER', options, (error, response, body) => {
                if(error){
                    console.log(error)
				}
            })
			
		}catch(err){
			console.log(err);
			
		}
		
		
	}else if(log.type == "DBML" ){
		
		var qs = {
			Log: {
				type: log.type,
				action: log.action,
				details: log.details,
				user: log.user,
				moreInfo : '',
				org1: 'FABI',
				org2: ''
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
            request.post('https://logging-dot-api-fabi.appspot.com/DBML', options, (error, response, body) => {
                if(error){
                    console.log(error)
				}
            })
			
		}catch(err){
			console.log(err);
		}
		
	}else if(log.type == "DGCL" ){
		
		
	}

}
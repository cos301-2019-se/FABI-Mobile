const request = require('request');
const config = require('./config');
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
			hostname: config.logging,
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
			url =config.logging + options.path
            request.post(url, options, (error, response, body) => {
>>>>>>> develop
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
			hostname: config.logging,
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
			url =config.logging + options.path
            request.post(url, options, (error, response, body) => {
>>>>>>> develop
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
			hostname:config.logging,
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
			url =config.logging + options.path
            request.post(url, options, (error, response, body) => {
>>>>>>> develop
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
				org1: 'FABI'
			}
		};
		
		var options = {
			method: 'POST',
			hostname: config.logging,
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
			url =config.logging + options.path
            request.post(url, options, (error, response, body) => {
>>>>>>> develop
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
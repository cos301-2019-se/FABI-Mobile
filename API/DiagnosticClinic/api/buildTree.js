const request = require('request');

module.exports = function(pswd){
	
	var options = {
			method: 'POST',
			hostname: 'dtree-dot-api-fabi.appspot.com',
			headers: {
			  'Content-Type': 'application/json'
			},
			body : {
				pass : pswd
			},
			json : true
		};
		
	try{
		options.path = '/buildTree';
		request.post('https://dtree-dot-api-fabi.appspot.com/buildTree', options, (error, response, body) => {
			if(error){
				console.log(error)
			}else{
				//tree accuracy (dont need it for anything)
				return response
			}
		})
			
	}catch(err){
		console.log(err);		
	}	
	
}
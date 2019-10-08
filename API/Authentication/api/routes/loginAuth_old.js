const request = require('request');

module.exports = {
	
	loginSuperUser: function(loginData){
		
		return new Promise(function(resolve, reject){
			var input = {
				grant_type: 'Password',
				client_id: null,
				client_secret: null,
				username: loginData.username,
				password: loginData.password
			};
			
			var options = {
				method: 'POST',
				hostname: 'authentication-dot-fabi-personel-testing.appspot.com',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: input,
				json: true
			};
			
			try{
				options.path = '/loginSuperUser';
				var url = options.hostname + options.path;
				
				request.post(url,options, (error, response, body) => {
					if(error){
						reject( Error(err) );
					}else{
						resolve(response.body);
					}
				})
				
			}catch(err){
				reject( Error(err) );
			}
			
		})
		
	},
	authSuperUser: function(token){
		
		return new Promise(function(resolve, reject){
			
			var options = {
				method: 'POST',
				hostname: 'authentication-dot-fabi-personel-testing.appspot.com',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer '+token,
					'client_id': 'null',
					'client_secret': 'null'
				},
				body: {},
				json: true
			};
			
			try{
				options.path = '/authenticateSuperUser';
				var url = options.hostname + options.path;
				
				request.post(url,options, (error, response, body) => {
					if(error){
						console.log(error);
					}else{
						resolve(response.body);
					}
				})
				
			}catch(err){
				reject( Error(err) );
			}
			
		})
		
	},
	
	loginStaff: function(){
		
		return new Promise(function(resolve, reject){
			
		})
		
	},
	authStaff: function(){
		
		return new Promise(function(resolve, reject){
			
		})
		
	},
	
	loginClinicAdmin: function(){
		
		return new Promise(function(resolve, reject){
			
		})
		
	},
	authClinicAdmin: function(){
		
		return new Promise(function(resolve, reject){
			
		})
		
	},
	
	loginCCAdmin: function(){
		
		return new Promise(function(resolve, reject){
			
		})
		
	},
	authCCAdmin: function(){
		
		return new Promise(function(resolve, reject){
			
		})
		
	},
	
	loginOrgAdmin: function(){
		
		return new Promise(function(resolve, reject){
			
		})
		
	},
	authOrgAdmin: function(){
		
		return new Promise(function(resolve, reject){
			
		})
		
	},
	
	loginOrgMember: function(){
		
		return new Promise(function(resolve, reject){
			
		})
		
	},
	authOrgMember: function(){
		
		return new Promise(function(resolve, reject){
			
		})
		
	}
	
}
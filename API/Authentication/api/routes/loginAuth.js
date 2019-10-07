const request = require('request');

module.exports = {
	
	loginSuperUser: function(loginData){
		
		return new Promise(function(resolve, reject){
			var input = {
				grant_type: 'password',
				client_id: 'null',
				client_secret: 'null',
				username: loginData.email,
				password: loginData.password
			};
			
			var options = {
				method: 'POST',
				hostname: 'authentication-dot-fabi-personel-testing.appspot.com',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				form: input
			};
			
			try{
				options.path = '/loginSuperUser';
				var url = 'https://' + options.hostname + options.path;
				console.log(url);
				request.post(url,options, (error, response, body) => {
					if(error){
						reject( Error(error) );
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
		
		//console.log(token)
		return new Promise(function(resolve, reject){
			
			var options = {
				method: 'POST',
				hostname: 'authentication-dot-fabi-personel-testing.appspot.com',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'authorization': token,
					'client_id': 'null',
					'client_secret': 'null'
				},
				form: {}
			};
			
			try{
				options.path = '/authenticateSuperUser';
				var url = 'https://' + options.hostname + options.path;
				
				request.post(url,options, (error, response, body) => {
					if(error){
						reject( Error(error) );
					}else{
						resolve(response.body);
					}
				})
				
			}catch(err){
				reject( Error(err) );
			}
			
		})
		
	},
	
	loginStaff: function(loginData){
		
		return new Promise(function(resolve, reject){
			var input = {
				grant_type: 'password',
				client_id: 'null',
				client_secret: 'null',
				username: loginData.email,
				password: loginData.password
			};
			
			var options = {
				method: 'POST',
				hostname: 'authentication-dot-fabi-personel-testing.appspot.com',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				form: input
			};
			
			try{
				options.path = '/loginStaff';
				var url = 'https://' + options.hostname + options.path;
				console.log(url);
				request.post(url,options, (error, response, body) => {
					if(error){
						reject( Error(error) );
					}else{
						resolve(response.body);
					}
				})
				
			}catch(err){
				reject( Error(err) );
			}
			
		})
		
	},
	authStaff: function(token){
		
		return new Promise(function(resolve, reject){
			
			var options = {
				method: 'POST',
				hostname: 'authentication-dot-fabi-personel-testing.appspot.com',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'authorization': token,
					'client_id': 'null',
					'client_secret': 'null'
				},
				form: {}
			};
			
			try{
				options.path = '/authenticateStaff';
				var url = 'https://' + options.hostname + options.path;
				
				request.post(url,options, (error, response, body) => {
					if(error){
						reject( Error(error) );
					}else{
						resolve(response.body);
					}
				})
				
			}catch(err){
				reject( Error(err) );
			}
			
		})
		
	},
	
	loginClinicAdmin: function(loginData){
		
		return new Promise(function(resolve, reject){
			var input = {
				grant_type: 'password',
				client_id: 'null',
				client_secret: 'null',
				username: loginData.email,
				password: loginData.password
			};
			
			var options = {
				method: 'POST',
				hostname: 'authentication-dot-fabi-personel-testing.appspot.com',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				form: input
			};
			
			try{
				options.path = '/loginClinicAdmin';
				var url = 'https://' + options.hostname + options.path;
				console.log(url);
				request.post(url,options, (error, response, body) => {
					if(error){
						reject( Error(error) );
					}else{
						resolve(response.body);
					}
				})
				
			}catch(err){
				reject( Error(err) );
			}
			
		})
		
	},
	authClinicAdmin: function(token){
		
		return new Promise(function(resolve, reject){
			
			var options = {
				method: 'POST',
				hostname: 'authentication-dot-fabi-personel-testing.appspot.com',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'authorization': token,
					'client_id': 'null',
					'client_secret': 'null'
				},
				form: {}
			};
			
			try{
				options.path = '/authenticateClinicAdmin';
				var url = 'https://' + options.hostname + options.path;
				
				request.post(url,options, (error, response, body) => {
					if(error){
						reject( Error(error) );
					}else{
						resolve(response.body);
					}
				})
				
			}catch(err){
				reject( Error(err) );
			}
			
		})
		
	},
	
	loginCCAdmin: function(loginData){
		
		return new Promise(function(resolve, reject){
			var input = {
				grant_type: 'password',
				client_id: 'null',
				client_secret: 'null',
				username: loginData.email,
				password: loginData.password
			};
			
			var options = {
				method: 'POST',
				hostname: 'authentication-dot-fabi-personel-testing.appspot.com',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				form: input
			};
			
			try{
				options.path = '/loginCultureAdmin';
				var url = 'https://' + options.hostname + options.path;
				console.log(url);
				request.post(url,options, (error, response, body) => {
					if(error){
						reject( Error(error) );
					}else{
						resolve(response.body);
					}
				})
				
			}catch(err){
				reject( Error(err) );
			}
			
		})
		
	},
	authCCAdmin: function(token){
		
		return new Promise(function(resolve, reject){
			
			var options = {
				method: 'POST',
				hostname: 'authentication-dot-fabi-personel-testing.appspot.com',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'authorization': token,
					'client_id': 'null',
					'client_secret': 'null'
				},
				form: {}
			};
			
			try{
				options.path = '/authenticateCultureAdmin';
				var url = 'https://' + options.hostname + options.path;
				
				request.post(url,options, (error, response, body) => {
					if(error){
						reject( Error(error) );
					}else{
						resolve(response.body);
					}
				})
				
			}catch(err){
				reject( Error(err) );
			}
			
		})
		
	},
	
	loginOrgAdmin: function(loginData){
		
		return new Promise(function(resolve, reject){
			var input = {
				grant_type: 'password',
				client_id: 'null',
				client_secret: 'null',
				username: loginData.email,
				password: loginData.password
			};
			
			var options = {
				method: 'POST',
				hostname: 'authentication-dot-fabi-personel-testing.appspot.com',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				form: input
			};
			
			try{
				options.path = '/loginOrganizationAdmin';
				var url = 'https://' + options.hostname + options.path;
				console.log(url);
				request.post(url,options, (error, response, body) => {
					if(error){
						reject( Error(error) );
					}else{
						resolve(response.body);
					}
				})
				
			}catch(err){
				reject( Error(err) );
			}
			
		})
		
	},
	authOrgAdmin: function(token){
		
		return new Promise(function(resolve, reject){
			
			var options = {
				method: 'POST',
				hostname: 'authentication-dot-fabi-personel-testing.appspot.com',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'authorization': token,
					'client_id': 'null',
					'client_secret': 'null'
				},
				form: {}
			};
			
			try{
				options.path = '/authenticateOrganizationAdmin';
				var url = 'https://' + options.hostname + options.path;
				
				request.post(url,options, (error, response, body) => {
					if(error){
						reject( Error(error) );
					}else{
						resolve(response.body);
					}
				})
				
			}catch(err){
				reject( Error(err) );
			}
			
		})
		
	},
	
	loginOrgMember: function(loginData){
		
		return new Promise(function(resolve, reject){
			var input = {
				grant_type: 'password',
				client_id: 'null',
				client_secret: 'null',
				username: loginData.email,
				password: loginData.password
			};
			
			var options = {
				method: 'POST',
				hostname: 'authentication-dot-fabi-personel-testing.appspot.com',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				form: input
			};
			
			try{
				options.path = '/loginOrganizationMember';
				var url = 'https://' + options.hostname + options.path;
				console.log(url);
				request.post(url,options, (error, response, body) => {
					if(error){
						reject( Error(error) );
					}else{
						resolve(response.body);
					}
				})
				
			}catch(err){
				reject( Error(err) );
			}
			
		})
		
	},
	authOrgMember: function(token){
		
		return new Promise(function(resolve, reject){
			
			var options = {
				method: 'POST',
				hostname: 'authentication-dot-fabi-personel-testing.appspot.com',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'authorization': token,
					'client_id': 'null',
					'client_secret': 'null'
				},
				form: {}
			};
			
			try{
				options.path = '/authenticateOrganizationMember';
				var url = 'https://' + options.hostname + options.path;
				
				request.post(url,options, (error, response, body) => {
					if(error){
						reject( Error(error) );
					}else{
						resolve(response.body);
					}
				})
				
			}catch(err){
				reject( Error(err) );
			}
			
		})
		
	}
	
}
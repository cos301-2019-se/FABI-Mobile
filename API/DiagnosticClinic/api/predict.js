const request = require('request');
const config = require('./config')

module.exports = function(formData){
	
	return new Promise(function(resolve, reject){
		var input = {
			Location: formData.Location,
			Province: formData.Province,
			Genus: formData.Genus,
			Species: formData.Species,
			SampleType: formData.SampleType,
			Asym_Dis: formData.Asym_Dis,
			NurseryField: formData.NurseryField,
			Roots: formData.Roots,
			'Root-Collar': formData['Root-Collar'],
			Stem: formData.Stem,
			GrowthTip: formData.GrowthTip,
			'Needles-Leaves': formData['Needles-Leaves']
		}
		
		var options = {
				method: 'POST',
				hostname: 'dtree-dot-fabi-dev.appspot.com',
				headers: {
				  'Content-Type': 'application/json'
				},
				body : input,
				json : true
			};
		
		try{
			options.path = '/predict';
			request.post(config.prediction, options, (error, response, body) => {
				if(error){
					console.log(error)
				}else{
					//prediction if possible
					//console.log(response)
					resolve(response.body)
				}
			})
				
		}catch(err){
			reject(Error(err));		
		}	
	})
	
	
}
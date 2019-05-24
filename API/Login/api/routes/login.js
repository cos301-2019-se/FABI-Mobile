const http = require('http');
const request = require('request');

request.post('/', loginUser);

function loginUser()
{
    var options = {
        method: 'POST',
        hostname: 'user-management-dot-api-fabi.appspot.com',
        path: '/createOrganization',
        headers: {
        'Content-Type' : 'application/json'
        },
        body : '{JSON : hello}', 
        json : 'true'
    };

    var request = http.request(options, (res, err, body)=>{

    });
}

module.exports = request;
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const admin = require('firebase-admin');

const db = admin.firestore();

module.exports.getClient = function(clientID, clientSecret, callback){
    console.log("getCLient");
	
    const client = {
        clientID,
        clientSecret,
        grants: null,
        redirectUris: null
    }

    callback(false, client);
}

module.exports.grantTypeAllowed = function(clientEmail, grantType, callback) {
    console.log("GrantTypeAllowed");
	
    callback(false, true);
}

module.exports.getUser = function(username, password, callback){
    console.log("getUser");
	var user = username.split(",");
	
	var docOrgRef  = db.collection('Organizations').doc(user[1]);
	docOrgRef.get().then(doc => {
		if(docOrgRef.Empty){
            callback(false, null);
        }
	}).catch(error => callback(error));
	
    var docRef  = db.collection('Organizations').doc(user[1]).collection('Members').where('email', '==', user[0]);
    docRef.get().then(doc => {
        if(docRef.Empty){
            callback(false, null);
			
        }else {
            var member;
            doc.forEach(element => {
                member = element.data();
            });
            
            bcrypt.compare(password, member.password, (err, valid) =>
			{
                if(!valid){
                    //callback(false, null);
					throw('Invalid Credentials')
                }else{
                    callback(false, member);
					
                }
            });
        }
    });
}

module.exports.saveAccessToken = function(accessToken, clientID, expires, user, callback){
    console.log("saveAccessToken");
	
    expiry_date = new Date();
    expiry_date.setDate(expiry_date.getDate() + 1);
    qs = {
        userID : user.id,
		clientId: clientID,
        accessToken : accessToken,
        expires_in : expiry_date.getTime()
    }
	console.log(qs);
    var docRef  = db.collection('Authentication').doc('OrganizationMember').collection('Tokens').doc(user.id);
    
    docRef.set(qs).then(() => callback(null)).catch(error => callback(error));
}

module.exports.getAccessToken = function(token, callback) {
    console.log("getAccessToken");
	
    var docRef  = db.collection('Authentication').doc('OrganizationMember').collection('Tokens').where('accessToken','==', token);
    
    docRef.get().then(doc =>
    {
        if(doc.empty) {	
            callback(false, { accessToken: token.accessToken, clientId: null, expires: null, user: null, userId: null });
			
        }else {
            var member;
            doc.forEach(element => {
                member = element.data();
            });
            now = new Date();
            now = now.getTime();
            const accessToken = {
                user: {
                    id: member.userID
                },
                accessTokenExpiresAt: new Date(member.expires_in).toString() ,
                accessToken: member.accessToken
            };
            console.log(accessToken);
            callback(false, { accessToken: token.accessToken, clientId: member.clientId, expires: member.expires_in, user: accessToken.user.id, userId: member.userID });
        }
		
    }).catch(error => {console.log("ERROR: " + error)});

}


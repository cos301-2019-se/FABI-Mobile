const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const admin = require('firebase-admin');

const db = admin.firestore();

/*module.exports = () =>
{
    return {
        getClient: getClient,
        grantTypeAllowed: grantTypeAllowed,
        getUser: getUser,
        saveAccessToken: saveAccessToken,
        getAccessToken: getAccessToken
    }
}*/

module.exports.getClient = function(clientID, clientSecret,callback)
{
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
    /*callback(false ,() => {
            var docRef  = db.collection('Organizations').doc('FABI').collection('Admin').where('email', '==', clientEmail);

            //(3)
            docRef.get().then(doc =>
            {
                if(doc.empty)
                {
                    return false;
                }
                else{
                    //(4)
                    var member;
                    doc.forEach(element => {
                        member = element.data();
                    });
                    
                    if(member.userType === superuser)
                        return true;
                    else
                        return false;
                }  
            }).catch((err) => {
                console.log(err);
                return false
            });
    })*/
    
}

module.exports.getUser = function(username, password, callback){
    console.log("getUser");
    var docRef  = db.collection('Organizations').doc('FABI').collection('Admin').where('email', '==', username);
    docRef.get().then(doc => {
        if(docRef.Empty)
        {
            callback(false, null);
        }
        else
        {
            var member;
            doc.forEach(element => {
                member = element.data();
            });
            
            bcrypt.compare(password, member.password, (err, valid) =>
            {
                if(!valid)
                {
                    callback(false, null);
                }
                else
                {
                    callback(false, member);
                }
            })
        }
    })
}

module.exports.saveAccessToken = function(accessToken, clientID, expires, user, callback)
{
    console.log("saveAccessToken");
    expiry_date = new Date();
    expiry_date.setDate(expiry_date.getDate() + 1);
    qs = {
        userID : user.id,
        accessToken : accessToken,
        expires : expiry_date.getTime().toString()
    }
    var docRef  = db.collection('Authentication').doc('SuperUser').collection('Tokens').doc(user.id);
        
        //(4)
    docRef.set(qs).then(() => callback(null)).catch(error => callback(error));
}

module.exports.getAccessToken = function(bearerToken, callback) 
{
    console.log("getAccessToken");
    var docRef  = db.collection('Authentication').doc('SuperUser').collection('Tokens').where('accessToken','==', bearerToken);
    
    docRef.get().then(doc =>
    {
        if(doc.empty)
        {
            callback(false, null);
        }
        else
        {
            var member;
            doc.forEach(element => {
                member = element.data();
                console.log(member);
            });

            const accessToken = {
                user: {
                    id: member.userID
                },
                accessTokenExpiresAt: member.expires,
                accessToken: member.accessToken
            };
            
            callback(false, accessToken);
        }
    }).catch(error => {console.log("ERROR: " + error)});

}

/*function createAccessTokenFrom(userID)
{
    return Promise.resolve({
        user: {
            id : userID
        },
        expires: null
    })
}*/

# FABI WEB APP

The FABI Web App will provide services for:
* Authenticate a Public User
* Add a Public User
* Submit a Sample Form
* Get Logs

---

##### API URL:
```
https://fabi-web-app.herokuapp.com/
```
---
### Public User Authentication 
###### Request:
```javascript
expectedData = {
    email : string,
    password : string
}

options = {
    path : "/authenticatePublicUser",
    method : "POST",
    headers : {
        'Cache-Control': 'no-cache',
        "Content-Type" : "application/json",
        "Content-Length" : expectedData.length
    },
    body : expectedData,
    json: true
 }

```
###### Response (Success):
```javascript

status : 200
headers : {
    "Content-Type" : "application/json",
    "Content-Language" : "en",
    "Access-Control-Allow-Origin" : "*" 
}

JSON returned:
{
    success: true,
    data : {
        code : 200,
        title : "AUTHORIZED",
        message : "Authenticated",
        content : *JSON RESPONSE DATA*
    }
}

```
###### Response (Error):
```javascript

status : *appropriate http code*
headers : {
    "Content-Type" : "application/problem+json",
    "Content-Language" : "en",
    "Access-Control-Allow-Origin" : "*" 
}

JSON returned:
{
    success : false,
    error : {
        code : *appropriate http code* (eg. 401),
        title : *appropriate http response message* (eg. BAD_REQUEST),
        message : *error message* 
    }
}
```
---

### Add a Public User
###### Request:
```javascript
expectedData = {
    name : string,
    surname : string,
    email : string,
    organisation_id : int
    password : string
}

options = {
    path : "/addPublicUser",
    method : "POST",
    headers : {
        'Cache-Control': 'no-cache',
        "Content-Type" : "application/json",
        "Content-Length" : expectedData.length
    },
    body : expectedData,
    json: true
 }

```
###### Response (Success):
```javascript

status : 200
headers : {
    "Content-Type" : "application/json",
    "Content-Language" : "en",
    "Access-Control-Allow-Origin" : "*" 
}

JSON returned:
{
    success: true,
    data : {
        code : 200,
        title : "SUCCESS",
        message : "Public User Added",
        content : *JSON RESPONSE DATA*
    }
}

```
###### Response (Error):
```javascript

status : *appropriate http code*
headers : {
    "Content-Type" : "application/problem+json",
    "Content-Language" : "en",
    "Access-Control-Allow-Origin" : "*" 
}

JSON returned:
{
    success : false,
    error : {
        code : *appropriate http code* (eg. 401),
        title : *appropriate http response message* (eg. BAD_REQUEST),
        message : *error message* 
    }
}
```
---

### Generate Reference Number
###### Request:
```javascript
expectedData = {
    email : string
    ???
}

options = {
    path : "/generateReferenceNumber",
    method : "POST",
    headers : {
        'Cache-Control': 'no-cache',
        "Content-Type" : "application/json",
        "Content-Length" : expectedData.length
    },
    body : expectedData,
    json: true
 }

```
###### Response (Success):
```javascript

status : 200
headers : {
    "Content-Type" : "application/json",
    "Content-Language" : "en",
    "Access-Control-Allow-Origin" : "*" 
}

JSON returned:
{
    success: true,
    data : {
        code : 200,
        title : "SUCCESS",
        message : "Reference Number Generated",
        content : {
            emailSent: true/false,
            referenceNumber: *reference number*
        }
    }
}

```
###### Response (Error):
```javascript

status : *appropriate http code*
headers : {
    "Content-Type" : "application/problem+json",
    "Content-Language" : "en",
    "Access-Control-Allow-Origin" : "*" 
}

JSON returned:
{
    success : false,
    error : {
        code : *appropriate http code* (eg. 401),
        title : *appropriate http response message* (eg. BAD_REQUEST),
        message : *error message* 
    }
}
```
---

### Submit Sample Form
###### Request:
```javascript
expectedData = {
    formData : json 
}

options = {
    path : "/submitForm",
    method : "POST",
    headers : {
        'Cache-Control': 'no-cache',
        "Content-Type" : "application/json",
        "Content-Length" : expectedData.length
    },
    body : expectedData,
    json: true
 }

```
###### Response (Success):
```javascript

status : 200
headers : {
    "Content-Type" : "application/json",
    "Content-Language" : "en",
    "Access-Control-Allow-Origin" : "*" 
}

JSON returned:
{
    success: true,
    data : {
        code : 200,
        title : "SUCCESS",
        message : "Form Submitted",
        content : {
            emailSent: true/false
            referenceNumber: *reference number*/null
        }
    }
}

```
###### Response (Error):
```javascript

status : *appropriate http code*
headers : {
    "Content-Type" : "application/problem+json",
    "Content-Language" : "en",
    "Access-Control-Allow-Origin" : "*" 
}

JSON returned:
{
    success : false,
    error : {
        code : *appropriate http code* (eg. 401),
        title : *appropriate http response message* (eg. BAD_REQUEST),
        message : *error message* 
    }
}
```
---

### Get Logs
###### Request:
```javascript
expectedData = { 
}

options = {
    path : "/getLogs",
    method : "POST",
    headers : {
        'Cache-Control': 'no-cache',
        // "Content-Type" : "application/json",
        // "Content-Length" : expectedData.length
    },
    // body : expectedData,
    // json: true
 }

```
###### Response (Success):
```javascript

status : 200
headers : {
    "Content-Type" : "application/json",
    "Content-Language" : "en",
    "Access-Control-Allow-Origin" : "*" 
}

JSON returned:
{
    success: true,
    data : {
        code : 200,
        title : "SUCCESS",
        message : "Logs Retrieved",
        content : {
            logs : [
                *Log Objects*
            ]
        }
    }
}

```
###### Response (Error):
```javascript

status : *appropriate http code*
headers : {
    "Content-Type" : "application/problem+json",
    "Content-Language" : "en",
    "Access-Control-Allow-Origin" : "*" 
}

JSON returned:
{
    success : false,
    error : {
        code : *appropriate http code* (eg. 401),
        title : *appropriate http response message* (eg. BAD_REQUEST),
        message : *error message* 
    }
}
```
---
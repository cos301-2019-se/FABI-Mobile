import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { registerContentQuery } from '@angular/core/src/render3';
import { StaticInjector } from '@angular/core/src/di/injector';
import { BehaviorSubject } from 'rxjs';


const getAllOrganizationsURL: string = '***REMOVED***/getAllOrganizations';
const createOrganizationURL: string = '***REMOVED***/createOrganization';
const getOrgDetailsURL: string = '';

const authenticateFABIAdminURL: string = 'https://authentication-dot-api-fabi.appspot.com/loginAdmin';
const authenticateStaffURL: string = 'https://authentication-dot-api-fabi.appspot.com/loginFabiStaff';
const authenticateDataAdminURL: string = 'https://authentication-dot-api-fabi.appspot.com/loginDatabaseAdmin';
const authenticateOrgURL: string = 'https://authentication-dot-api-fabi.appspot.com/loginOrgAdmin';
const authenticateOrgMemberURL: string = 'https://authentication-dot-api-fabi.appspot.com/loginOrgMember';

const addStaffMemberURL: string = '***REMOVED***/addStaff';

const addFABIAdminURL: string = '***REMOVED***/addFabiAdmin';


const portingURL: string = '***REMOVED***/porting';



export interface LoginInfo {
  email: string;
  userType: string,
  organization: string,
  password: string;
}

export interface OrganizationInfo {
  orgName: string,
  location: string
}

export interface OrganizationAdmin {
  name: string,
  surname: string,
  email: string,
  phone: number
}

export interface StaffInfo {
  name: string;
  surname: string,
  email: string,
  phone: number,
  position: string
}


@Injectable({
  providedIn: 'root'
})
export class AdminAPIService {

  private APItoken : string;
  loggedIn: boolean = false; 

  constructor(private http: HttpClient) { }

  setToken(token: string)
  {
    this.APItoken = token;
  }

  setLoggedin()
  {
    this.loggedIn = true;
  }

  isLoggedIn()
  {
    return this.loggedIn;
  }


  getAllOrganizations() {

    const options = {
      method: 'POST',
      url: getAllOrganizationsURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      json: true
    };

    return this.http.request('POST', getAllOrganizationsURL, options);
    
  }


  getAllUserTypes() {

    // const options = {
    //   method: 'POST',
    //   url: getAllOrganizationsURL,
    //   headers: {
    //     'cache-control': 'no-cache',
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   },
    //   json: true
    // };

    // return this.http.request('POST', getAllOrganizationsURL, options);
    
  }


  login(details: LoginInfo) {
  
    if(details.organization == "FABI")
    {
      if(details.userType == "Admin")
      {
        return this.authenticateFABIAdmin(details);
      }
      else if(details.userType == "Database Admin")
      {
        return this.authenticateDataAdmin(details);
      }
      else{
        return this.authenticateFABIStaff(details);
      }
    }

    if(details.organization != "FABI")
    {
      if(details.userType == "Admin")
      {
        return this.authenticateOrgAdmin(details);
      }
      else if(details.userType == "Member")
      {
        return this.authenticateOrgMember(details);
      }
    }

  }

  authenticateFABIAdmin(details: LoginInfo) 
  {
    const postData = details;

    const options = {
      method: 'POST',
      url: authenticateFABIAdminURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request('POST', authenticateFABIAdminURL, options);
  }

  authenticateFABIStaff(details: LoginInfo) 
  {
    const postData = details;

    const options = {
      method: 'POST',
      url: authenticateStaffURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request('POST', authenticateStaffURL, options);
  }
  

  authenticateDataAdmin(details: LoginInfo) 
  {
    const postData = details;

    const options = {
      method: 'POST',
      url: authenticateDataAdminURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request('POST', authenticateDataAdminURL, options);
  }

  authenticateOrgAdmin(details: LoginInfo) 
  {
    const postData = {
      "email": details.email,
      "password": details.password,
      "orgName":details.organization
    }

    const options = {
      method: 'POST',
      url: authenticateOrgURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request('POST', authenticateOrgURL, options);
  }

  authenticateOrgMember(details: LoginInfo) 
  {
    const postData = {
      "email": details.email,
      "password": details.password,
      "orgName":details.organization
    }

    const options = {
      method: 'POST',
      url: authenticateOrgMemberURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request('POST', authenticateOrgMemberURL, options);
  }

  porting(jsonObject: Object)
  {
    const postData = {
      "databaseName": "Testing_Third_Api_Call",
      "data":jsonObject
    };

    const options = {
      method: 'POST',
      url: portingURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request('POST', portingURL, options);
  }

  createOrganization(orgInfo: OrganizationInfo, adminInfo: OrganizationAdmin)
  {
    const postData = {
      "orgName": orgInfo.orgName,
      "admin": adminInfo
    }

    const options = {
      method: 'POST',
      url: createOrganizationURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request('POST', createOrganizationURL, options);
  }

  addStaffMember(staffInfo: StaffInfo)
  {
    if(staffInfo.position == "Admin")
    {
      return this.addFABIAdmin(staffInfo);

    } else {
      const postData = {
        "staff": staffInfo
      }
  
      const options = {
        method: 'POST',
        url: addStaffMemberURL,
        headers: {
          'cache-control': 'no-cache',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin":"*",
          'Accept': 'application/json'
        },
        body:postData,
        json: true
      };
  
      return this.http.request('POST', addStaffMemberURL, options);
    }
   
  }

  addFABIAdmin(staffInfo: StaffInfo)
  {
    const postData = {
      "admin": staffInfo
    }

    const options = {
      method: 'POST',
      url: addFABIAdminURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request('POST', addFABIAdminURL, options);
  }








}

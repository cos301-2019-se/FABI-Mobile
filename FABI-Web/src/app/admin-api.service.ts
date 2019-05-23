import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { registerContentQuery } from '@angular/core/src/render3';
import { StaticInjector } from '@angular/core/src/di/injector';
import { BehaviorSubject } from 'rxjs';


const getAllOrganizationsURL: string = '***REMOVED***/getAllOrganizations';

const authenticateFABIAdminURL: string = 'https://authentication-dot-api-fabi.appspot.com/loginAdmin';
const authenticateStaffURL: string = 'https://authentication-dot-api-fabi.appspot.com/loginFabiStaff';
const authenticateDataAdminURL: string = 'https://authentication-dot-api-fabi.appspot.com/loginDatabaseAdmin';
const authenticateOrgURL: string = 'https://authentication-dot-api-fabi.appspot.com/loginOrgAdmin';
const authenticateOrgMemberURL: string = 'https://authentication-dot-api-fabi.appspot.com/loginOrgMember';

const createOrganizationURL: string = '';
const getOrgDetailsURL: string = '';



export interface LoginInfo {
  email: string;
  userType: string,
  organization: string,
  password: string;
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
    console.log("----- HERE -----");
    const postData = details;

    const options = {
      method: 'POST',
      url: authenticateFABIAdminURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
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
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request('POST', authenticateDataAdminURL, options);
  }

  authenticateOrgAdmin(details: LoginInfo) 
  {
    const postData = details;

    const options = {
      method: 'POST',
      url: authenticateOrgURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request('POST', authenticateOrgURL, options);
  }

  authenticateOrgMember(details: LoginInfo) 
  {
    const postData = details;

    const options = {
      method: 'POST',
      url: authenticateOrgMemberURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request('POST', authenticateOrgMemberURL, options);
  }






}

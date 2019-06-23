/**
 * File Name: http.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\http.service.ts
 * Project Name: fabi-web
 * Created Date: Thursday, June 20th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Friday, June 21st 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import * as Interface from '../interfaces/interfaces';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private APItoken: string;
  loggedIn: boolean = false;


  constructor(private http: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  setToken(token: string) {
    this.APItoken = token;
  }

  setLoggedin() {
    this.loggedIn = true;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             LOGIN 
  /**
   * Method that sends a request to the API to authenticate a user
   *
   * @private
   * @param {Interface.LoginInfo} details
   * @returns API response @type any
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  login(details: Interface.LoginInfo) {

    let url = ""; // Http Request URL

    // Set API endpoint (URL) based on user type
    if (details.orgName == "FABI") {
      if (details.userType == "Admin") {
        url = 'https://authentication-dot-api-fabi.appspot.com/loginAdmin';
      } else {
        url = 'https://authentication-dot-api-fabi.appspot.com/loginFabiStaff';
      }
    } else {
      if (details.userType == "Admin") {
        url = 'https://authentication-dot-api-fabi.appspot.com/loginOrgAdmin';
      } else {
        url = 'https://authentication-dot-api-fabi.appspot.com/loginOrgMember';
      }
    }

    const method = 'POST';  // Http Request Method

    const postData = details; // Data to send as JSON

    const options = {
      headers: new HttpHeaders({
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
      }),
      body: postData,
      json: true
    };

    return this.http.request<any>(method, url, options);

  }

  getAllOrganizations() {

    const getAllOrganizationsURL = 'https://user-management-dot-api-fabi.appspot.com/getAllOrganizations';
    const method = 'POST';

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      json: true
    };

    return this.http.request<any>(method, getAllOrganizationsURL, options);

  }



  porting(jsonObject: Object) {
    const portingURL = 'https://database-management-dot-api-fabi.appspot.com/porting';
    const method = 'POST';

    const postData = {
      "databaseName": "mpg",
      "data": jsonObject
    };

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
      },
      body: postData,
      json: true
    };

    return this.http.request<any>(method, portingURL, options);
  }


  createOrganization(orgInfo: Interface.Organisation) {
    const createOrganizationURL = 'https://user-management-dot-api-fabi.appspot.com/createOrganization';
    const method = 'POST';

    const postData = orgInfo;

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
      },
      body: postData,
      json: true
    };

    return this.http.request<any>(method, createOrganizationURL, options);
  }

  addStaffMember(staffInfo: Interface.StaffInfo) {
    const addStaffMemberURL = 'https://user-management-dot-api-fabi.appspot.com/addStaff';
    const method = 'POST';

    if (staffInfo.position == "Admin") {
      return this.addFABIAdmin(staffInfo);

    } else {
      const postData = {
        "staff": staffInfo
      }

      const options = {
        headers: {
          'cache-control': 'no-cache',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          'Accept': 'application/json'
        },
        body: postData,
        json: true
      };

      return this.http.request<any>(method, addStaffMemberURL, options);
    }

  }

  addFABIAdmin(staffInfo: Interface.StaffInfo) {
    const addFABIAdminURL = 'https://user-management-dot-api-fabi.appspot.com/addFabiAdmin';
    const method = 'POST';

    const postData = {
      "admin": staffInfo
    }

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
      },
      body: postData,
      json: true
    };

    return this.http.request<any>(method, addFABIAdminURL, options);
  }


  
  addOrgMember(orgInfo: Interface.Organisation, memberInfo: Interface.OrganisationMember) {

    const addMemberURL = 'https://user-management-dot-api-fabi.appspot.com/addMemberToOrg';
    const method = 'POST';
    
    const postData = {
      "orgName": orgInfo.orgName,
      "member": memberInfo
    }

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request(method, addMemberURL, options);
  }


  
  submitSampleForm(orgInfo: Interface.Organisation, formDetails: Interface.ClientFormData)
  {
    const submitSampleURL = 'https://diagnostic-clinic-dot-api-fabi.appspot.com/submitSample';
    const method = 'POST';

    const postData = {
      "orgName": orgInfo.orgName,
      "data": formDetails
    }

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request(method, submitSampleURL, options);
  }

  retrieveAllSamples(orgInfo: Interface.Organisation)
  {
    const retrieveAllOrgSamples = 'https://diagnostic-clinic-dot-api-fabi.appspot.com/retrieveAllOrgSamples';
    const method = 'POST';

    const postData = {
      "orgName": orgInfo.orgName
    }

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        'Accept': 'application/json'
      },
      body:postData,
      json: true
    };

    return this.http.request(method, retrieveAllOrgSamples, options);
  }


}

/**
 * File Name: http.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\http.service.ts
 * Project Name: fabi-web
 * Created Date: Thursday, June 20th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, June 26th 2019
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

  private APItoken: string; // API token   ** TO BE STORED IN LOCALSTORAGE **
  loggedIn: boolean = false;  // To chedck if the current user is logged in


  constructor(private http: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  setSessionVariables(token: string, orgName: string, userType: string) {
    
    localStorage.setItem('token', token);
    localStorage.setItem('orgName', orgName);
    localStorage.setItem('userType', userType);

  }

  isLoggedIn() {
    
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == "")
      return false;
    // Ask API if token is valid
    return true;
    
    
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

    let method = 'POST';  // Http Request Method

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


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET ALL ORGANISATIONS 
  /**
   * Method that sends a request to the API to get the details of all the organisations.
   *
   * @returns API response
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllOrganizations() {

    const getAllOrganizationsURL = 'https://user-management-dot-api-fabi.appspot.com/getAllOrganizations';
    const method = 'POST';

    const options = {
      headers: new HttpHeaders({
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
      }),
      json: true
    };

    return this.http.request<any>("POST", 'https://user-management-dot-api-fabi.appspot.com/getAllOrganizations', options);

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET ALL USER TYPES 
  /**
   * Method that sends a request to the API to get the user types associated with a specific organisation.
   *
   * @returns API response
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getUserTypes(orgName: string) {

    const getUserTypesURL = '';
    const method = 'POST';

    const postData = {
      "orgName": orgName
    }

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: postData,
      json: true
    };

    return this.http.request<any>('POST', 'https://login-dot-api-fabi.appspot.com/getUserTypes', options);

  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          PORTING
  /**
   * Method thats sends a request to the API to port a CSV file to a Database 
   *
   * @param {Object} jsonObject
   * @returns API response 
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  porting(jsonObject: Object) {
    const portingURL = 'https://database-management-dot-api-fabi.appspot.com/porting';
    const method = 'POST';

    const postData = {
      "databaseName": "26June_DB_Test",
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

    return this.http.request<any>('POST', 'https://database-management-dot-api-fabi.appspot.com/porting', options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                   CREATE/ADD NEW ORGANISATION
  /**
   * Method that sends a request to the API to create a new Organisation 
   *
   * @param {Interface.Organisation} orgInfo
   * @returns
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  createOrganization(orgInfo: Interface.Organisation) {
    let createOrganizationURL = 'https://user-management-dot-api-fabi.appspot.com/createOrganization';
    let method = 'POST';

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

  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     REMOVE AN ORGANISATION
  /**
   * Method that sends a request to the API to remove (deregister) an Organisation
   *
   * @param {Interface.Organisation} orgInfo
   * @returns
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeOrganization(orgInfo: Interface.Organisation) {

    let removeOrganizationURL = 'https://user-management-dot-api-fabi.appspot.com/removeOrg';
    let method = 'POST';

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

    return this.http.request<any>(method, removeOrganizationURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    ADD NEW FABI STAFF MEMBER
  /**
   * Method that sends a request to the API to add a new FABI Staff Member to the database
   *
   * @param {Interface.StaffInfo} staffInfo
   * @returns
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addStaffMember(staffInfo: Interface.StaffInfo) {

    if(staffInfo.position == "Admin")
      return this.addFABIAdmin(staffInfo);

    let addStaffMemberURL = 'https://user-management-dot-api-fabi.appspot.com/addStaff';
    let method = 'POST';

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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    REMOVE FABI STAFF MEMBER 
  /**
   * Method that sends a request to the API to remove a FABI Staff Member
   *
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeFABIStaffMember(staffInfo: Interface.StaffInfo) {
   
    let removeStaffMemberURL = 'https://user-management-dot-api-fabi.appspot.com/removeStaff';
    let method = 'POST';

    const postData = staffInfo;

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

      return this.http.request<any>(method, removeStaffMemberURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET ALL FABI STAFF 
  /**
   * Method that sends a request to the API to get all FABI Staff Members
   *
   * @returns
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllStaffMembers() {

    let getStaffMembersURL = 'https://user-management-dot-api-fabi.appspot.com/getAllStaff';
    let method = 'POST';

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
      },
      json: true
    };

      return this.http.request<any>(method, getStaffMembersURL, options);

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      ADD NEW FABI ADMIN
  /**
   * Method that send a request to the API to add a new FABI Admin to the database
   *
   * @param {Interface.StaffInfo} staffInfo
   * @returns
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addFABIAdmin(staffInfo: Interface.StaffInfo) {
    let addFABIAdminURL = 'https://user-management-dot-api-fabi.appspot.com/addFabiAdmin';
    let method = 'POST';

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


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  ADD A NEW ORGANISATION MEMBER
  /**
   * Method that sends a request to the API to add a new Member to a specific Organisation
   *
   * @param {Interface.Organisation} orgInfo
   * @param {Interface.OrganisationMember} memberInfo
   * @returns
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addOrgMember(orgInfo: Interface.Organisation, memberInfo: Interface.OrganisationMember) {

    let addMemberURL = 'https://user-management-dot-api-fabi.appspot.com/addMemberToOrg';
    let method = 'POST';
    
    console.log("orgName: " + orgInfo.orgName);
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

    return this.http.request<any>(method, addMemberURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    REMOVE ORGANIZATION MEMBER
  /**
   * Method that sends a request to the API to remove an Organizations Member
   *
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeOrganizationMember(memberInfo: Interface.OrganisationMember) {
   
    let removeMemberURL = 'https://user-management-dot-api-fabi.appspot.com/removeMember';
    let method = 'POST';

    const postData = {
      "orgName": localStorage.getItem('orgName'),
      "email": memberInfo.email
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

      return this.http.request<any>(method, removeMemberURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    SUBMIT SAMPLE FORM
  /**
   * Method that send a request to the API to submit a specifc Sample Form
   *
   * @param {Interface.Organisation} orgInfo
   * @param {Interface.ClientFormData} formDetails
   * @returns
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitSampleForm(orgInfo: Interface.Organisation, formDetails: Interface.ClientFormData)
  {
    let submitSampleURL = 'https://diagnostic-clinic-dot-api-fabi.appspot.com/submitSample';
    let method = 'POST';

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

    return this.http.request<any>(method, submitSampleURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    RETREIVE ALL SAMPLES
  /**
   * Method that sends a request to the API to retreive all Samples
   *
   * @param {Interface.Organisation} orgInfo
   * @returns
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  retrieveAllSamples(orgInfo: Interface.Organisation) {
    let retrieveAllOrgSamples = 'https://diagnostic-clinic-dot-api-fabi.appspot.com/retrieveAllOrgSamples';
    let method = 'POST';

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

    return this.http.request<any>(method, retrieveAllOrgSamples, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET ORGANIZATION
  /**
   * Function that send a request to retrieve an Organisations' details using their ID
   *
   * @returns
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getOrganizationDetails() {
    
    let getOrganizationDetails = 'https://user-management-dot-api-fabi.appspot.com/getOrgDetails';
    let method = 'POST';

    const postData = {
      "ID": localStorage.getItem('ID')
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

    return this.http.request<any>(method, getOrganizationDetails, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET ORGANIZATION MEMBER
  /**
   * Function that send a request to retrieve an Organisations Member's details using their ID
   *
   * @returns
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getOrganizationMemberDetails() {
    
    let getOrganizationMemberDetails = 'https://user-management-dot-api-fabi.appspot.com/getOrgMember';
    let method = 'POST';

    const postData = {
      "orgName": localStorage.getItem('orgName')
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

    return this.http.request<any>(method, getOrganizationMemberDetails, options);
  }



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET ALL ORGANISATION MEMBERS
  /**
   * Method that sends a request to the API to get the details of all the organisations' members.
   *
   * @returns API response
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllOrganizationMembers() {

    let getAllOrganizationsMembersURL = 'https://user-management-dot-api-fabi.appspot.com/getAllOrgMembers';
    let method = 'POST';

    console.log("orgName: " + localStorage.getItem('orgName'));
    const postData = {
      "orgName": localStorage.getItem('orgName')
    }

    console.log("postData: " + postData);

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: postData,
      json: true
    };

    return this.http.request<any>(method, getAllOrganizationsMembersURL, options);

  }

}

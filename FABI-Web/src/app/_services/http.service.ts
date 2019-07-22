/**
 * File Name: http.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\http.service.ts
 * Project Name: fabi-web
 * Created Date: Thursday, June 20th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Friday, July 19th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import * as Interface from '../_interfaces/interfaces';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';

import { OrganisationAdmin } from "../_interfaces/interfaces";
import { StickyDirection } from '@angular/cdk/table';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  //////////////////////////// AUTHENTICATION SERVICE VARIABLES /////////////////////////// 
  private currentUser: any;
  private currentSessionSubject: BehaviorSubject<any>;
  public currentSession: Observable<any>;


  constructor(private http: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.currentSessionSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('sessionDetails')));
    this.currentSession = this.currentSessionSubject.asObservable();
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       SET SESSION VARIABLES 
  /**
   *
   *
   * @param {string} tokenDetails
   * @param {*} user
   * @param {string} org
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  setSessionVariables(tokenDetails: string, user: any, org: string) {

    let usersDetails = {
      'ID': user.id,
      'organisation': org,
      'email': user.email,
      'permission': user.userType,
      //REMOVE ASAP:
      'databases': user.databases
    }

    let sess = {
      'token': tokenDetails,
      'user': usersDetails
    }

    localStorage.setItem('sessionDetails', JSON.stringify(sess));
    this.currentSessionSubject.next(sess);
  }

  public get currentSessionValue(): any {
    return this.currentSessionSubject.value;
  }

  public get currentUserValue(): any {
    return this.currentUser;
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

    let url = "https://login-dot-api-fabi.appspot.com/login"; // Http Request URL
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

    return this.http.request<any>(method, url, options).pipe(map(response => {

      if (response && (response.token && response.token != '')) {
        console.log("---- RESPONSE: " + JSON.stringify(response));
        this.setSessionVariables(response.token, response.userDetails, details.orgName);
        this.currentUser = response.userDetails;
      }
      return response;
    }));

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
        // 'Authorization': `Bearer ${this.currentSessionValue.token}`
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
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.currentSessionValue.token}`
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
  porting(dbname: String, jsonObject: Object) {
    const portingURL = 'https://database-management-dot-api-fabi.appspot.com/porting';
    const method = 'POST';

    const postData = {
      "databaseName": dbname,
      "data": jsonObject
    };

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.currentSessionValue.token}`
      },
      body: postData,
      json: true
    };

    return this.http.request<any>('POST', 'https://database-management-dot-api-fabi.appspot.com/porting', options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         REVERSE PORTING
  /**
   * Method thats sends a request to the API to get data from the database to create a .csv file 
   *
   * @param {String} databaseName
   * @returns API response 
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  reversePorting(databaseName: String) {
    const portingURL = 'https://database-management-dot-api-fabi.appspot.com/retrieveDatabase';
    const method = 'POST';

    const postData = {
      "databaseName": databaseName,
    };

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${this.currentSessionValue.token}`
      },
      body: postData,
      json: true
    };

    return this.http.request<any>('POST', 'https://database-management-dot-api-fabi.appspot.com/retrieveDatabase', options);
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
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.currentSessionValue.token}`
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
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.currentSessionValue.token}`
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

    if (staffInfo.position == "Admin")
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
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.currentSessionValue.token}`
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
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.currentSessionValue.token}`
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
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.currentSessionValue.token}`
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
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.currentSessionValue.token}`
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
      "member": memberInfo,
      "userType": "Member"
    }

    console.log("//// POST: " + JSON.stringify(postData));

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.currentSessionValue.token}`
      },
      body: postData,
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
      "orgName": this.currentSessionValue.user.organisation,
      "id": memberInfo.ID
    }

    console.log("//// POST: " + JSON.stringify(postData))

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.currentSessionValue.token}`
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
  submitSampleForm(orgInfo: Interface.Organisation, formDetails: Interface.ClientFormData) {
    let submitSampleURL = 'https://diagnostic-clinic-dot-api-fabi.appspot.com/submitSample';
    let method = 'POST';

    const postData = {
      "orgName": this.currentSessionValue.user.organisation,
      "userID": this.currentSessionValue.user.ID,
      "data": formDetails
    }

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.currentSessionValue.token}`
      },
      body: postData,
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
  retrieveAllSamples() {
    let retrieveAllOrgSamples = 'https://diagnostic-clinic-dot-api-fabi.appspot.com/retrieveAllOrgSamples';
    let method = 'POST';

    const postData = {
      "orgName": this.currentSessionValue.user.organisation
    }

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.currentSessionValue.token}`
      },
      body: postData,
      json: true
    };

    return this.http.request<any>(method, retrieveAllOrgSamples, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    RETREIVE ALL SAMPLES FOR MEMBER
  /**
   * Method that sends a request to the API to retreive all Samples for a member
   *
   * @param {Interface.Organisation} orgInfo
   * @returns
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  retrieveMemberSamples() {
    let retrieveAllMemberSamples = 'https://diagnostic-clinic-dot-api-fabi.appspot.com/retrieveSamplesForMember';
    let method = 'POST';

    const postData = {
      "userID": this.currentSessionValue.user.ID
    }

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.currentSessionValue.token}`
      },
      body: postData,
      json: true
    };

    return this.http.request<any>(method, retrieveAllMemberSamples, options);
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
      // "ID": localStorage.getItem('ID')
      "orgName": this.currentSessionValue.user.organisation

    }

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.currentSessionValue.token}`
      },
      body: postData,
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
      "orgName": this.currentSessionValue.user.organisation
    }

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.currentSessionValue.token}`
      },
      body: postData,
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

    const postData = {
      "orgName": this.currentSessionValue.user.organisation
    }

    console.log("postData: " + postData);

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.currentSessionValue.token}`
      },
      body: postData,
      json: true
    };

    return this.http.request<any>(method, getAllOrganizationsMembersURL, options);

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          RETRIEVE DATABASE 
  /**
   * Method that sends a request to the API to get the database's data.
   *
   * @param {string} database
   * @returns
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  retrieveDatabase(database: string) {

      let retrieveDatabaseURL = 'https://database-management-dot-api-fabi.appspot.com/retrieveDatabase';
      let method = 'POST';

      const postData = {
        "databaseName": database
      }

      const options = {
        headers: {
          'cache-control': 'no-cache',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.currentSessionValue.token}`
        },
        body: postData,
        json: true
      };

      return this.http.request<any>(method, retrieveDatabaseURL, options);

    }

}
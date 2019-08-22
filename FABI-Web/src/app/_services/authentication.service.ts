/**
 * File Name: http.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\http.service.ts
 * Project Name: fabi-web
 * Created Date: Thursday, June 20th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 22nd 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Interface from '../_interfaces/interfaces';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { config } from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////// AUTHENTICATION SERVICE VARIABLES ///////////////////////////////////////////////////// 
  
  /** The user that is currently logged into the system - @type {Interface.UserPrivileges} */
  private currentUser: Interface.UserPrivileges;
  /** The current session subject based on the current user - @type {BehaviorSubject<any>} */
  private currentSessionSubject: BehaviorSubject<any>;
  /** The current session based on the current user - @type {Observable<any>} */
  public currentSession: Observable<any>;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of AuthenticationService.
   * 
   * @param {HttpClient} http This is used to make calls to the remote API
   * 
   * @memberof AuthenticationService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private http: HttpClient) {
    //Setting the current session subject based on the user logged in
    this.currentSessionSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('sessionDetails')));
    //Setting the current session base don the user logged in
    this.currentSession = this.currentSessionSubject.asObservable();
    //Setting the current user
    this.currentUser = {databases: []};
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       SET SESSION VARIABLES 
  /** 
   * This function is used to set all the session information and other details pertaining to a user when that user
   * logs onto the system.
   * 
   * @param {string} tokenDetails The token details associated with the login
   * @param {*} user The user that has logged in
   * @param {string} org The organization that the user belongs to
   * 
   * @memberof AuthenticationService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  setSessionVariables(tokenDetails: string, user: any, org: string) {
    let usersDetails = {
      'ID': user.id,
      'organisation': org,
      'name' : user.fname,
      'surname': user.surname,
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
    localStorage.setItem('loggedIn', JSON.stringify(true));
    this.currentSessionSubject.next(sess);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       UPDATE SESSION VARIABLES 
  /** 
   * This function is used to update all the session information and other details pertaining to a user when that user
   * logs onto the system.
   * 
   * @param {any} user The user that has logged in whose details need to be updated
   * 
   * @memberof AuthenticationService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  updateSessionVariables(user: any) {
    let usersDetails = {
      'ID': user.id,
      'organisation': this.getCurrentSessionValue.user.organisation,
      'name' : user.fname,
      'surname': user.surname,
      'email': user.email,
      'permission': user.userType,
    }

    let sess = {
      'token': this.getCurrentSessionValue.token,
      'user': usersDetails
    }

    localStorage.setItem('sessionDetails', JSON.stringify(sess));
    this.currentSessionSubject.next(sess);
  }

  public get getCurrentSessionValue(): any {
    return this.currentSessionSubject.value;
  }

  public get getCurrentUserValue(): any {
    return this.currentUser;
  }


  public get isLoggedIn(): any {
    if(localStorage.getItem('loggedIn')) {
      return JSON.parse(localStorage.getItem('loggedIn'));
    }
    return false;
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof AuthenticationService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logoutUser() {
    localStorage.removeItem('sessionDetails');
    localStorage.setItem('loggedIn', JSON.stringify(false));
    this.currentSessionSubject.next(null);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             LOGIN 
  /**
   * Method that sends a request to the API to authenticate a user
   *
   * @param {Interface.LoginInfo} details The details of the user to be logged in
   * @returns API response @type any
   * 
   * @memberof AuthenticationService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  login(details: Interface.LoginInfo) {
    // Http Request URL
    let url = `${config.loginURL}/login`;
    // Http Request Method
    let method = 'POST'; 

    // Data to send as JSON
    const postData = details;

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
        this.setSessionVariables(response.token, response.userDetails, details.orgName);
        if(response.userDetails.databases) {
          this.currentUser.databases = response.userDetails.databases;
        }
      }
      return response;
    }));

  }

  temporaryLoginSuperUser() {    
    const Lemail = "johnsmith@gmail.com";
    const Lpassw = "johnpassword";
    const Lorg = "FABI";

    // User details to be passed to API
    const details: Interface.LoginInfo = { email: Lemail, password: Lpassw, orgName: Lorg };

    let url = `${config.loginURL}/login`; // Http Request URL
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
        this.setSessionVariables(response.token, response.userDetails, details.orgName);
        if(response.userDetails.databases) {
          this.currentUser.databases = response.userDetails.databases;
        }
      }
      return response;
    }));

  }

  temporaryLoginOrganisation() {
    
    const Lemail = "samjones@gmail.com";
    const Lpassw = "Q61hoZ19v0";
    const Lorg = "Organization1";

    // User details to be passed to API
    const details: Interface.LoginInfo = { email: Lemail, password: Lpassw, orgName: Lorg };

    let url = `${config.loginURL}/login`; // Http Request URL
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
        this.setSessionVariables(response.token, response.userDetails, details.orgName);
        if(response.userDetails.databases) {
          this.currentUser.databases = response.userDetails.databases;
        }
      }
      return response;
    }));

  }

  temporaryLoginOrganisationMember() {
    
    const Lemail = "tomjones@gmail.com";
    const Lpassw = "fmvubzMUfG";
    const Lorg = "Organization1";

    // User details to be passed to API
    const details: Interface.LoginInfo = { email: Lemail, password: Lpassw, orgName: Lorg };

    let url = `${config.loginURL}/login`; // Http Request URL
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
        this.setSessionVariables(response.token, response.userDetails, details.orgName);
        if(response.userDetails.databases) {
          this.currentUser.databases = response.userDetails.databases;
        }
      }
      return response;
    }));

  }

  temporaryLoginStaff() {
    
    const Lemail = "susansmith@gmail.com";
    const Lpassw = "hdAvOrwatA";
    const Lorg = "FABI";

    // User details to be passed to API
    const details: Interface.LoginInfo = { email: Lemail, password: Lpassw, orgName: Lorg };

    // Http Request URL
    let url = `${config.loginURL}/login`;
    // Http Request Method
    let method = 'POST';  

    // Data to send as JSON
    const postData = details; 

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
        this.setSessionVariables(response.token, response.userDetails, details.orgName);
        if(response.userDetails.databases) {
          this.currentUser.databases = response.userDetails.databases;
        }
      }

      return response;
    }));
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     LOAD FABI USER PRIVILEGES 
  /**
   * This function is used to load the privileges associated with the user currently logged in
   * 
   * @memberof AuthenticationService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadFABIUserPrivileges() {
    let getUserDetailsURL = `${config.userManagementURL}/getUserDetails`;
    let method = 'POST';

    const postData = {
      "orgName": this.getCurrentSessionValue.user.organisation,
      "id": this.getCurrentSessionValue.user.ID
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

    this.http.request<any>(method, getUserDetailsURL, options).subscribe((response: any) => {

      console.log("DETAILS: " + JSON.stringify(response));
      if(response && (response.token && response.token != '')) {
        if(response.data.databases) {
          this.currentUser.databases = response.data.databases;
        }
      }
    });    
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     GET FABI USER PRIVILEGES 
  /**
   * This function is used to get the privileges associated with the user currently logged in
   *
   * @returns API response @type any
   * 
   * @memberof AuthenticationService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getFABIUserPrivileges() {
    if(this.getCurrentUserValue == '' || this.getCurrentUserValue == null) {
      this.loadFABIUserPrivileges();
      return this.getCurrentUserValue;
    } 
    else {
      return this.getCurrentUserValue;
    } 
  }
}

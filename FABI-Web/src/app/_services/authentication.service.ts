/**
 * File Name: http.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\http.service.ts
 * Project Name: fabi-web
 * Created Date: Thursday, June 20th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Monday, October 7th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as http from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from "../../environments/environment.prod";
import * as Interface from '../_interfaces/interfaces';

/**
 *  Used to handle all `session and authentication` related matters. Such as making requests to the API for authentication, 
 *  or controlling sessions values. All current users' information is handled here.
 *
 * @export
 * @class AuthenticationService
 */
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
  /** The current session subject - @type {BehaviorSubject<any>} */
  private currentSessionSubject: BehaviorSubject<any>;
  /** The current session details - @type {Observable<any>} */
  public currentSession: Observable<any>;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of AuthenticationService.
   * 
   * @param {http.HttpClient} http for making http calls to the API
   * @memberof AuthenticationService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private http: http.HttpClient) {
    //Setting the current session subject based on the user logged in
    this.currentSessionSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('sessionDetails')));
    //Setting the current session based on the user logged in
    this.currentSession = this.currentSessionSubject.asObservable();
    //Setting the current user
    this.currentUser = { databases: [] };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       SET SESSION VARIABLES 
  /** 
   * This function is used to set all the session information and other details pertaining to a user when that user
   * logs onto the system.
   * 
   * @param {string} tokenDetails the token returned from the server
   * @param {*} user the users information that has loggedin
   * @param {string} org the users organization 
   * 
   * @memberof AuthenticationService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  setSessionVariables(tokenDetails: string, user: any, org: string) {
    let usersDetails = {
      'ID': user.id,
      'organisation': org,
      'name': user.fname,
      'surname': user.surname,
      'email': user.email,
      'permission': user.userType
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
      'name': user.fname,
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


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         CURRENT SESSION VALUE
  /**
   * Get the current sessions values
   *
   * @readonly
   * @type {*}
   * @memberof AuthenticationService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public get getCurrentSessionValue(): any {
    return this.currentSessionSubject.value;
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         CURRENT USER VALUE
  /**
   * Get current users value
   *
   * @readonly
   * @type {*}
   * @memberof AuthenticationService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public get getCurrentUserValue(): any {
    return this.currentUser;
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         LOGGED IN ?
  /**
   * Check if current user is logged in. 
   * 
   * @returns `true` user IS logged in , `false` user NOT logged in
   * @readonly
   * @type {*}
   * @memberof AuthenticationService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public get isLoggedIn(): any {
    if (localStorage.getItem('loggedIn')) {
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
    localStorage.removeItem('pre-diagnosis');
    localStorage.removeItem('sessionDetails');
    localStorage.setItem('loggedIn', JSON.stringify(false));
    this.currentSessionSubject.next(null);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             LOGIN 
  /**
   * Method that sends a request to the API to login a user
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
      headers: new http.HttpHeaders({
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
        if (response.userDetails.databases) {
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
      if (response && (response.token && response.token != '')) {
        if (response.data.databases) {
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
    // if current users value is not set - call loadFABIUserPrivileges() to get the users details
    if (this.getCurrentUserValue == '' || this.getCurrentUserValue == null) {
      this.loadFABIUserPrivileges();
      return this.getCurrentUserValue;
    } // elss return users details
    else {
      return this.getCurrentUserValue;
    }
  }
}

/**
 * File Name: http.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\http.service.ts
 * Project Name: fabi-web
 * Created Date: Thursday, June 20th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 8th 2019
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

  //////////////////////////// AUTHENTICATION SERVICE VARIABLES /////////////////////////// 
  private currentUser: any;
  private currentSessionSubject: BehaviorSubject<any>;
  public currentSession: Observable<any>;


  constructor(private http: HttpClient) {
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
    localStorage.setItem('loggedIn', JSON.stringify(true));
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
   * @private
   * @param {Interface.LoginInfo} details
   * @returns API response @type any
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  login(details: Interface.LoginInfo) {

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
        this.currentUser = response.userDetails;
      }
      return response;
    }));

  }

}

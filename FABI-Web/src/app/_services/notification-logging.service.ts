/**
 * File Name: notification-logging.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services/notification-loggin.service.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, July 16th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Saturday, September 28th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { registerContentQuery } from '@angular/core/src/render3';
import { StaticInjector } from '@angular/core/src/di/injector';
import { BehaviorSubject } from 'rxjs';

import { config } from "../../environments/environment.prod";
import { AuthenticationService } from './authentication.service';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                          GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////// URL'S FOR API //////////////////////////////////////////////////////////////// 
const getAllLogsURL = `${config.logsURL}/getLogs`;
const getUserLogsURL = `${config.logsURL}/getUserLogs`;
const updateUserLogsURL = `${config.logsURL}/deleteUserLogs`;

//Object for defining the JSON object containing the user logs
export interface UserLogs{
    LogID: string;          //The id number of the actucal log
    Type: string;           //The type of the log: USER
    Action: string;         //The action performed: CRUD
    Date: string;           //The date that the action was performed
    Details: string;        //The user on which the action was performed (their ID)
    User: string;           //The user who performed the action (their ID)
    Organization1: string;  //The organization of the user performing the operation
    Organization2: string;  //The organization of the user on which the action was performed
    MoreInfo: string;       //More information (if any)
    ID: number;             //The id of the notification
}

//Object for defining the JSON object containing the database management logs
export interface DatabaseManagementLogs{
    LogID: string;          //The id number of the actucal log
    Type: string;           //The type of the log: DBML (Database Management Log)
    Action: string;         //The action performed: CRUD
    Date: string;           //The date that the action was performed
    Details: string;        //The name of the database that the action was performed on
    User: string;           //The user who performed the action
    Organization1: string;  //The organization of the user performing the operation
    Organization2: string;  //The organization of the user on which the action was performed
    MoreInfo: string;       //More information (if any)
    ID: number ;            //The id of the notification
}

//Object for defining the JSON object containing the access logs
export interface AccessLogs{
    LogID: string;          //The id number of the actucal log
    Type: string;           //The type of the log: ACCL
    Action: string;         //The action performed: ACCESS
    Date: string;           //The date that the action was performed
    Details: string;        //Description of what was accessed
    User: string;           //The user who performed the action (their ID)
    ID: number;             //The id of the notification
}

//Object for defining the JSON object containing the error logs
export interface ErrorLogs{
    LogID: string;          //The id number of the actucal log
    Type: string;           //The type of the log: ERRL
    Date: string;           //The date that the action was performed
    StatusCode: string;     //The status code of the error that occured
    Details: string;        //Description of the error
    User: string;           //The user who performed the action (their ID)
    ID: number;             //The id of the notification
}

//Object for defining the JSON object containing the diagnostic clinic logs
export interface DiagnosticClinicLogs{
    Type: string;           //The type of the log: DGCL
    Date: string;           //The date that the action was performed
    User: string;           //The user who performed the action (their ID)
    ID: number;             //The id of the notification
}

//Object for defining the JSON object for posting log requests
export interface POSTLog{
    Log: Logs;              //The array of logs to post to the API service
}

//Object for defining the JSON object for the logs
export interface Logs{
    type: string;           //The type of the log
    before: string;         //The before date
    after: string;          //The after date
}

//Object for defining the JSON object to be sent when requesting the logs belonging to a member
export interface POSTUser{
    userID: string;         //The ID of the user
}

//Object for defining the JSON object to be sent when updating to logs belonging to a user
export interface POSTUpdate{
    userID: string;         //The ID of the user
    logIDs: string[];       //The logs to be removed from the user's profile
}

@Injectable({
    providedIn: 'root'
})

export class NotificationLoggingService {

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   //                                                          CONSTRUCTOR
   /**
   * Creates an instance of NotificationLoggingService.
   * 
   * @param {HttpClient} http For making calls to the API
   * 
   * @memberof NotificationLoggingService
   */
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   constructor(private http: HttpClient, private authService: AuthenticationService) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       GET ALL USER LOGS
  /**
   *    This function sends a POST request to the API to retrieve a list containing all the logs with type 'USER'
   *
   * @returns API response @type any
   * 
   * @memberof NotificationLoggingService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllUserLogs() {
    var tempLog : Logs = {type: 'USER', before: '', after: ''};
    var data: POSTLog = {Log: tempLog};

    const options = {
        method: 'POST',
        url: getAllLogsURL,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
        },
        body: data,
        json: true
    };

    return this.http.request('POST', getAllLogsURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                 GET ALL DATABASE MANAGEMENT LOGS 
  /**
   *    This function sends a POST request to the API to retrieve a list containing all the logs with type 'DBML'
   *
   * @returns API response @type any
   * 
   * @memberof NotificationLoggingService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllDatabaseManagementLogs() {
    var tempLog : Logs = {type: 'DBML', before: '', after: ''};
    var data: POSTLog = {Log: tempLog};

    const options = {
        method: 'POST',
        url: getAllLogsURL,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
        },
        body: data,
        json: true
    };

    return this.http.request('POST', getAllLogsURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         GET ALL ACCESS LOGS 
  /**
   *    This function sends a POST request to the API to retrieve a list containing all the logs with type 'ACCL'
   *
   * @returns API response @type any
   * 
   * @memberof NotificationLoggingService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllAccessLogs() {
    var tempLog : Logs = {type: 'ACCL', before: '', after: ''};
    var data: POSTLog = {Log: tempLog};

    const options = {
        method: 'POST',
        url: getAllLogsURL,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
        },
        body: data,
        json: true
    };

    return this.http.request('POST', getAllLogsURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GET ALL ERROR LOGS
  /**
   *    This function sends a POST request to the API to retrieve a list containing all the logs with type 'ERRL'
   *
   * @returns API response @type any
   * 
   * @memberof NotificationLoggingService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllErrorLogs() {
    var tempLog : Logs = {type: 'ERRL', before: '', after: ''};
    var data: POSTLog = {Log: tempLog};

    const options = {
        method: 'POST',
        url: getAllLogsURL,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
        },
        body: data,
        json: true
    };

    return this.http.request('POST', getAllLogsURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         GET USER LOGS 
  /**
   *    This function sends a POST request to the API to retrieve a list containing all the logs for a specific user.
   *
   * @param {string} userID The id number of the user whose logs need to be feteched for the notifications.
   * 
   * @returns API response @type any
   * 
   * @memberof NotificationLoggingService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getUserLogs(id: string) {
    var data: POSTUser = {userID: id};

    const options = {
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
        },
        body: data,
        json: true
    };

    return this.http.request('POST', getUserLogsURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    UPDATE FABI MEMBER NOTIFICATIONS
  /**
   * Method that sends a request to the API to update the notifications associated with a specific user.
   * 
   * @param {string} id The ID of the user whose notifications need to be updated
   * @param {string[]} notifications The notifications to be removed from the user's profile
   * 
   * @returns API response @type any
   * 
   * @memberof NotificationLoggingService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  updateFABIMemberNotifications(id: string, notifications: string[]) {
    var postData: POSTUpdate = {userID: id, logIDs: notifications};
    
    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      body: postData,
      json: true
    };

    return this.http.request<any>('POST', updateUserLogsURL, options);
  }
}
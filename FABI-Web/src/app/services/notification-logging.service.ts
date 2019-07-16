/**
 * File Name: notification-logging.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services/notification-loggin.service.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, July 16th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, July 16th 2019
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                          GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Globals variables used to hold the API call urls
const getAllUserAndDatabaseLogs = '';
const getAllDiagnoticClinicLogs = '';
const getAllAccessAndErrorLogs = '';

//Object for defining the JSON object containing the user logs
export interface UserLogs{
    Type: string;           //The type of the log: USER
    Action: string;         //The action performed: CRUD
    Details: string;        //The user on which the action was performed
    Date: string;           //The date thas this action occurred
    User: string;           //The user who performed the action
    MoreInfo: string;       //More information (if any)
    ID: number              //The id of the notification
}

//Object for defining the JSON object containing the database management logs
export interface DatabaseManagementLogs{
    Type: string;           //The type of the log: DBML (Database Management Log)
    Action: string;         //The action performed: CRUD
    Details: string;        //The name of the database that the action was performed on
    Date: string;           //The date thas this action occurred
    User: string;           //The user who performed the action
    MoreInfo: string;       //More information (if any)
    ID: number              //The id of the notification
}

//Object for defining the JSON object containing the access logs
export interface AccessLogs{
    Type: string;           //The type of the log: ACCL
    Details: string;        //Description of what was accessed
    Date: string;           //The date that this action occured
    User: string;           //The user who performed the action
    ID: number              //The id of the notification
}

//Object for defining the JSON object containing the error logs
export interface ErrorLogs{
    Type: string;           //The type of the log: ERRL
    StatusCode: string;     //The status code of the error that occured
    Details: string;        //Description of the error
    Date: string;           //The date that this action occured
    User: string;           //The user who performed the action
    ID: number              //The id of the notification
}

@Injectable({
    providedIn: 'root'
})

export class NotificationLoggingService {

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   //                                                          CONSTRUCTOR
   /**
   * Creates an instance of UserManagementAPIService.
   * 
   * @param {HttpClient} http For making calls to the API
   * @memberof NotificationLoggingService
   */
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   constructor(private http: HttpClient) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                 GET_ALL_User_And_Database_Logs 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the logs with type of USER and/or DBML
   *
   * @returns API response @type any
   * @memberof NotificationLoggingService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllUserAndDatabaseLogs() {
    const options = {
        method: 'POST',
        url: getAllUserAndDatabaseLogs,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        json: true
    };

        return this.http.request('POST', getAllUserAndDatabaseLogs, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                 GET_ALL_Diagnostic_Clinic_Logs 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the logs with type of DGCL
   *
   * @returns API response @type any
   * @memberof NotificationLoggingService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllDiagnosticClinicLogs() {
    const options = {
        method: 'POST',
        url: getAllDiagnoticClinicLogs,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        json: true
    };

        return this.http.request('POST', getAllDiagnoticClinicLogs, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                 GET_ALL_Access_And_Error_Logs 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the logs with type of ACCL and/or ERRL
   *
   * @returns API response @type any
   * @memberof NotificationLoggingService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllAccessAndErrorLogs() {
    const options = {
        method: 'POST',
        url: getAllAccessAndErrorLogs,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        json: true
    };

        return this.http.request('POST', getAllAccessAndErrorLogs, options);
  }
}
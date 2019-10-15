/**
 * File Name: database-management.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\_services\database-management.service.ts
 * Project Name: fabi-web
 * Created Date: Sunday, July 28th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, October 9th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as http from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from "../../environments/environment.prod";
import { AuthenticationService } from './authentication.service';

/**
 * For handling all `database` requests and functions.
 *
 * @export
 * @class DatabaseManagementService
 */
@Injectable({
  providedIn: 'root'
})
export class DatabaseManagementService {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
  * Creates an instance of DatabaseManagementService.
  * 
  * @param {http.HttpClient} http for making http calls to the API
  * @param {AuthenticationService} authService for calling the *authentication* service
  * @memberof DatabaseManagementService
  */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private http: http.HttpClient, private authService: AuthenticationService) { }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          RETRIEVE DATABASE 
  /**
   * Method that sends a request to the API to get the database's data.
   *
   * @param {string} database The name of the database to be retrieved
   * @returns API response @type any
   * @memberof databaseManagementURL
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  retrieveDatabase(database: string) {
    let retrieveDatabaseURL = `${config.databaseManagementURL}/retrieveDatabase`;
    let method = 'POST';

    const postData = {
      "databaseName": database,
      "orgName": this.authService.getCurrentSessionValue.user.organisation,
      "userID": this.authService.getCurrentSessionValue.user.ID,
    }

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      body: postData,
      json: true
    };

    return this.http.request<any>(method, retrieveDatabaseURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          PORTING
  /**
   * Method thats sends a request to the API to port a CSV file to a Database 
   *
   * @param {Object} jsonObject The database to be ported in the form of a JSON object
   * @returns API response @type any
   * @memberof DatabaseManagementService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  porting(dbname: String, jsonObject: Object) {
    const portingURL = `${config.databaseManagementURL}/porting`;
    const method = 'POST';

    const postData = {
      "databaseName": dbname,
      "data": jsonObject,
      "orgName": this.authService.getCurrentSessionValue.user.organisation,
      "userID": this.authService.getCurrentSessionValue.user.ID,
    };

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

    return this.http.request<any>(method, portingURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          DROP DATABASE
  /**
   * Method thats sends a request to the API to drop a Database 
   *
   * @param {string} dbname The name of the database to bedropped
   * @returns API response @type any
   * @memberof DatabaseManagementService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeDatabase(dbname: string) {
    const dropDBURL = `${config.databaseManagementURL}/dropDatabase`;
    const method = 'POST';

    const postData = {
      "databaseName": dbname,
      "dbName": dbname,
      "orgName": this.authService.getCurrentSessionValue.user.organisation,
      "userID": this.authService.getCurrentSessionValue.user.ID,
    }

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

    return this.http.request<any>(method, dropDBURL, options);
  }
}

/**
 * File Name: database-management.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\_services\database-management.service.ts
 * Project Name: fabi-web
 * Created Date: Sunday, July 28th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Monday, August 12th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagementService {

  constructor(private http: HttpClient) { }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    let retrieveDatabaseURL = `${config.databaseManagementURL}/retrieveDatabase`;
    let method = 'POST';

    const postData = {
      "databaseName": database
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

    return this.http.request<any>(method, retrieveDatabaseURL, options);

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
    
    const portingURL = `${config.databaseManagementURL}/porting`;
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
        'Accept': 'application/json'
      },
      body: postData,
      json: true
    };

    return this.http.request<any>(method, portingURL, options);
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
    
    const portingURL = "";
    const method = 'POST';

    const postData = {
      "databaseName": databaseName,
    };

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      body: postData,
      json: true
    };

    return this.http.request<any>(method, portingURL, options);
  }

}

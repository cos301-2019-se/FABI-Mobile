/**
 * File Name: culture-collection-api.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\_services\culture-collection-api.service.ts
 * Project Name: fabi-web
 * Created Date: Monday, July 29th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, July 31th 2019
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

const getRequestLogsURL = 'https://culture-collection-management-dot-api-fabi.appspot.com/getAllRequestForms';
const getDepositLogsURL = 'https://culture-collection-management-dot-api-fabi.appspot.com/getAllRequestForms';
const getRevitalizationLogsURL = 'https://culture-collection-management-dot-api-fabi.appspot.com/getAllRevitalizationForms';

@Injectable({
    providedIn: 'root'
})

export class CultureCollectionAPIService {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   //                                                          CONSTRUCTOR
   /**
   * Creates an instance of CultureCollectionAPIService.
   * 
   * @param {HttpClient} http For making calls to the API
   * @memberof CultureCollectionAPIService
   */
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   constructor(private http: HttpClient) { }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         GET_ALL_REQUEST_LOGS
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the logs with type 'REQUEST'
   *
   * @returns API response @type any
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllRequestLogs() {
    const options = {
        method: 'POST',
        url: getRequestLogsURL,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        json: true
    };

        return this.http.request('POST', getRequestLogsURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         GET_ALL_DEPOSIT_LOGS
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the logs with type 'DEPOSIT'
   *
   * @returns API response @type any
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllDepositLogs() {
    const options = {
        method: 'POST',
        url: getDepositLogsURL,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        json: true
    };

        return this.http.request('POST', getDepositLogsURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         GET_ALL_REVITALIZATION_LOGS
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the logs with type 'REVITALIZATION'
   *
   * @returns API response @type any
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllRevitalizationLogs() {
    const options = {
        method: 'POST',
        url: getRevitalizationLogsURL,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        json: true
    };

        return this.http.request('POST', getRevitalizationLogsURL, options);
  }

}
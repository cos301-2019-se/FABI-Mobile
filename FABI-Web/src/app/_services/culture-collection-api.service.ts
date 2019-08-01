/**
 * File Name: culture-collection-api.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\_services\culture-collection-api.service.ts
 * Project Name: fabi-web
 * Created Date: Monday, July 29th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 1st 2019
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                          GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getRequestLogsURL = `${config.cultureClinicURL}/getAllRequestForms`;
const getDepositLogsURL = `${config.cultureClinicURL}/getAllDepositForms`;
const getRevitalizationLogsURL = `${config.cultureClinicURL}/getAllRevitalizationForms`;
const submitCMWDepositFormURL = `${config.cultureClinicURL}/submitCMWDepositForm`;
const submitCMWRequestFormURL = `${config.cultureClinicURL}/submitCMWRequestForm`;
const submitCMWRevitalizationFormURL = `${config.cultureClinicURL}/submitCMWRevitalizationForm`;

//Object for defining the CMW deposit form values
export interface CMWDeposit{
    userID: string;                         //The user id of the user submitting the form
    cmwCultureNumber: string;               //The culture number
    genus: string;                          //The genus of the culture
    epitheton: string;                      //The epitheton of the culture
    personalCollectionNumber: string;       //The personal collection number (if any)
    internationalCollectionNumber: string;  //The international collection number (if any)
    herbariumNumber: string;                //The herbarium number of the culture
    otherFABICollections: string;           //Indicates if there are currently any other collections
    name: string;                           //The name of the culture
    typeStatus: string;                     //The type status of the culture
    host: string;                           //The host of the culture
    vector: string;                         //The vector of the culture
    substrate: string;                      //The substrate of the culture
    continent: string;                      //The continent where the culture originated from
    country: string;                        //The country where the culture originated from
    region: string;                         //The region where the culture originated from
    locality: string;                       //The locality of the culture
    gps: string;                            //The GPS coordinates of where the culture originated from
    collectedBy: string;                    //The user who collected the culture
    dateCollected: string;                  //The date that the culture was collected
    isolatedBy: string;                     //The user who isolated the culture
    identifiedBy: string;                   //The user who idnetified the culture
    donatedBy: string;                      //The user who donated the culture (if any)
    additionalNotes: string;                //Any additional notes (if any)
    dateSubmitted: string;                  //The date that the form was submitted
}

//Object for defining the CMW request form values
export interface CMWRequest{
    userID: string;                         //The user id of the user submitting the form
    requestor: string;                      //The user who is requesting the culture
    taxonName: string;                      //The taxon name of the culture
    cultureNumber: string;                  //The culture number
    dateRequested: string;                  //The date that the culture is requested for
    referenceNumber: string;                //The reference number
    notes: string;                          //Any notes (if any)
    dateSubmitted: string;                  //The date that the form was submitted
}

//Object for defining the CMW revitalization form values
export interface CMWRevitalization{
    userID: string;                         //The user id of the user submitting the form
    requestor: string;                      //The user who is requesting the culture
    currentName: string;                    //The current name of the culture
    nameBionumerics: string;                //The bionumeric name of the culture
    cultureNumber: string;                  //The culture number
    cultureCondition: string;               //The condition of the culture
    sequenceDateSubmitted: string;          //The sequence date submitted (if any)
    referenceNumber: string;                //The reference number
    dateRequested: string;                  //The date that the culture is requested
    dateReturned: string;                   //The date that the culture was returned
    dateSubmitted: string;                  //The date that the form was submitted
}

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
        "Access-Control-Allow-Origin": "*",
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
        "Access-Control-Allow-Origin": "*",
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    SUBMIT_CMW_DEPOSIT_FORM 
  /**
   *    This function sends a POST request to the server to submit a CMW deposit form and save it to the
   *    database.
   *
   * @returns API response @type any
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitCMWDepositForm(data: CMWDeposit){
    const options = {
        method: 'POST',
        url: submitCMWDepositFormURL,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
        },
        body: data,
        json: true
    };

    return this.http.request('POST', submitCMWDepositFormURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    SUBMIT_CMW_REQUEST_FORM 
  /**
   *    This function sends a POST request to the server to submit a CMW request form and save it to the
   *    database.
   *
   * @returns API response @type any
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitCMWRequestForm(data: CMWRequest){
    const options = {
        headers: new HttpHeaders({
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
        }),
        body: data,
        json: true
    };

    return this.http.request('POST', submitCMWRequestFormURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    SUBMIT_CMW_REVITALIZATION_FORM 
  /**
   *    This function sends a POST request to the server to submit a CMW revitalization form and save it to the
   *    database.
   *
   * @returns API response @type any
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitCMWRevitalizationForm(data: CMWRevitalization){
    const options = {
        method: 'POST',
        url: submitCMWRevitalizationFormURL,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
        },
        body: data,
        json: true
    };

    return this.http.request('POST', submitCMWRevitalizationFormURL, options);
  }

}
/**
 * File Name: culture-collection-api.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\_services\culture-collection-api.service.ts
 * Project Name: fabi-web
 * Created Date: Monday, July 15th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Sunday, October 6th 2019
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                          GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////// URL'S FOR API //////////////////////////////////////////////////////////////// 
const getRequestLogsURL = `${config.cultureClinicURL}/getAllRequestForms`;
const getDepositLogsURL = `${config.cultureClinicURL}/getAllDepositForms`;
const getRevitalizationLogsURL = `${config.cultureClinicURL}/getAllRevitalizationForms`;
const getProcessedLogsURL = `${config.cultureClinicURL}/getAllProcessingForms`;
const submitCMWDepositFormURL = `${config.cultureClinicURL}/submitCMWDepositForm`;
const submitCMWRequestFormURL = `${config.cultureClinicURL}/submitCMWRequestForm`;
const submitCMWRevitalizationFormURL = `${config.cultureClinicURL}/submitCMWRevitalizationForm`;
const submitProcessedFormURL = `${config.cultureClinicURL}/submitCMWProcessingForm`;
const updateDepositFormStatusURL = `${config.cultureClinicURL}/updateDepositStatus`;
const deleteDepositFormURL = `${config.cultureClinicURL}/deleteCMWDepositForm`;
const deleteRequestFormURL = `${config.cultureClinicURL}/deleteCMWRequestForm`;
const deleteRevitalizationFormURL = `${config.cultureClinicURL}/deleteCMWRevitalizationForm`;
const deleteProcessedFormURL = `${config.cultureClinicURL}/deleteCMWProcessingForm`;


///////////////////////////////////////////////////////////////////////
//                            CMW DEPOSIT
/**
 *  Object for defining the CMW deposit form values
 *
 * @export
 * @interface CMWDeposit
 */
///////////////////////////////////////////////////////////////////////
export interface CMWDeposit {
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
  identifiedBy: string;                   //The user who identified the culture
  donatedBy: string;                      //The user who donated the culture (if any)
  additionalNotes: string;                //Any additional notes (if any)
  dateSubmitted: string;                  //The date that the form was submitted
  formID: string;                         //The id number for the actual form
}


///////////////////////////////////////////////////////////////////////
//                            CMW REQUEST
/**
 *  Object for defining the CMW request form values
 *
 * @export
 * @interface CMWRequest
 */
///////////////////////////////////////////////////////////////////////
export interface CMWRequest {
  userID: string;                         //The user id of the user submitting the form
  requestor: string;                      //The user who is requesting the culture
  taxonName: string;                      //The taxon name of the culture
  cultureNumber: string;                  //The culture number
  dateRequested: string;                  //The date that the culture is requested for
  referenceNumber: string;                //The reference number
  notes: string;                          //Any notes (if any)
  dateSubmitted: string;                  //The date that the form was submitted
}

///////////////////////////////////////////////////////////////////////
//                            CMW REVILIZATION
/**
 * Object for defining the CMW revitalization form values
 *
 * @export
 * @interface CMWRevitalization
 */
///////////////////////////////////////////////////////////////////////
export interface CMWRevitalization {
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


///////////////////////////////////////////////////////////////////////
//                            PROCESSED FORM
/**
 * Object for defining the processed deposit form values
 *
 * @export
 * @interface ProcessedForm
 */
///////////////////////////////////////////////////////////////////////
export interface ProcessedForm {
  userID: string;                         //The user id of the user submitting the form
  statusOfCulture: string;               //The status of the culture for the processed form
  agarSlants: string;                     //The agar slants for the processed form
  water: string;                          //The water for the processed form
  oil: string;                            //The oil for the processed form
  roomTemperature: string;                //The room temperature for the processed form
  c18: string;                            //The c18 for the processed form
  freezeDried: string;                    //The freezed dried for the processed form
  freeze: string;                         //The freeze for the processed form
  dateOfCollectionValidation: string;     //The date of collection validation for the processed form
  microscopeSlides: string;               //The microscope slides for the processed form
  dateSubmittedProcessedForm: string;     //The date submitted for the processed form
  cultureCollectionNumber: string;        //The culture collection number for the processed form
}


///////////////////////////////////////////////////////////////////////
//                          UPDATED DEPOSIT FORM
/**
 * Object for defining the object for updating the status of a deposit form
 *
 * @export
 * @interface UpdateDepositForm
 */
///////////////////////////////////////////////////////////////////////
export interface UpdateDepositForm {
  userID: string;                         //The user id off the user submitting the form
  status: string;                         //The new status of the deposit form
  formID: string;                         //The id of the form to be updated
}


/**
 * Used to handled all `culture collection` requests and functions
 *
 * @export
 * @class CultureCollectionAPIService
 */
@Injectable({
  providedIn: 'root'
})
export class CultureCollectionAPIService {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
  * Creates an instance of CultureCollectionAPIService.
  * 
  * @param {http.HttpClient} http for making http calls to the API
  * @param {AuthenticationService} authService for calling the *authentication* service
  * @memberof CultureCollectionAPIService
  */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private http: http.HttpClient, private authService: AuthenticationService) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         GET ALL REQUEST LOGS
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the logs with type 'REQUEST'
   *
   * @returns API response @type any
   * 
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllRequestLogs() {
    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      json: true
    };

    return this.http.request('POST', getRequestLogsURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         GET ALL DEPOSIT LOGS
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the logs with type 'DEPOSIT'
   *
   * @returns API response @type any
   * 
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllDepositLogs() {
    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      json: true
    };

    return this.http.request('POST', getDepositLogsURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         GET ALL REVITALIZATION LOGS
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the logs with type 'REVITALIZATION'
   *
   * @returns API response @type any
   * 
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllRevitalizationLogs() {
    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      json: true
    };

    return this.http.request('POST', getRevitalizationLogsURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         GET ALL PROCESSED LOGS
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the logs with type 'PROCESSED'
   *
   * @returns API response @type any
   * 
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllProcessedLogs() {
    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      json: true
    };

    return this.http.request('POST', getProcessedLogsURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      SUBMIT CMW DEPOSIT FORM 
  /**
   *    This function sends a POST request to the server to submit a CMW deposit form and save it to the
   *    database.
   *
   * @returns API response @type any
   * 
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitCMWDepositForm(data: CMWDeposit) {
    const options = {
      method: 'POST',
      url: submitCMWDepositFormURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      body: data,
      json: true
    };

    return this.http.request('POST', submitCMWDepositFormURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    SUBMIT CMW REQUEST FORM 
  /**
   *    This function sends a POST request to the server to submit a CMW request form and save it to the
   *    database.
   *
   * @returns API response @type any
   * 
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitCMWRequestForm(data: CMWRequest) {
    const options = {
      headers: new http.HttpHeaders({
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      }),
      body: data,
      json: true
    };

    return this.http.request('POST', submitCMWRequestFormURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    SUBMIT CMW REVITALIZATION FORM 
  /**
   *    This function sends a POST request to the server to submit a CMW revitalization form and save it to the
   *    database.
   *
   * @returns API response @type any
   * 
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitCMWRevitalizationForm(data: CMWRevitalization) {
    const options = {
      method: 'POST',
      url: submitCMWRevitalizationFormURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      body: data,
      json: true
    };

    return this.http.request('POST', submitCMWRevitalizationFormURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    SUBMIT PROCESSED FORM 
  /**
   *    This function sends a POST request to the server to submit a process form for a deposit form and save it to the
   *    database.
   *
   * @returns API response @type any
   * 
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitProcessedForm(data: ProcessedForm) {
    const options = {
      method: 'POST',
      url: submitProcessedFormURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      body: data,
      json: true
    };

    return this.http.request('POST', submitProcessedFormURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    UPDATE DEPOSIT FORM STATUS 
  /**
   *    This function is used to update the status of a deposit form to 'processed'.
   *
   * @returns API response @type any
   * 
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  updateDepositFormStatus(data: UpdateDepositForm) {
    const options = {
      method: 'POST',
      url: updateDepositFormStatusURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      body: data,
      json: true
    };

    return this.http.request('POST', updateDepositFormStatusURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    DELETE DEPOSIT FORM 
  /**
   *    This function is used to delete a deposit form on request.
   *
   * @returns API response @type any
   * 
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  deleteDepositForm(id: string, form: string) {
    var data = { userID: id, formID: form };

    const options = {
      method: 'POST',
      url: deleteDepositFormURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      body: data,
      json: true
    };

    return this.http.request('POST', deleteDepositFormURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    DELETE REQUEST FORM 
  /**
   *    This function is used to delete a request form on request.
   *
   * @returns API response @type any
   * 
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  deleteRequestForm(id: string, form: string) {
    var data = { userID: id, formID: form };

    const options = {
      method: 'POST',
      url: deleteRequestFormURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      body: data,
      json: true
    };

    return this.http.request('POST', deleteRequestFormURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    DELETE REVITALIZATION FORM 
  /**
   *    This function is used to delete a revitalization form on request.
   *
   * @returns API response @type any
   * 
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  deleteRevitalizationForm(id: string, form: string) {
    var data = { userID: id, formID: form };

    const options = {
      method: 'POST',
      url: deleteRevitalizationFormURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      body: data,
      json: true
    };

    return this.http.request('POST', deleteRevitalizationFormURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    DELETE PROCESSED FORM 
  /**
   *    This function is used to delete a processed form on request.
   *
   * @returns API response @type any
   * 
   * @memberof CultureCollectionAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  deleteProcessedForm(id: string, form: string) {
    var data = { userID: id, formID: form };

    const options = {
      method: 'POST',
      url: deleteProcessedFormURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      body: data,
      json: true
    };

    return this.http.request('POST', deleteProcessedFormURL, options);
  }

}
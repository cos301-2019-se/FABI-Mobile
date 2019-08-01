/**
 * File Name: diagnostic-clinic-api.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services/diagnostic-clinic-api.service.ts
 * Project Name: fabi-web
 * Created Date: Saturday, July 6th 2019
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
import { AuthenticationService } from "./authentication.service";
import * as Interface from "../_interfaces/interfaces";

import { POSTOrganization } from './user-management-api.service';

import { config } from "../../environments/environment.prod";

//Globals variables used to hold the API call urls
const getAllSamplesURL = `${config.diagnosticClinicURL}/retrieveAllSamples`;
const getAllSamplesForMemberURL = `${config.diagnosticClinicURL}/retrieveSamplesForMember`;
const getStaffMembersSamplesURL = `${config.diagnosticClinicURL}/getStaffMembersSamples`;
const getOrganizationSamplesURL = `${config.diagnosticClinicURL}/retrieveAllOrgSamples`;
const submitCMWDepositFormURL = `${config.diagnosticClinicURL}/submitCMWDepositForm`;
const submitCMWRequestFormURL = `${config.diagnosticClinicURL}/submitCMWRequestForm`;
const submitCMWRevitalizationFormURL = `${config.diagnosticClinicURL}/submitCMWRevitalizationForm`;

//Object for defining the JSON object to be sent when requesting the samples of a specific member
export interface POSTMember{
    userID: string;                         //the user id of the user to be submitted
}

//Object for defining the samples received from the API call
export interface Sample{
    userID: string;
    orgName: string;
    status: string;
    data: Species;
}

export interface Species{
    species: string;
}

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

export class DiagnosticClinicAPIService {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of DiagnosticClinicAPIService.
   * 
   * @param {HttpClient} http For making calls to the API
   * @memberof DiagnosticClinicAPIService
   */
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   constructor(private http: HttpClient, private authService: AuthenticationService) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET_ALL_SAMPLES 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the samples that FABI is currently processing
   *
   * @returns API response @type any
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   getAllSamples(){

    const getAllSamplesURL = `${config.diagnosticClinicURL}/retrieveAllSamples`;
    const method = "POST";
    
    const options = {
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        json: true
    };

    return this.http.request('POST', getAllSamplesURL, options);
   }


   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     GET_SAMPLES_FOR_FABI_STAFF 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the samples corresponding to a specific user.
   *
   * @param {string} id The id number of the user whose samples need to be fetched.
   * @returns API response @type any
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getSamplesForFABIStaff(id: string){
    const data = {"userID": id};
    const getAllSamplesURL = `${config.diagnosticClinicURL}/getStaffMembersSamples`;
    const method = "POST";
    
    const options = {
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: data,
        json: true
    };

    return this.http.request('POST', getStaffMembersSamplesURL, options);
   }

     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    RETREIVE ALL SAMPLES
  /**
   * Method that sends a request to the API to retreive all Samples
   *
   * @param {Interface.Organisation} orgInfo
   * @returns
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  retrieveAllOrganizationSamples() {
    let retrieveAllOrgSamples = `${config.diagnosticClinicURL}/retrieveAllOrgSamples`;
    let method = 'POST';

    const postData = {
      "orgName": this.authService.getCurrentSessionValue.user.organisation
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

    return this.http.request<any>(method, retrieveAllOrgSamples, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    RETREIVE ALL SAMPLES FOR MEMBER
  /**
   * Method that sends a request to the API to retreive all Samples for a member
   *
   * @param {Interface.Organisation} orgInfo
   * @returns
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  retrieveMemberSamples() {
    let retrieveAllMemberSamples = `${config.diagnosticClinicURL}/retrieveSamplesForMember`;
    let method = 'POST';

    const postData = {
      "userID": this.authService.getCurrentSessionValue.user.ID
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

    return this.http.request<any>(method, retrieveAllMemberSamples, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    SUBMIT_CMW_DEPOSIT_FORM 
  /**
   *    This function sends a POST request to the server to submit a CMW deposit form and save it to the
   *    database.
   *
   * @returns API response @type any
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitCMWDepositForm(data: CMWDeposit){
    const options = {
        method: 'POST',
        url: submitCMWDepositFormURL,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
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
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitCMWRequestForm(data: CMWRequest){
    const options = {
        method: 'POST',
        url: submitCMWRequestFormURL,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
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
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitCMWRevitalizationForm(data: CMWRevitalization){
    const options = {
        method: 'POST',
        url: submitCMWRevitalizationFormURL,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: data,
        json: true
    };

    return this.http.request('POST', submitCMWRevitalizationFormURL, options);
  }

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    SUBMIT SAMPLE FORM
  /**
   * Method that send a request to the API to submit a specifc Sample Form
   *
   * @param {Interface.Organisation} orgInfo
   * @param {Interface.ClientFormData} formDetails
   * @returns
   * @memberof HttpService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitSampleForm(orgInfo: Interface.Organisation, formDetails: Interface.ClientFormData) {
    let submitSampleURL = '***REMOVED***/submitSample';
    let method = 'POST';

    const postData = {
      "orgName": this.authService.getCurrentSessionValue.user.organisation,
      "userID": this.authService.getCurrentSessionValue.user.ID,
      "data": formDetails
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

    return this.http.request<any>(method, submitSampleURL, options);
  }
  
}
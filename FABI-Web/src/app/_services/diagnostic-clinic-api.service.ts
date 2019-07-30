/**
 * File Name: diagnostic-clinic-api.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services/diagnostic-clinic-api.service.ts
 * Project Name: fabi-web
 * Created Date: Saturday, July 6th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Monday, July 29th 2019
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
const getOrganizationSamplesURL = `${config.diagnosticClinicURL}/retrieveAllOrgSamples`;
const submitCMWDepositFormURL = `${config.diagnosticClinicURL}/submitCMWDepositForm`;
const submitCMWRequestFormURL = `${config.diagnosticClinicURL}/submitCMWRequestForm`;
const submitCMWRevitalizationFormURL = `${config.diagnosticClinicURL}/submitCMWRevitalizationForm`;

//Object for defining the JSON object to be sent when requesting the samples of a specific member
export interface POSTMember{
    userID: string;
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
    userID: string;
    cmwCultureNumber: string;
    genus: string;
    epitheton: string;
    personalCollectionNumber: string;
    internationalCollectionNumber: string;
    herbariumNumber: string;
    otherFABICollections: string;
    name: string;
    typeStatus: string;
    host: string;
    vector: string;
    substrate: string;
    continent: string;
    country: string;
    region: string;
    locality: string;
    gps: string;
    collectedBy: string;
    dateCollected: string;
    isolatedBy: string;
    identifiedBy: string;
    donatedBy: string;
    additionalNotes: string;
    dateSubmitted: string;
}

//Object for defining the CMW request form values
export interface CMWRequest{
    userID: string;
    requestor: string;
    taxonName: string;
    cultureNumber: string;
    dateRequested: string;
    referenceNumber: string;
    notes: string;
    dateSubmitted: string;
}

//Object for defining the CMW revitalization form values
export interface CMWRevitalization{
    userID: string;
    requestor: string;
    currentName: string;
    nameBionumerics: string;
    cultureNumber: string;
    cultureCondition: string;
    sequenceDateSubmitted: string;
    referenceNumber: string;
    dateRequested: string;
    dateReturned: string;
    dateSubmitted: string;
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
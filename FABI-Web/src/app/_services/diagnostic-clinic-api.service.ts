/**
 * File Name: diagnostic-clinic-api.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services/diagnostic-clinic-api.service.ts
 * Project Name: fabi-web
 * Created Date: Saturday, July 6th 2019
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
import { AuthenticationService } from "./authentication.service";
import * as Interface from "../_interfaces/interfaces";

import { POSTOrganization } from './user-management-api.service';

import { config } from "../../environments/environment.prod";

//Globals variables used to hold the API call urls
const getAllSamplesURL = `${config.diagnosticClinicURL}/retrieveAllSamples`;
const getAllSamplesForMemberURL = `${config.diagnosticClinicURL}/retrieveSamplesForMember`;
const getStaffMembersSamplesURL = `${config.diagnosticClinicURL}/getStaffMembersSamples`;
const getOrganizationSamplesURL = `${config.diagnosticClinicURL}/retrieveAllOrgSamples`;

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
  //                                                    RETREIVE_ALL_SAMPLES
  /**
   * Method that sends a request to the API to retreive all Samples
   *
   * @param {Interface.Organisation} orgInfo
   * @returns
   * @memberof DiagnosticClinicAPIService
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
  //                                                    RETREIVE_ALL_SAMPLES_FOR_MEMBER
  /**
   * Method that sends a request to the API to retreive all Samples for a member
   *
   * @param {Interface.Organisation} orgInfo
   * @returns
   * @memberof DiagnosticClinicAPIService
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
  //                                                    SUBMIT_SAMPLE_FORM
  /**
   * Method that send a request to the API to submit a specifc Sample Form
   *
   * @param {Interface.Organisation} orgInfo
   * @param {Interface.ClientFormData} formDetails
   * @returns
   * @memberof DiagnosticClinicAPIService
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
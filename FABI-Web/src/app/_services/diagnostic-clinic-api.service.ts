/**
 * File Name: diagnostic-clinic-api.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services/diagnostic-clinic-api.service.ts
 * Project Name: fabi-web
 * Created Date: Saturday, July 6th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, October 8th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import * as http from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from "../../environments/environment.prod";
import * as Interface from "../_interfaces/interfaces";
import { AuthenticationService } from "./authentication.service";


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                          GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////// URL'S FOR API //////////////////////////////////////////////////////////////// 
const getAllSamplesForMemberURL = `${config.diagnosticClinicURL}/retrieveSamplesForMember`;

//Object for defining the JSON object to be sent when requesting the samples of a specific member
export interface POSTMember{
  userID: string;                         //The user id of the user to be submitted
}

//Object for defining the samples received from the API call
export interface Sample{
  userID: string;                         //The id of the user who submitted the sample
  orgName: string;                        //The organization that the user belongs to
  status: string;                         //The status of the sample
  referenceNumber: string;                //The reference number that was generated for the sample
  data: Species;                          //The data within the sample which is the species
}

export interface Species{
  species: string;                        //The species of a sample
}


/**
 * Used for handling all `diagnostic clinic` requests and functions
 *
 * @export
 * @class DiagnosticClinicAPIService
 */
@Injectable({
  providedIn: 'root'
})
export class DiagnosticClinicAPIService {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of DiagnosticClinicAPIService.
   * 
   * @param {http.HttpClient} http For making calls to the API
   * @param {AuthenticationService} authService for calling the *authentication* service
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private http: http.HttpClient, private authService: AuthenticationService) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET ALL SAMPLES 
  /**
   *    This function sends a POST request to the API to retrieve a list containing all the samples that FABI is currently processing
   *
   * @returns API response @type any
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllSamples() {
    const getAllSamplesURL = `${config.diagnosticClinicURL}/retrieveAllSamples`;
    const method = "POST";

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      json: true
    };

    return this.http.request(method, getAllSamplesURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     GET SAMPLES FOR FABI STAFF 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the samples corresponding to a specific user.
   *
   * @param {string} id The id number of the user whose samples need to be fetched.
   * @returns API response @type any
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getSamplesForFABIStaff(id: string) {
    const data: POSTMember = { userID: id };

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

    return this.http.request('POST', getAllSamplesForMemberURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    RETREIVE ALL SAMPLES
  /**
   * Method that sends a request to the API to retreive all Samples
   *
   * @returns API response @type any
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
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
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
   * @returns API response @type any
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  retrieveMemberSamples() {
    let retrieveAllMemberSamples = `${config.diagnosticClinicURL}/retrieveSamplesForMember`;
    let method = 'POST';

    const postData = {
      "orgName": this.authService.getCurrentSessionValue.user.organisation,
      "userID": this.authService.getCurrentSessionValue.user.ID
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

    return this.http.request<any>(method, retrieveAllMemberSamples, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SUBMIT SAMPLE FORM
  /**
   * Method that send a request to the API to submit a specifc Sample Form
   *
   * @param {Interface.SampleFormData} formDetails The details of the sample to be submitted
   * @returns API response @type any
   * 
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitSampleForm(sampleDetails: Interface.SampleFormData) {

    let submitSampleURL = `${config.diagnosticClinicURL}/submitSample`;
    let method = 'POST';

    const postData = {
      "orgName": this.authService.getCurrentSessionValue.user.organisation,
      "userID": this.authService.getCurrentSessionValue.user.ID,
      // "orgName": "PendingOrg6",
      // "userID": "1570469049518",
      "data": {
        "sample": sampleDetails
      }
    }

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
        // 'Authorization': `Bearer 2a2be1526acc985f468b36d029f9baf701ba90d5`

      },
      body: postData,
      json: true
    };

    return this.http.request<any>(method, submitSampleURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        RETRIEVE SAMPLE DETAILS
  /**
   * This function is used to fetch a specific sample form
   *
   * @param {string} sampleRefNum The reference number of the sample to be retrieved
   * @returns API response @type any
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  retrieveSampleDetails(sampleRefNum: string) {
    let retreiveSampleDetailsURL = `${config.diagnosticClinicURL}/retrieveSample`;
    let method = 'POST';

    const postData = {
      "refNum": sampleRefNum
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

    return this.http.request<any>(method, retreiveSampleDetailsURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        UPDATE SAMPLE STATUS
  /**
   * Method used to update the status of the sample
   *
   * @param {*} sample
   * @param {string} status
   * @returns
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  updateSamplesStatus(sample: any, status: string) {

    let updateSampleStatusURL = `${config.diagnosticClinicURL}/updateSampleStatus`;
    let method = 'POST';

    const postData = {
      "refNum": sample.referenceNumber,
      "status": status
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

    return this.http.request<any>(method, updateSampleStatusURL, options);
  }
}
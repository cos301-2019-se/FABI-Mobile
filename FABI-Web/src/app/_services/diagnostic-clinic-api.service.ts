/**
 * File Name: diagnostic-clinic-api.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services/diagnostic-clinic-api.service.ts
 * Project Name: fabi-web
 * Created Date: Saturday, July 6th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 22nd 2019
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
import { config } from "../../environments/environment.prod";


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                          GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////// URL'S FOR API //////////////////////////////////////////////////////////////// 
const getAllSamplesURL = `${config.diagnosticClinicURL}/retrieveAllSamples`;
const getAllSamplesForMemberURL = `${config.diagnosticClinicURL}/retrieveSamplesForMember`;
const getStaffMembersSamplesURL = `${config.diagnosticClinicURL}/getStaffMembersSamples`;
const getOrganizationSamplesURL = `${config.diagnosticClinicURL}/retrieveAllOrgSamples`;

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
   * 
   * @memberof DiagnosticClinicAPIService
   */
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   constructor(private http: HttpClient, private authService: AuthenticationService) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET ALL SAMPLES 
  /**
   *    This function sends a POST request to the API to retrieve a list containing all the samples that FABI is currently processing
   *
   * @returns API response @type any
   * 
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
  //                                                     GET SAMPLES FOR FABI STAFF 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the samples corresponding to a specific user.
   *
   * @param {string} id The id number of the user whose samples need to be fetched.
   * 
   * @returns API response @type any
   * 
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getSamplesForFABIStaff(id: string){
    const data : POSTMember = {userID: id};

    const options = {
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
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
   * @param {Interface.Organisation} orgInfo The organization whose samples need to be retrieved
   * 
   * @returns API response @type any
   * 
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
  //                                                    RETREIVE ALL SAMPLES FOR MEMBER
  /**
   * Method that sends a request to the API to retreive all Samples for a member
   *
   * @param {Interface.Organisation} orgInfo The name of the organization that the member belongs to
   * 
   * @returns API response @type any
   * 
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
  //                                                        SUBMIT SAMPLE FORM
  /**
   * Method that send a request to the API to submit a specifc Sample Form
   *
   * @param {Interface.Organisation} orgInfo The organization that the user trying to submit the sample belongs to
   * @param {Interface.ClientFormData} formDetails The details of the sample to be submitted
   * 
   * @returns API response @type any
   * 
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitSampleForm(formDetails: Interface.SampleFormData) {

    let tempDetails = {
      "Location": "harding",
      "Province": "Gauteng",
      "Genus": "eucalyptus",
      "Species": "radiata",
      "SampleType": "root",
      "Asym_Dis": "D",
      "NurseryField": "F",
      "Roots": "dry",
      "Root-Collar": "Wilted, abitDry",
      "Stem": "Girdled",
      "GrowthTip": "Swelling",
      "Needles-Leaves": "healthy"
    }

    let submitSampleURL =   `${config.diagnosticClinicURL}/submitSample`;
    let method = 'POST';

    const postData = {
      "orgName": this.authService.getCurrentSessionValue.user.organisation,
      "userID": this.authService.getCurrentSessionValue.user.ID,
      "data": tempDetails
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


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        RETRIEVE SAMPLE DETAILS
  /**
   * This function is used to fetch a specific sample form
   *
   * @param {string} sampleRefNum The reference number of the sample to be retrieved
   * 
   * @returns API response @type any
   * 
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  retrieveSampleDetails(sampleRefNum: string) {
    let retreiveSampleDetailsURL =   `${config.diagnosticClinicURL}/retrieveSample`;
    let method = 'POST';

    const postData = {
      "refNum": sampleRefNum
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

    return this.http.request<any>(method, retreiveSampleDetailsURL, options);
  }  
}
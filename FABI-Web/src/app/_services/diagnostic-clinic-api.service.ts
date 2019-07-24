/**
 * File Name: diagnostic-clinic-api.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services/diagnostic-clinic-api.service.ts
 * Project Name: fabi-web
 * Created Date: Saturday, July 6th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, July 24th 2019
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

import { POSTOrganization } from './user-management-api.service';

//Globals variables used to hold the API call urls
const getAllSamplesURL = 'https://diagnostic-clinic-dot-api-fabi.appspot.com/retrieveAllSamples';
const getAllSamplesForMemberURL = 'https://diagnostic-clinic-dot-api-fabi.appspot.com/retrieveSamplesForMember';
const getOrganizationSamplesURL = 'https://diagnostic-clinic-dot-api-fabi.appspot.com/retrieveAllOrgSamples';
const submitCMWDepositFormURL = '';
const submitCMWRequestFormURL = '';
const submitCMWRevitalizationFormURL = '';

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
    dateCollected: Date;
    isolatedBy: string;
    identifiedBy: string;
    donatedBy: string;
    additionalNotes: string;
    dateSubmitted: string;
}

//Object for defining the CMW request form values
export interface CMWRequest{
    requestor: string;
    taxonName: string;
    cultureNumber: string;
    dateRequested: Date;
    referenceNumber: string;
    notes: string;
    dateSubmitted: Date;
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
   constructor(private http: HttpClient) { }


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
        const options = {
            method: 'POST',
            url: getAllSamplesURL,
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
  //                                                   GET_ALL_ORGANIZATION_SAMPLES 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the samples belonging to the specified organization
   *
   * @returns API response @type any
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllOrganizationSamples(organization:string){
    // var data: POSTOrganization = { orgName: organization };
    var data: POSTOrganization = { orgName: 'testOrg3'};

    const options = {
        method: 'POST',
        url: getOrganizationSamplesURL,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: data,
        json: true
    };

    return this.http.request('POST', getOrganizationSamplesURL, options);
}


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET_ALL_SAMPLES_FOR_MEMBER 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the samples that correspond to a specific organization member
   *
   * @returns API response @type any
   * @memberof DiagnosticClinicAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllSamplesForMember(id: string){
    var data: POSTMember = {userID: id};

    const options = {
        method: 'POST',
        url: getAllSamplesForMemberURL,
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
  submitCMWRevitalizationForm(data: CMWRequest){
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
}
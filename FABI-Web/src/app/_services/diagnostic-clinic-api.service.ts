/**
 * File Name: diagnostic-clinic-api.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services/diagnostic-clinic-api.service.ts
 * Project Name: fabi-web
 * Created Date: Saturday, Juky 6th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Monday, July 8th 2019
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
}
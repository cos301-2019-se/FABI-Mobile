/**
 * File Name: user-management-api.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services/user-management-api.service.ts
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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                          GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Globals variables used to hold the API call urls
const getAllFABIMembersURL = '***REMOVED***/getAllFabiMembers';
const getAllFABIAdminsURL = '***REMOVED***/getAllFabiAdmins';
const getAllOrganizationMembers = '***REMOVED***/getAllOrgMembers';

//Object for defining how a member of FABI is structured
export interface Member {
    Email: string;      //This will contain the email retreived from the DB (is the unique identifier for the member) 
    Name: string;       //This will be the name of the member
    Surname: string;    //This will be the surname of the member
}

//Object for defining the JSON object to be sent when requesting the members of an organization
export interface POSTOrganization{
    orgName: string;
}

@Injectable({
    providedIn: 'root'
})

export class UserManagementAPIService {

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   //                                                          CONSTRUCTOR
   /**
   * Creates an instance of UserManagementAPIService.
   * 
   * @param {HttpClient} http For making calls to the API
   * @memberof UserManagementAPIService
   */
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   constructor(private http: HttpClient) { }


   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     GET_ALL_FABI_MEMBERS 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the FABI members
   *
   * @returns API response @type any
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getAllFABIMembers() {
        const options = {
            method: 'POST',
            url: getAllFABIMembersURL,
            headers: {
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            json: true
        };

        return this.http.request('POST', getAllFABIMembersURL, options);
    }


   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET_ALL_FABI_ADMINS 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the FABI administrators
   *
   * @returns API response @type any
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getAllFABIAdmins() {
        const options = {
            method: 'POST',
            url: getAllFABIAdminsURL,
            headers: {
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            json: true
        };

        return this.http.request('POST', getAllFABIAdminsURL, options);        
    }


   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                 GET_ALL_ORGANIZATION_MEMBERS 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the Members of an Organization
   *
   * @returns API response @type any
   * @param {string} organization Name of the organization
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getAllOrganizationMembers(organization: string) {
        var data: POSTOrganization = { orgName: organization };

        const options = {
            method: 'POST',
            url: getAllOrganizationMembers,
            headers: {
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: data,
            json: true
        };

        return this.http.request('POST', getAllOrganizationMembers, options);        
    }
}
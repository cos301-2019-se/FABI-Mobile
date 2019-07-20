/**
 * File Name: user-management-api.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services/user-management-api.service.ts
 * Project Name: fabi-web
 * Created Date: Saturday, July 6th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Saturday, July 20th 2019
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
const getAllFABIMembersURL = 'https://user-management-dot-api-fabi.appspot.com/getAllFabiMembers';
const getAllFABIAdminsURL = 'https://user-management-dot-api-fabi.appspot.com/getAllFabiAdmins';
const getAllOrganizationMembers = 'https://user-management-dot-api-fabi.appspot.com/getAllOrgMembers';
const getUserDetailsURL = 'https://user-management-dot-api-fabi.appspot.com/getUserDetails';
const updateStaffMemberDetailsURL = 'https://user-management-dot-api-fabi.appspot.com/updateStaffMember';
const updateOrganizationMemberDetailsURL = 'https://user-management-dot-api-fabi.appspot.com/updateOrgMember';

//Object for defining how a member of FABI is structured
export interface Member {
    Email: string;          //This will contain the email retreived from the DB (is the unique identifier for the member) 
    Name: string;           //This will be the name of the member
    Surname: string;        //This will be the surname of the member
}

//Object for defining the JSON object to be sent when requesting the members of an organization
export interface POSTOrganization{
    orgName: string;        //The name of the organization to be fetched
}

//Object for defining the JSON object to be sent when requesting the details of a member
export interface POSTMember{
    orgName: string;        //The name of the organization to be fetched
    id: string;             //THe ID of the user
}

//Object for defning the JSOn object to be sent when the details of a FABI member are updated
export interface UpdateMember{
    fname: string;          //The name of the FABI member
    surname: string;        //The surname of the FABI member
    email: string;          //The email of the FABI member
    password: string;       //The password of the FABI member
}

//Object for defning the JSOn object to be sent when the details of a FABI member are updated
export interface POSTUpdateMember{
    id: string;                 //The ID number of the FABI member to be updated
    fields: UpdateMember;       //The fields to the updated
}

//Object for defning the JSOn object to be sent when the details of an organization member are updated
export interface UpdateOrganization{
    fname: string;          //The name of the organization member
    surname: string;        //The surname of the organization member
    email: string;          //The email of the organization member
    password: string;       //The password of the organization member
}

//Object for defning the JSOn object to be sent when the details of an organization member are updated
export interface POSTUpdateOrganization{
    orgName: string;            //The name of the organization
    id: string;                 //The ID of the organization member to be updated
    fields: UpdateMember;       //The fields to be updated
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


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            GET_USER_DETAILS 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the Members of an Organization
   *
   * @returns API response @type any
   * @param {string} organization Name of the organization
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getUserDetails(organization: string, idNo: string) {
    var data: POSTMember = { orgName: organization, id: idNo};

    const options = {
        method: 'POST',
        url: getUserDetailsURL,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: data,
        json: true
    };

    return this.http.request('POST', getUserDetailsURL, options);        
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         UPDATE_FABI_MEMBER_DETAILS 
  /**
   *    This function is used to send updated FABI staff details to the database
   *
   * @returns API response @type any
   * @param {string} mail Email of the staff member
   * @param {string} name Name of the staff member
   * @param {string} lname Surname of the staff member
   * @param {string} idNo ID number of the staff member
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  updateFABIMemberDetails(mail: string, name: string, lname: string, idNo: string, pass: string) {
    var member: UpdateMember = { fname: name, surname: lname, email: mail, password: pass};
    var data: POSTUpdateMember = { id: idNo, fields: member};

    const options = {
        method: 'POST',
        url: updateStaffMemberDetailsURL,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: data,
        json: true
    };

    return this.http.request('POST', updateStaffMemberDetailsURL, options);        
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      UPDATE_ORGANIZATION_MEMBER_DETAILS 
  /**
   *    This function is used to send updated organization member details to the database
   *
   * @returns API response @type any
   * @param {string} organization The name of the organization that the member belongs to
   * @param {string} mail Email of the staff member
   * @param {string} name Name of the staff member
   * @param {string} lname Surname of the staff member
   * @param {string} idNo ID number of the staff member
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  updateOrganizationMemberDetails(organization: string, mail: string, name: string, lname: string, idNo: string, pass: string) {
    var member: UpdateOrganization = { fname: name, surname: lname, email: mail, password: pass};
    var data: POSTUpdateOrganization = { orgName: organization, id: idNo, fields: member};

    const options = {
        method: 'POST',
        url: updateOrganizationMemberDetailsURL,
        headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: data,
        json: true
    };

    return this.http.request('POST', updateOrganizationMemberDetailsURL, options);        
  }
}
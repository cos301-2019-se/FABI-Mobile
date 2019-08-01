/**
 * File Name: user-management-api.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services/user-management-api.service.ts
 * Project Name: fabi-web
 * Created Date: Saturday, July 6th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, July 30th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import * as core from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import * as Interface from "../_interfaces/interfaces";
import { AuthenticationService } from "./authentication.service";

import { config } from "../../environments/environment.prod";


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                          GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Globals variables used to hold the API call urls
const getAllFABIMembersURL = `${config.userManagementURL}/getAllFabiMembers`;
const getAllFABIAdminsURL = `${config.userManagementURL}/getAllFabiAdmins`;
const getAllOrganizationMembers = `${config.userManagementURL}/getAllOrgMembers`;
const getUserDetailsURL = `${config.userManagementURL}/getUserDetails`;
const updateStaffMemberDetailsURL = `${config.userManagementURL}/updateStaffMember`;
const updateOrganizationMemberDetailsURL = `${config.userManagementURL}/updateOrgMember`;
// const updateFABIMemberNotificationsURL = `${config.userManagementURL}/updateMemberNotifications`;

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

@core.Injectable({
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
   constructor(private http: HttpClient, private authService: AuthenticationService) { }s


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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET_ORGANIZATION
  /**
   * Function that send a request to retrieve an Organisations' details using their ID
   *
   * @returns
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getOrganizationDetails() {

    let getOrganizationDetails = `${config.userManagementURL}/getOrgDetails`;
    let method = 'POST';

    const postData = {
      // "ID": localStorage.getItem('ID')
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

    return this.http.request<any>(method, getOrganizationDetails, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET_ORGANIZATION_MEMBER
  /**
   * Function that send a request to retrieve an Organisations Member's details using their ID
   *
   * @returns
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getOrganizationMemberDetails() {

    let getOrganizationMemberDetails = `${config.userManagementURL}/getOrgMember`;
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

    return this.http.request<any>(method, getOrganizationMemberDetails, options);
  }



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET_ALL_ORGANISATION_MEMBERS
  /**
   * Method that sends a request to the API to get the details of all the organisations' members.
   *
   * @returns API response
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllOrganizationMembers() {

    let getAllOrganizationsMembersURL = `${config.userManagementURL}/getAllOrgMembers`;
    let method = 'POST';

    const postData = {
      "orgName": this.authService.getCurrentSessionValue.user.organisation
    }

    console.log("postData: " + postData);

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: postData,
      json: true
    };

    return this.http.request<any>(method, getAllOrganizationsMembersURL, options);

  }

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET_ALL_ORGANISATIONS 
  /**
   * Method that sends a request to the API to get the details of all the organisations.
   *
   * @returns API response
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllOrganizations() {

    const getAllOrganizationsURL = `${config.userManagementURL}/getAllOrganizations`;
    const method = 'POST';

    const options = {
      headers: new HttpHeaders({
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
      }),
      json: true
    };

    return this.http.request<any>(method, getAllOrganizationsURL, options);

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET_ALL_USER_TYPES 
  /**
   * Method that sends a request to the API to get the user types associated with a specific organisation.
   *
   * @returns API response
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getUserTypes(orgName: string) {

    const getUserTypesURL = '';
    const method = 'POST';

    const postData = {
      "orgName": orgName
    }

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: postData,
      json: true
    };

    return this.http.request<any>('POST', '***REMOVED***/getUserTypes', options);

  }



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                   CREATE/ADD_NEW_ORGANISATION
  /**
   * Method that sends a request to the API to create a new Organisation 
   *
   * @param {Interface.Organisation} orgInfo
   * @returns
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  createOrganization(orgInfo: Interface.Organisation) {
    let createOrganizationURL = `${config.userManagementURL}/createOrganization`;
    let method = 'POST';

    const postData = orgInfo;

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

    return this.http.request<any>(method, createOrganizationURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     REMOVE_AN_ORGANISATION
  /**
   * Method that sends a request to the API to remove (deregister) an Organisation
   *
   * @param {Interface.Organisation} orgInfo
   * @returns
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeOrganization(orgInfo: Interface.Organisation) {

    let removeOrganizationURL = `${config.userManagementURL}/removeOrg`;
    let method = 'POST';

    const postData = orgInfo;

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

    return this.http.request<any>(method, removeOrganizationURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    ADD_NEW_FABI_STAFF_MEMBER
  /**
   * Method that sends a request to the API to add a new FABI Staff Member to the database
   *
   * @param {Interface.StaffInfo} staffInfo
   * @returns
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addStaffMember(staffInfo: Interface.StaffInfo) {

    if (staffInfo.position == "Admin")
      return this.addFABIAdmin(staffInfo);

    let addStaffMemberURL = `${config.userManagementURL}/addStaff`;
    let method = 'POST';

    const postData = {
      "staff": staffInfo
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

    return this.http.request<any>(method, addStaffMemberURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    REMOVE_FABI_STAFF_MEMBER 
  /**
   * Method that sends a request to the API to remove a FABI Staff Member
   *
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeFABIStaffMember(staffInfo: Interface.StaffInfo) {

    let removeStaffMemberURL = `${config.userManagementURL}/removeStaff`;
    let method = 'POST';

    const postData = staffInfo;

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

    return this.http.request<any>(method, removeStaffMemberURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET_ALL_FABI_STAFF 
  /**
   * Method that sends a request to the API to get all FABI Staff Members
   *
   * @returns
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllStaffMembers() {

    let getStaffMembersURL = `${config.userManagementURL}/getAllStaff`;
    let method = 'POST';

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
      },
      json: true
    };

    return this.http.request<any>(method, getStaffMembersURL, options);

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      ADD_NEW_FABI_ADMIN
  /**
   * Method that send a request to the API to add a new FABI Admin to the database
   *
   * @param {Interface.StaffInfo} staffInfo
   * @returns
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addFABIAdmin(staffInfo: Interface.StaffInfo) {
    let addFABIAdminURL = `${config.userManagementURL}/addFabiAdmin`;
    let method = 'POST';

    const postData = {
      "admin": staffInfo
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

    return this.http.request<any>(method, addFABIAdminURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  ADD_A_NEW_ORGANISATION_MEMBER
  /**
   * Method that sends a request to the API to add a new Member to a specific Organisation
   *
   * @param {Interface.Organisation} orgInfo
   * @param {Interface.OrganisationMember} memberInfo
   * @returns
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addOrgMember(orgInfo: Interface.Organisation, memberInfo: Interface.OrganisationMember) {

    let addMemberURL = `${config.userManagementURL}/addMemberToOrg`;
    let method = 'POST';

    console.log("orgName: " + orgInfo.orgName);
    const postData = {
      "orgName": orgInfo.orgName,
      "member": memberInfo,
      "userType": "Member"
    }

    console.log("//// POST: " + JSON.stringify(postData));

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

    return this.http.request<any>(method, addMemberURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    REMOVE_ORGANIZATION_MEMBER
  /**
   * Method that sends a request to the API to remove an Organizations Member
   *
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeOrganizationMember(memberInfo: Interface.OrganisationMember) {

    let removeMemberURL = `${config.userManagementURL}/removeMember`;
    let method = 'POST';

    const postData = {
      "orgName": this.authService.getCurrentSessionValue.user.organisation,
      "id": memberInfo.ID
    }

    console.log("//// POST: " + JSON.stringify(postData))

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

    return this.http.request<any>(method, removeMemberURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    UPDATE_FABI_MEMBER_NOTIFICATIONS
  /**
   * Method that sends a request to the API to update the notifications associated with a specific user.
   *
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  updateFABIMemberNotifications(userID: string, notifications: string[]) {
    // const options = {
    //   headers: {
    //     'cache-control': 'no-cache',
    //     'Content-Type': 'application/json',
    //     "Access-Control-Allow-Origin": "*",
    //     'Accept': 'application/json'
    //   },
    //   body: postData,
    //   json: true
    // };

    // return this.http.request<any>(method, removeMemberURL, options);
  }
  
}
/**
 * File Name: user-management-api.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services/user-management-api.service.ts
 * Project Name: fabi-web
 * Created Date: Saturday, July 6th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Sunday, August 18th 2019
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
import { map } from 'rxjs/operators';


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

//Object for defining how a member of FABI is structured
export interface Member {
  Email: string;          //This will contain the email retreived from the DB (is the unique identifier for the member) 
  Name: string;           //This will be the name of the member
  Surname: string;        //This will be the surname of the member
  ID: string;             //The id number of the member;
}

//Object for defining the JSON object to be sent when requesting the members of an organization
export interface POSTOrganization {
  orgName: string;        //The name of the organization to be fetched
}

//Object for defining the JSON object to be sent when requesting the details of a member
export interface POSTMember {
  orgName: string;        //The name of the organization to be fetched
  id: string;             //THe ID of the user
}

//Object for defning the JSOn object to be sent when the details of a FABI member are updated
export interface UpdateMember {
  fname: string;          //The name of the FABI member
  surname: string;        //The surname of the FABI member
  email: string;          //The email of the FABI member
}

//Object for defning the JSOn object to be sent when the details of a FABI member are updated
export interface POSTUpdateMember {
  orgName: string,
  id: string;                 //The ID number of the FABI member to be updated
  fields: UpdateMember;       //The fields to the updated
}

//Object for defning the JSOn object to be sent when the details of an organization member are updated
export interface UpdateOrganization {
  fname: string;          //The name of the organization member
  surname: string;        //The surname of the organization member
  email: string;          //The email of the organization member
}

//Object for defning the JSOn object to be sent when the details of an organization member are updated
export interface POSTUpdateOrganization {
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
  constructor(private http: HttpClient, private authService: AuthenticationService) { } s


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     GET ALL FABI MEMBERS 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the FABI members
   *
   * @returns API response @type any
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllFABIMembers() {
    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
      "orgName": this.authService.getCurrentSessionValue.user.organisation
    }

    const options = {
      method: 'POST',
      url: getAllFABIMembersURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: postData,
      json: true
    };

    return this.http.request('POST', getAllFABIMembersURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET ALL FABI ADMINS 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the FABI administrators
   *
   * @returns API response @type any
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllFABIAdmins() {
    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
      "orgName": this.authService.getCurrentSessionValue.user.organisation
    }

    const options = {
      method: 'POST',
      url: getAllFABIAdminsURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: postData,
      json: true
    };

    return this.http.request('POST', getAllFABIAdminsURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            GET USER DETAILS 
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
    
    var data: POSTMember = { orgName: organization, id: idNo };

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
  //                                                         UPDATE FABI MEMBER DETAILS 
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
  updateFABIMemberDetails(mail: string, name: string, lname: string) {

    var member: UpdateMember = { 
      fname: name, 
      surname: lname, 
      email: mail
    };

    var data: POSTUpdateMember = { 
      orgName: this.authService.getCurrentSessionValue.user.organisation,
      id: this.authService.getCurrentSessionValue.user.ID, 
      fields: member 
    };

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

    return this.http.request('POST', updateStaffMemberDetailsURL, options).pipe(map((response : any) => {
      if (response && (response.token && response.token != '' && response.code == 200)) {
        this.authService.updateSessionVariables(response.data);
      }
      return response;
    }));
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      UPDATE ORGANIZATION MEMBER DETAILS 
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
  updateOrganizationMemberDetails(mail: string, name: string, lname: string) {


    var member: UpdateOrganization = { 
      fname: name, 
      surname: lname, 
      email: mail
    };

    var data: POSTUpdateOrganization = { 
      orgName: this.authService.getCurrentSessionValue.user.organisation,
      id: this.authService.getCurrentSessionValue.user.ID, 
      fields: member 
    };

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

    return this.http.request('POST', updateOrganizationMemberDetailsURL, options).pipe(map((response : any) => {
      if (response && (response.token && response.token != '' && response.code == 200)) {
        this.authService.updateSessionVariables(response.data);
      }
      return response;
    }));
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GET ORGANIZATION
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
      "id": this.authService.getCurrentSessionValue.user.ID,
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
  //                                                    GET ORGANIZATION MEMBER
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
      "id": this.authService.getCurrentSessionValue.user.ID,
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
  //                                                    GET ALL ORGANISATION MEMBERS
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
      "id": this.authService.getCurrentSessionValue.user.ID,
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
  //                                                    GET ALL ORGANISATIONS 
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

    // const postData = {
    //   "id": this.authService.getCurrentSessionValue.user.ID,
    //   "orgName": this.authService.getCurrentSessionValue.user.organisation
    // }
    
    const options = {
      headers: new HttpHeaders({
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
      }),
      // body: postData,
      json: true
    };

    return this.http.request<any>(method, getAllOrganizationsURL, options);

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET ALL USER TYPES 
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
      "id": this.authService.getCurrentSessionValue.user.ID,
      "orgName": this.authService.getCurrentSessionValue.user.organisation
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
  //                                                   CREATE NEW ORGANISATION
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
  //                                                     REMOVE AN ORGANISATION
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
  //                                                    ADD NEW FABI STAFF MEMBER
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
      "id": this.authService.getCurrentSessionValue.user.ID,
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
  //                                                    REMOVE FABI STAFF MEMBER 
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
  //                                                        GET ALL FABI STAFF 
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

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
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

    return this.http.request<any>(method, getStaffMembersURL, options);

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      ADD NEW FABI ADMIN
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
      "id": this.authService.getCurrentSessionValue.user.ID,
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
  //                                                  ADD A NEW ORGANISATION MEMBER
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
      "id": this.authService.getCurrentSessionValue.user.ID,
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
  //                                                    REMOVE ORGANIZATION MEMBER
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
      "id": memberInfo.id
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
  //                                                    GET FABI ADMIN TYPES
  /**
   * This method is used to get all FABI admin types
   *
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getFABIAdminTypes() {
    let getAdminTypesURL = `${config.userManagementURL}/getAdminTypes`;
    let method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID
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

    return this.http.request<any>(method, getAdminTypesURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET DATABASE NAMES
  /**
   * This method is used to get all the database names from the database
   *
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getDatabaseNames() {
    let getDBNamesURL = `${config.databaseManagementURL}/getDBNames`;
    let method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID
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

    return this.http.request<any>(method, getDBNamesURL, options);
  }

  
  updateStaffPassword(oldPassword: string, newPassword: string) {

    let updateStaffPasswordURL = `${config.userManagementURL}/updateStaffPassword`;
    let method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
      "oldPass": oldPassword,
      "newPass": newPassword
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

    return this.http.request<any>(method, updateStaffPasswordURL, options);
  }

  updateOrganizationMemberPassword(oldPassword: string, newPassword: string) {

    let updateOrganizationMemberPasswordURL = `${config.userManagementURL}/updateOrgMemberPassword`;
    let method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
      "oldPass": oldPassword,
      "newPass": newPassword,
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

    return this.http.request<any>(method, updateOrganizationMemberPasswordURL, options);
  }

}
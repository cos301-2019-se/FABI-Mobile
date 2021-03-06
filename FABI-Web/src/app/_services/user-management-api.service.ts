/**
 * File Name: user-management-api.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services/user-management-api.service.ts
 * Project Name: fabi-web
 * Created Date: Saturday, July 6th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, October 9th 2019
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

//////////////////////////////////////////////////////// URL'S FOR API //////////////////////////////////////////////////////////////// 
const getAllFABIStaffURL = `${config.userManagementURL}/getAllStaff`;
const getAllOrganizationMembers = `${config.userManagementURL}/getAllOrgMembers`;
const getUserDetailsURL = `${config.userManagementURL}/getUserDetails`;
const updateStaffMemberDetailsURL = `${config.userManagementURL}/updateStaffMember`;
const updateOrganizationMemberDetailsURL = `${config.userManagementURL}/updateOrgMember`;
// const getIndividualDeta/ilsURL = `${config.userManagementURL}/getIndividualDetails`;

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
  userID: string
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
  userID: string
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
  userID: string
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
  * @param {AuthenticationService} authService for calling the *authentication* service
  * 
  * @memberof UserManagementAPIService
  */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private http: HttpClient, private authService: AuthenticationService) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     GET ALL FABI STAFF 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the FABI staff
   *
   * @returns API response @type any
   * 
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllFABIStaff() {
    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
      "orgName": this.authService.getCurrentSessionValue.user.organisation,
      "userID": this.authService.getCurrentSessionValue.user.ID
    }

    const options = {
      method: 'POST',
      url: getAllFABIStaffURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      body: postData,
      json: true
    };

    return this.http.request('POST', getAllFABIStaffURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            GET USER DETAILS 
  /**
   *    This function sends a POST request to the API to retrieve a list containing
   *    all the Members of an Organization
   *
   * @param {string} organization Name of the organization that the user belongs to
   * @param {string} idNo The id number of the user
   * 
   * @returns API response @type any
   * 
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getUserDetails(organization: string, idNo: string) {    
    var data: POSTMember = { orgName: organization, id: idNo, userID: this.authService.getCurrentSessionValue.user.ID };

    const options = {
      method: 'POST',
      url: getUserDetailsURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      body: data,
      json: true
    };

    return this.http.request('POST', getUserDetailsURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         UPDATE FABI MEMBER DETAILS 
  /**
   * This function is used to send updated FABI staff details to the database
   *
   * @param {string} mail Email of the staff member
   * @param {string} name Name of the staff member
   * @param {string} lname Surname of the staff member
   * @param {string} idNo ID number of the staff member
   * 
   * @returns API response @type any
   * 
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
      userID: this.authService.getCurrentSessionValue.user.ID,
      fields: member 
    };

    const options = {
      method: 'POST',
      url: updateStaffMemberDetailsURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
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
   * This function is used to send updated organization member details to the database
   *
   * @param {string} mail Email of the staff member
   * @param {string} name Name of the staff member
   * @param {string} lname Surname of the staff member
   * 
   * @returns API response @type any
   * 
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
      userID: this.authService.getCurrentSessionValue.user.ID,
      fields: member 
    };

    const options = {
      method: 'POST',
      url: updateOrganizationMemberDetailsURL,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
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
   * @returns API response @type any
   * 
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getOrganizationDetails() {
    let getOrganizationDetails = `${config.userManagementURL}/getOrgDetails`;
    let method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
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

    return this.http.request<any>(method, getOrganizationDetails, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET ORGANIZATION MEMBER
  /**
   * Function that send a request to retrieve an Organisations Member's details using their ID
   *
   * @returns API response @type any
   * 
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getOrganizationMemberDetails() {
    let getOrganizationMemberDetails = `${config.userManagementURL}/getOrgMember`;
    let method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
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

    return this.http.request<any>(method, getOrganizationMemberDetails, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET ALL ORGANISATION MEMBERS
  /**
   * Method that sends a request to the API to get the details of all the organisations' members.
   *
   * @returns API response @type any
   * 
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllOrganizationMembers() {
    let getAllOrganizationsMembersURL = `${config.userManagementURL}/getAllOrgMembers`;
    let method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
      "orgName": this.authService.getCurrentSessionValue.user.organisation,
      "userID": this.authService.getCurrentSessionValue.user.ID
    }

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
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
   * @returns API response @type any
   * 
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
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      }),
      json: true
    };

    return this.http.request<any>(method, getAllOrganizationsURL, options);

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET ALL USER TYPES 
  /**
   * Method that sends a request to the API to get the user types associated with a specific organisation.
   * 
   * @param {string} orgName
   *
   * @returns API response @type any
   * 
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getUserTypes(orgName: string) {
    const getUserTypesURL = '';
    const method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
      "orgName": this.authService.getCurrentSessionValue.user.organisation,
      "userID": this.authService.getCurrentSessionValue.user.ID
    }

    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
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
   * @param {Interface.Organisation} orgInfo The new organization to create
   * 
   * @returns API response @type any
   * 
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
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      body: postData,
      json: true
    };

    return this.http.request<any>(method, createOrganizationURL, options);
  }


  sendRequestToRegisterOrganization(orgInfo: Interface.Organisation) {
    let requestToRegisterOrganizationURL = `${config.loginURL}/registerNewOrganization`;
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

    return this.http.request<any>(method, requestToRegisterOrganizationURL, options);
  }

  getPendingOrganizations() {
    let getPendingOrganizationURL = `${config.userManagementURL}/getAllPendingOrganizations`;
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

    return this.http.request<any>(method, getPendingOrganizationURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     REMOVE AN ORGANISATION
  /**
   * Method that sends a request to the API to remove (deregister) an Organisation
   *
   * @param {Interface.Organisation} orgInfo The organization to be removed from the system
   * 
   * @returns API response @type any
   * 
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
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
      },
      body: postData,
      json: true
    };

    return this.http.request<any>(method, removeOrganizationURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     DECLINE A PENDING ORGANISATION
  /**
   * Method that sends a request to the API to remove (deregister) an Organisation
   *
   * @param {Interface.Organisation} orgInfo The organization to be removed from the system
   * 
   * @returns API response @type any
   * 
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  declineOrganizationRequest(orgInfo: Interface.Organisation) {
    let declineOrganizationRequestURL = `${config.userManagementURL}/removePendingOrg`;
    let method = 'POST';

    const postData = orgInfo;

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

    return this.http.request<any>(method, declineOrganizationRequestURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    ADD NEW FABI STAFF MEMBER
  /**
   * Method that sends a request to the API to add a new FABI Staff Member to the database
   *
   * @param {Interface.StaffInfo} staffInfo The new staff member to be added to FABI
   * 
   * @returns API response @type any
   * 
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addStaffMember(staffInfo: Interface.StaffInfo, databasePrivileges: Interface.DatabasePrivilege[]) {
    let staffDetails = {"fname": staffInfo.fname, "surname": staffInfo.surname, "email": staffInfo.email, "phone": staffInfo.phone};

    let addStaffMemberURL = `${config.userManagementURL}/addStaff`;
    let method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
      "staff": staffDetails,
      "databases": databasePrivileges,
      "userType": staffInfo.position,
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

    return this.http.request<any>(method, addStaffMemberURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    REMOVE FABI STAFF MEMBER 
  /**
   * Method that sends a request to the API to remove a FABI Staff Member
   * 
   * @param {Interface.StaffInfo} staffInfo The staff member to be removed from the system
   * 
   * @returns API response @type any
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
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authService.getCurrentSessionValue.token}`
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
   * @returns API response @type any
   * 
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllStaffMembers() {
    let getStaffMembersURL = `${config.userManagementURL}/getAllStaff`;
    let method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
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

    return this.http.request<any>(method, getStaffMembersURL, options);

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      ADD NEW FABI ADMIN
  /**
   * Method that send a request to the API to add a new FABI Admin to the database
   *
   * @param {Interface.StaffInfo} staffInfo The admin member to be added to the system
   * 
   * @returns API response @type any
   * 
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addFABIAdmin(staffInfo: Interface.StaffInfo) {
    let addFABIAdminURL = `${config.userManagementURL}/addFabiAdmin`;
    let method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
      "admin": staffInfo,
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

    return this.http.request<any>(method, addFABIAdminURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  ADD A NEW ORGANISATION MEMBER
  /**
   * Method that sends a request to the API to add a new Member to a specific Organisation
   *
   * @param {Interface.Organisation} orgInfo The organization that the member needs to be added to
   * @param {Interface.OrganisationMember} memberInfo The member to be added to the system
   * 
   * @returns API response @type any
   * 
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addOrgMember(orgInfo: Interface.Organisation, memberInfo: Interface.OrganisationMember) {
    let addMemberURL = `${config.userManagementURL}/addMemberToOrg`;
    let method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
      "orgName": orgInfo.orgName,
      "member": memberInfo,
      "userType": "Member",
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

    return this.http.request<any>(method, addMemberURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    REMOVE ORGANIZATION MEMBER
  /**
   * Method that sends a request to the API to remove an Organizations Member
   * 
   * @param {Interface.OrganisationMember} memberInfo The organization member to be removed from the system
   * 
   * @returns API response @type any
   *
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeOrganizationMember(memberInfo: Interface.OrganisationMember) {    
    let removeMemberURL = `${config.userManagementURL}/removeMember`;
    let method = 'POST';

    const postData = {
      "orgName": this.authService.getCurrentSessionValue.user.organisation,
      "id": memberInfo.id,
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

    return this.http.request<any>(method, removeMemberURL, options);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET FABI ADMIN TYPES
  /**
   * This method is used to get all FABI admin types
   * 
   * @returns API response @type any
   *
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getFABIAdminTypes() {
    let getAdminTypesURL = `${config.userManagementURL}/getAdminTypes`;
    let method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
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

    return this.http.request<any>(method, getAdminTypesURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET DATABASE NAMES
  /**
   * This method is used to get all the database names from the database
   * 
   * @returns API response @type any
   *
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getDatabaseNames() {
    let getDBNamesURL = `${config.databaseManagementURL}/getDBNames`;
    let method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
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

    return this.http.request<any>(method, getDBNamesURL, options);
  }

  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    UPDATE STAFF PASSWORD
  /**
   * This function is used to update the password of a user
   * 
   * @param {string} oldPassword The old password of the user
   * @param {string} newPassword The new password for the user
   * 
   * @returns API response @type any
   *
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  updateStaffPassword(oldPassword: string, newPassword: string) {
    let updateStaffPasswordURL = `${config.userManagementURL}/updateStaffPassword`;
    let method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
      "oldPass": oldPassword,
      "newPass": newPassword,
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

    return this.http.request<any>(method, updateStaffPasswordURL, options);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    UPDATE ORGANIZATION MEMBER PASSWORD
  /**
   * This function is used to update the password of an organization member
   * 
   * @param {string} oldPassword The old password of the user
   * @param {string} newPassword The new password for the user
   * 
   * @returns API response @type any
   *
   * @memberof UserManagementAPIService
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  updateOrganizationMemberPassword(oldPassword: string, newPassword: string) {
    let updateOrganizationMemberPasswordURL = `${config.userManagementURL}/updateOrgMemberPassword`;
    let method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
      "oldPass": oldPassword,
      "newPass": newPassword,
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

    return this.http.request<any>(method, updateOrganizationMemberPasswordURL, options);
  }

  getFABIAdmins() {
    let getFABIAdminURL = `${config.userManagementURL}/getAllFabiMembers`;
    let method = 'POST';

    const postData = {
      "id": this.authService.getCurrentSessionValue.user.ID,
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

    return this.http.request<any>(method, getFABIAdminURL, options);
  }


  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // //                                                    GET SESSIONLESS USER DETAILS
  // /**
  //  * This function is used to get the details for a single member.
  //  * 
  //  * @param {string} email The email of the user
  //  * @param {string} org The organisation of the user
  //  * 
  //  * @returns API response @type any
  //  *
  //  * @memberof UserManagementAPIService
  //  */
  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // getSessionlessUserDetails(org: string, email: string){
  //   let method = 'POST';

  //   const postData = {
  //     "email": email,
  //     "orgName": org
  //   }

  //   const options = {
  //     headers: {
  //       'cache-control': 'no-cache',
  //       'Content-Type': 'application/json',
  //       "Access-Control-Allow-Origin": "*",
  //       'Accept': 'application/json'
  //     },
  //     body: postData,
  //     json: true
  //   };

  //   return this.http.request<any>(method, getIndividualDetailsURL, options);
  // }

  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // //                                                    RESET FABI PASSWORD
  // /**
  //  * This function is used to reset a forgotten password for FABI staff.
  //  * 
  //  * @param {string} email The email of the user
  //  * @param {string} password The new password for the user
  //  * @param {string} id The id number of the user
  //  * 
  //  * @returns API response @type any
  //  *
  //  * @memberof UserManagementAPIService
  //  */
  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // resetFABIPassword(password: string, id: string){
  //   let method = 'POST';

  //   const postData = {
  //     "id": id,
  //     "fields": {
  //       "password": password
  //     }
  //   }

  //   const options = {
  //     headers: {
  //       'cache-control': 'no-cache',
  //       'Content-Type': 'application/json',
  //       "Access-Control-Allow-Origin": "*",
  //       'Accept': 'application/json'
  //     },
  //     body: postData,
  //     json: true
  //   };

  //   return this.http.request<any>(method, updateStaffMemberDetailsURL, options);
  // }

  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // //                                                    RESET ORG MEMBER PASSWORD
  // /**
  //  * This function is used to reset a forgotten password for FABI staff.
  //  * 
  //  * @param {string} org The organisation of the user
  //  * @param {string} password The new password for the user
  //  * @param {string} id The id number of the user
  //  * 
  //  * @returns API response @type any
  //  *
  //  * @memberof UserManagementAPIService
  //  */
  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // resetOrgMemberPassword(password: string, id: string, org: string){
  //   let method = 'POST';

  //   const postData = {
  //     "orgName": org,
  //     "id": id,
  //     "fields": {
  //       "password": password
  //     }
  //   }

  //   const options = {
  //     headers: {
  //       'cache-control': 'no-cache',
  //       'Content-Type': 'application/json',
  //       "Access-Control-Allow-Origin": "*",
  //       'Accept': 'application/json'
  //     },
  //     body: postData,
  //     json: true
  //   };

  //   return this.http.request<any>(method, updateOrganizationMemberDetailsURL, options);
  // }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { registerContentQuery } from '@angular/core/src/render3';
import { StaticInjector } from '@angular/core/src/di/injector';
import { BehaviorSubject } from 'rxjs';

//Globals variables used to hold the API call urls
const getAllFABIMembersURL = 'https://user-management-dot-api-fabi.appspot.com/getAllFabiMembers';
const getAllFABIAdminsURL = 'https://user-management-dot-api-fabi.appspot.com/getAllFabiAdmins';
const getAllOrganizationMembers = 'https://user-management-dot-api-fabi.appspot.com/getAllOrgMembers';

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

   constructor(private http: HttpClient) { }

   /*
        This function sends a POST request to the API to retrieve a list containing
        all the FABI members
   */
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

    /*
        This function sends a POST request to the API to retrieve a list containing
        all the FABI administrators
   */
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

    /*
        This function sends a POST request to the API to retrieve a list containing
        all the Members of an Organization
   */
    getAllOrganizationMembers(organization: string) {
        var data: POSTOrganization = { orgName: organization };
        console.log(data);

        const options = {
            method: 'POST',
            url: getAllOrganizationMembers,
            headers: {
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            postData: data,
            json: true
        };

        return this.http.request('POST', getAllOrganizationMembers, options);        
    }
}
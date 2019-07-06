import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { registerContentQuery } from '@angular/core/src/render3';
import { StaticInjector } from '@angular/core/src/di/injector';
import { BehaviorSubject } from 'rxjs';

//Globals variables used to hold the API call urls
const getAllFABIMembersURL = '***REMOVED***/getAllFabiMembers';
const getAllFABIAdminsURL = '***REMOVED***/getAllFabiAdmins';

//Object for defining how a member of FABI is structured
export interface Member {
    Email: string;      //This will contain the email retreived from the DB (is the unique identifier for the member) 
    Name: string;       //This will be the name of the member
    Surname: string;    //This will be the surname of the member
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
}
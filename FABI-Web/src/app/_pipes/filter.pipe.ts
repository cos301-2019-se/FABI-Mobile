/**
 * File Name: filter.pipe.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\_services\filter.pipe.ts
 * Project Name: fabi-web
 * Created Date: Friday, August 16th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, September 26th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
@Injectable()
export class FilterPipe implements PipeTransform {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TRANSFORM 
  /**
   * This function will be used to dynamically search all tables throughout the applications.
   * 
   * @param {any[]} items This is the array of items from the table to be searched
   * @param {string} type The type of search based on the component that calls the filter function
   * @param {string} value The value to be searched for 
   * 
   * @memberof FilterPipe
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  transform(items: any[], type: string, value: string): any[] {
    //Return the array of items if either there are no items, or there is no search value
    if (!items || !value) {
      return items;
    }

    if(type == "request-report"){
      //If the search is being requested from the Reporting component
      return items.filter((val) => {
        let temp = (val.user.toLocaleLowerCase().includes(value)) || 
        (val.requestor.toLocaleLowerCase().includes(value)) ||
        (val.cultureNumber.toLocaleLowerCase().includes(value)) ||
        (val.taxonName.toLocaleLowerCase().includes(value)) ||
        (val.referenceNumber.toLocaleLowerCase().includes(value)) ||
        (val.dateRequested.toLocaleLowerCase().includes(value)) ||
        (val.dateSubmitted.toLocaleLowerCase().includes(value));
        return temp;
      });
    }
    else if(type == "deposit-report"){
      //If the search is being requested from the Reporting component
      return items.filter((val) => {
        let temp = (val.user.toLocaleLowerCase().includes(value)) || 
        (val.cultureNumber.toLocaleLowerCase().includes(value)) ||
        (val.name.toLocaleLowerCase().includes(value)) ||
        (val.collectedBy.toLocaleLowerCase().includes(value)) ||
        (val.dateCollected.toLocaleLowerCase().includes(value)) ||
        (val.isolatedBy.toLocaleLowerCase().includes(value)) ||
        (val.identifiedBy.toLocaleLowerCase().includes(value)) ||
        (val.dateSubmitted.toLocaleLowerCase().includes(value));
        return temp;
      });
    }
    else if(type == "user-log"){
      //If the search is being requested from the Reporting page
      return items.filter((val) => {
        let temp = (val.action.toLocaleLowerCase().includes(value)) || 
        (val.date.toLocaleLowerCase().includes(value)) ||
        (val.user1.toLocaleLowerCase().includes(value)) ||
        (val.user2.toLocaleLowerCase().includes(value));
        return temp;
      });
    }
    else if(type == "database-log"){
      //If the search is being requested from the Reporting page
      return items.filter((val) => {
        let temp = (val.action.toLocaleLowerCase().includes(value)) || 
        (val.date.toLocaleLowerCase().includes(value)) ||
        (val.user.toLocaleLowerCase().includes(value)) ||
        (val.details.toLocaleLowerCase().includes(value));
        return temp;
      });
    }
    else if(type == "access-log"){
      //If the search is being requested from the Reporting page
      return items.filter((val) => {
        let temp = (val.details.toLocaleLowerCase().includes(value)) || 
        (val.date.toLocaleLowerCase().includes(value)) ||
        (val.user.toLocaleLowerCase().includes(value));
        return temp;
      });
    }
    else if(type == "error-log"){
      //If the search is being requested from the Reporting page
      return items.filter((val) => {
        let temp = (val.code.toLocaleLowerCase().includes(value)) || 
        (val.date.toLocaleLowerCase().includes(value)) ||
        (val.details.toLocaleLowerCase().includes(value)) ||
        (val.user.toLocaleLowerCase().includes(value));
        return temp;
      });
    }
    else if(type == "admin-dashboard"){
      //If the search is being requested from the Admin dashboard (or any other dashboard)
      return items.filter((val) => {
        let temp = (val.fname.toLocaleLowerCase().includes(value)) || 
        (val.surname.toLocaleLowerCase().includes(value)) ||
        (val.email.toLocaleLowerCase().includes(value));
        return temp;
      });
    }
    else if(type == "database"){
      //If the search is requested from the Database Handler component
      return items.filter((val) => {
        let temp = (val.toLocaleLowerCase().includes(value));
        return temp;
      });
    }
    else if(type == "staff-database"){
      //If the search is requested form the Staff View Databases component
      return items.filter((val) => {
        let temp = (val.name.toLocaleLowerCase().includes(value));
        return temp;
      });
    }
    else if(type == "clinic-admin"){
      //If the search is requested from the Clinic Admin View Samples component
      return items.filter((val) => {
        let temp = (val.referenceNumber.toLocaleLowerCase().includes(value)) || 
        (val.orgName.toLocaleLowerCase().includes(value)) ||
        (val.userID.toLocaleLowerCase().includes(value)) ||
        (val.status.toLocaleLowerCase().includes(value));
        return temp;
      });
    }
    else if(type == "organizations"){
      //If the search is requested from the Organization Handler component
      return items.filter((val) => {
        let temp = (val.orgName.toLocaleLowerCase().includes(value));
        return temp;
      });
    }
    else if(type == "samples"){
      //If the search is requested from any component that displayes samples
      return items.filter((val) => {
        let temp = (val.referenceNumber.toLocaleLowerCase().includes(value)) ||
        (val.userID.toLocaleLowerCase().includes(value)) ||
        (val.status.toLocaleLowerCase().includes(value));
        return temp;
      });
    }
    else if(type == "member-samples"){
      //If the search is requested from the Member View Samples component
      return items.filter((val) => {
        let temp = (val.referenceNumber.toLocaleLowerCase().includes(value)) ||
        (val.status.toLocaleLowerCase().includes(value));
        return temp;
      });
    }
    else if(type == "staff-samples"){
      //If the search is requested from the Staff Dashboard component
      return items.filter((val) => {
        let temp = (val.referenceNumber.toLocaleLowerCase().includes(value)) ||
        (val.status.toLocaleLowerCase().includes(value)) ||
        (val.dateSubmitted.toLocaleLowerCase().includes(value));
        return temp;
      });
    }
    else if(type == "deposits"){
      //If the search is requested from the Staff Dashboard component
      return items.filter((val) => {
        let temp = (val.cultureNumber.toLocaleLowerCase().includes(value)) ||
        (val.name.toLocaleLowerCase().includes(value)) ||
        (val.dateSubmitted.toLocaleLowerCase().includes(value));
        return temp;
      });
    }
  }
}
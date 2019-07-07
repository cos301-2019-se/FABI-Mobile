/**
 * File Name: organization-dashboard.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization\organization-dashboard\organization-dashboard.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, June 25th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit } from '@angular/core';
// import { OrganizationAPIService } from '../organization-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { UserManagementAPIService, Member } from '../../user-management-api.service';
import { DiagnosticClinicAPIService } from '../../diagnostic-clinic-api.service';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss']
})

export class OrganizationDashboardComponent implements OnInit {

  //Global string variables to dynamically load the HTML statistic elements
  memberStats: string;

  organizationMembers: Member[] = [];                    //array containing all the members for an organization

  numberOfOrganizationMembers: number;                   //a variable containing the number of members belonging to the organization
  organizationName: string = 'TestOrg4';            //a variable containing the name of the organization

  constructor(private userManagementService: UserManagementAPIService) { }

  /*
  *  This function will use an API service to get all the members of an organization. These members will be read into the
  *  'members' Object. The function does not receive any parameters but it will populate a 'heading' element on the
  *  HTML page with the number of members belonging to the organization.
  */
  getNumberOfOrganizationMembers(){
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllOrganizationMembers(this.organizationName).subscribe((response: any) => {
      if(response.success == true){
          //Populating the arrays with the returned data
        var tempMembers = response.data.members;
        for(var i = 0; i < tempMembers.length; i++){
          var tempMember: Member = {Name: tempMembers[i].fname, Surname: tempMembers[i].surname, Email: tempMembers[i].email};
          this.organizationMembers.push(tempMember);
        }

        this.numberOfOrganizationMembers = this.organizationMembers.length;
        this.memberStats = this.numberOfOrganizationMembers.toString();
      }
      else{
        //The organization's members could not be retrieved
      }
    });
  }

  /*
  *  This function will use an API service to get all the samples of an organization. These samples will be read into the
  *  'samples' Object. The function does not receive any parameters but it will populate a 'heading' element on the
  *  HTML page with the number of samples belonging to the organization.
  */
  getNumberOfOrganizationSamples(){}

  /*
  *  This function will use an API service to get all the completed (processed) samples of an organization. These 
  *  samples will be read into the 'completedSamples' Object. The function does not receive any parameters but it will 
  *  populate a 'heading' element on the HTML page with the percentage of completed samples belonging to the organization.
  */
  getNumberOfCompletedOrganizationSamples(){}

  /*
  *  This function will load the organization's notifications into the notification section on the HTML page
  */
  loadNotifications(){}

  /*
  *  This function will remove a notification for the notification section when the user clicks on the 'exit'
  *  button/icon associated with that notification
  */
  removeNotification(){}

  ngOnInit() {
    //These functions are called when the page loads and the component is created
    this.getNumberOfOrganizationMembers();
    this.getNumberOfOrganizationSamples();
    this.getNumberOfCompletedOrganizationSamples();
    this.loadNotifications();
  }

}

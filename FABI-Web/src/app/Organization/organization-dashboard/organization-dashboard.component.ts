/**
 * File Name: organization-dashboard.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization\organization-dashboard\organization-dashboard.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Monday, July 8th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit,ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { UserManagementAPIService, Member } from '../../services/user-management-api.service';
import { DiagnosticClinicAPIService } from '../../services/diagnostic-clinic-api.service';
import { AdminDivComponent } from '../../Dynamic-Components/admin-div/admin-div.component'; 

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss']
})

export class OrganizationDashboardComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Contains the member stats that will be dynamically loaded in the HTML page - @type {string} */
  memberStats: string;

  /** Object array for holding the members of the organization -  @type {Member[]} */
  organizationMembers: Member[] = [];                   

  /** The total number of members in the organization - @type {number} */
  numberOfOrganizationMembers: number;  
  /** The name of the logged in organization - @type {string} */                 
  organizationName: string = 'TestOrg4';
  
  /** Holds the div element (membersContainer) from the HTML page - @type {ElementRef} */
  @ViewChild('membersContainer', {read: ViewContainerRef}) membersContainer;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of OrganizationDashboardComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
   * @memberof OrganizationDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private userManagementService: UserManagementAPIService, private resolver: ComponentFactoryResolver) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                            GET_NUMBER_OF_ORGANIZATION_MEMBERS
  /**
   *  This function will use an API service to get all the members of an organization. These members will be read into the
   *  'members' Object. The function does not receive any parameters but it will populate a 'heading' element on the
   *  HTML page with the number of members belonging to the organization.
   * 
   * @memberof OrganizationDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

        //Dynamically loads all the members into the HTML page
        for(var i = 0; i < this.organizationMembers.length; i++){
          const membersDivRef = this.membersContainer.createComponent(this.resolver.resolveComponentFactory(AdminDivComponent));
          membersDivRef.instance.Name = this.organizationMembers[i].Name;
          membersDivRef.instance.Surname = this.organizationMembers[i].Surname;
          membersDivRef.instance.Email = this.organizationMembers[i].Email;
        }

        this.numberOfOrganizationMembers = this.organizationMembers.length;
        this.memberStats = this.numberOfOrganizationMembers.toString();
      }
      else{
        //The organization's members could not be retrieved
        const membersDivRef = this.membersContainer.createComponent(this.resolver.resolveComponentFactory(AdminDivComponent));
        membersDivRef.instance.Name = 'Could not load members';
        membersDivRef.instance.Surname = '';
        membersDivRef.instance.Email = '';
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                            GET_NUMBER_OF_ORGANIZATION_SAMPLES
  /**
   *  This function will use an API service to get all the samples of an organization. These samples will be read into the
   *  'samples' Object. The function does not receive any parameters but it will populate a 'heading' element on the
   *  HTML page with the number of samples belonging to the organization.
   * 
   * @memberof OrganizationDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getNumberOfOrganizationSamples(){}


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                           GET_NUMBER_OF_COMPLETED ORGANIZATION SAMPLES
  /**
   *  This function will use an API service to get all the completed (processed) samples of an organization. These 
   *  samples will be read into the 'completedSamples' Object. The function does not receive any parameters but it will 
   *  populate a 'heading' element on the HTML page with the percentage of completed samples belonging to the organization.
   * 
   * @memberof OrganizationDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getNumberOfCompletedOrganizationSamples(){}

 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_NOTIFICATIONS
  /**
   *  This function will load the organization's notifications into the notification section on the HTML page
   * 
   * @memberof OrganizationDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNotifications(){}


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                              REMOVE_NOTIFICATIONS
  /**
   *  This function will remove a notification for the notification section when the user clicks on the 'exit'
   *  button/icon associated with that notification
   * 
   * @memberof OrganizationDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeNotification(){}


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    NG_ON_INIT()  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call getNumberOfOrganizationMembers() | 2. Call getNumberOfOrganizationSamples() |
   *              3. Call getNumberOfCompletedOrganizationSamples() | 4. Call loadNotifications() 
   * @memberof OrganizationDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.getNumberOfOrganizationMembers();
    this.getNumberOfOrganizationSamples();
    this.getNumberOfCompletedOrganizationSamples();
    this.loadNotifications();
  }

}

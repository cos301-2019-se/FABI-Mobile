/**
 * File Name: organization-dashboard.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization\organization-dashboard\organization-dashboard.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Monday, July 26th 2019
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

import { UserManagementAPIService, Member } from '../../_services/user-management-api.service';
import { DiagnosticClinicAPIService, Sample, Species } from '../../_services/diagnostic-clinic-api.service';
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
  /** Contains the sample stats for the organization that will be dynamically loaded in the HTML page - @type {string} */
  sampleStats: string;

  /** Object array for holding the members of the organization -  @type {Member[]} */
  organizationMembers: Member[] = [];     
  organizationMembersExample: Member[] = [];     
  /** Object array for holding the samples of the organization -  @type {Sample[]} */
  organizationSamples: Sample[] = [];            

  /** The total number of members in the organization - @type {number} */
  numberOfOrganizationMembers: number; 
  /** The total number of samples belonging to the organization - @type {number} */
  numberOfOrganizationSamples: number;  
  /** The name of the logged in organization - @type {string} */                 
  organizationName: string = 'TestOrg4';
  /** Indicates if there are notifications to load - @type {boolean} */           
  notifications: boolean = false;
  
  /** Holds the div element (membersContainer) from the HTML page - @type {ElementRef} */
  @ViewChild('membersContainer', {read: ViewContainerRef}) membersContainer;
  /** Holds the div element (notificationContainer) from the HTML page - @type {ElementRef} */
  @ViewChild('notificationContainer', {read: ViewContainerRef}) notificationContainer;

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of OrganizationDashboardComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API service
   * @param {ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
   * @memberof OrganizationDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private userManagementService: UserManagementAPIService, private diagnosticClinicService: DiagnosticClinicAPIService, private resolver: ComponentFactoryResolver) { }


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
          this.organizationMembers = response.data.members;

          this.numberOfOrganizationMembers = this.organizationMembers.length;
          this.memberStats = this.numberOfOrganizationMembers.toString();
      }
      else{
        //The organization's members could not be retrieved
        this.numberOfOrganizationMembers = 0;
        this.memberStats = this.numberOfOrganizationMembers.toString();

        //TODO: handle error
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
  getNumberOfOrganizationSamples(){
    //Subscribing to the DiagnosticClinicAPIService to get a list containing all the samples belonging to the organization
    this.diagnosticClinicService.getAllOrganizationSamples(this.organizationName).subscribe((response: any) => {
      if(response.success == true){
        var tempSamples = response.data.samples;
        this.numberOfOrganizationSamples = tempSamples.length;
        this.sampleStats = this.numberOfOrganizationSamples.toString();
      }
      else{
        this.numberOfOrganizationSamples = 0;
        this.sampleStats = this.numberOfOrganizationSamples.toString();
      }
    });
  }


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
  //                                           TOGGLE_NOTIFICATIONS_TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof OrganizationDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab(){
    this.toggle_status = !this.toggle_status; 
 }

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

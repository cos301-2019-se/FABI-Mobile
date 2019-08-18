/**
 * File Name: member-dashboard.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization-Member\member-dashboard\member-dashboard.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Sunday, August 18th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { SampleDivComponent } from '../../Dynamic-Components/sample-div/sample-div.component';
import { DiagnosticClinicAPIService, Sample, Species } from '../../_services/diagnostic-clinic-api.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.scss']
})

export class MemberDashboardComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Holds the div element (sampleContainer) from the HTML page - @type {ElementRef} */
  @ViewChild('sampleContainer', { read: ViewContainerRef }) sampleContainer;
  /** Holds the div element (notificationContainer) from the HTML page - @type {ElementRef} */
  @ViewChild('notificationContainer', { read: ViewContainerRef }) notificationContainer;

  /** The ID of the logged in member - @type {string} */
  memberID: string = '1234';
  /** The number of samples belonging to the member - @type {number} */
  numberOfMemberSamples: number;
  /** Indicates if there are notifications to load - @type {boolean} */
  notifications: boolean = false;

  /** Object array for holding the samples for the member -  @type {Sample[]} */
  memberSamples: Sample[] = [];

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */
  notificationsTab: boolean = false;
  /** Indicates if the profile tab is hidden/shown - @type {boolean} */
  profileTab: boolean = false;
  /** Indicates if the save button is hidden/shown on the profile tab- @type {boolean} */
  saveBtn: boolean = false;
  /** Indicates if the confirm password tab is hidden/shown on the profile tab - @type {boolean} */
  confirmPasswordInput: boolean = false;
  /** Indicates if the help tab is hidden/shown - @type {boolean} */
  helpTab: boolean = false;

  currentUser: any;

  /** Specifies if the list of samples have been retreived to disable the loading spinner - @type {boolean} */
  sampleTableLoading: boolean = true;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of MemberDashboardComponent.
   * @param {ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
   * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API service
   * @param {AuthenticationService} authService Used for all authentication and session control
   * @param {Router} router
   * @memberof MemberDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private diagnosticClinicService: DiagnosticClinicAPIService
  ) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          NG ON INIT()  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call getNumberOfMemberSamples() | 2. Call getNumberOfCompletedMemberSamples() | 
   *              3. Call loadNotifications()
   * @memberof MemberDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {

    //******** TEMPORARY LOGIN FOR DEVELOPMENT: ********
    this.authService.temporaryLoginOrganisation().subscribe((response: any) => {
      this.currentUser = this.authService.getCurrentSessionValue.user;
      this.getNumberOfMemberSamples();
      this.getNumberOfCompletedMemberSamples();
      this.loadNotifications();
    });

    //******** TO BE USED IN PRODUCTION: ********
    // // Set current user logged in
    // this.currentUser = this.authService.getCurrentSessionValue.user;
    //Calling the neccessary functions as the page loads
    //  this.getNumberOfMemberSamples();
    //  this.getNumberOfCompletedMemberSamples();
    //  this.loadNotifications();
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                GET NUMBER OF MEMBER SAMPLES
  /**
   *  This function will use an API service to get all the samples of a member. These samples will be read into the
   *  'samples' Object. The function does not receive any parameters but it will populate a 'heading' element on the
   *  HTML page with the number of samples belonging to the member.
   * 
   *  This function will also dynamically load all of the samples into the sample section within the HTML page.
   * 
   * @memberof MemberDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getNumberOfMemberSamples() {
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.diagnosticClinicService.retrieveMemberSamples().subscribe((response: any) => {
      if (response.success == true) {
        //Populating the arrays with the returned data
        var tempSamples = response.data.samples;
        for (var i = 0; i < tempSamples.length; i++) {
          var tempSpecies: Species = { species: tempSamples[i].data.species };
          var tempSample: Sample = { userID: tempSamples[i].userID, orgName: tempSamples[i].orgName, status: tempSamples[i].status, referenceNumber: tempSamples[i].referenceNumber, data: tempSpecies };
          this.memberSamples.push(tempSample);
        }

        //Deactivate loading table spinners
        this.sampleTableLoading = false;
        
        this.numberOfMemberSamples = this.memberSamples.length;

        if (this.memberSamples.length == 0) {
          //Dynamically loads one div if no samples are returned
          const sampleDivRef = this.sampleContainer.createComponent(this.resolver.resolveComponentFactory(SampleDivComponent));
          sampleDivRef.instance.Number = 'You currently have no samples.';
          sampleDivRef.instance.Status = '';
          sampleDivRef.instance.Details = '';
        }
        else {
          //Dynamically loads all the samples into the HTML page
          for (var i = 0; i < this.memberSamples.length; i++) {
            const sampleDivRef = this.sampleContainer.createComponent(this.resolver.resolveComponentFactory(SampleDivComponent));
            sampleDivRef.instance.Number = 'Sample' + (i + 1).toString();
            sampleDivRef.instance.Status = 'Status: ' + this.memberSamples[i].status;
            sampleDivRef.instance.Details = 'Species: ' + this.memberSamples[i].data.species;
          }
        }
      }
      else {
        //Could not return samples
        this.numberOfMemberSamples = 0;

        const sampleDivRef = this.sampleContainer.createComponent(this.resolver.resolveComponentFactory(SampleDivComponent));
        sampleDivRef.instance.Number = 'Samples could not be loaded.';
        sampleDivRef.instance.Status = '';
        sampleDivRef.instance.Details = '';
      }
    });
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                GET NUMBER OF COMPLETED MEMBER SAMPLES
  /**
   *  This function will use an API service to get all the completed (processed) samples of a member. These 
   *  samples will be read into the 'completedSamples' Object. The function does not receive any parameters but it will 
   *  populate a 'heading' element on the HTML page with the percentage of completed samples belonging to the member.
   * 
   * @memberof MemberDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getNumberOfCompletedMemberSamples() {

  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        LOAD NOTIFICATIONS
  /**
   *  This function will load the organization member's notifications into the notification section on the HTML page
   * 
   * @memberof MemberDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNotifications() { }



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         TOGGLE NOTIFICATIONS 
  /**
   * This function will toggle the display of the notifications side panel
   * 
   * @memberof MemberDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificationsTab() {
    this.notificationsTab = !this.notificationsTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                           TOGGLE PROFILE 
  /**
   * This function will toggle the display of the profile side panel
   * 
   * @memberof MemberDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleProfileTab() {
    this.profileTab = !this.profileTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       DISPLAY PROFILE SAVE BUTTON 
  /**
   * This function will display the save button option if any details in the profile have been altered
   * 
   * @memberof MemberDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayProfileSaveBtn() {
    this.saveBtn = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      DISPLAY PASSWORD CONFIRM INPUT 
  /**
   * This function will display the confirm password input field in the user's password was altered
   * 
   * @memberof MemberDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayConfirmPasswordInput() {
    this.confirmPasswordInput = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE HELP 
  /**
   * This function will toggle the display of the help side panel
   * 
   * @memberof MemberDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleHelpTab() {
    this.helpTab = !this.helpTab;
  }


}

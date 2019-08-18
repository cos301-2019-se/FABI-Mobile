/**
 * File Name: organization-dashboard.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization\organization-dashboard\organization-dashboard.component.ts
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

import { UserManagementAPIService, Member } from '../../_services/user-management-api.service';
import { DiagnosticClinicAPIService, Sample, Species } from '../../_services/diagnostic-clinic-api.service';
import { AdminDivComponent } from '../../Dynamic-Components/admin-div/admin-div.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';

import {
  Component, ViewChild, ElementRef, isDevMode, Inject, Output, EventEmitter, TemplateRef,
  ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef
} from '@angular/core';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { sharedStylesheetJitUrl } from '@angular/compiler';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';

import { NotificationLoggingService, UserLogs, DatabaseManagementLogs, AccessLogs } from '../../_services/notification-logging.service';
import { ErrorComponent } from 'src/app/_errors/error-component/error.component';


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
  @ViewChild('membersContainer', { read: ViewContainerRef }) membersContainer;
  /** Holds the div element (notificationContainer) from the HTML page - @type {ElementRef} */
  @ViewChild('notificationContainer', { read: ViewContainerRef }) notificationContainer;

  /** The staff member's email address -  @type {string} */
  email: string = '';
  /** The staff member's organization -  @type {string} */
  organization: string = '';
  /** The staff member's id -  @type {string} */
  id: string = '';
  /** The staff member's name -  @type {string} */
  name: string = '';
  /** The staff member's surname -  @type {string} */
  surname: string = '';
  /** The staff member's password -  @type {string} */
  password: string = '';
  /** The staff member's confirmed password -  @type {string} */
  confirmPassword: string = '';

  /** The form to display the admin member's details -  @type {FormGroup} */
  adminProfileForm: FormGroup;

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

  currentUser: any

  /** Specifies if the list of members have been retreived to disable the loading spinner - @type {boolean} */
  memberTableLoading: boolean = true;
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of OrganizationDashboardComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API service
   * @param {ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
   * @param {AuthenticationService} authService Used for all authentication and session control
   * @param {Router} router
   * 
   * @memberof OrganizationDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService, 
    private router: Router, 
    private userManagementService: UserManagementAPIService, 
    private diagnosticClinicService: DiagnosticClinicAPIService, 
    private resolver: ComponentFactoryResolver,
    private formBuilder: FormBuilder, 
    public sanitizer: DomSanitizer, 
    private notificationLoggingService: NotificationLoggingService, 
    private snackBar: MatSnackBar, 
    private dialog: MatDialog
    ) { 
      this.adminProfileForm = this.formBuilder.group({
        organization_name: '',
        admin_name: '',
        admin_surname: '',
        admin_email: '',
        admin_type: '',
        admin_password: '',
        admin_confirm: ''
      });
      
    }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                             CONSTRUCTOR
/**
 * Creates an instance of OrganizationDashboardComponent.
 * 
 * @param {UserManagementAPIService} userManagementService For calling the User Management API service
 * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API service
 * @param {ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
 * @param {AuthenticationService} authService Used for all authentication and session control
 * @param {Router} router
 * 
 * @memberof OrganizationDashboardComponent
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
constructor(
  private authService: AuthenticationService,
  private router: Router,
  private userManagementService: UserManagementAPIService,
  private diagnosticClinicService: DiagnosticClinicAPIService,
  private resolver: ComponentFactoryResolver,
  private formBuilder: FormBuilder,
  public sanitizer: DomSanitizer,
  private notificationLoggingService: NotificationLoggingService,
  private snackBar: MatSnackBar,
) {
  this.adminProfileForm = this.formBuilder.group({
    organization_name: '',
    admin_name: '',
    admin_surname: '',
    admin_email: '',
    admin_type: '',
    admin_password: '',
    admin_confirm: ''
  });

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                    NG ON INIT()  
/**
 * This function is called when the page loads
 * 
 * @description 1. Call getNumberOfOrganizationMembers() | 2. Call getNumberOfOrganizationSamples() |
 *              3. Call getNumberOfCompletedOrganizationSamples() | 4. Call loadNotifications() 
 * @memberof OrganizationDashboardComponent
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ngOnInit() {

  //******** TEMPORARY LOGIN FOR DEVELOPMENT: ********
  this.authService.temporaryLoginOrganisation().subscribe((response: any) => {
    this.currentUser = this.authService.getCurrentSessionValue.user;
    this.getNumberOfOrganizationMembers();
    this.getNumberOfOrganizationSamples();
    this.getNumberOfCompletedOrganizationSamples();
    this.loadNotifications();
  });

  //******** TO BE USED IN PRODUCTION: ********
  // // Set current user logged in
  // this.currentUser = this.authService.getCurrentSessionValue.user;
  //Calling the neccessary functions as the page loads
  //  this.getNumberOfOrganizationMembers();
  //  this.getNumberOfOrganizationSamples();
  //  this.getNumberOfCompletedOrganizationSamples();
  //  this.loadNotifications();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET NUMBER OF ORGANIZATION MEMBERS
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
  this.userManagementService.getAllOrganizationMembers().subscribe((response: any) => {
    if (response.success == true) {
      //Populating the arrays with the returned data
      this.organizationMembers = response.data.members;

      //Deactivate loading table spinners
      this.memberTableLoading = false;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                            GET NUMBER OF ORGANIZATION SAMPLES
  /**
   *  This function will use an API service to get all the samples of an organization. These samples will be read into the
   *  'samples' Object. The function does not receive any parameters but it will populate a 'heading' element on the
   *  HTML page with the number of samples belonging to the organization.
   * 
   * @memberof OrganizationDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getNumberOfOrganizationSamples() {

    //Subscribing to the DiagnosticClinicAPIService to get a list containing all the samples belonging to the organization
    this.diagnosticClinicService.retrieveAllOrganizationSamples().subscribe((response: any) => {
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

      //TODO: handle error
    }
  });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                            LOGOUT 
/**
 * This function will log the user out of the web application and clear the authentication data stored in the local storage
 * 
 * @memberof OrganizationDashboardComponent
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
logout() {
  this.authService.logoutUser();
  this.router.navigate(['/login']);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET NUMBER OF ORGANIZATION SAMPLES
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
  this.diagnosticClinicService.retrieveAllOrganizationSamples().subscribe((response: any) => {
    if (response.success == true) {
      var tempSamples = response.data.samples;
      this.numberOfOrganizationSamples = tempSamples.length;
      this.sampleStats = this.numberOfOrganizationSamples.toString();
    }
    else {
      this.numberOfOrganizationSamples = 0;
      this.sampleStats = this.numberOfOrganizationSamples.toString();
    }
  });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                           GET NUMBER OF COMPLETED ORGANIZATION SAMPLES
/**
 *  This function will use an API service to get all the completed (processed) samples of an organization. These 
 *  samples will be read into the 'completedSamples' Object. The function does not receive any parameters but it will 
 *  populate a 'heading' element on the HTML page with the percentage of completed samples belonging to the organization.
 * 
 * @memberof OrganizationDashboardComponent
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
getNumberOfCompletedOrganizationSamples(){ }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  LOAD NOTIFICATIONS
/**
 *  This function will load the organization's notifications into the notification section on the HTML page
 * 
 * @memberof OrganizationDashboardComponent
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
loadNotifications(){ }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              REMOVE NOTIFICATIONS
/**
 *  This function will remove a notification for the notification section when the user clicks on the 'exit'
 *  button/icon associated with that notification
 * 
 * @memberof OrganizationDashboardComponent
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
removeNotification(){ }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                        TOGGLE NOTIFICATIONS 
/**
 * This function will toggle the display of the notifications side panel
 * 
 * @memberof OrganizationDashboardComponent
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
toggleNotificationsTab(){
  this.notificationsTab = !this.notificationsTab;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                          TOGGLE PROFILE 
/**
 * This function will toggle the display of the profile side panel
 * 
 * @memberof OrganizationDashboardComponent
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
toggleProfileTab() {
  this.profileTab = !this.profileTab;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  LOAD ADMIN PROFILE DETAILS
/**
 *  This function will use an API service to load all the admin member's details into the elements on the HTML page.
 * 
 * @memberof OrganizationDashboardComponent
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
loadAdminProfileDetails(){
  // //Getting the user's details from local storage
  // var tempUser = this.authService.getCurrentSessionValue;
  // //The id number of the user that is currently logged in
  // this.id = tempUser.user.ID;
  // //The organization of the user that is currently logged in
  // this.organization = tempUser.user.organisation;

  //Subscribing to the UserManagementAPIService to get all the staff members details
  this.userManagementService.getUserDetails(this.currentUser.organisation, this.currentUser.ID).subscribe((response: any) => {
    if (response.success == true) {
      //Temporarily holds the data returned from the API call
      const data = response.data;

      //Setting the first name of the user
      this.name = data.fname;
      //Setting the surname of the user
      this.surname = data.surname;
      //Setting the email of the user
      this.email = data.email;
    }
    else {
      //Error handling
    }
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                        SAVE CHANGES
/**
 *  This function will send the details to the API to save the changed details to the system.
 *  @memberof OrganizationDashboardComponent
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
saveChanges(){
  //Indicates if the details can be changed based on whether the passwords match or not
  var valid = true;

  //Checking to make sure that the passwords are not empty
  //Checking to make sure that the password and confirmed password match
  if (this.adminProfileForm.controls.admin_password.value != '' &&
    this.adminProfileForm.controls.admin_password.value == this.adminProfileForm.controls.admin_confirm.value) {
    this.password = this.adminProfileForm.controls.admin_password.value;
  }
  else {
    //Indicates that the changes cannot be saved
    valid = false;

    //POPUP MESSAGE
    let snackBarRef = this.snackBar.open("Please make sure that the passwords are the same", "Dismiss", {
      duration: 3000
    });
  }

  //Indicates that the changes that the user has made to their profile details, can be changed
  if (valid == true) {
    if (this.adminProfileForm.controls.admin_email.value == '') {
      this.email = this.email;
    }
    else {
      this.email = this.adminProfileForm.controls.admin_email.value;
    }

    if (this.adminProfileForm.controls.admin_name.value == '') {
      this.name = this.name;
    }
    else {
      this.name = this.adminProfileForm.controls.admin_name.value;
    }

    if (this.adminProfileForm.controls.admin_surname.value == '') {
      this.surname == this.surname;
    }
    else {
      this.surname = this.adminProfileForm.controls.admin_surname.value;
    }

    if (this.adminProfileForm.controls.admin_password.value == '') {
      this.password == this.password;
    }
    else {
      this.password = this.adminProfileForm.controls.admin_password.value;
    }

    //Making a call to the User Management API Service to save the user's changed profile details
    this.userManagementService.updateFABIMemberDetails(this.email, this.name, this.surname).subscribe((response: any) => {
      if (response.success == true) {
        //Reloading the updated user's details
        this.loadAdminProfileDetails();

        //Display message to say that details were successfully saved
        let snackBarRef = this.snackBar.open("Successfully saved profile changes", "Dismiss", {
          duration: 3000
        });
      }
      else {
        //Error handling
        let snackBarRef = this.snackBar.open("Could not save profile changes", "Dismiss", {
          duration: 3000
        });
      }
    });
  }
  else {
    //Error handling
    let snackBarRef = this.snackBar.open("Please make sure that you provide all the information", "Dismiss", {
      duration: 3000
    });
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                          DISPLAY PROFILE SAVE BUTTON 
/**
 * This function will display the save button option if any details in the profile have been altered
 * 
 * @memberof OrganizationDashboardComponent
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
displayProfileSaveBtn() {
  this.saveBtn = true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                         DISPLAY PASSWORD CONFIRM INPUT 
/**
 * This function will display the confirm password input field in the user's password was altered
 * 
 * @memberof OrganizationDashboardComponent
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
displayConfirmPasswordInput() {
  this.confirmPasswordInput = true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                TOGGLE HELP 
/**
 * This function will toggle the display of the help side panel
 * 
 * @memberof OrganizationDashboardComponent
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
toggleHelpTab() {
  this.helpTab = !this.helpTab;
}

}

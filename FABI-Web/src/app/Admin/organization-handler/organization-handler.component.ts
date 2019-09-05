/**
 * File Name: organization-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\organization-handler\organization-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Thursday, July 18td 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Friday, August 23rd 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { AuthenticationService } from '../../_services/authentication.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../../_errors/error-component/error.component';
import { Router } from '@angular/router';
import { LoadingComponent } from "../../_loading/loading.component";

//Include Material Components
import { MatPaginator, MatTableDataSource } from '@angular/material';

import * as Interface from '../../_interfaces/interfaces';

import { NotificationLoggingService, UserLogs, DatabaseManagementLogs, AccessLogs } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';

@Component({
  selector: 'app-organization-handler',
  templateUrl: './organization-handler.component.html',
  styleUrls: ['./organization-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrganizationHandlerComponent implements OnInit {

  displayedColumns: string[] = ['Organization Name', 'Admin', "Remove"];
  dataSource = new MatTableDataSource([]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /** Object for defining the Create Organisation form -  @type {FormGroup} */
  registerOrgForm: FormGroup;
  /** To check if form has been submitted - @type {boolean} */
  submitted: boolean = false;
  /** To check if form has been submitted correctly - @type {boolean} */
  valid: boolean = false;
  /** If page is busy loading something - @type {boolean} */
  // loading: Interface.Loading = {title: '', isLoading: false};
  /** Selected Organisation from the table - @type {Interface.Organisation} */
  selectedOrg: Interface.Organisation = { orgName: "", admin: { fname: "", surname: "", email: "" } };
  /** Array of Organization objects - @type {Organisation[]} */
  organizations: Interface.Organisation[];

  pendingOrganizations: Interface.Organisation[];
  /** The total number of Organization - @type {number} */
  numberOfOrganizations: number = 0;
  /** The flag which indicates that the numberOfOrganizations has been set - @type {boolean} */
  setOrganizationLength: boolean = false;

  deleteData: Interface.Confirm = { title: '', message: '', info: '', cancel: '', confirm: '' };

  @ViewChild(MatPaginator) paginator: MatPaginator;

  register_organization_validators = {
    'organization_name': [
      { type: 'required', message: 'Organization name is required' },
    ],
    'admin_email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Invalid email' }
    ],
    'admin_name': [
      { type: 'required', message: 'First name is required' }
    ],
    'admin_surname': [
      { type: 'required', message: 'Surname is required' }
    ],
    'admin_phone': [
      { type: 'required', message: 'Phone No. is required' },
      // { type: 'pattern', message: 'Please enter a valid number' }
    ],
  }

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
  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;

  /** Specifies if the list of organizations have been retreived to disable the loading spinner - @type {boolean} */
  organizationTableLoading: boolean = true;

  /** The search item the user is looking for in the table -  @type {string} */
  public searchOrganization: string = "";


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
   * Creates an instance of OrganizationHandlerComponent.
   * @param {AdminAPIService} service For calling the API service
   * @param {FormBuilder} formBuilder For creating the login form
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {MatDialog} dialog For dialog pop-up messages
   * @param {Router} router For navigating to other modules/components
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * 
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private userManagementService: UserManagementAPIService,
    private notificationLoggingService: NotificationLoggingService
  ) {
    this.registerOrgForm = this.formBuilder.group({
      organization_name: ['', Validators.required],
      admin_name: ['', Validators.required],
      admin_surname: ['', Validators.required],
      admin_email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      admin_phone: ['', Validators.compose([
        Validators.required,
        // Validators.pattern('')
      ])]
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call viewOrganizations()
   * 
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    //******** TEMPORARY LOGIN FOR DEVELOPMENT: ********
    // this.authService.temporaryLoginSuperUser().subscribe((response: any) => {
    //   this.currentUser = this.authService.getCurrentSessionValue.user;
    //   this.viewOrganizations();
    // });

    //******** TO BE USED IN PRODUCTION: ********
    // Set current user logged in
    this.currentUser = this.authService.getCurrentSessionValue.user;
    // Calling the neccessary functions as the page loads
    this.viewOrganizations();
    this.viewPendingOrganizations();
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       REGISTER ORGANIZATION
  /**
   * This function calls the *user-management* service to create a new Organisation.
   *
   * @returns
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  registerOrg() {
    this.submitted = true;

    if (this.registerOrgForm.invalid) {
      return;
    }

    this.valid = true;

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Registering Organization" } });

    const LorgName = this.registerOrgForm.controls.organization_name.value;
    const LadminName = this.registerOrgForm.controls.admin_name.value;
    const LadminSurname = this.registerOrgForm.controls.admin_surname.value;
    const LadminEmail = this.registerOrgForm.controls.admin_email.value;
    const LadminPhone = this.registerOrgForm.controls.admin_phone.value;

    const admin_details: Interface.OrganisationAdmin = { fname: LadminName, surname: LadminSurname, email: LadminEmail };
    const org_details: Interface.Organisation = { orgName: LorgName, admin: admin_details };

    this.userManagementService.createOrganization(org_details).subscribe((response: any) => {

      loadingRef.close();

      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE

        this.refreshDataSource();
        let snackBarRef = this.snackBar.open("Successfully Registered Organization", "Dismiss", {
          duration: 6000
        });

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Registering Organization", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.registerOrg();
          }
        })
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SELECTED ORGANIZATION
  /**
   * This function sets the Organisation selected by the user in the table
   *
   * @param {Interface.Organisation} org
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  selectOrganisation(org: Interface.Organisation) {
    this.selectedOrg = org;
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     REMOVE ORGANIZATION PROMPT
  /**
   * This function prompts the user to confirm if they wish to delete the selected Organisation
   * @param {Interface.Organisation} org The organization to be deleted
   *
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeOrganizationPrompt(org: Interface.Organisation) {
    const orgDetails = `${org.orgName}`;

    this.selectedOrg = org;

    this.deleteData = {
      title: "Remove Organisation",
      message: "Are you sure you want to remove this Organisation?",
      info: orgDetails,
      cancel: "Cancel",
      confirm: "Remove"
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        REMOVE ORGANIZATION 
  /**
   * This function calls the *user-management* service to remove the selected Organisation 
   *
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeOrg() {
    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Removing Organization" } });

    this.userManagementService.removeOrganization(this.selectedOrg).subscribe((response: any) => {

      loadingRef.close();

      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Organization Removed", "Dismiss", {
          duration: 3000
        });
        this.refreshDataSource();
      }
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Removing", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.removeOrg();
          }
        })
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            REFRESH
  /**
   * This function refreshes the Datasource (in most cases, the table that has changed)
   *
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  refreshDataSource() {
    this.viewOrganizations();

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       VIEW ORGANIZATIONS
  /**
   * This function calls the *user-management* service to get all registered Organizations
   *
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  viewOrganizations() {

    this.userManagementService.getAllOrganizations().subscribe((response: any) => {

      if (response.success == true && response.code == 200) {
        this.organizations = response.data.Organizations;

        //Store the total number of organizations for the statistics 
        this.numberOfOrganizations = this.organizations.length;

        //Sets flag to enable the display of statistics on the dashboard
        this.setOrganizationLength = true;

        //Deactivate loading table spinners
        this.organizationTableLoading = false;

      }
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Sorry there was an error loading the Organisations", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.ngOnInit();
          }
        })
      }
    });
  }


  viewPendingOrganizations() {

    this.userManagementService.getPendingOrganizations().subscribe((response: any) => {

      if (response.success == true && response.code == 200) {

        this.pendingOrganizations = response.data.Organizations;

      }
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Sorry there was an error loading the pending Organisations", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.ngOnInit();
          }
        })
      }
    });
  }

  registerPendingOrg(org: Interface.Organisation) {

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Registering Organization" } });

    this.userManagementService.createOrganization(org).subscribe((response: any) => {

      loadingRef.close();

      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE

        this.refreshDataSource();
        let snackBarRef = this.snackBar.open("Successfully Registered Organization", "Dismiss", {
          duration: 6000
        });

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Registering Organization", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.registerOrg();
          }
        })
      }
    });

  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE NOTIFICATIONS 
  /**
   * This function will toggle the display of the notifications side panel
   * 
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificationsTab() {
    this.notificationsTab = !this.notificationsTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE PROFILE 
  /**
   * This function will toggle the display of the profile side panel
   * 
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleProfileTab() {
    this.profileTab = !this.profileTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            DISPLAY PROFILE SAVE BUTTON 
  /**
   * This function will display the save button option if any details in the profile have been altered
   * 
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayProfileSaveBtn() {
    this.saveBtn = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            DISPLAY PASSWORD CONFIRM INPUT 
  /**
   * This function will display the confirm password input field in the user's password was altered
   * 
   * @memberof OrganizationHandlerComponent
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
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleHelpTab() {
    this.helpTab = !this.helpTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            RESET ADD FIELDS
  /**
   * This function will clear the inputs in the Add organization modal
   * 
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  resetAddFields(){
    this.registerOrgForm.reset();
  }

}

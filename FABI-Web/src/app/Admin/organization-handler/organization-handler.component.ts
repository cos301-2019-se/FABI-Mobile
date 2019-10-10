/**
 * File Name: organization-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\organization-handler\organization-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Thursday, July 18td 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, October 10th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as http from '@angular/common/http';
import * as core from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/_services/notification.service';
import * as Interface from '../../_interfaces/interfaces';
import { LoadingComponent } from "../../_loading/loading.component";
import { AuthenticationService } from '../../_services/authentication.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';





@core.Component({
  selector: 'app-organization-handler',
  templateUrl: './organization-handler.component.html',
  styleUrls: ['./organization-handler.component.scss'],
  encapsulation: core.ViewEncapsulation.None
})
export class OrganizationHandlerComponent implements core.OnInit {

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

  @core.ViewChild(MatPaginator) paginator: MatPaginator;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          FORM VALIDATORS
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
      { type: 'pattern', message: 'Please enter a valid number' }
    ],
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
   * Creates an instance of OrganizationHandlerComponent.
   * @param {AdminAPIService} service For calling the API service
   * @param {FormBuilder} formBuilder For creating the login form
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {MatDialog} dialog For dialog pop-up messages
   * @param {Router} router for routing/navigating to other components 
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
    private notificationLoggingService: NotificationLoggingService,
    private notificationService: NotificationService
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
        Validators.pattern('^(([\+]{1}[0-9]{1,3}[\ ]{1}[0-9]{1,2}[\ ]{1}[0-9]{4}[\ ]{1}[0-9]{4})|([0]{1}[0-9]{1}[\ ]{1}[0-9]{4}[\ ]{1}[0-9]{4})|([0]{1}[0-9]{1}[\-]{1}[0-9]{4}[\-]{1}[0-9]{4})|([\(]{1}[0]{1}[0-9]{1}[\)]{1}[\ ]{1}[0-9]{4}([\ ]|[\-]){1}[0-9]{4})|([0-9]{4}([\ ]|[\-])?[0-9]{4})|([0]{1}[0-9]{3}[\ ]{1}[0-9]{3}[\ ]{1}[0-9]{3})|([0]{1}[0-9]{9})|([\(]{1}[0-9]{3}[\)]{1}[\ ]{1}[0-9]{3}[\-]{1}[0-9]{4})|([0-9]{3}([\/]|[\-]){1}[0-9]{3}[\-]{1}[0-9]{4})|([1]{1}[\-]?[0-9]{3}([\/]|[\-]){1}[0-9]{3}[\-]{1}[0-9]{4})|([1]{1}[0-9]{9}[0-9]?)|([0-9]{3}[\.]{1}[0-9]{3}[\.]{1}[0-9]{4})|([\(]{1}[0-9]{3}[\)]{1}[0-9]{3}([\.]|[\-]){1}[0-9]{4}(([\ ]?(x|ext|extension)?)([\ ]?[0-9]{3,4}))?)|([1]{1}[\(]{1}[0-9]{3}[\)]{1}[0-9]{3}([\-]){1}[0-9]{4})|([\+]{1}[1]{1}[\ ]{1}[0-9]{3}[\.]{1}[0-9]{3}[\-]{1}[0-9]{4})|([\+]{1}[1]{1}[\ ]?[\(]{1}[0-9]{3}[\)]{1}[0-9]{3}[\-]{1}[0-9]{4}))$')
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

    // Set current user logged in
    this.currentUser = this.authService.getCurrentSessionValue.user;
    // Calling the neccessary functions as the page loads
    this.viewOrganizations();
    this.viewPendingOrganizations();
    this.resetAddFields();
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
        this.notificationService.showSuccessNotification('Organization Registered', '');
        this.refreshDataSource();

      } else {
        //POPUP MESSAGE
        this.notificationService.showErrorNotification('Registration Failed', 'An error occurred while registering the organization');
        this.resetAddFields();
      }
    }, (err: http.HttpErrorResponse) => {
      //Handled in error-handler
      this.notificationService.showErrorNotification('Registration Failed', 'An error occurred while registering the organization');
      this.resetAddFields();
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
        this.notificationService.showSuccessNotification('Organization Removed', '');
        this.refreshDataSource();
      } else {
        //POPUP MESSAGE
        this.notificationService.showErrorNotification('Remove Failed', 'An error occurred while removing the organization');
      }
    }, (err: http.HttpErrorResponse) => {
      loadingRef.close();
      //Handled in error-handler
      this.notificationService.showErrorNotification('Remove Failed', 'An error occurred while removing the organization');
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
    this.viewPendingOrganizations();
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

      } else {
        //POPUP MESSAGE
        this.notificationService.showWarningNotification('Error', 'Could not load organizations');
      }
    }, (err: http.HttpErrorResponse) => {
      //Handled in error-handler
      this.notificationService.showWarningNotification('Error', 'Could not load organizations');
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    VIEW PENDING ORGANIZATIONS
  /**
   * This function is used to retrieve all organzaitions who have send a request to register. They're *pending* their acceptance 
   *  or denial.
   *
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  viewPendingOrganizations() {

    this.userManagementService.getPendingOrganizations().subscribe((response: any) => {

      if (response.success == true && response.code == 200) {

        this.pendingOrganizations = response.data.Organizations;

      } else {
        //POPUP MESSAGE
        this.notificationService.showWarningNotification('Error', 'Could not load pending organizations');
      }
    }, (err: http.HttpErrorResponse) => {
      //Handled in error-handler
      this.notificationService.showWarningNotification('Error', 'Could not load pending organizations');
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    REGISTER PENDING ORGANIZATIONS
  /**
   * This function is used to accept the organizations request to register by registering them.
   *
   * @param {Interface.Organisation} org
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  registerPendingOrg(org: Interface.Organisation) {

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Registering Organization" } });

    this.userManagementService.createOrganization(org).subscribe((response: any) => {

      loadingRef.close();
      this.resetAddFields();

      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        this.notificationService.showSuccessNotification('Organization Registered', '');
        this.refreshDataSource();

      } else {
        //POPUP MESSAGE
        this.notificationService.showErrorNotification('Registration Failed', 'An error occurred while registering the organization');
      }
    }, (err: http.HttpErrorResponse) => {
      if(err.error.code == 400 && err.error.message == "User email already exists") {
        this.notificationService.showErrorNotification('Registration Failed', 'Organization email already exists');
      } else {
        this.notificationService.showErrorNotification('Registration Failed', 'An error occurred while registering the organization');
      }
      this.resetAddFields();
      //Handled in error-handler
    });

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        DECLINE PENDING ORGANIZATION 
  /**
   * This function calls the *user-management* service to decline an organizations request to register 
   *
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  declinePendingeOrg(org: Interface.Organisation) {

    this.userManagementService.declineOrganizationRequest(org).subscribe((response: any) => {

      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        this.notificationService.showSuccessNotification('Declined', '');
        this.refreshDataSource();
      } else {
        //POPUP MESSAGE
        this.notificationService.showErrorNotification('Decline Failed', 'An error occurred while declining the organizations request');
      }
    }, (err: http.HttpErrorResponse) => {
      //Handled in error-handler
      this.notificationService.showErrorNotification('Decline Failed', 'An error occurred while declining the organizations request');
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
  resetAddFields() {
    this.registerOrgForm.reset();
    this.submitted = false;
  }

}

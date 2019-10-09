/**
 * File Name: clinic-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\clinic-handler\clinic-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Monday, October 7th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as core from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosticClinicAPIService } from '../../_services/diagnostic-clinic-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';
import * as Interface from '../../_interfaces/interfaces';


@core.Component({
  selector: 'app-clinic-handler',
  templateUrl: './clinic-handler.component.html',
  styleUrls: ['./clinic-handler.component.scss']
})
export class ClinicHandlerComponent implements core.OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
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
  /** Object for defining the Add Staff form -  @type {FormGroup} */
  addStaffForm: FormGroup;
  /** To check if form has been submitted - @type {boolean} */
  submitted: boolean = false;
  /** To check if form has been submitted correctly - @type {boolean} */
  valid: boolean = false;
  /** Array of User Type objects for form dropdown - @type {UserType[]} */
  userTypes: Interface.UserType[];
  /** Selected user type on dropdown - @type {string} */
  selectedUserType: string;
  adminTypes: any[];
  allDatabaseNames: any[];
  adminUsers: any[];

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        FORM VALIDATORS
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  add_staff_validators = {
    'user': [
      { type: 'required', message: 'Please select a user' },
    ]
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of ClinicHandlerComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API service
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {core.ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
   * @param {DomSanitizer} sanitizer
   * @param {core.ComponentFactoryResolver} resolver Used to load dynamic elements in the HTML
   * @param {AuthenticationService} authService for calling the *authentication* service
   * 
   * @memberof ClinicHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    public sanitizer: DomSanitizer,
    private userManagementService: UserManagementAPIService,
    private diagnosticClinicService: DiagnosticClinicAPIService,
    private notificationLoggingService: NotificationLoggingService,
    private resolver: core.ComponentFactoryResolver,
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { 
    this.addStaffForm = this.formBuilder.group({
      user: ['', Validators.required],
      database_privileges: new FormArray([])
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call loadNotifications() | 2. Call getNumberOfFABISamples() | 3. Call getNumberOfFABIMembers()
   * 
   * @memberof ClinicHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.getDBNames();
    this.userManagementService.getFABIAdmins().subscribe((response: any) => {

      if (response.success == true && response.code == 200) {

        this.adminUsers = response.data.qs.admins;
        
        //POPUP MESSAGE
      }
      else if (response.success == false) {
        //POPUP MESSAGE
      }
    });
    this.currentUser = this.authService.getCurrentSessionValue.user;
  }

  getDBNames() {
    this.userManagementService.getDatabaseNames().subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        this.allDatabaseNames = response.data.docs;

        this.allDatabaseNames.map(() => {
          const control = new FormControl(false);
          (this.addStaffForm.controls.database_privileges as FormArray).push(control)
        });

      }
      else if (response.success == false) {
        //POPUP MESSAGE
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
  //                                                            TOGGLE NOTIFICATIONS 
  /**
   * This function will toggle the display of the notifications side panel
   * 
   * @memberof ClinicHandlerComponent
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
   * @memberof ClinicHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleProfileTab() {
    this.profileTab = !this.profileTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        DISPLAY PROFILE SAVE BUTTON 
  /**
   * This function will display the save button option if any details in the profile have been altered
   * 
   * @memberof ClinicHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayProfileSaveBtn() {
    this.saveBtn = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       DISPLAY PASSWORD CONFIRM INPUT 
  /**
   * This function will display the confirm password input field in the user's password was altered
   * 
   * @memberof ClinicHandlerComponent
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
   * @memberof ClinicHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleHelpTab() {
    this.helpTab = !this.helpTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            RESET STAFF FIELDS 
  /**
   * This function is used to clear the input fields in the modal
   * 
   * @memberof ClinicHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  resetStaffFields() {
    this.helpTab = !this.helpTab;
  }

  addStaff() {
    this.submitted = true;

    if (this.addStaffForm.invalid) {
      return;
    }

    this.valid = true;

    const LstaffName = this.addStaffForm.controls.user.value.fname;
    const LstaffSurname = this.addStaffForm.controls.user.value.surname;
    const LstaffEmail = this.addStaffForm.controls.user.value.email;
    const LstaffPhone = 1234567890;
    const LstaffPosition = "ClinicAdmin";

    const staff_details: Interface.StaffInfo = { fname: LstaffName, surname: LstaffSurname, email: LstaffEmail, position: LstaffPosition, phone: LstaffPhone };

    var databasePrivileges: Interface.DatabasePrivilege[] = [];

    this.addStaffForm.controls.database_privileges.value.forEach((value, i) => {

      if (value == true) {
        let dbPrivilege: Interface.DatabasePrivilege = {
          name: this.allDatabaseNames[i],
          privileges: ['retrieve']
        };
        databasePrivileges.push(dbPrivilege);
      }

    });

    this.userManagementService.addStaffMember(staff_details, databasePrivileges).subscribe((response: any) => {

      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Clinic Admin Added", "Dismiss", {
          duration: 6000
        });
      }
      else if (response.success == false) {
        //POPUP MESSAGE
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            RESET ADD FIELDS 
  /**
   * This function will clear the inputs in the Add Staff Modal
   * 
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  resetAddFields() {
    this.addStaffForm.reset();
  }

}

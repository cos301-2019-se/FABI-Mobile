/**
 * File Name: admin-dashboard.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\admin-dashboard\admin-dashboard.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
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
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosticClinicAPIService } from '../../_services/diagnostic-clinic-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';


export interface AdminMember {
  fname: string;
  surname: string;
  email: string;
  id: string;
  type: string;
}

export interface StaffMember {
  fname: string;
  surname: string;
  email: string;
  id: string;
}

@core.Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements core.OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Retriving an HTML element from the HTML page
  @core.ViewChild('adminContainer', { read: core.ViewContainerRef }) adminContainer;
  @core.ViewChild('staffContainer', { read: core.ViewContainerRef }) staffContainer;

  /** Contains the user stats that will be dynamically loaded in the HTML page - @type {string} */
  userStats: string;
  /** Contains the sample stats that will be dynamically loaded in the HTML page - @type {string} */
  sampleStats: string;

  /** Object array for holding the administrators -  @type {AdminMember[]} */
  admins: AdminMember[] = [];
  /** Object array for holding the staff members -  @type {StaffMember
   * []} */
  staff: StaffMember[] = [];

  /** Object array for holding all of FABI's samples -  @type {Object[]} */
  samples: Object[] = [];
  /** Object array for holding all of FABI's completed samples -  @type {Object[]} */
  completedSamples: Object[] = [];

  /** The total number of FABI staff members - @type {number} */
  numberOfFABIMembers: number;
  /** The total number of FABI samples - @type {number} */
  numberOfSamples: number;

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

  /** Specifies if the list of admins have been retreived to disable the loading spinner - @type {boolean} */
  adminTableLoading: boolean = true;
  /** Specifies if the list of staff have been retreived to disable the loading spinner - @type {boolean} */
  staffTableLoading: boolean = true;

  /** Holds the input element (passwordInput) from the HTML page - @type {ElementRef} */
  @core.ViewChild("passwordInput") passwordInput: core.ElementRef;
  /** Holds the input element (confirmInput) from the HTML page - @type {ElementRef} */
  @core.ViewChild("confirmInput") confirmInput: core.ElementRef;

  /** The search item the user is looking for in the table -  @type {string} */
  public searchAdmins: string = "";
  /** The search item the user is looking for in the table -  @type {string} */
  public searchStaff: string = "";

  currentUserPrivileges: any;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of AdminDashboardComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API service
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {core.ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
   * @param {DomSanitizer} sanitizer
   * @param {core.ComponentFactoryResolver} resolver Used to load dynamic elements in the HTML
   * @param {AuthenticationService} authService for calling the *authentication* service
   * 
   * @memberof AdminDashboardComponent
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
    private dialog: MatDialog
  ) { }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {

    window.addEventListener('scroll', this.scroll, true); //third parameter

    // Set current user logged in
    this.currentUser = this.authService.getCurrentSessionValue.user;
    //Calling the neccessary functions as the page loads
    this.getNumberOfFABIMembers();
    this.getNumberOfFABISamples();
    this.currentUserPrivileges = this.authService.getCurrentUserValue;
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (event: any): void => {

    //Hide the notifications, profile, and help tabs if open
    // this.notificationsTab = false;
    // this.profileTab = false;
    // this.helpTab = false;

  };


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                              GET NUMBER OF FABI MEMBERS
  /**
   *  This function will use an API service to get all the members of FABI. These members will be read into the
   *  'members' Object. The function does not receive any parameters but it will populate a 'heading' element on the
   *  HTML page with the number of members belonging to FABI. This function will also use API calls to populate
   *  the admins object.
   * 
   *  This function will also dynamically create elements and load them with information about the adminstrators
   *  and other FABI staff members. These dynamic elements will be loaded into the HTML page
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getNumberOfFABIMembers() {
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllFABIStaff().subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        var data = response.data.qs.staff;

        for (var i = 0; i < data.length; i++) {
          if (data[i].userType == "SuperUser") {
            var tempAdmin: AdminMember = { fname: data[i].fname, surname: data[i].surname, email: data[i].email, id: data[i].id, type: "Super User" };
            this.admins.push(tempAdmin);
          }
          else if (data[i].userType == "ClinicAdmin") {
            var tempAdmin: AdminMember = { fname: data[i].fname, surname: data[i].surname, email: data[i].email, id: data[i].id, type: "Clinic Admin" };
            this.admins.push(tempAdmin);
          }
          else if (data[i].userType == "CultureAdmin") {
            var tempAdmin: AdminMember = { fname: data[i].fname, surname: data[i].surname, email: data[i].email, id: data[i].id, type: "Culture Admin" };
            this.admins.push(tempAdmin);
          }
          else if (data[i].userType == "Staff") {
            var tempStaff: StaffMember = { fname: data[i].fname, surname: data[i].surname, email: data[i].email, id: data[i].id };
            this.staff.push(tempStaff);
          }
        }

        //Deactivate loading table spinners
        this.adminTableLoading = false;
        this.staffTableLoading = false;

        this.numberOfFABIMembers = this.admins.length + this.staff.length;
        this.userStats = this.numberOfFABIMembers.toString();
      }
      else {
        //The FABI members could not be retrieved
        this.numberOfFABIMembers = 0;
        this.userStats = this.numberOfFABIMembers.toString();

        //TODO: Show error message
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                GET NUMBER OF FABI SAMPLES
  /**
   *  This function will use an API service to get all the samples of FABI. These samples will be read into the
   *  'samples' Object. The function does not receive any parameters but it will populate a 'heading' element on the
   *  HTML page with the number of samples belonging to FABI.
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getNumberOfFABISamples() {
    //Subscribing to the DiagnosticClinicAPIService to get a list containing all of FABI's samples
    this.diagnosticClinicService.getAllSamples().subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        //Populating the sample array with the returned data
        this.samples = response.data.samples;

        this.numberOfSamples = this.samples.length;
        this.sampleStats = this.numberOfSamples.toString();
      }
      else {
        //The FABI members could not be retrieved
        this.sampleStats = '0';
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      TOGGLE NOTIFICATIONS 
  /**
   * This function will toggle the display of the notifications side panel
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificationsTab() {
    this.notificationsTab = !this.notificationsTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         TOGGLE PROFILE 
  /**
   * This function will toggle the display of the profile side panel
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleProfileTab() {
    this.profileTab = !this.profileTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      DISPLAY PROFILE SAVE BUTTON 
  /**
   * This function will display the save button option if any details in the profile have been altered
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayProfileSaveBtn() {
    this.saveBtn = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                   DISPLAY PASSWORD CONFIRM INPUT 
  /**
   * This function will display the confirm password input field in the user's password was altered
   * 
   * @memberof AdminDashboardComponent
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
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleHelpTab() {
    this.helpTab = !this.helpTab;
  }

}
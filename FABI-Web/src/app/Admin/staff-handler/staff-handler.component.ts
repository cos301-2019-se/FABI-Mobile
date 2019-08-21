/**
 * File Name: staff-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\staff-handler\staff-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, August 21st 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewChild } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

import { AuthenticationService } from '../../_services/authentication.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../../_errors/error-component/error.component';
import { Router } from '@angular/router';
import { LoadingComponent } from "../../_loading/loading.component";

//Include Material Components
import { MatPaginator, MatTableDataSource } from '@angular/material';


import * as Interface from '../../_interfaces/interfaces';

import { Member, UserManagementAPIService } from '../../_services/user-management-api.service';
import { NotificationLoggingService, UserLogs, DatabaseManagementLogs, AccessLogs } from '../../_services/notification-logging.service';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';


@Component({
  selector: 'app-staff-handler',
  templateUrl: './staff-handler.component.html',
  styleUrls: ['./staff-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StaffHandlerComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /** Object for defining the Add Staff form -  @type {FormGroup} */
  addStaffForm: FormGroup;
  /** To check if form has been submitted - @type {boolean} */
  submitted: boolean = false;
  /** To check if form has been submitted correctly - @type {boolean} */
  valid: boolean = false;
  /** If page is busy loading something - @type {boolean} */
  loading: boolean = false;
  /** Selected Staff Member from the table - @type {Interface.StaffInfo} */
  selectedStaff: Interface.StaffInfo = {fname: '', surname: '', email: ''};
  /** Array of Staff Member objects - @type {StaffInfo[]} */
  staffMembers: Interface.StaffInfo[];
  /** The number of the staff members - @type {number} */   
  numberOfStaffMembers : number = 0;

  /** Array of User Type objects for form dropdown - @type {UserType[]} */
  userTypes: Interface.UserType[];
  /** Selected user type on dropdown - @type {string} */
  selectedUserType: string;


  adminTypes: any[];

  allDatabaseNames: any[];

  privileges: any = [
    {
      name: "Add",
      value: "add",
      selected: false
    },
    {
      name: "Delete",
      value: "delete",
      selected: false
    },
    {
      name: "Update",
      value: "update",
      selected: false
    },
    {
      name: "View",
      value: "view",
      selected: false
    }
  ];

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

  deleteData: Interface.Confirm = {title: '', message: '', info: '', cancel: '', confirm: ''};

  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;

  /** Specifies if the list of staff have been retreived to disable the loading spinner - @type {boolean} */  
  staffTableLoading: boolean = true;

  add_staff_validators = {
    'staff_name': [
      { type: 'required', message: 'First name required' },
    ],
    'staff_surname': [
      { type: 'required', message: 'Surname required' },
    ],
    'staff_email': [
      { type: 'required', message: 'Email required' },
      { type: 'pattern', message: 'Invalid email' }
    ],
    'staff_phone': [
      { type: 'required', message: 'Phone No. is required' },
    ]
  }

  /** The search item the user is looking for in the table -  @type {string} */
  public searchStaff: string = "";

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
   * Creates an instance of StaffHandlerComponent.
   * @param {AdminAPIService} service For calling the API service
   * @param {FormBuilder} formBuilder For creating the login form
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {MatDialog} dialog For dialog pop-up messages
   * @param {Router} router For navigating to other modules/components
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService, 
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, 
    private dialog: MatDialog, 
    private router: Router, 
    private userManagementService: UserManagementAPIService, 
    private notificationLoggingService: NotificationLoggingService
    )  {

    // const formControls = this.privileges.map(control => new FormControl(false));

    this.addStaffForm = this.formBuilder.group({
      staff_name: ['', Validators.required],
      staff_surname: ['', Validators.required],
      staff_email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      staff_phone: ['', Validators.compose([
        Validators.required,
        // Validators.pattern('')
      ])],
      staff_position: ['', Validators.required],
      admin_type: ['', Validators.required],
      database_privileges: new FormArray([])

    });
    

  };


  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call displayUserTypes() | 2. Call viewStaff() | 3. Call loadNotifications() 
   * 
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {

    //******** TEMPORARY LOGIN FOR DEVELOPMENT: ********
    this.authService.temporaryLoginSuperUser().subscribe((response : any) => {
      this.currentUser = this.authService.getCurrentSessionValue.user;
      //Calling the neccessary functions as the page loads  
      this.viewStaff();
      this.addStaffForm.get('admin_type').disable();  
      this.getAdminTypes();
      this.getDBNames();
      this.onChanges();

      // this.addDatabaseCheckboxes();

    });


    //******** TO BE USED IN PRODUCTION: ********
    //Calling the neccessary functions as the page loads  
    // this.currentUser = this.authService.getCurrentSessionValue.user;
    // this.displayUserTypes();
    // this.viewStaff();
    // this.addStaffForm.get('admin_type').disable();  
    // this.getAdminTypes();
    // this.getDBNames();
    // this.onChanges();
    
  }

  private addDatabaseCheckboxes() {
    
    this.allDatabaseNames.map((control) => {
      new FormControl(false);
      (this.addStaffForm.controls.orders as FormArray).push(control)
    });
  }

  onChanges() {
    this.addStaffForm.get('staff_position').valueChanges
    .subscribe(selectedStaffPosition => {      
        if (selectedStaffPosition == 'Yes') {
          this.addStaffForm.get('admin_type').enable();
        } else {
          this.addStaffForm.get('admin_type').reset();
          this.addStaffForm.get('admin_type').disable();
        }
    });
  }

  getDBNames() {
    this.userManagementService.getDatabaseNames().subscribe( (response:any) => {
      if (response.success == true && response.code == 200) {
        this.allDatabaseNames = response.data.docs;

        this.allDatabaseNames.map(() => {
          const control = new FormControl(false); 
          (this.addStaffForm.controls.database_privileges as FormArray).push(control)
        });
        
      } 
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Loading Database Names", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.getDBNames();
          }
        })
      }
    });
  }

  getAdminTypes() {
    this.userManagementService.getFABIAdminTypes().subscribe( (response:any) => {
      if (response.success == true && response.code == 200) {
        this.adminTypes = response.data.adminTypes;
        this.onChanges();
      } 
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Loading Admin Types", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.getAdminTypes();
          }
        })
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          ADD STAFF
  /**
   * This function calls the *user-management* service to add a Staff Member
   *
   * @returns
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addStaff(){
    this.submitted = true;

    if (this.addStaffForm.invalid) {
      return;
    }

    this.valid = true;
    this.loading = true;

    const LstaffName = this.addStaffForm.controls.staff_name.value;
    const LstaffSurname = this.addStaffForm.controls.staff_surname.value;
    const LstaffEmail = this.addStaffForm.controls.staff_email.value;
    const LstaffPhone = this.addStaffForm.controls.staff_phone.value;
    let LstaffPosition;

    if(this.addStaffForm.controls.staff_position.value == "No") {
       LstaffPosition = "Staff";
    } else {
       LstaffPosition = this.addStaffForm.controls.admin_type.value;
    }

    console.log("DB: " + this.addStaffForm.controls.database_privileges.value);

    
    const staff_details: Interface.StaffInfo = { fname: LstaffName, surname: LstaffSurname, email: LstaffEmail, position: LstaffPosition, phone: LstaffPhone};

    var databasePrivileges : Interface.DatabasePrivilege[] = [];

    this.addStaffForm.controls.database_privileges.value.forEach((value, i)=> {

      if(value == true) {
        let dbPrivilege : Interface.DatabasePrivilege = {
          name: this.allDatabaseNames[i],
          privileges: ['retrieve']
        };
        databasePrivileges.push(dbPrivilege);
      }
      
    });


    this.userManagementService.addStaffMember(staff_details, databasePrivileges).subscribe((response: any) => {      
      this.loading = false;

      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Staff Member Added", "Dismiss", {
          duration: 6000
        });
        this.refreshDataSource();
      } 
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Adding Staff Member", message: response.message, retry: true }});
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.addStaff();
          }
        })
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SELECTED ORGANIZATION
  /**
   * This function sets the Staff Member selected by the user in the table
   *
   * @param {Interface.StaffInfo} staffMem
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  selectStaffMember(staffMem: Interface.StaffInfo) {
    this.selectedStaff = staffMem;
  }
  

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     REMOVE STAFF MEMBER PROMPT
  /**
   * This function prompts the user to confirm if they wish to remove the selected Staff Member
   *
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeStaffMemberPrompt(member: Interface.StaffInfo) {   
    const staffDetails = member.fname + " " + member.surname + " " + member.email;

    this.selectedStaff = member;

    this.deleteData = {
      title: "Remove Staff Member",
      message: "Are you sure you want to remove this Staff Member?",
      info: staffDetails,
      cancel: "Cancel",
      confirm: "Remove"
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                           REMOVE STAFF MEMBER   
  /**
   * This function calls the *user-management* service to remove the selected Staff Member 
   *
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeStaffMember() {    
    this.userManagementService.removeFABIStaffMember(this.selectedStaff).subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Staff Member Removed", "Dismiss", {
          duration: 3000
        });
        this.refreshDataSource();
      } 
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Removing", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.removeStaffMember();
          }
        })
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                REFRESH
  /**
   * This function refreshes the Datasource (in most cases, the table that has changed)
   *
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  refreshDataSource() {
    this.viewStaff();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                              VIEW STAFF
  /**
   * This function calls the *user-management* service to get all registered FABI Staff
   *
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  viewStaff() {    
    this.userManagementService.getAllStaffMembers().subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        this.staffMembers = response.data.qs.staff;

        //Set number of staff members for statistics 
        this.numberOfStaffMembers = this.staffMembers.length;

        //Deactivate loading table spinners
        this.staffTableLoading = false;
        

      } 
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Loading Staff", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.viewStaff();
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
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificationsTab(){ 
    this.notificationsTab = !this.notificationsTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE PROFILE 
  /**
   * This function will toggle the display of the profile side panel
   * 
   * @memberof StaffHandlerComponent
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
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayProfileSaveBtn() {
    this.saveBtn = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     DISPLAY PASSWORD CONFIRM INPUT 
  /**
   * This function will display the confirm password input field in the user's password was altered
   * 
   * @memberof StaffHandlerComponent
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
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleHelpTab() {
    this.helpTab = !this.helpTab;
  }
}

/**
 * File Name: member-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization\member-handler\member-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, August 13th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

//Include Material Components
import { MatPaginator, MatTableDataSource } from '@angular/material';

import * as Interface from "../../_interfaces/interfaces";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../../_errors/error-component/error.component';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { AuthenticationService } from '../../_services/authentication.service';
import { ConfirmComponent } from "../../confirm/confirm.component";
import { UserManagementAPIService } from 'src/app/_services/user-management-api.service';


@Component({
  selector: 'app-member-handler',
  templateUrl: './member-handler.component.html',
  styleUrls: ['./member-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemberHandlerComponent implements OnInit {

  displayedColumns: string[] = ['First Name', 'Surname', 'Email', 'Remove', 'Action'];
  dataSource = new MatTableDataSource([]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /** Object for defining the Add Member form -  @type {FormGroup} */
  addMemberForm: FormGroup;
  /** To check if form has been submitted - @type {boolean} */
  submitted: boolean = false;
  /** To check if form has been submitted correctly - @type {boolean} */
  valid: boolean = false;
  /** If page is busy loading something - @type {boolean} */
  loading: boolean = false;
  /** Selected Member from the table - @type {Interface.OrganisationMember} */
  selectedMember: Interface.OrganisationMember;
  /** Array of Organization objects - @type {Organisation[]} */
  organizations: Interface.Organisation[];
  /** Array of Member objects - @type {OrganisationMember[]} */
  orgMembers: Interface.OrganisationMember[];

  /** Object array for holding all of the logs -  @type {any[]} */
  allNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {any[]} */
  newNotifications: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
  /** The staff member's user type -  @type {string} */
  userType: string = '';
  /** The staff member's password -  @type {string} */
  password: string = '';
  /** The staff member's confirmed password -  @type {string} */
  confirmPassword: string = '';

  /** The form to display the admin member's details -  @type {FormGroup} */
  adminProfileForm: FormGroup;

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */
  private toggle_status: boolean = false;

  add_validation_messages = {
    'member_email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email' }
    ],
    'member_name': [
      { type: 'required', message: 'Name is required' }
    ],
    'member_surname': [
      { type: 'required', message: 'Surname is required' }
    ],
    'member_phone': [
      { type: 'required', message: 'Phone No. is required' },
      { type: 'pattern', message: 'Please enter a valid South African number' }
    ]
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
   * Creates an instance of MemberHandlerComponent.
   * @param {FormBuilder} formBuilder For creating the login form
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {MatDialog} dialog For dialog pop-up messages
   * @param {Router} router For navigating to other modules/components
   * @param {MatDialog} dialog
   * @param {AuthenticationService} authService Used for all authentication and session control
   * 
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService,
    private userManagementService: UserManagementAPIService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.addMemberForm = this.formBuilder.group({
      member_name: ['', Validators.required],
      member_surname: ['', Validators.required],
      member_location: ['', Validators.required],
      member_email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      member_phone: ['', Validators.compose([
        Validators.required,
        // Validators.pattern('')
      ])]

    }),

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
  //                                                    TOGGLE NOTIFICATIONS TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab() {
    this.toggle_status = !this.toggle_status;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            NG ON INIT()
  /**
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.viewMembers();

    //Get the Organization's Details
    this.userManagementService.getOrganizationDetails().subscribe((response: any) => {
      if (response.success == true && response.status == 200) {
        // ***********************************
        // POLPULATE FIELDS BASED ALREADY KNOWN INFORMATION
        // *************

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error: "Could Not Load Organizations' Details", message: response.message } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.ngOnInit();
          }
        })
      }
    });

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          ADD MEMBER
  /**
   * This function calls the *http* service to add a new Organization Member
   *
   * @returns
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addMember() {
    this.submitted = true;

    if (this.addMemberForm.invalid) {
      return;
    }

    this.valid = true;
    this.loading = true;

    // const LmemberLocation = this.addMemberForm.controls.member_location.value;
    const LmemberName = this.addMemberForm.controls.member_name.value;
    const LmemberSurname = this.addMemberForm.controls.member_surname.value;
    const LmemberEmail = this.addMemberForm.controls.member_email.value;
    const LmemberPhone = this.addMemberForm.controls.member_phone.value;

    const user = this.authService.getCurrentSessionValue;
    const org_details: Interface.Organisation = { orgName: user.user.organisation };
    const member_details: Interface.OrganisationMember = { name: LmemberName, surname: LmemberSurname, email: LmemberEmail };


    this.userManagementService.addOrgMember(org_details, member_details).subscribe((response: any) => {
      this.loading = false;

      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Member Added", "Dismiss", {
          duration: 6000
        });
        this.refreshDataSource();
      } 
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Adding Member", message: response.message } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.addMember();
          }
        })
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SELECT ORGANIZATION
  /**
   * This function sets the Member selected by the user in the table
   *
   * @param {Interface.OrganisationMember} member
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  selectOrganisation(member: Interface.OrganisationMember) {
    this.selectedMember = member;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     REMOVE MEMBER PROMPT
  /**
   * This function prompts the user to confirm if they wish to remove the selected Member
   *
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeMemberPrompt(member: Interface.OrganisationMember) {
    const memberDetails = member.fname + " " + member.surname + " " + member.email;

    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Remove Member",
        message: "Are you sure you want to remove this Member?",
        info: memberDetails,
        cancel: "Cancel",
        confirm: "Remove"
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == "Confirm") {
        this.selectedMember = member;
        this.removeMember();
      }
    })
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                           REMOVE MEMBER   
  /**
   * This function calls the *http* service to remove the selected Organisation 
   *
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeMember() {
    this.userManagementService.removeOrganizationMember(this.selectedMember).subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Member Removed", "Dismiss", {
          duration: 3000
        });
        this.refreshDataSource();
      } 
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Removing", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.removeMember();
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
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  refreshDataSource() {
    this.viewMembers();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            VIEW MEMBERS
  /**
   * This function calls the *http* service to get all registered Organization Members
   *
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  viewMembers() {
    this.userManagementService.getAllOrganizationMembers().subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        this.orgMembers = response.data.members;
        this.dataSource = new MatTableDataSource(this.orgMembers);
        this.dataSource.paginator = this.paginator;

      } 
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Loading Members", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.viewMembers();
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
   * @memberof MemberHandlerComponent
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
   * @memberof MemberHandlerComponent
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
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadAdminProfileDetails() {
    //Getting the user's details from local storage
    var tempUser = this.authService.getCurrentSessionValue;
    //The id number of the user that is currently logged in
    this.id = tempUser.user.ID;
    //The organization of the user that is currently logged in
    this.organization = tempUser.user.organisation;

    //Subscribing to the UserManagementAPIService to get all the staff members details
    this.userManagementService.getUserDetails(this.organization, this.id).subscribe((response: any) => {
      if (response.success == true) {
        //Temporarily holds the data returned from the API call
        const data = response.data;

        //Setting the user type of the user
        this.userType = data.userType;
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
   *  @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  saveChanges() {
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
          //Making sure that local storage now has the updated user information
          this.authService.setCurrentUserValues(this.name, this.surname, this.email);

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
  //                                                        DISPLAY PROFILE SAVE BUTTON 
  /**
   * This function will display the save button option if any details in the profile have been altered
   * 
   * @memberof MemberHandlerComponent
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
   * @memberof MemberHandlerComponent
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
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleHelpTab() {
    this.helpTab = !this.helpTab;
  }

}

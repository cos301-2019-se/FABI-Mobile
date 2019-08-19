/**
 * File Name: admin-dashboard.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\admin-profile\admin-profile.component.ts
 * Project Name: fabi-web
 * Created Date: Thursday, July 18rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Sunday, August 18th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { UserManagementAPIService } from 'src/app/_services/user-management-api.service';
import { NotificationLoggingService, UserLogs, DatabaseManagementLogs, AccessLogs } from '../../_services/notification-logging.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { DISABLED } from '@angular/forms/src/model';

import { ChangePasswordFormValidators } from "../../_interfaces/form-validators";
import { LoadingComponent } from 'src/app/_loading/loading.component';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminProfileComponent implements OnInit {


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

  /** The form to change the user's password -  @type {FormGroup} */
  changePasswordForm: FormGroup;

  /** Indicates if the profile tab is hidden/shown - @type {boolean} */  
  profileTab: boolean = false;

  submitted: boolean;

  /** Specifies if the user details have been retreived to disable the loading spinner - @type {boolean} */  
  userProfileLoading: boolean = true;

  /** Holds the input element (passwordInput) from the HTML page - @type {ElementRef} */
  @ViewChild("passwordInput") passwordInput : ElementRef;
  /** Holds the input element (confirmInput) from the HTML page - @type {ElementRef} */
  @ViewChild("confirmInput") confirmInput : ElementRef;

  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;

  isEditingProfile: boolean = false;

  admin_profile_validators = {
    'admin_name': [
      { type: 'required', message: 'First name required' },
    ],
    'admin_surname': [
      { type: 'required', message: 'Surname required' },
    ],
    'admin_email': [
      { type: 'required', message: 'Email required' },
      { type: 'pattern', message: 'Invalid email' }
    ]
  }


  change_password_validators = {
    'current_password': [
      { type: 'required', message: 'Current password required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' }
      // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'new_password': [
      { type: 'required', message: 'New password required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' }
      // { type: 'pattern', message: 'Your password must contain at least one uppercase' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password required' },
      { type: 'passwordMatch', message: 'Passwords must match' }
    ]
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of AdminProfileComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {FormBuilder} formBuilder Used to get the form elements from the HTML page
   * @param {AuthenticationService} authService Used for all authentication and session control
   * @param {Router} router
   * 
   * @memberof AdminProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private userManagementService: UserManagementAPIService, 
    private formBuilder: FormBuilder, 
    private notificationLoggingService: NotificationLoggingService, 
    private snackBar: MatSnackBar, 
    private authService: AuthenticationService, 
    private router: Router,
    private dialog: MatDialog
    ) { 
    this.adminProfileForm = this.formBuilder.group({
      admin_name: ['', Validators.required],
      admin_surname: ['', Validators.required],
      admin_email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      admin_type: ['', Validators.required]
    });

    this.changePasswordForm = this.formBuilder.group({
      current_password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      new_password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      confirm_password: ['', Validators.required]
    }, {
      validator: this.PasswordMatch('new_password', 'confirm_password')
    });

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call loadAdminProfileDetails() | 2. Call loadNotifications() 
   * 
   * @memberof AdminProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {

    //******** TEMPORARY LOGIN FOR DEVELOPMENT: ********
    this.authService.temporaryLoginSuperUser().subscribe((response : any) => {
      this.currentUser = this.authService.getCurrentSessionValue.user;
      this.loadAdminProfileDetails();
    });

    this.adminProfileForm.get('admin_name').disable();
    this.adminProfileForm.get('admin_surname').disable();
    this.adminProfileForm.get('admin_email').disable();

    //******** TO BE USED IN PRODUCTION: ********
    //Calling the neccessary functions as the page loads
    // this.currentUser = this.authService.getCurrentSessionValue.user;
    // this.loadAdminProfileDetails();
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
  //                                                  LOAD ADMIN PROFILE DETAILS
  /**
   *  This function will use an API service to load all the admin member's details into the elements on the HTML page.
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadAdminProfileDetails(){
    //The id number of the user that is currently logged in
    this.id = this.currentUser.ID;
    //The organization of the user that is currently logged in
    this.organization = this.currentUser.organisation;

    //Subscribing to the UserManagementAPIService to get all the staff members details
    this.userManagementService.getUserDetails(this.organization, this.id).subscribe((response: any) => {
      if(response.success == true){
        //Temporarily holds the data returned from the API call
        const data = response.data;

        //Deactivate loading spinners
        this.userProfileLoading = false;

        // Fill the form inputs with the user's details
        this.adminProfileForm.setValue( {
          admin_name: data.fname,
          admin_surname: data.surname,
          admin_email: data.email,
          admin_type: data.userType
        });
      }
      else{
        //Error handling
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SAVE CHANGES
  /**
   *  This function will send the details to the API to save the changed details to the system.
   *  @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  saveChanges(){

    this.submitted = true;

    // Check if form input is valid 
    if (this.adminProfileForm.invalid) {
      return;
    }
      
    var Uemail = this.adminProfileForm.controls.admin_email.value;
    var Uname = this.adminProfileForm.controls.admin_name.value;
    var Usurname = this.adminProfileForm.controls.admin_surname.value;

    let loadingRef = this.dialog.open(LoadingComponent, {data: { title: "Updating Profile Details" }});

    //Making a call to the User Management API Service to save the user's changed profile details
    this.userManagementService.updateFABIMemberDetails(Uemail, Uname, Usurname).subscribe((response: any) => {

      loadingRef.close();

      if(response.success == true){
        
         //Display message to say that details were successfully saved
        let snackBarRef = this.snackBar.open("Successfully saved profile changes", "Dismiss", {
          duration: 3000
        });

        //Reloading the updated user's details
        this.loadAdminProfileDetails();

      }
      else{
        //Error handling
        let snackBarRef = this.snackBar.open("Could not save profile changes", "Dismiss", {
          duration: 3000
        });
      }
    });
  }

  changePassword() {

    this.submitted = true;

    // Check if form input is valid 
    if (this.changePasswordForm.invalid) {
      return;
    }
      
    var Ucurrent = this.changePasswordForm.controls.current_password.value;
    var Unew = this.changePasswordForm.controls.new_password.value;

    let loadingRef = this.dialog.open(LoadingComponent, {data: { title: "Updating Password" }});
    
    this.userManagementService.updateStaffPassword(Ucurrent, Unew).subscribe((response: any) => {

      loadingRef.close();

      if(response.success == true && response.code == 200){

        //Display message to say that details were successfully saved
        let snackBarRef = this.snackBar.open("Successfully changed password. Please login with new password", "Dismiss", {
          duration: 3000
        });

        this.authService.logoutUser();
        this.router.navigate(['login']);
      }
      else{
        //Error handling
        let snackBarRef = this.snackBar.open("Could not change password", "Dismiss", {
          duration: 3000
        });
      }
    });
  }

  
  PasswordMatch(newP: string, confirmP: string) {
      return (formGroup: FormGroup) => {
        const newControl = formGroup.controls[newP];
        const confirmControl = formGroup.controls[confirmP];

        if (confirmControl.errors && !confirmControl.errors.passwordMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (newControl.value !== confirmControl.value) {
          confirmControl.setErrors({ passwordMatch: true });
        } else {
          confirmControl.setErrors(null);
        }
    }
  }
 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof AdminProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  editProfileToggle() {

    if(this.isEditingProfile) {
      this.adminProfileForm.get('admin_name').disable();
      this.adminProfileForm.get('admin_surname').disable();
      this.adminProfileForm.get('admin_email').disable();
      this.isEditingProfile = false;
    } else {
      this.adminProfileForm.get('admin_name').enable();
      this.adminProfileForm.get('admin_surname').enable();
      this.adminProfileForm.get('admin_email').enable();
      this.isEditingProfile = true;
    }
    
  }

}

/**
 * File Name: staff-profile.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Staff\staff-profile\staff-profile.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, July 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Saturday, October 5th 2019
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
import { LoadingComponent } from 'src/app/_loading/loading.component';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StaffProfileComponent implements OnInit {

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

  /** The form to display the staff member's details -  @type {FormGroup} */
  staffProfileForm: FormGroup;

  /** The form to change the user's password -  @type {FormGroup} */
  changePasswordForm: FormGroup;

  /** Specifies if the user details have been retreived to disable the loading spinner - @type {boolean} */
  userProfileLoading: boolean = true;


  /** Holds the input element (passwordInput) from the HTML page - @type {ElementRef} */
  @ViewChild("passwordInput") passwordInput: ElementRef;
  /** Holds the input element (confirmInput) from the HTML page - @type {ElementRef} */
  @ViewChild("confirmInput") confirmInput: ElementRef;

  /** The user that is currently logged in -  @type {any} */
  currentUser: any = {};

  isEditingProfile: boolean = false;

  submitted: boolean;

  staff_profile_validators = {
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
   * Creates an instance of StaffProfileComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {AuthenticationService} authService Used for all authentication and session control
   * @param {FormBuilder} formBuilder Used to get the form elements from the HTML page
   * @param {Router} router
   * 
   * @memberof StaffProfileComponent
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
    this.staffProfileForm = this.formBuilder.group({
      staff_name: '',
      staff_surname: '',
      staff_email: '',
      staff_type: ''
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
  //                                                          NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call loadStaffProfileDetails() | 2. Call loadNotifications() 
   * 
   * @memberof StaffProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {

    //******** TEMPORARY LOGIN FOR DEVELOPMENT: ********
    // this.authService.temporaryLoginStaff().subscribe((response: any) => {
    //   this.currentUser = this.authService.getCurrentSessionValue.user;
    //   this.loadStaffProfileDetails();
    // });

    //******** TO BE USED IN PRODUCTION: ********
    // Set current user logged in
    this.currentUser = this.authService.getCurrentSessionValue.user;
    // Calling the neccessary functions as the page loads
    this.loadStaffProfileDetails();

    this.staffProfileForm.get('staff_name').disable();
    this.staffProfileForm.get('staff_surname').disable();
    this.staffProfileForm.get('staff_email').disable();

   
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof StaffProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD STAFF PROFILE DETAILS
  /**
   *  This function will use an API service to load all the staff member's details into the elements on the HTML page.
   * 
   * @memberof StaffProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadStaffProfileDetails() {
    //The id number of the user that is currently logged in
    this.id = this.currentUser.ID;
    //The organization of the user that is currently logged in
    this.organization = this.currentUser.organisation;

    //Subscribing to the UserManagementAPIService to get all the staff members details
    this.userManagementService.getUserDetails(this.organization, this.id).subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        //Temporarily holds the data returned from the API call
        const data = response.data;

        //Deactivate loading spinners
        this.userProfileLoading = false;

        // Fill the form inputs with the user's details
        this.staffProfileForm.setValue({
          staff_name: data.fname,
          staff_surname: data.surname,
          staff_email: data.email,
          staff_type: data.userType
        });
      }
      else {
        //Error handling
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      SAVE CHANGES
  /**
   *  This function will send the details to the API to save the changed details to the system.
   *  @memberof StaffProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  saveChanges() {

    this.submitted = true;

    // Check if form input is valid 
    if (this.staffProfileForm.invalid) {
      return;
    }

    var Uemail = this.staffProfileForm.controls.staff_email.value;
    var Uname = this.staffProfileForm.controls.staff_name.value;
    var Usurname = this.staffProfileForm.controls.staff_surname.value;

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Updating Profile" } });

    // Making a call to the User Management API Service to save the user's changed profile details
    this.userManagementService.updateFABIMemberDetails(Uemail, Uname, Usurname).subscribe((response: any) => {

      loadingRef.close();

      if (response.success == true && response.code == 200) {

        //Reloading the updated user's details
        this.loadStaffProfileDetails();

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

  changePassword() {

    this.submitted = true;

    // Check if form input is valid 
    if (this.changePasswordForm.invalid) {
      return;
    }

    var Ucurrent = this.changePasswordForm.controls.current_password.value;
    var Unew = this.changePasswordForm.controls.new_password.value;

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Updating Password" } });

    this.userManagementService.updateStaffPassword(Ucurrent, Unew).subscribe((response: any) => {

      loadingRef.close();

      if (response.success == true && response.code == 200) {

        //Display message to say that details were successfully saved
        let snackBarRef = this.snackBar.open("Successfully changed password.", "Dismiss", {
          duration: 3000
        });
      }
      else {
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
  //                                                        SHOW PASSWORD
  /**
   *  This function will make the users password visible on request. 
   * 
   * @memberof StaffProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  showPassword() {
    if (this.passwordInput.nativeElement.type === 'password') {
      this.passwordInput.nativeElement.type = 'text';
    }
    else {
      this.passwordInput.nativeElement.type = 'password';
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SHOW CONFIRMED PASSWORD
  /**
   *  This function will make the users confirmed password visible on request. 
   * 
   * @memberof StaffProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  showConfirmedPassword() {
    if (this.confirmInput.nativeElement.type === 'password') {
      this.confirmInput.nativeElement.type = 'text';
    }
    else {
      this.confirmInput.nativeElement.type = 'password';
    }
  }

  editProfileToggle() {

    if (this.isEditingProfile) {
      this.staffProfileForm.get('staff_name').disable();
      this.staffProfileForm.get('staff_surname').disable();
      this.staffProfileForm.get('staff_email').disable();
      this.isEditingProfile = false;
    } else {
      this.staffProfileForm.get('staff_name').enable();
      this.staffProfileForm.get('staff_surname').enable();
      this.staffProfileForm.get('staff_email').enable();
      this.isEditingProfile = true;
    }

  }


}

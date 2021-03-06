/**
 * File Name: organization-profile.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization\organization-profile\organization-profile.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, October 16th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import * as http from '@angular/common/http';
import * as core from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/_services/notification.service';
import { UserManagementAPIService } from 'src/app/_services/user-management-api.service';
import { LoadingComponent } from "../../_loading/loading.component";
import { AuthenticationService } from '../../_services/authentication.service';


@core.Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss'],
  encapsulation: core.ViewEncapsulation.None
})
export class OrganizationProfileComponent implements core.OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */
  private toggle_status: boolean = false;
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
  /** The form to change the user's password -  @type {FormGroup} */
  changePasswordForm: FormGroup;
  /** The user that is currently logged in -  @type {any} */
  currentUser: any
  /** if user is editing their profile details - @type {boolean} */
  isEditingProfile: boolean = false;
  /** if form has been submitted - @type {boolean} */
  submitted: boolean;
  /** Specifies if the user details have been retreived to disable the loading spinner - @type {boolean} */
  userProfileLoading: boolean = true;
  userProfileDetails: any = "";

  /** Holds the input element (passwordInput) from the HTML page - @type {ElementRef} */
  @core.ViewChild("passwordInput") passwordInput: core.ElementRef;
  /** Holds the input element (confirmInput) from the HTML page - @type {ElementRef} */
  @core.ViewChild("confirmInput") confirmInput: core.ElementRef;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          FORM VALIDATORS
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
   * Creates an instance of OrganizationProfileComponent.
   * 
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {AuthenticationService} authService for calling the *authentication* service
   * @param {Router} router
   * @param {FormBuilder} formBuilder Used to get the form elements from the HTML page
   * 
   * @memberof OrganizationProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private userManagementService: UserManagementAPIService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.adminProfileForm = this.formBuilder.group({
      organization_name: ['', Validators.required],
      admin_name: ['', Validators.required],
      admin_surname: ['', Validators.required],
      admin_email: ['', Validators.required]
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
   * @description 1. Call loadAdminProfileDetails()
   * 
   * @memberof OrganizationProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    // Set current user logged in
    this.currentUser = this.authService.getCurrentSessionValue.user;
    // Calling the neccessary functions as the page loads
    this.loadAdminProfileDetails();
    this.adminProfileForm.get('organization_name').disable();
    this.adminProfileForm.get('admin_name').disable();
    this.adminProfileForm.get('admin_surname').disable();
    this.adminProfileForm.get('admin_email').disable();
    this.resetMemberFields();
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD ADMIN PROFILE DETAILS
  /**
   *  This function will use an API service to load all the admin member's details into the elements on the HTML page.
   * 
   * @memberof OrganizationProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadAdminProfileDetails() {
    //The id number of the user that is currently logged in
    this.id = this.currentUser.ID;
    //The organization of the user that is currently logged in
    this.organization = this.currentUser.organisation;

    //Subscribing to the UserManagementAPIService to get all the staff members details
    this.userManagementService.getUserDetails(this.organization, this.id).subscribe((response: any) => {
      if (response.success == true) {
        //Temporarily holds the data returned from the API call
        this.userProfileDetails = response.data;

        //Deactivate loading spinners
        this.userProfileLoading = false;

        // Fill the form inputs with the user's details
        this.adminProfileForm.setValue({
          admin_name: this.userProfileDetails.fname,
          admin_surname: this.userProfileDetails.surname,
          admin_email: this.userProfileDetails.email,
          organization_name: this.currentUser.organisation
        });
      }
      else {
        //Error handling
        this.notificationService.showWarningNotification('Error', 'Could not load profile details.');
      }
    }, (err: http.HttpErrorResponse) => {
      this.notificationService.showWarningNotification('Error', 'Could not load profile details.');
      //Handled in error-handler
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof OrganizationProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  TOGGLE NOTIFICATIONS TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof OrganizationProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab() {
    this.toggle_status = !this.toggle_status;
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SAVE CHANGES
  /**
   *  This function will send the details to the API to save the changed details to the system.
   * 
   *  @memberof OrganizationProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  saveChanges() {

    this.submitted = true;

    // Check if form input is valid 
    if (this.adminProfileForm.invalid) {
      return;
    }

    var Uemail = this.adminProfileForm.controls.admin_email.value;
    var Uname = this.adminProfileForm.controls.admin_name.value;
    var Usurname = this.adminProfileForm.controls.admin_surname.value;

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Updating Profile" } });

    //Making a call to the User Management API Service to save the user's changed profile details
    this.userManagementService.updateOrganizationMemberDetails(Uemail, Uname, Usurname).subscribe((response: any) => {

      loadingRef.close();
      this.isEditingProfile = true;
      this.editProfileToggle();
      this.resetMemberFields();

      if (response.success == true && response.code == 200) {
        //Reloading the updated user's details
        this.loadAdminProfileDetails();
        //Display message to say that details were successfully saved
        this.notificationService.showSuccessNotification('Profile Updated', '');
      }
      else {
        //Error handling
        this.notificationService.showErrorNotification('Update Failed', 'Could not update profile details');
      }
    }, (err: http.HttpErrorResponse) => {
      loadingRef.close();
      this.isEditingProfile = true;
      this.editProfileToggle();
      this.resetMemberFields();
      this.notificationService.showErrorNotification('Update Failed', 'Could not update profile details');
      //Handled in error-handler
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        CHANGE PASSWORD
  /**
   * This function is used to change the users password
   *
   * @returns
   * @memberof OrganizationProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  changePassword() {
    this.submitted = true;

    // Check if form input is valid 
    if (this.changePasswordForm.invalid) {
      return;
    }

    var Ucurrent = this.changePasswordForm.controls.current_password.value;
    var Unew = this.changePasswordForm.controls.new_password.value;

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Updating Password" } });

    this.userManagementService.updateOrganizationMemberPassword(Ucurrent, Unew).subscribe((response: any) => {

      loadingRef.close();
      this.resetMemberFields();

      if (response.success == true && response.code == 200) {

        //Display message to say that details were successfully saved
        this.notificationService.showSuccessNotification('Password Changed', '');
      }
      else {
        //Error handling
        this.notificationService.showErrorNotification('Update Failed', 'Could not change password');
      }
    }, (err: http.HttpErrorResponse) => {
      loadingRef.close();
      this.notificationService.showErrorNotification('Update Failed', 'Could not change password');
      this.resetMemberFields();
      //Handled in error-handler
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     PASSWORD MATCH CHECK
  /**
   * This function will check that the *new password* and the *confirm password* fields are the same for the `change password` method.
   *  This function is used for the form validators.
   *
   * @param {string} newP
   * @param {string} confirmP
   * @returns
   * @memberof OrganizationProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
   * @memberof OrganizationProfileComponent
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
   * @memberof OrganizationProfileComponent
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
      this.adminProfileForm.get('admin_name').disable();
      this.adminProfileForm.get('admin_surname').disable();
      this.adminProfileForm.get('admin_email').disable();
      this.isEditingProfile = false;
      this.resetMemberFields();
    } else {
      this.adminProfileForm.get('admin_name').enable();
      this.adminProfileForm.get('admin_surname').enable();
      this.adminProfileForm.get('admin_email').enable();
      this.isEditingProfile = true;
    }

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            RESET FORMS 
  /**
   * This function will clear the inputs and reset the form
   * 
   * @memberof OrganizationProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  resetMemberFields() {
    this.adminProfileForm.reset();
    // Fill the form inputs with the user's details
    this.adminProfileForm.setValue({
      admin_name: this.userProfileDetails.fname,
      admin_surname: this.userProfileDetails.surname,
      admin_email: this.userProfileDetails.email,
      organization_name: this.currentUser.organisation
    });
    this.changePasswordForm.reset();
    this.submitted = false;
  }

}

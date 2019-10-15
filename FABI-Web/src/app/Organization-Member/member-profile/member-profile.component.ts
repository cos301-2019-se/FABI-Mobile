/**
 * File Name: member-profile.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization-Member\member-profile\member-profile.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
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
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/_services/notification.service';
import { UserManagementAPIService } from 'src/app/_services/user-management-api.service';
import { LoadingComponent } from "../../_loading/loading.component";
import { AuthenticationService } from '../../_services/authentication.service';


@core.Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss'],
  encapsulation: core.ViewEncapsulation.None
})
export class MemberProfileComponent implements core.OnInit {

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
  /** The staff member's password -  @type {string} */
  password: string = '';
  /** The staff member's confirmed password -  @type {string} */
  confirmPassword: string = '';
  /** The form to display the admin member's details -  @type {FormGroup} */
  memberProfileForm: FormGroup;
  /** The form to change the user's password -  @type {FormGroup} */
  changePasswordForm: FormGroup;
  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */
  private toggle_status: boolean = false;
  /** The user that is currently logged in - @type {boolean} */
  currentUser: any;
  /** if the user is editing their profile details - @type {boolean} */
  isEditingProfile: boolean = false;
  /** if the form has been submitted - @type {boolean} */
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

  member_profile_validators = {
    'member_name': [
      { type: 'required', message: 'First name required' },
    ],
    'member_surname': [
      { type: 'required', message: 'Surname required' },
    ],
    'member_email': [
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
   * Creates an instance of MemberProfileComponent.
   * 
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {AuthenticationService} authService for calling the *authentication* service
   * @param {Router} router
   * @param {FormBuilder} formBuilder Used to get the form elements from the HTML page
   * 
   * @memberof MemberProfileComponent
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
    this.memberProfileForm = this.formBuilder.group({
      organization_name: '',
      member_name: '',
      member_surname: '',
      member_email: ''
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
   * @description 1. Call loadMemberProfileDetails()
   * 
   * @memberof MemberProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    // Set current user logged in
    this.currentUser = this.authService.getCurrentSessionValue.user;
    // Calling the neccessary functions as the page loads
    this.loadMemberProfileDetails();

    this.memberProfileForm.get('organization_name').disable();
    this.memberProfileForm.get('member_name').disable();
    this.memberProfileForm.get('member_surname').disable();
    this.memberProfileForm.get('member_email').disable();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      TOGGLE NOTIFICATIONS TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof MemberProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab() {
    this.toggle_status = !this.toggle_status;
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                              LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof MemberProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD MEMBER PROFILE DETAILS
  /**
   *  This function will use an API service to load all the admin member's details into the elements on the HTML page.
   * 
   * @memberof MemberProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadMemberProfileDetails() {

    //The id number of the user that is currently logged in
    this.id = this.currentUser.ID;
    //The organization of the user that is currently logged in
    this.organization = this.currentUser.organisation;

    //Subscribing to the UserManagementAPIService to get all the staff members details
    this.userManagementService.getUserDetails(this.organization, this.id).subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        //Temporarily holds the data returned from the API call
        this.userProfileDetails = response.data;

        //Deactivate loading spinners
        this.userProfileLoading = false;

        // Fill the form inputs with the user's details
        this.memberProfileForm.setValue({
          member_name: this.userProfileDetails.fname,
          member_surname: this.userProfileDetails.surname,
          member_email: this.userProfileDetails.email,
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
  //                                                            SAVE CHANGES
  /**
   *  This function will send the details to the API to save the changed details to the system.
   * 
   *  @memberof MemberProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  saveChanges() {

    this.submitted = true;

    // Check if form input is valid 
    if (this.memberProfileForm.invalid) {
      return;
    }

    var Uemail = this.memberProfileForm.controls.member_email.value;
    var Uname = this.memberProfileForm.controls.member_name.value;
    var Usurname = this.memberProfileForm.controls.member_surname.value;

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Updating Profile" } });

    //Making a call to the User Management API Service to save the user's changed profile details
    this.userManagementService.updateOrganizationMemberDetails(Uemail, Uname, Usurname).subscribe((response: any) => {

      loadingRef.close();
      this.isEditingProfile = true;
      this.editProfileToggle();
      this.resetAddFields();

      if (response.success == true && response.code == 200) {

        //Reloading the updated user's details
        this.loadMemberProfileDetails();

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
      this.resetAddFields();
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
   * @memberof MemberProfileComponent
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
      this.resetAddFields();

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
      this.resetAddFields();
      this.notificationService.showErrorNotification('Update Failed', 'Could not change password');
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
   * @memberof MemberProfileComponent
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
  //                                                          SHOW PASSWORD
  /**
   *  This function will make the users password visible on request. 
   * @memberof MemberProfileComponent
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
   * @memberof MemberProfileComponent
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
      this.memberProfileForm.get('member_name').disable();
      this.memberProfileForm.get('member_surname').disable();
      this.memberProfileForm.get('member_email').disable();
      this.isEditingProfile = false;
      this.resetAddFields();
    } else {
      this.memberProfileForm.get('member_name').enable();
      this.memberProfileForm.get('member_surname').enable();
      this.memberProfileForm.get('member_email').enable();
      this.isEditingProfile = true;
    }

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            RESET FORMS
  /**
   * This function will clear the inputs and reset all forms
   * 
   * @memberof MemberProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  resetAddFields() {
    this.memberProfileForm.reset();
    // Fill the form inputs with the user's details
    this.memberProfileForm.setValue({
      member_name: this.userProfileDetails.fname,
      member_surname: this.userProfileDetails.surname,
      member_email: this.userProfileDetails.email,
      organization_name: this.currentUser.organisation
    });
    this.changePasswordForm.reset();
    this.submitted = false;
  }

}

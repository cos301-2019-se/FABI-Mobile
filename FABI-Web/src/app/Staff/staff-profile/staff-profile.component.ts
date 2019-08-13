/**
 * File Name: staff-profile.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Staff\staff-profile\staff-profile.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, July 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, August 13th 2019
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
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

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

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

  /** Holds the input element (passwordInput) from the HTML page - @type {ElementRef} */
  @ViewChild("passwordInput") passwordInput : ElementRef;
  /** Holds the input element (confirmInput) from the HTML page - @type {ElementRef} */
  @ViewChild("confirmInput") confirmInput : ElementRef;

  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;


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
    private router: Router
    ) { 
      this.staffProfileForm = this.formBuilder.group({
      organization_name: '',
      staff_name: '',
      staff_surname: '',
      staff_email: '',
      staff_type: '',
      staff_password: '',
      staff_confirm: ''
    });
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
  loadStaffProfileDetails(){
    //The id number of the user that is currently logged in
    this.id = this.currentUser.user.ID;
    //The organization of the user that is currently logged in
    this.organization = this.currentUser.user.organisation;

    //Subscribing to the UserManagementAPIService to get all the staff members details
    this.userManagementService.getUserDetails(this.organization, this.id).subscribe((response: any) => {
      if(response.success == true){
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
      else{
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
  saveChanges(){
    //Indicates if the details can be changed based on whether the passwords match or not
    var valid = true;

    //Checking to make sure that the passwords are not empty
    //Checking to make sure that the password and confirmed password match
    if(this.staffProfileForm.controls.admin_password.value != '' && 
    this.staffProfileForm.controls.admin_password.value == this.staffProfileForm.controls.admin_confirm.value){
      this.password = this.staffProfileForm.controls.admin_password.value;
    }
    else{
      //Indicates that the changes cannot be saved
      valid = false;

      //POPUP MESSAGE
      let snackBarRef = this.snackBar.open("Please make sure that the passwords are the same", "Dismiss", {
        duration: 3000
      });
    }

    //Indicates that the changes that the user has made to their profile details, can be changed
    if(valid == true){
      if(this.staffProfileForm.controls.staff_email.value == ''){
        this.email = this.email;
      }
      else{
        this.email = this.staffProfileForm.controls.staff_email.value;
      }

      if(this.staffProfileForm.controls.staff_name.value == ''){
        this.name = this.name;
      }
      else{
        this.name = this.staffProfileForm.controls.staff_name.value;
      }

      if(this.staffProfileForm.controls.staff_surname.value == ''){
        this.surname == this.surname;
      }
      else{
        this.surname = this.staffProfileForm.controls.staff_surname.value;
      }

      //Making a call to the User Management API Service to save the user's changed profile details
      this.userManagementService.updateFABIMemberDetails(this.email, this.name, this.surname, this.id, this.password).subscribe((response: any) => {
        if(response.success == true){
          //Making sure that local storage now has the updated user information
          this.authService.setCurrentUserValues(this.name, this.surname, this.email);

          //Reloading the updated user's details
          this.loadStaffProfileDetails();

          //Display message to say that details were successfully saved
          let snackBarRef = this.snackBar.open("Successfully saved profile changes", "Dismiss", {
            duration: 3000
          });
        }
        else{
          //Error handling
          let snackBarRef = this.snackBar.open("Could not save profile changes", "Dismiss", {
            duration: 3000
          });
        }
      });
    }
    else{
      //Error handling
      let snackBarRef = this.snackBar.open("Please make sure that you provide all the information", "Dismiss", {
        duration: 3000
      });
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
  showPassword(){
    if(this.passwordInput.nativeElement.type === 'password'){
      this.passwordInput.nativeElement.type = 'text';
    }
    else{
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
  showConfirmedPassword(){
    if(this.confirmInput.nativeElement.type === 'password'){
      this.confirmInput.nativeElement.type = 'text';
    }
    else{
      this.confirmInput.nativeElement.type = 'password';
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  TOGGLE NOTIFICATIONS TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof StaffProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab(){
    this.toggle_status = !this.toggle_status; 
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
    this.currentUser = this.authService.getCurrentSessionValue.user;
    
    //Calling the neccessary functions as the page loads
    this.loadStaffProfileDetails();
  }

}

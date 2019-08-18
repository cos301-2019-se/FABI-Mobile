/**
 * File Name: organization-profile.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization\organization-profile\organization-profile.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Saturday, August 17th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import * as Interface from "../../_interfaces/interfaces";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../../_errors/error-component/error.component';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { AuthenticationService } from '../../_services/authentication.service';
import { LoadingComponent } from "../../_loading/loading.component";

import { UserManagementAPIService } from 'src/app/_services/user-management-api.service';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrganizationProfileComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

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

  currentUser: any

  isEditingProfile: boolean = false;

  /** Holds the input element (passwordInput) from the HTML page - @type {ElementRef} */
  @ViewChild("passwordInput") passwordInput : ElementRef;
  /** Holds the input element (confirmInput) from the HTML page - @type {ElementRef} */
  @ViewChild("confirmInput") confirmInput : ElementRef;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of OrganizationProfileComponent.
   * 
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {AuthenticationService} authService Used for all authentication and session control
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
    private userManagementService: UserManagementAPIService
    ) { 
    this.adminProfileForm = this.formBuilder.group({
      organization_name: ['', Validators.required],
      admin_name: ['', Validators.required],
      admin_surname: ['', Validators.required],
      admin_email: ['', Validators.required]
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

    //******** TEMPORARY LOGIN FOR DEVELOPMENT: ********
    this.authService.temporaryLoginOrganisation().subscribe((response : any) => {
      this.currentUser = this.authService.getCurrentSessionValue.user;
      this.loadAdminProfileDetails();
    });

    //******** TO BE USED IN PRODUCTION: ********
    //Calling the neccessary functions as the page loads
    // this.currentUser = this.authService.getCurrentSessionValue.user;
    // this.loadAdminProfileDetails();

    this.adminProfileForm.get('organization_name').disable();
    this.adminProfileForm.get('admin_name').disable();
    this.adminProfileForm.get('admin_surname').disable();
    this.adminProfileForm.get('admin_email').disable();
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD ADMIN PROFILE DETAILS
  /**
   *  This function will use an API service to load all the admin member's details into the elements on the HTML page.
   * 
   * @memberof OrganizationProfileComponent
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

        // Fill the form inputs with the user's details
        this.adminProfileForm.setValue( {
          admin_name: data.fname,
          admin_surname: data.surname,
          admin_email: data.email,
          organization_name: this.currentUser.organisation
        });
      }
      else{
        //Error handling
      }
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
  toggleNotificaitonsTab(){
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
  saveChanges(){
    
    // Check if form input is valid 
    if (this.adminProfileForm.invalid) {
      return;
    }

    var Uemail = this.adminProfileForm.controls.admin_email.value;
    var Uname = this.adminProfileForm.controls.admin_name.value;
    var Usurname = this.adminProfileForm.controls.admin_surname.value;
      
    //Making a call to the User Management API Service to save the user's changed profile details
    this.userManagementService.updateOrganizationMemberDetails(Uemail, Uname, Usurname).subscribe((response: any) => {
      if(response.success == true){

        //Reloading the updated user's details
        this.loadAdminProfileDetails();

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


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SHOW PASSWORD
  /**
   *  This function will make the users password visible on request. 
   * 
   * @memberof OrganizationProfileComponent
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
   * @memberof OrganizationProfileComponent
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

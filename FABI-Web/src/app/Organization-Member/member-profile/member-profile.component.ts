/**
 * File Name: member-profile.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization-Member\member-profile\member-profile.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, July 18th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import * as Interface from "../../_interfaces/interfaces";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../../_errors/error-component/error.component';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { HttpService } from '../../_services/http.service';
import { ConfirmComponent } from "../../confirm/confirm.component";
import { UpdateComponent } from "../../update/update.component";
import { template } from '@angular/core/src/render3';

import { UserManagementAPIService } from 'src/app/_services/user-management-api.service';


@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemberProfileComponent implements OnInit {

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

  /** The form to display the admin member's details -  @type {FormGroup} */
  memberProfileForm: FormGroup;

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of MemberProfileComponent.
   * 
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @memberof MemberProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private service: HttpService, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router,
    private formBuilder: FormBuilder, private userManagementService: UserManagementAPIService){
    this.memberProfileForm = this.formBuilder.group({
      organization_name: '',
      member_name: '',
      member_surname: '',
      member_email: ''
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                           TOGGLE_NOTIFICATIONS_TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab(){
    this.toggle_status = !this.toggle_status; 
 }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_MEMBER_PROFILE_DETAILS
  /**
   *  This function will use an API service to load all the admin member's details into the elements on the HTML page.
   * 
   * @memberof OrganizationProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadMemberProfileDetails(){
    this.id = localStorage.getItem('userID');
    this.organization = localStorage.getItem('userOrganization');

    //Subscribing to the UserManagementAPIService to get all the staff members details
    this.userManagementService.getUserDetails(this.organization, this.id).subscribe((response: any) => {
      if(response.success == true){
        const data = response.data;

        this.name = data.fname;
        this.surname = data.surname;
        this.email = data.email;
      }
      else{
        //Error handling
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            SAVE_CHANGES
  /**
   *  This function will send the details to the API to save the changed details to the system.
   *  @memberof AdminProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  saveChanges(){
    if(this.memberProfileForm.controls.member_email.value == ''){
      this.email = this.email;
    }
    else{
      this.email = this.memberProfileForm.controls.member_email.value;
    }

    if(this.memberProfileForm.controls.member_name.value == ''){
      this.name = this.name;
    }
    else{
      this.name = this.memberProfileForm.controls.member_name.value;
    }

    if(this.memberProfileForm.controls.member_surname.value == ''){
      this.surname == this.surname;
    }
    else{
      this.surname = this.memberProfileForm.controls.member_surname.value;
    }   
    
    this.userManagementService.updateOrganizationMemberDetails(this.organization, this.email, this.name, this.surname, this.id).subscribe((response: any) => {
      if(response.success == true){
        this.loadMemberProfileDetails();

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
  //                                                            NG_ON_INIT()
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.loadMemberProfileDetails();
  }
}

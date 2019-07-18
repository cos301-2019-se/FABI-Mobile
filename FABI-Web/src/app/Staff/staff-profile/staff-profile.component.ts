/**
 * File Name: staff-profile.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Staff\staff-profile\staff-profile.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, July 16th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, July 18th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserManagementAPIService } from 'src/app/services/user-management-api.service';
import { NotificationLoggingService, UserLogs, DatabaseManagementLogs, AccessLogs } from '../../services/notification-logging.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss']
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

  /** The form to display the staff member's details -  @type {FormGroup} */
  staffProfileForm: FormGroup;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of AdminProfileComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @memberof AdminProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private userManagementService: UserManagementAPIService, private formBuilder: FormBuilder, 
    private notificationLoggingService: NotificationLoggingService, private snackBar: MatSnackBar) { 
    this.staffProfileForm = this.formBuilder.group({
      organization_name: '',
      staff_name: ['', Validators.required],
      staff_surname: ['', Validators.required],
      staff_email: ['', Validators.required],
      staff_type: ''
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_STAFF_PROFILE_DETAILS
  /**
   *  This function will use an API service to load all the staff member's details into the elements on the HTML page.
   * 
   * @memberof AdminProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadStaffProfileDetails(){
    this.id = localStorage.getItem('userID');
    this.organization = localStorage.getItem('userOrganization');

    //Subscribing to the UserManagementAPIService to get all the staff members details
    this.userManagementService.getUserDetails(this.organization, this.id).subscribe((response: any) => {
      if(response.success == true){
        const data = response.data;

        this.userType = data.userType;
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
  //                                                  LOAD_USER_DETAILS
  /**
   *  This function will be called so that the information of a specific user can be fetched
   *  @memberof StaffProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails() {
    this.email = localStorage.getItem('email');
    this.organization = localStorage.getItem('organization');

    this.userManagementService.getAllFABIMembers().subscribe((response: any) => {
      if(response.success == true){
        var tempStaff = response.data.qs.staff;
        for(var i = 0; i < tempStaff.length; i++){
          if(tempStaff[i].email == this.email){
            this.name = tempStaff[i].fname;
            this.surname = tempStaff[i].surname;
          }
        }
      } 
      else{
        //Error control
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  SAVE_STAFF_CHANGES
  /**
   *  This function will send the details to the API to save the changed details to the system.
   *  @memberof StaffProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  saveChanges(){
    if (this.staffProfileForm.invalid) {
      return;
    }

    this.email = this.staffProfileForm.controls.admin_email.value;
    this.name = this.staffProfileForm.controls.admin_name.value;
    this.surname = this.staffProfileForm.controls.admin_surname.value;

    this.userManagementService.updateFABIMemberDetails(this.email, this.name, this.surname, this.id).subscribe((response: any) => {
      if(response.success == true){
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

  ngOnInit() {
    this.loadUserDetails();
    this.loadStaffProfileDetails();
  }

}

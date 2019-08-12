/**
 * File Name: organization-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\organization-handler\organization-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Thursday, July 18td 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Monday, August 12th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewChild } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

import { AuthenticationService } from '../../_services/authentication.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../../_errors/error-component/error.component';
import { Router } from '@angular/router';
import { ConfirmComponent } from "../../confirm/confirm.component";

//Include Material Components
import { MatPaginator, MatTableDataSource } from '@angular/material';

import * as Interface from '../../_interfaces/interfaces';

import { NotificationLoggingService, UserLogs, DatabaseManagementLogs, AccessLogs } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';


@Component({
  selector: 'app-organization-handler',
  templateUrl: './organization-handler.component.html',
  styleUrls: ['./organization-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrganizationHandlerComponent implements OnInit {

  displayedColumns: string[] = ['Organization Name', 'Admin', "Remove"];
  dataSource = new MatTableDataSource([]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /** Object for defining the Create Organisation form -  @type {FormGroup} */
  registerOrgForm: FormGroup;
  /** To check if form has been submitted - @type {boolean} */
  submitted: boolean = false;
  /** To check if form has been submitted correctly - @type {boolean} */
  valid: boolean = false;
  /** If page is busy loading something - @type {boolean} */
  loading: boolean = false;
  /** Selected Organisation from the table - @type {Interface.Organisation} */
  selectedOrg: Interface.Organisation = {orgName: "", admin: {fname: "", surname: "", email: ""}};
  /** Array of Organization objects - @type {Organisation[]} */
  organizations: Interface.Organisation[];
  /** The total number of Organization - @type {number} */           
  numberOfOrganizations: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Object array for holding all of the logs -  @type {any[]} */ 
  allNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {any[]} */ 
  newNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {string[]} */ 
  allLogs: string[] = [];

  /** The total number of User Logs - @type {number} */           
  numberOfUserLogs: number = 0;
  /** The total number of Database Management Logs - @type {number} */           
  numberOfDatabaseLogs: number = 0;
  /** The total number of Access Logs - @type {number} */           
  numberOfAccessLogs: number = 0;

  /** Indicates if there are notifications to load - @type {boolean} */           
  notifications: boolean = true; 
  /** THe number of the notifications - @type {number} */   
  localNotificationNumber : number = 1;   

  register_validation_messages = {
    'organization_name': [
      { type: 'required', message: 'Organization name is required' },
    ],
    'admin_email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email' }
    ],
    'admin_name': [
      { type: 'required', message: 'Name is required' }
    ],
    'admin_surname': [
      { type: 'required', message: 'Surname is required' }
    ],
    'admin_phone': [
      { type: 'required', message: 'Phone No. is required' },
      { type: 'pattern', message: 'Please enter a valid South African number' }
    ],   
  }

  /** The name and surname of a user concatenated as a string - @type {string} */   
  user1: string;
  /** The name and surname of a user concatenated as a string - @type {string} */   
  user2: string;

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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
   * Creates an instance of OrganizationHandlerComponent.
   * @param {AdminAPIService} service For calling the API service
   * @param {FormBuilder} formBuilder For creating the login form
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {MatDialog} dialog For dialog pop-up messages
   * @param {Router} router For navigating to other modules/components
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * 
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private authService: AuthenticationService, 
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, 
    private dialog: MatDialog, 
    private router: Router, 
    private userManagementService: UserManagementAPIService, 
    private notificationLoggingService: NotificationLoggingService
    ) {
    this.registerOrgForm = this.formBuilder.group({
      organization_name: ['', Validators.required],
      organization_location: ['', Validators.required],
      admin_name: ['', Validators.required],
      admin_surname: ['', Validators.required],
      admin_email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      admin_phone: ['', Validators.compose([
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
  //                                                        GET DATE
  /**
   *  This function will put the string date provided into a more readable format for the notifications
   * @param {string} date The date of the log
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getDate(date: string){
    var tempDate = (date).split(' ');
    var newDate = '';

    newDate += tempDate[2];

    if(tempDate[0] == 'Mon'){
      newDate += ' Monday ';
    }
    else if(tempDate[0] == 'Tue' || tempDate[0] == 'Tu' || tempDate[0] == 'Tues'){
      newDate += ' Tuesday ';
    }
    else if(tempDate[0] == 'Wed'){
      newDate += ' Wednesday ';
    }
    else if(tempDate[0] == 'Thu' || tempDate[0] == 'Thur' || tempDate[0] == 'Thurs'){
      newDate += ' Thursday ';
    }
    else if(tempDate[0] == 'Fri'){
      newDate += ' Friday ';
    }
    else if(tempDate[0] == 'Sat'){
      newDate += ' Saturday ';
    }
    else if(tempDate[0] == 'Sun'){
      newDate += ' Sunday ';
    }

    if(tempDate[1] == 'Jan'){
      newDate += 'January';
    }
    else if(tempDate[1] == 'Feb'){
      newDate += 'February';
    }
    else if(tempDate[1] == 'Mar'){
      newDate += 'March';
    }
    else if(tempDate[1] == 'Apr'){
      newDate += 'April';
    }
    else if(tempDate[1] == 'Jun'){
      newDate += 'June';
    }
    else if(tempDate[1] == 'Jul'){
      newDate += 'July';
    }
    else if(tempDate[1] == 'Aug'){
      newDate += 'August';
    }
    else if(tempDate[1] == 'Sep' || tempDate[1] == 'Sept'){
      newDate += 'September';
    }
    else if(tempDate[1] == 'Oct'){
      newDate += 'October';
    }
    else if(tempDate[1] == 'Nov'){
      newDate += 'November';
    }
    else if(tempDate[1] == 'Dec'){
      newDate += 'December';
    }

    newDate += ' ' + tempDate[3];

    return newDate;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       LOAD LOGS
  /**
   *  This function will load all of the user's logs into a string array.
   * 
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadLogs(){
    //Getting the user's details from local storage
    var tempUser = this.authService.getCurrentUserValue;

    //Making a call to the notification logging service to return all logs belonging to the user
    this.notificationLoggingService.getUserLogs(tempUser.user.ID).subscribe((response: any) => {
      if(response.success == true){
        var data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          this.allLogs.push(data[i].id);
        }
      }
      else{
        //Error handling
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       LOAD NOTIFICATIONS
  /**
   *  This function will load the admin's notifications into the notification section on the HTML page
   * 
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNotifications(){
    //Loading all the logs beloning to the user
    this.loadLogs();

    //Making a call too the notification logging service to return all USER logs
    this.notificationLoggingService.getAllUserLogs().subscribe((response: any) => {
      if(response.success = true){
        //Temporarily holds the data returned from the API call
        const data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          for(var j = 0; j < this.allLogs.length; j++){
            if(data[i].date == this.allLogs[j]){
              //A temporary instance of UserLogs that will be added to the allNotifications array
              var tempLogU: UserLogs = {LogID: data[i].date, Type: 'USER', Action: data[i].action, Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, Organization1: data[i].org1, Organization2: data[i].org2, MoreInfo: data[i].moreInfo, ID: this.localNotificationNumber};
              
              //Getting the name and surname of the users passed using their id numbers
              this.loadUserDetails(tempLogU.Organization1, tempLogU.Details, 'user1');

              if(tempLogU.Action == "/createOrganization"){
                tempLogU.Action = "New organization " + tempLogU.User + " was added to the system by " + this.user1;
              }
              else if(tempLogU.Action == "/addStaff"){
                this.loadUserDetails(tempLogU.Organization2, tempLogU.User, 'user2');
                tempLogU.Action = "New user, " + this.user2 + ", was added to the system by " + this.user1;
              }
              else if(tempLogU.Action == "/removeOrg"){
                tempLogU.Action = "Organization " + tempLogU.User + " was removed from the system by " + this.user1;
              }
              else if(tempLogU.Action == "/removeStaff"){
                this.loadUserDetails(tempLogU.Organization2, tempLogU.User, 'user2');
                tempLogU.Action = "New user, " + this.user2 + ", was removed from the system by " + this.user1;
              }
  
              this.allNotifications.push(tempLogU);
              this.numberOfUserLogs += 1;
              this.localNotificationNumber += 1;
            }
          }          
        }
      }
      else{
        //Error handling
      }
    });

    //Making a call too the notification logging service to return all DBML logs
    this.notificationLoggingService.getAllDatabaseManagementLogs().subscribe((response: any) => {
      if(response.success == true){
        //Temporarily holds the data returned from the API call
        const data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          for(var j = 0; j < this.allLogs.length; j++){
            if(data[i].date == this.allLogs[j]){
              //A temporary instance of DatabaseManagementLogs that will be added to the allNotifications array
              var tempLogD: DatabaseManagementLogs = {LogID: data[i].date, Type: 'DBML', Action: data[i].action, Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, Organization1: data[i].org1, Organization2: data[i].org2, MoreInfo: data[i].moreInfo, ID: this.localNotificationNumber}

              //Getting the name and surname of the users passed using their id numbers
              this.loadUserDetails(tempLogD.Organization1, tempLogD.User, 'user1');

              if(tempLogD.Action == "/createDatabase"){
                tempLogD.Action = "New database, " + tempLogD.Details + ", was added to the system by " + this.user1;
              }
              else if(tempLogD.Action == "/porting"){
                tempLogD.Action = tempLogD.Details + " was ported";
              }
              else if(tempLogD.Action == "C"){
                tempLogD.Action = "New database, " + tempLogD.Details + ", was added to the system by " + this.user1;
              }

              this.allNotifications.push(tempLogD);
              this.numberOfUserLogs += 1;
              this.localNotificationNumber += 1;
            }
          }
        }
      }
      else{
        //Error handling
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD USER DETAILS
  /**
   *  This function will be called so that the information of a specific user can be fetched
   * 
   *  @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails(userOrganization: string, userID: string, type: string) {
    //Making a call to the User Management API Service to retrieve a specific users details
    this.userManagementService.getUserDetails(userOrganization, userID).subscribe((response: any) => {
      if(response.success == true){
        //Temporarily holds the data returned from the API call
        const data = response.data;

        if(type == 'user1'){
          //Sets the users name and surname as a connected string
          this.user1 = data.fname + ' ' + data.surname;
        }
        else if(type == 'user2'){
          //Sets the users name and surname as a connected string
          this.user2 = data.fname + ' ' + data.surname;
        }
      } 
      else{
        //Error control
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       REMOVE NOTIFICATIONS
  /**
   *  This function will remove a notification from the notification section on the HTML page.
   * 
   * @param {string} id                   //The id of the notification to be removed
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeNotification(id: string){
    for(var i =  0; i < this.allNotifications.length; i++){
      if(this.allNotifications[i].ID == id){
        this.newNotifications.push(this.allNotifications[i]);
      }
    }

    //Getting the user's details from local storage
    var tempUser = this.authService.getCurrentUserValue;

    this.notificationLoggingService.updateFABIMemberNotifications(tempUser.user.ID, this.newNotifications).subscribe((response: any) => {
      if(response.success == true){
        this.loadNotifications();
      }
      else{
        //Error handling
      }
    });
  } 


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call viewOrganizations() | 2. Call loadNotifications() 
   * 
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    //Calling the neccessary functions as the page loads
    this.authService.temporaryLoginSuperUser();

    this.viewOrganizations();
    this.loadNotifications();

    this.loadAdminProfileDetails();
    
    const user2 = this.authService.getCurrentUserValue;
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       REGISTER ORGANIZATION
  /**
   * This function calls the *user-management* service to create a new Organisation.
   *
   * @returns
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  registerOrg() {
    this.submitted = true;

    if (this.registerOrgForm.invalid) {
      return;
    }

    this.valid = true;
    this.loading = true;

    const LorgName = this.registerOrgForm.controls.organization_name.value;
    const LadminName = this.registerOrgForm.controls.admin_name.value;
    const LadminSurname = this.registerOrgForm.controls.admin_surname.value;
    const LadminEmail = this.registerOrgForm.controls.admin_email.value;
    const LadminPhone = this.registerOrgForm.controls.admin_phone.value;

    const admin_details: Interface.OrganisationAdmin = { name: LadminName, surname: LadminSurname, email: LadminEmail };
    const org_details: Interface.Organisation = { orgName: LorgName, admin: admin_details };

    this.userManagementService.createOrganization(org_details).subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Successfully Registered Organization", "Dismiss", {
          duration: 6000
        });

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Registering Organization", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.registerOrg();
          }
        })
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SELECTED ORGANIZATION
  /**
   * This function sets the Organisation selected by the user in the table
   *
   * @param {Interface.Organisation} org
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  selectOrganisation(org: Interface.Organisation) {
    this.selectedOrg = org;
  }
  

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     REMOVE ORGANIZATION PROMPT
  /**
   * This function prompts the user to confirm if they wish to delete the selected Organisation
   * @param {Interface.Organisation} org The organization to be deleted
   *
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeOrganizationPrompt(org: Interface.Organisation) {    
    const orgDetails = org.orgName;

    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Remove Organisation",
        message: "Are you sure you want to remove this Organisation?",
        info: orgDetails,
        cancel: "Cancel",
        confirm: "Remove"
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == "Confirm") {
        this.selectedOrg = org;
        this.removeOrg();
      }
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        REMOVE ORGANIZATION 
  /**
   * This function calls the *user-management* service to remove the selected Organisation 
   *
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeOrg() {
    this.userManagementService.removeOrganization(this.selectedOrg).subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Organization Removed", "Dismiss", {
          duration: 3000
        });
        this.refreshDataSource();
      } 
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Removing", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.removeOrg();
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
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  refreshDataSource() {
    this.viewOrganizations();
      
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       VIEW ORGANIZATIONS
  /**
   * This function calls the *user-management* service to get all registered Organizations
   *
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  viewOrganizations() {    
    this.userManagementService.getAllOrganizations().subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        this.organizations = response.data.Organizations;
        
        //Store the total number of organizations for the statistics 
        this.numberOfOrganizations = this.organizations.length;
        
        this.dataSource = new MatTableDataSource(this.organizations);
        this.dataSource.paginator = this.paginator;

      } 
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Sorry there was an error loading the Organisations", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.ngOnInit();
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
   * @memberof OrganizationHandlerComponent
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
   * @memberof OrganizationHandlerComponent
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
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadAdminProfileDetails(){
    //Getting the user's details from local storage
    var tempUser = this.authService.getCurrentUserValue;
    //The id number of the user that is currently logged in
    this.id = tempUser.user.ID;
    //The organization of the user that is currently logged in
    this.organization = tempUser.user.organisation;

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

        console.log(this.userType);
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
   *  @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  saveChanges(){
    //Indicates if the details can be changed based on whether the passwords match or not
    var valid = true;

    //Checking to make sure that the passwords are not empty
    //Checking to make sure that the password and confirmed password match
    if(this.adminProfileForm.controls.admin_password.value != '' && 
    this.adminProfileForm.controls.admin_password.value == this.adminProfileForm.controls.admin_confirm.value){
      this.password = this.adminProfileForm.controls.admin_password.value;
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
      if(this.adminProfileForm.controls.admin_email.value == ''){
        this.email = this.email;
      }
      else{
        this.email = this.adminProfileForm.controls.admin_email.value;
      }

      if(this.adminProfileForm.controls.admin_name.value == ''){
        this.name = this.name;
      }
      else{
        this.name = this.adminProfileForm.controls.admin_name.value;
      }

      if(this.adminProfileForm.controls.admin_surname.value == ''){
        this.surname == this.surname;
      }
      else{
        this.surname = this.adminProfileForm.controls.admin_surname.value;
      }  
      
      if(this.adminProfileForm.controls.admin_password.value == ''){
        this.password == this.password;
      }
      else{
        this.password = this.adminProfileForm.controls.admin_password.value;
      }
      
      //Making a call to the User Management API Service to save the user's changed profile details
      this.userManagementService.updateFABIMemberDetails(this.email, this.name, this.surname, this.id, this.password).subscribe((response: any) => {
        if(response.success == true){
          //Making sure that local storage now has the updated user information
          this.authService.setCurrentUserValues(this.name, this.surname, this.email);

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
    else{
      //Error handling
      let snackBarRef = this.snackBar.open("Please make sure that you provide all the information", "Dismiss", {
        duration: 3000
      });
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            DISPLAY PROFILE SAVE BUTTON 
  /**
   * This function will display the save button option if any details in the profile have been altered
   * 
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayProfileSaveBtn() {
    this.saveBtn = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            DISPLAY PASSWORD CONFIRM INPUT 
  /**
   * This function will display the confirm password input field in the user's password was altered
   * 
   * @memberof OrganizationHandlerComponent
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
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleHelpTab() {
    this.helpTab = !this.helpTab;
  }
  
}

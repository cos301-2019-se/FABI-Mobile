/**
 * File Name: admin-dashboard.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\admin-dashboard\admin-dashboard.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Monday, August 12th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, ViewChild, ElementRef, isDevMode, Inject, Output, EventEmitter, TemplateRef,
  ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef} from '@angular/core';
import { OnInit} from '@angular/core';
import { Injectable } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { sharedStylesheetJitUrl } from '@angular/compiler';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Member, UserManagementAPIService } from '../../_services/user-management-api.service';
import { DiagnosticClinicAPIService } from '../../_services/diagnostic-clinic-api.service';
import { NotificationLoggingService, UserLogs, DatabaseManagementLogs, AccessLogs } from '../../_services/notification-logging.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

import * as Interface from '../../_interfaces/interfaces';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements OnInit {

  //Retriving an HTML element from the HTML page
  @ViewChild('adminContainer', {read: ViewContainerRef}) adminContainer;
  @ViewChild('staffContainer', {read: ViewContainerRef}) staffContainer;
  
  /** Contains the user stats that will be dynamically loaded in the HTML page - @type {string} */
  userStats: string;
  /** Contains the sample stats that will be dynamically loaded in the HTML page - @type {string} */
  sampleStats: string;

  /** Object array for holding the administrators -  @type {Member[]} */
  admins: Member[] = []; 
  /** Object array for holding the staff members -  @type {Member[]} */                        
  staff: Member[] = [];  
  /** Object array for holding the database administrators -  @type {Member[]} */                        
  databaseAdmins: Member[] = [];   
  /** Object array for holding the culture curators -  @type {Member[]} */              
  cultureCurators: Member[] = []; 
  /** Object array for holding the diagnostic clinic administrators -  @type {Member[]} */               
  diagnosticClinicAdmins: Member[] = []; 
  /** Object array for holding all of FABI's samples -  @type {Object[]} */        
  samples: Object[] = [];  
  /** Object array for holding all of FABI's completed samples -  @type {Object[]} */                      
  completedSamples: Object[] = [];  

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

  /** The total number of FABI staff members - @type {number} */
  numberOfFABIMembers: number;        
  /** The total number of FABI samples - @type {number} */           
  numberOfSamples: number;
  /** Indicates if there are notifications to load - @type {boolean} */           
  notifications: boolean = true; 
  /** The number of the notifications - @type {number} */   
  localNotificationNumber : number = 1;    
  
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

  /** The name and surname of a user concatenated as a string - @type {string} */   
  user1: string;
  /** The name and surname of a user concatenated as a string - @type {string} */   
  user2: string;

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

  currentUser: any;

  /** Holds the input element (passwordInput) from the HTML page - @type {ElementRef} */
  @ViewChild("passwordInput") passwordInput : ElementRef;
  /** Holds the input element (confirmInput) from the HTML page - @type {ElementRef} */
  @ViewChild("confirmInput") confirmInput : ElementRef;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of AdminDashboardComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API service
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
   * @param {DomSanitizer} sanitizer
   * @param {ComponentFactoryResolver} resolver Used to load dynamic elements in the HTML
   * @param {AuthenticationService} authService Used for all authentication and session control
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    public sanitizer: DomSanitizer, 
    private userManagementService: UserManagementAPIService,
    private diagnosticClinicService: DiagnosticClinicAPIService, 
    private notificationLoggingService: NotificationLoggingService, 
    private resolver: ComponentFactoryResolver, 
    private authService: AuthenticationService, 
    private router: Router,
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, 
    ) { 
      this.adminProfileForm = this.formBuilder.group({
        organization_name: '',
        admin_name: '',
        admin_surname: '',
        admin_email: '',
        admin_type: '',
        admin_password: '',
        admin_confirm: ''
      });

      this.currentUser = this.authService.getCurrentSessionValue.user;
    }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                            GET_NUMBER_OF_FABI_MEMBERS
  /**
   *  This function will use an API service to get all the members of FABI. These members will be read into the
   *  'members' Object. The function does not receive any parameters but it will populate a 'heading' element on the
   *  HTML page with the number of members belonging to FABI. This function will also use API calls to populate
   *  the admins object.
   * 
   *  This function will also dynamically create elements and load them with information about the adminstrators
   *  and other FABI staff members. These dynamic elements will be loaded into the HTML page
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getNumberOfFABIMembers(){
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllFABIMembers().subscribe((response: any) => {
      if(response.success == true){
        //Temporary array to hold the array of admins retuned from the API call
        this.admins = response.data.qs.admins;
        //Temporary array to hold the array of staff returned from the API call
        this.staff = response.data.qs.staff;

        this.numberOfFABIMembers = this.admins.length + this.staff.length + this.databaseAdmins.length + this.cultureCurators.length + this.diagnosticClinicAdmins.length;
        this.userStats = this.numberOfFABIMembers.toString();
      }
      else{
        //The FABI members could not be retrieved
        this.numberOfFABIMembers = 0;
        this.userStats = this.numberOfFABIMembers.toString();

        //TODO: Show error message
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                GET_NUMBER_OF_FABI_SAMPLES
  /**
   *  This function will use an API service to get all the samples of FABI. These samples will be read into the
   *  'samples' Object. The function does not receive any parameters but it will populate a 'heading' element on the
   *  HTML page with the number of samples belonging to FABI.
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getNumberOfFABISamples(){
    //Subscribing to the DiagnosticClinicAPIService to get a list containing all of FABI's samples
    this.diagnosticClinicService.getAllSamples().subscribe((response: any) => {
      if(response.success == true){
        //Populating the sample array with the returned data
        this.samples = response.data.samples;

        this.numberOfSamples = this.samples.length;
        this.sampleStats = this.numberOfSamples.toString();
      }
      else{
        //The FABI members could not be retrieved
        this.sampleStats = '0';
      }
    });
  }

 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                         GET_NUMBER_OF_COMPLETED_FABI_SAMPLES
  /**
   *  This function will use an API service to get all the completed (processed) samples of FABI. These 
   *  samples will be read into the 'completedSamples' Object. The function does not receive any parameters but it will 
   *  populate a 'heading' element on the HTML page with the percentage of completed samples belonging to FABI.
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getNumberOfCompletedFABISamples(){}


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET_DATE
  /**
   *  This function will put the string date provided into a more readable format for the notifications
   * @param {string} date The date of the log
   * 
   * @memberof AdminDashboardComponent
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
  //                                                       LOAD_LOGS
  /**
   *  This function will load all of the user's logs into a string array.
   * 
   * @memberof AdminDashboardComponent
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
  //                                                       LOAD_NOTIFICATIONS
  /**
   *  This function will load the admin's notifications into the notification section on the HTML page
   * 
   * @memberof AdminDashboardComponent
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
              this.loadUserDetails1(tempLogU.Organization1, tempLogU.Details);

              if(tempLogU.Action == "/createOrganization"){
                tempLogU.Action = "New organization " + tempLogU.User + " was added to the system by " + this.user1;
              }
              else if(tempLogU.Action == "/addStaff"){
                this.loadUserDetails2(tempLogU.Organization2, tempLogU.User);
                tempLogU.Action = "New user, " + this.user2 + ", was added to the system by " + this.user1;
              }
              else if(tempLogU.Action == "/removeOrg"){
                tempLogU.Action = "Organization " + tempLogU.User + " was removed from the system by " + this.user1;
              }
              else if(tempLogU.Action == "/removeStaff"){
                this.loadUserDetails2(tempLogU.Organization2, tempLogU.User);
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
              this.loadUserDetails1(tempLogD.Organization1, tempLogD.User);

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
  //                                                  LOAD_USER_DETAILS1
  /**
   *  This function will be called so that the information of a specific user can be fetched
   * 
   *  @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails1(userOrganization: string, userID: string) {
    //Making a call to the User Management API Service to retrieve a specific users details
    this.userManagementService.getUserDetails(userOrganization, userID).subscribe((response: any) => {
      if(response.success == true){
        //Temporarily holds the data returned from the API call
        const data = response.data;

        //Returns the users name and surname as a connected string
        this.user1 = data.fname + ' ' + data.surname;
      } 
      else{
        //Error control
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_USER_DETAILS2
  /**
   *  This function will be called so that the information of a specific user can be fetched
   * 
   *  @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails2(userOrganization: string, userID: string) {
    //Making a call to the User Management API Service to retrieve a specific users details
    this.userManagementService.getUserDetails(userOrganization, userID).subscribe((response: any) => {
      if(response.success == true){
        //Temporarily holds the data returned from the API call
        const data = response.data;

        //Returns the users name and surname as a connected string
        this.user2 = data.fname + ' ' + data.surname;
      } 
      else{
        //Error control
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       REMOVE_NOTIFICATIONS
  /**
   *  This function will remove a notification from the notification section on the HTML page.
   * 
   * @param {string} id                   //The id of the notification to be removed
   * 
   * @memberof AdminDashboardComponent
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
  //                                                    NG_ON_INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call loadNotifications() | 2. Call getNumberOfFABISamples() | 3. Call getNumberOfFABIMembers()
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() { 
    const Lemail = "johndoe@gmail.com";
    const Lpassw = "Tr7hs8BjuX";
    const Lorg = "FABI";

    // User details to be passed to API
    const details: Interface.LoginInfo = { email: Lemail, password: Lpassw, orgName: Lorg };

    this.authService.login(details).subscribe((response: any) => {
      // API Request successful
      if (response.success == true && response.code == 200) {

        
        // User NOT Authorised
        if (response.title != "AUTHORIZED") {
          //POPUP MESSAGE
        }
        // ELSE user Authorised:
        

      } else if (response.success == false) {
        //POPUP MESSAGE
        console.log("---LOGIN ERROR : " + response.message);

      }
    });
  
    this.authService.temporaryLoginSuperUser();
    
    //Calling the neccessary functions as the page loads
    this.loadNotifications();
    this.getNumberOfFABIMembers();
    this.getNumberOfFABISamples();
    this.loadAdminProfileDetails();

    let user = this.authService.getCurrentUserValue;
    
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE NOTIFICATIONS 
  /**
   * This function will toggle the display of the notifications side panel
   * 
   * @memberof AdminDashboardComponent
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
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleProfileTab() {
    this.profileTab = !this.profileTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_ADMIN_PROFILE_DETAILS
  /**
   *  This function will use an API service to load all the admin member's details into the elements on the HTML page.
   * 
   * @memberof AdminDashboardComponent
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
  //                                                        SAVE_CHANGES
  /**
   *  This function will send the details to the API to save the changed details to the system.
   *  @memberof AdminDashboardComponent
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
          //Making sure that local storage now has the updated password stored
          localStorage.setItem('userPassword', this.password);
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
   * @memberof AdminDashboardComponent
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
   * @memberof AdminDashboardComponent
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
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleHelpTab() {
    this.helpTab = !this.helpTab;
  }
}
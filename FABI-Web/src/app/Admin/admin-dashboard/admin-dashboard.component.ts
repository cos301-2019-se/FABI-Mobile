/**
 * File Name: admin-dashboard.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\admin-dashboard\admin-dashboard.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, July 16th 2019
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

import { Member, UserManagementAPIService } from '../../services/user-management-api.service';
import { DiagnosticClinicAPIService } from '../../services/diagnostic-clinic-api.service';
import { AdminDivComponent } from '../../Dynamic-Components/admin-div/admin-div.component'; 
import { StaffDivComponent } from '../../Dynamic-Components/staff-div/staff-div.component';
import { NotificationDivComponent } from '../../Dynamic-Components/notification-div/notification-div.component'
import { NotificationLoggingService, UserLogs, DatabaseManagementLogs, AccessLogs } from '../../services/notification-logging.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Holds the div element (adminContainer) from the HTML page - @type {ElementRef} */
  @ViewChild('adminContainer', {read: ViewContainerRef}) adminContainer;
  /** Holds the div element (staffContainer) from the HTML page - @type {ElementRef} */
  @ViewChild('staffContainer', {read: ViewContainerRef}) staffContainer;
  /** Holds the div element (notificationContainer) from the HTML page - @type {ElementRef} */
  @ViewChild('notificationContainer', {read: ViewContainerRef}) notificationContainer;
  
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

  /** Object array for holding all of the user logs -  @type {UserLogs[]} */ 
  userNotifications: UserLogs[] = [];
  /** Object array for holding all of the database logs -  @type {DatabaseManagementLogs[]} */ 
  databaseNotifications: DatabaseManagementLogs[] = [];
  /** Object array for holding all of the access logs -  @type {AccessLogs[]} */ 
  accessNotifications: AccessLogs[] = [];

  /** The total number of FABI staff members - @type {number} */
  numberOfFABIMembers: number;        
  /** The total number of FABI samples - @type {number} */           
  numberOfSamples: number;
  /** Indicates if there are notifications to load - @type {boolean} */           
  notifications: boolean = false;                       

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of AdminDashboardComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API service
   * @param {ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(public sanitizer: DomSanitizer, private userManagementService: UserManagementAPIService,
    private diagnosticClinicService: DiagnosticClinicAPIService, private notificationLoggingService: NotificationLoggingService, private resolver: ComponentFactoryResolver) { 
      var tempUserNotification: UserLogs = { Type: 'USER', Action: 'New user added', Details: 'Tegan Carton-Barber', Date: '09-08-2019', User: 'Emma Coetzer', MoreInfo: '', ID: 1};
      this.userNotifications.push(tempUserNotification);
      var tempUserNotification2: UserLogs = { Type: 'USER', Action: 'User removed', Details: 'Kendra Riddle', Date: '09-08-2019', User: 'Emma Coetzer', MoreInfo: '', ID: 2};
      this.userNotifications.push(tempUserNotification2);

      //Loading the user notifications into the local storage
      localStorage.setItem('userNotifications', JSON.stringify(this.userNotifications));
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
        //Populating the arrays with the returned data
        var tempAdmins = response.data.qs.admins;
        for(var i = 0; i < tempAdmins.length; i++){
          var tempMember: Member = {Name: tempAdmins[i].fname, Surname: tempAdmins[i].surname, Email: tempAdmins[i].email};
          this.admins.push(tempMember);
        }

        var tempStaff = response.data.qs.staff;
        for(var i = 0; i < tempStaff.length; i++){
          var tempMember: Member = {Name: tempStaff[i].fname, Surname: tempStaff[i].surname, Email: tempStaff[i].email};
          this.staff.push(tempMember);
        }

        var tempDatabaseAdmins = response.data.qs.databaseAdmins;
        for(var i = 0; i < tempDatabaseAdmins.length; i++){
          if(!tempDatabaseAdmins[i].fname){
            var tempMember: Member = {Name: '', Surname: '', Email: tempDatabaseAdmins[i].email};
          }
          else{
            var tempMember: Member = {Name: tempDatabaseAdmins[i].fname, Surname: tempDatabaseAdmins[i].surname, Email: tempDatabaseAdmins[i].email};
          }
          this.databaseAdmins.push(tempMember);
        }
        
        var tempCultureCurators = response.data.qs.cultureCurators;
        for(var i = 0; i < tempCultureCurators.length; i++){
          if(!tempCultureCurators[i].fname){
            var tempMember: Member = {Name: '', Surname: '', Email: tempCultureCurators[i].email};
          }
          else{
            var tempMember: Member = {Name: tempCultureCurators[i].fname, Surname: tempCultureCurators[i].surname, Email: tempCultureCurators[i].email};
          }
          this.databaseAdmins.push(tempMember);
        }

        var tempDiagnosticClinicAdmins = response.data.qs.diagnosticClinicAdmins;
        for(var i = 0; i < tempDiagnosticClinicAdmins.length; i++){
          if(!tempDiagnosticClinicAdmins[i].fname){
            var tempMember: Member = {Name: '', Surname: '', Email: tempDiagnosticClinicAdmins[i].email};
          }
          else{
            var tempMember: Member = {Name: tempDiagnosticClinicAdmins[i].fname, Surname: tempDiagnosticClinicAdmins[i].surname, Email: tempDiagnosticClinicAdmins[i].email};
          }
          this.databaseAdmins.push(tempMember);
        }

        this.numberOfFABIMembers = this.admins.length + this.staff.length + this.databaseAdmins.length + this.cultureCurators.length + this.diagnosticClinicAdmins.length;
        this.userStats = this.numberOfFABIMembers.toString();

        if(this.admins.length == 0){
          //Dynamically loads a message indicating that there are no adminsitrators
          const adminDivRef = this.adminContainer.createComponent(this.resolver.resolveComponentFactory(AdminDivComponent));
          adminDivRef.instance.Name = 'There are no administrators to load.';
          adminDivRef.instance.Surname = '';
          adminDivRef.instance.Email = '';
        }
        else{
          //Dynamically loads all of the admins into the HTML page
          for(var i = 0; i < this.admins.length; i++){
            const adminDivRef = this.adminContainer.createComponent(this.resolver.resolveComponentFactory(AdminDivComponent));
            adminDivRef.instance.Name = this.admins[i].Name;
            adminDivRef.instance.Surname = this.admins[i].Surname;
            adminDivRef.instance.Email = 'Email: ' + this.admins[i].Email;
          }
        }

        if(this.staff.length == 0){
          //Dynamically loads a message indicating that there are no staff members
          const staffDivRef = this.staffContainer.createComponent(this.resolver.resolveComponentFactory(StaffDivComponent));
          staffDivRef.instance.Name = 'There are no staff members to load.';
          staffDivRef.instance.Surname = '';
          staffDivRef.instance.Email = '';
        }
        else{
          //Dynamically loads all the staff into the HTML page
          for(var i = 0; i < this.staff.length; i++){
            const staffDivRef = this.staffContainer.createComponent(this.resolver.resolveComponentFactory(StaffDivComponent));
            staffDivRef.instance.Name = this.staff[i].Name;
            staffDivRef.instance.Surname = this.staff[i].Surname;
            staffDivRef.instance.Email = 'Email: ' + this.staff[i].Email;
          }
        }
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
        //Populating the arrays with the returned data
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
  //                                                       LOAD_NOTIFICATIONS
  /**
   *  This function will load the admin's notifications into the notification section on the HTML page
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNotifications(){
    //Dynamically loads all the user notifications into the HTML page
    if(this.userNotifications.length == 0){
      this.notifications = false;
    }
    else{
      this.notifications = true;

      //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
      this.notificationLoggingService.getAllUserAndDatabaseLogs().subscribe((response: any) => {
        if(response.success == true){
          //Populating the arrays with the returned data
          //Set the ID's of the notifications

          //Need to fetch all notifications from local storage to make sure that notifications that have been read are not reloaded
          const readNotifications = JSON.parse(localStorage.getItem('readNotifications'));
        }
        else{
          this.notifications = false;
        }
      });

      //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
      this.notificationLoggingService.getAllAccessAndErrorLogs().subscribe((response: any) => {
        if(response.success == true){
          //Populating the arrays with the returned data
          //Set the ID's of the notifications

          //Need to fetch all notifications from local storage to make sure that notifications that have been read are not reloaded
          const readNotifications = JSON.parse(localStorage.getItem('readNotifications'));
        }
        else{
          this.notifications = false;
        }
      });

      for(var i = 0; i < this.userNotifications.length; i++){
        const userNotificationDivRef = this.notificationContainer.createComponent(this.resolver.resolveComponentFactory(NotificationDivComponent));
        userNotificationDivRef.instance.Number = i + 1;
        userNotificationDivRef.instance.Type = this.userNotifications[i].Type;
        userNotificationDivRef.instance.Action = this.userNotifications[i].Action;
        userNotificationDivRef.instance.Date = this.userNotifications[i].Date;

        var tempAction = this.userNotifications[i].Action.split(',');

        for(var j = 0; j < tempAction.length; j++){
          if(tempAction[j] == 'C'){
            userNotificationDivRef.instance.Details = 'New user, ' + this.userNotifications[i].Details + ', was added to the system by ' + this.userNotifications[i].User;
          }
          else if(tempAction[j] == 'D'){
            userNotificationDivRef.instance.Details = this.userNotifications[i].Details + ' was removed from the system by ' + this.userNotifications[i].User;
          }
        }
      }
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       REMOVE_NOTIFICATIONS
  /**
   *  This function will remove a notification from the notification section on the HTML page
   * @param {number} id                   //The id of the notification to be removed
   * @param {string} type                 //The type of the notification to be removed
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeNotification(id: number, type: string){
    //Loading the read notifications into the local storage
    if(type == 'USER'){
      for(var i = 0; i < this.userNotifications.length; i++){
        if(this.userNotifications[i].ID == id){
          localStorage.setItem('readNotifications', JSON.stringify(this.userNotifications[i]));
        }
      }
    }
    else if(type == 'DBML'){
      for(var i = 0; i < this.databaseNotifications.length; i++){
        if(this.databaseNotifications[i].ID == id){
          localStorage.setItem('readNotifications', JSON.stringify(this.databaseNotifications[i]));
        }
      }
    }
    else if(type == 'ACCL'){
      for(var i = 0; i < this.accessNotifications.length; i++){
        if(this.accessNotifications[i].ID == id){
          localStorage.setItem('readNotifications', JSON.stringify(this.accessNotifications[i]));
        }
      }
    }
  } 


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    NG_ON_INIT()  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call getNumberOfFABIMembers() | 2. Call getNumberOfFABISamples() | 3. Call loadNotifications() 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() { 
    this.getNumberOfFABIMembers();
    this.getNumberOfFABISamples();
    this.loadNotifications();
  }
}

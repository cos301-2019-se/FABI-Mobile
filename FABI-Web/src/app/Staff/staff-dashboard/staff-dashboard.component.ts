/**
 * File Name: staff-dashboard.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Staff\staff-dashboard\staff-dashboard.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, July 18th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { Member, UserManagementAPIService } from '../../services/user-management-api.service';
import { AdminDivComponent } from '../../Dynamic-Components/admin-div/admin-div.component';
import { NotificationLoggingService, UserLogs } from '../../services/notification-logging.service';
import { NotificationDivComponent } from '../../Dynamic-Components/notification-div/notification-div.component'

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})

export class StaffDashboardComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Holds the div element (adminContainer) from the HTML page - @type {ElementRef} */
  @ViewChild('adminContainer', {read: ViewContainerRef}) adminContainer;
  /** Holds the div element (notificationContainer) from the HTML page - @type {ElementRef} */
  @ViewChild('notificationContainer', {read: ViewContainerRef}) notificationContainer;

  /** Object array for holding the administrators -  @type {Member[]} */
  admins: Member[] = [];   

  /** Object array for holding all of the user logs -  @type {UserLogs[]} */ 
  userNotifications: UserLogs[] = [];
  /** Object array for holding all of the read logs -  @type {any[]} */ 
  readNotifications: any[] = [];
  
  /** Indicates if there are notifications to load - @type {boolean} */           
  notifications: boolean = true; 
  /** The total number of User Logs - @type {number} */           
  numberOfUserLogs: number = 0; 


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of StaffDashboardComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {notificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private userManagementService: UserManagementAPIService, private resolver: ComponentFactoryResolver, private notificationLoggingService: NotificationLoggingService) { }

 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                LOAD_ADMINS
  /**
   *  This function will load admin users into the section provided on the HTML page. 
   *  This function will also dynamically load elements containing information about the administrators
   *  to the HTML page dynamically
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadAdmins(){
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllFABIAdmins().subscribe((response: any) => {
      if(response.success == true){
        //Populating the arrays with the returned data
        var tempAdmins = response.data.qs.admins;
        for(var i = 0; i < tempAdmins.length; i++){
          var tempMember: Member = {Name: tempAdmins[i].fname, Surname: tempAdmins[i].surname, Email: tempAdmins[i].email};
          this.admins.push(tempMember);
        }

        if(this.admins.length == 0){
          //Dynamically loads a message indicating that there are no adminsitrators
          const adminDivRef = this.adminContainer.createComponent(this.resolver.resolveComponentFactory(AdminDivComponent));
          adminDivRef.instance.Name = 'There are no administrators to load.';
          adminDivRef.instance.Surname = '';
          adminDivRef.instance.Email = '';
        }
        else{
          //Dynamically loads all the admins into the HTML page
          for(var i = 0; i < this.admins.length; i++){
            const adminDivRef = this.adminContainer.createComponent(this.resolver.resolveComponentFactory(AdminDivComponent));
            adminDivRef.instance.Name = this.admins[i].Name;
            adminDivRef.instance.Surname = this.admins[i].Surname;
            adminDivRef.instance.Email = this.admins[i].Email;
          }
        }
      }
      else{
        //The FABI administrators could not be retrieved
        const adminDivRef = this.adminContainer.createComponent(this.resolver.resolveComponentFactory(AdminDivComponent));
        adminDivRef.instance.Name = 'Could not load the administrators.';
        adminDivRef.instance.Surname = '';
        adminDivRef.instance.Email = '';

        //TODO: error handling
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_NOTIFICATIONS
  /**
   *  This function will load the staff member's notifications into the notification section on the HTML page
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNotifications(){
    //Need to fetch all notifications from local storage to make sure that notifications that have been read are not reloaded
    const storageNotifications = JSON.parse(localStorage.getItem('readNotifications'));

    //Loading the 'USER' logs
    this.notificationLoggingService.getAllUserLogs().subscribe((response: any) => {
      if(response.success = true){
        const data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          var tempLog: UserLogs = {Type: 'USER', Action: data[i].action, Date: data[i].date, Details: data[i].details, User: data[i].user, Organization1: data[i].org1, Organization2: data[i].org2, MoreInfo: data[i].moreInfo, ID: i};
          
          if(storageNotifications != null && storageNotifications.length != 0){
            for(var j = 0; j < storageNotifications.length; j++){
              if(storageNotifications[j].Type == 'USER' && storageNotifications[i].Action == tempLog.Action && 
                storageNotifications[i].Date == tempLog.Date && storageNotifications.User == tempLog.User){
                  this.readNotifications.push(tempLog);
                }
                else{
                  this.userNotifications.push(tempLog);
                  this.numberOfUserLogs += 1;
                }
            }
          }
          else{
            this.userNotifications.push(tempLog);
            this.numberOfUserLogs += 1;
          }
        }
      }
      else{
        //Error handling
      }
    });

    //Pushing the readNotifications array to local storage
    localStorage.setItem('readNotifications', JSON.stringify(this.readNotifications));
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       LOAD_DYNAMIC_NOTIFICATIONS
  /**
   *  This function will dynamically load the notifications into the HTML page
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadDynamicNotifications(){
    //Dynamically loading the notification elements into the HTML page
    if(this.numberOfUserLogs != 0){
      this.notifications = true;

      //User notifications
      for(var i = 0; i < this.userNotifications.length; i++){
        const userNotificationDivRef = this.notificationContainer.createComponent(this.resolver.resolveComponentFactory(NotificationDivComponent));
        userNotificationDivRef.instance.Number = i + 1;
        userNotificationDivRef.instance.Type = 'USER';
  
        const user1 = this.loadUserDetails(this.userNotifications[i].Organization2, this.userNotifications[i].Details);
        const user2 = this.loadUserDetails(this.userNotifications[i].Organization1, this.userNotifications[i].User);
  
        if(this.userNotifications[i].Action == 'C'){
          userNotificationDivRef.instance.Action = user1 + ' was added to the system by ' + user2;
        }
        else if(this.userNotifications[i].Action == 'D'){
          userNotificationDivRef.instance.Action = user1 + ' was removed from the system by ' + user2;
        }
        else if(this.userNotifications[i].Action == 'U'){
          userNotificationDivRef.instance.Action = user1 + ' details where updated by ' + user2;
        }
  
        userNotificationDivRef.instance.Date = new Date(this.userNotifications[i].Date);
      }
    }
    else{
      this.notifications = false;
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_USER_DETAILS
  /**
   *  This function will be called so that the information of a specific user can be fetched
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails(userOrganization: string, userID: string) {
    this.userManagementService.getUserDetails(userOrganization, userID).subscribe((response: any) => {
      if(response.success == true){
        const data = response.data;

        return data.fname + ' ' + data.surname;
      } 
      else{
        //Error control
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                              REMOVE_NOTIFICATIONS
  /**
   *  This function will remove a notification for the notification section when the user clicks on the 'exit'
   *  button/icon associated with that notification
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeNotification(){}


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      DELAY  
  /**
   * This function is called so that the loadDynamicNotifications function can be delayed
   * 
   * @param {number} ms The seconds that the function must be displayed by
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    NG_ON_INIT()  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call loadAdmins() | 2. Call loadNotifications() 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.loadAdmins();
    this.loadNotifications();
    this.delay(2000).then(any => {
      this.loadDynamicNotifications()
    });
  }

}

/**
 * File Name: staff-notification.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\NEW\FABI-Mobile\FABI-Web\src\app\Staff\staff-notification\staff-notification.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, August 13th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, October 8th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as core from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CultureCollectionAPIService } from '../../_services/culture-collection-api.service';
import { DiagnosticClinicAPIService } from '../../_services/diagnostic-clinic-api.service';
import { NotificationLoggingService, UserLogs } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';


export interface StaffMember {
  fname: string;
  surname: string;
  email: string;
  id: string;
}

@core.Component({
  selector: 'app-staff-notification',
  templateUrl: './staff-notification.component.html',
  styleUrls: ['./staff-notification.component.scss']
})
export class StaffNotificationComponent implements core.OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Object array for holding all of the logs -  @type {any[]} */
  allNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {any[]} */
  newNotifications: any[] = [];
  /** Indicates if there are notifications to load - @type {boolean} */
  notifications: boolean = true;
  /** The total number of User Logs - @type {number} */
  numberOfUserLogs: number = 0;
  /** The number of the notifications - @type {number} */
  localNotificationNumber: number = 1;
  /** Object array for holding all of the logs that have not been read -  @type {string[]} */
  allLogs: string[] = [];

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */
  private toggle_status: boolean = false;

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
  /** The user that is currently logged in -  @type {any} */
  currentUser: any;
  
  /** Object array for holding the staff members -  @type {StaffMember[]} */
  staff: StaffMember[] = [];
  /** Specifies if the notifications have been retreived to disable the loading spinner - @type {boolean} */
  notificationsLoading: boolean = true;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       CONSTRUCTOR
  /**
   * Creates an instance of StaffNotificationComponent.
   * 
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {CultureCollectionAPIService} cultureCollectionService For calling the Culture Collection API Service
   * @param {UserManagementAPIService} userManagementService For calling the User Management API Service
   * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API Service
   * @param {AuthenticationService} authService for calling the *authentication* service
   * @param {Router} router
   * @param {Resolver} resolver
   * 
   * @memberof StaffNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userManagementService: UserManagementAPIService,
    private diagnosticClinicService: DiagnosticClinicAPIService,
    private resolver: core.ComponentFactoryResolver,
    private notificationLoggingService: NotificationLoggingService,
    private cultureCollectionService: CultureCollectionAPIService
  ) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      NG ON INIT()  
  /**
   * This function is called when the page loads
   *
   * @memberof StaffNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    // Set current user logged in
    this.currentUser = this.authService.getCurrentSessionValue.user;

  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET ALL STAFF
  /**
   *  This function will be used to get all the staff members of FABI and load them into an array
   * 
   *  @memberof StaffNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllStaff() {
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllFABIStaff().subscribe((response: any) => {
      if (response.success == true) {
        var data = response.data.qs.staff;

        for (var i = 0; i < data.length; i++) {
          var tempStaff: StaffMember = { fname: data[i].fname, surname: data[i].surname, email: data[i].email, id: data[i].id };
          this.staff.push(tempStaff);
        }
      }
      else {
        //Error handling
        this.notifications = false;
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET DATE
  /**
   *  This function will put the string date provided into a more readable format for the notifications
   * 
   * @param {string} date The date of the log
   * 
   * @memberof StaffNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getDate(date: string) {
    var tempDate = (date).split(' ');
    var newDate = '';

    newDate += tempDate[2];

    if (tempDate[0] == 'Mon') {
      newDate += ' Monday ';
    }
    else if (tempDate[0] == 'Tue' || tempDate[0] == 'Tu' || tempDate[0] == 'Tues') {
      newDate += ' Tuesday ';
    }
    else if (tempDate[0] == 'Wed') {
      newDate += ' Wednesday ';
    }
    else if (tempDate[0] == 'Thu' || tempDate[0] == 'Thur' || tempDate[0] == 'Thurs') {
      newDate += ' Thursday ';
    }
    else if (tempDate[0] == 'Fri') {
      newDate += ' Friday ';
    }
    else if (tempDate[0] == 'Sat') {
      newDate += ' Saturday ';
    }
    else if (tempDate[0] == 'Sun') {
      newDate += ' Sunday ';
    }

    if (tempDate[1] == 'Jan') {
      newDate += 'January';
    }
    else if (tempDate[1] == 'Feb') {
      newDate += 'February';
    }
    else if (tempDate[1] == 'Mar') {
      newDate += 'March';
    }
    else if (tempDate[1] == 'Apr') {
      newDate += 'April';
    }
    else if (tempDate[1] == 'Jun') {
      newDate += 'June';
    }
    else if (tempDate[1] == 'Jul') {
      newDate += 'July';
    }
    else if (tempDate[1] == 'Aug') {
      newDate += 'August';
    }
    else if (tempDate[1] == 'Sep' || tempDate[1] == 'Sept') {
      newDate += 'September';
    }
    else if (tempDate[1] == 'Oct') {
      newDate += 'October';
    }
    else if (tempDate[1] == 'Nov') {
      newDate += 'November';
    }
    else if (tempDate[1] == 'Dec') {
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
   * @memberof StaffNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadLogs() {
    //Making a call to the notification logging service to return all logs belonging to the user
    this.notificationLoggingService.getUserLogs(this.currentUser.ID).subscribe((response: any) => {
      if (response.success == true) {
        var data = response.data.content.data.Logs;

        for (var i = 0; i < data.length; i++) {
          this.allLogs.push(data[i].id);
        }
      }
      else {
        //Error handling
        this.notifications = false;
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    LOAD NOTIFICATIONS
  /**
   *  This function will load the staff member's notifications into the notification section on the HTML page
   * 
   * @memberof StaffNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNotifications() {
    //Loading all the logs beloning to the user
    this.loadLogs();

    //Making a call too the notification logging service to return all USER logs
    this.notificationLoggingService.getAllUserLogs().subscribe((response: any) => {
      if (response.success = true) {
        //Temporarily holds the data returned from the API call
        const data = response.data.content.data.Logs;

        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < this.allLogs.length; j++) {
            if (data[i].date == this.allLogs[j]) {
              //A temporary instance of UserLogs that will be added to the allNotifications array
              var tempLogU: UserLogs = { LogID: data[i].date, Type: 'USER', Action: data[i].action, Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, Organization1: data[i].org1, Organization2: data[i].org2, MoreInfo: data[i].moreInfo, ID: this.localNotificationNumber };

              //Getting the name and surname of the users passed using their id numbers
              var user = this.loadUserDetails(tempLogU.Details);

              if (tempLogU.Action == "/createOrganization") {
                tempLogU.Action = "New organization " + tempLogU.User + " was added to the system by " + user;

                this.allNotifications.push(tempLogU);
                this.numberOfUserLogs += 1;
                this.localNotificationNumber += 1;
              }
              else if (tempLogU.Action == "/addStaff") {
                tempLogU.Action = "New user, " + this.loadUserDetails(tempLogU.User) + ", was added to the system by " + user;

                this.allNotifications.push(tempLogU);
                this.numberOfUserLogs += 1;
                this.localNotificationNumber += 1;
              }
              else if (tempLogU.Action == "C") {
                tempLogU.Action = "New user, " + this.loadUserDetails(tempLogU.User) + ", was added to the system by " + user;

                this.allNotifications.push(tempLogU);
                this.numberOfUserLogs += 1;
                this.localNotificationNumber += 1;
              }
              else if (tempLogU.Action == "/removeOrg") {
                tempLogU.Action = "Organization " + tempLogU.User + " was removed from the system by " + user;

                this.allNotifications.push(tempLogU);
                this.numberOfUserLogs += 1;
                this.localNotificationNumber += 1;
              }
              else if (tempLogU.Action == "/removeStaff") {
                tempLogU.Action = "New user, " + this.loadUserDetails(tempLogU.User) + ", was removed from the system by " + user;

                this.allNotifications.push(tempLogU);
                this.numberOfUserLogs += 1;
                this.localNotificationNumber += 1;
              }
            }
          }
        }

        //Deactivate loading table spinners
        this.notificationsLoading = false;
      }
      else {
        //Error handling
        this.notifications = false;
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      LOAD USER DETAILS
  /**
   *  This function will be called so that the information of a specific user can be fetched
   *  @param {string} userID The user id of the user whose details need to be fetched
   * 
   *  @memberof StaffNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails(userID: string) {
    var person = '';
    for (var i = 0; i < this.staff.length; i++) {
      if (this.staff[i].id == userID) {
        person = this.staff[i].fname + ' ' + this.staff[i].surname;
      }
    }

    return person;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       REMOVE NOTIFICATIONS
  /**
   *  This function will remove a notification from the notification section on the HTML page.
   * 
   * @param {string} id                   //The id of the notification to be removed
   * @memberof StaffNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeNotification(id: string) {
    this.newNotifications.push(id);

    this.notificationLoggingService.updateFABIMemberNotifications(this.currentUser.ID, this.newNotifications).subscribe((response: any) => {
      if (response.success == true) {
        //Successfully removed notification
      }
      else {
        //Error handling
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    TOGGLE NOTIFICATIONS TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof StaffNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab() {
    this.toggle_status = !this.toggle_status;
  }

}

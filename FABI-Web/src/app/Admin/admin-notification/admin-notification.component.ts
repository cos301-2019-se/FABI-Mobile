/**
 * File Name: admin-notification.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\NEW\FABI-Mobile\FABI-Web\src\app\Admin\admin-notification\admin-notification.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, August 13th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, October 10th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as core from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosticClinicAPIService } from '../../_services/diagnostic-clinic-api.service';
import { DatabaseManagementLogs, NotificationLoggingService, UserLogs } from '../../_services/notification-logging.service';
import { Member, UserManagementAPIService } from '../../_services/user-management-api.service';
import { NotificationService } from '../../_services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@core.Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.scss']
})
export class AdminNotificationComponent implements core.OnInit {

  /** Object array for holding all of the logs -  @type {any[]} */
  allNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {string[]} */
  newNotifications: string[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {string[]} */
  allLogs: string[] = [];

  /** The total number of User Logs - @type {number} */
  numberOfUserLogs: number = 0;
  /** The total number of Database Management Logs - @type {number} */
  numberOfDatabaseLogs: number = 0;

  /** Indicates if there are notifications to load - @type {boolean} */
  notifications: boolean = true;
  /** The number of the notifications - @type {number} */
  localNotificationNumber: number = 1;

  /** Object array for holding the staff members -  @type {Member[]} */
  staff: Member[] = [];

  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;

  /** Specifies if the notifications have been retreived to disable the loading spinner - @type {boolean} */
  notificationsLoading: boolean = true;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of AdminNotificationComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API service
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {NotificationService} notificationService For calling the Notification service
   * @param {core.ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
   * @param {DomSanitizer} sanitizer
   * @param {core.ComponentFactoryResolver} resolver Used to load dynamic elements in the HTML
   * @param {AuthenticationService} authService for calling the *authentication* service
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    public sanitizer: DomSanitizer,
    private userManagementService: UserManagementAPIService,
    private diagnosticClinicService: DiagnosticClinicAPIService,
    private notificationService: NotificationService,
    private notificationLoggingService: NotificationLoggingService,
    private resolver: core.ComponentFactoryResolver,
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.getAllStaff();
    this.currentUser = this.authService.getCurrentSessionValue.user;
    this.loadNotifications();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET ALL STAFF
  /**
   *  This function will be used to get all the staff members of FABI and load them into an array
   *  @memberof AdminNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllStaff() {
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllFABIStaff().subscribe((response: any) => {
      if (response.success == true) {
        //Temporary array to hold the array of staff returned from the API call
        var data = response.data.qs.staff;
        for (var i = 0; i < data.length; i++) {
          var tempMember: Member = { Email: data[i].email, Name: data[i].fname, Surname: data[i].surname, ID: data[i].id };
          this.staff.push(tempMember);
        }
      }
      else {
        //Error handling
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET DATE
  /**
   *  This function will put the string date provided into a more readable format for the notifications
   * @param {string} date The date of the log
   * 
   * @memberof AdminNotificationComponent
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
  //                                                           LOAD LOGS
  /**
   *  This function will load all of the user's logs into a string array.
   * 
   * @memberof AdminNotificationComponent
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
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       LOAD NOTIFICATIONS
  /**
   *  This function will load the admin's notifications into the notification section on the HTML page
   * 
   * @memberof AdminNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNotifications() {
    //Loading all the staff withing FABI
    this.getAllStaff();
    //Loading all the logs belonging to the user
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
                tempLogU.Action = "New organization " + tempLogU.Organization2 + " was added to the system by " + user;

                var valid = true;
                for (var k = 0; k < this.allNotifications.length; k++) {
                  if (this.allNotifications[k].Action == tempLogU.Action) {
                    valid = false;
                  }
                }

                if (valid == true) {
                  this.allNotifications.push(tempLogU);
                  this.numberOfUserLogs += 1;
                  this.localNotificationNumber += 1;
                }
              }
              else if (tempLogU.Action == "/addStaff") {
                tempLogU.Action = "New user, " + this.loadUserDetails(tempLogU.User) + ", was added to the system by " + user;

                var valid = true;
                for (var k = 0; k < this.allNotifications.length; k++) {
                  if (this.allNotifications[k].Action == tempLogU.Action) {
                    valid = false;
                  }
                }

                if (valid == true) {
                  this.allNotifications.push(tempLogU);
                  this.numberOfUserLogs += 1;
                  this.localNotificationNumber += 1;
                }
              }
              else if (tempLogU.Action == "/removeOrg") {
                tempLogU.Action = "Organization " + tempLogU.Organization2 + " was removed from the system by " + user;

                var valid = true;
                for (var k = 0; k < this.allNotifications.length; k++) {
                  if (this.allNotifications[k].Action == tempLogU.Action) {
                    valid = false;
                  }
                }

                if (valid == true) {
                  this.allNotifications.push(tempLogU);
                  this.numberOfUserLogs += 1;
                  this.localNotificationNumber += 1;
                }
              }
              else if (tempLogU.Action == "/removeStaff") {
                tempLogU.Action = "New user, " + this.loadUserDetails(tempLogU.User) + ", was removed from the system by " + user;

                var valid = true;
                for (var k = 0; k < this.allNotifications.length; k++) {
                  if (this.allNotifications[k].Action == tempLogU.Action) {
                    valid = false;
                  }
                }

                if (valid == true) {
                  this.allNotifications.push(tempLogU);
                  this.numberOfUserLogs += 1;
                  this.localNotificationNumber += 1;
                }
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

    //Making a call too the notification logging service to return all DBML logs
    this.notificationLoggingService.getAllDatabaseManagementLogs().subscribe((response: any) => {
      if (response.success == true) {
        //Temporarily holds the data returned from the API call
        const data = response.data.content.data.Logs;

        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < this.allLogs.length; j++) {
            if (data[i].date == this.allLogs[j]) {
              //A temporary instance of DatabaseManagementLogs that will be added to the allNotifications array
              var tempLogD: DatabaseManagementLogs = { LogID: data[i].date, Type: 'DBML', Action: data[i].action, Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, Organization1: data[i].org1, Organization2: data[i].org2, MoreInfo: data[i].moreInfo, ID: this.localNotificationNumber }

              //Getting the name and surname of the users passed using their id numbers
              var user = this.loadUserDetails(tempLogD.User);

              if (tempLogD.Action == "/createDatabase") {
                tempLogD.Action = "New database, " + tempLogD.Details + ", was added to the system by " + user;

                var valid = true;
                for (var k = 0; k < this.allNotifications.length; k++) {
                  if (this.allNotifications[k].Action == tempLogD.Action) {
                    valid = false;
                  }
                }

                if (valid == true) {
                  this.allNotifications.push(tempLogD);
                  this.numberOfDatabaseLogs += 1;
                  this.localNotificationNumber += 1;
                }
              }
              else if (tempLogD.Action == "/porting" || tempLogD.Action == "/addDoc") {
                tempLogD.Action = tempLogD.Details + " was ported";

                var valid = true;
                for (var k = 0; k < this.allNotifications.length; k++) {
                  if (this.allNotifications[k].Action == tempLogD.Action) {
                    valid = false;
                  }
                }

                if (valid == true) {
                  this.allNotifications.push(tempLogD);
                  this.numberOfDatabaseLogs += 1;
                  this.localNotificationNumber += 1;
                }
              }
              else if (tempLogD.Action == "C") {
                tempLogD.Action = "New database, " + tempLogD.Details + ", was added to the system by " + user;

                var valid = true;
                for (var k = 0; k < this.allNotifications.length; k++) {
                  if (this.allNotifications[k].Action == tempLogD.Action) {
                    valid = false;
                  }
                }

                if (valid == true) {
                  this.allNotifications.push(tempLogD);
                  this.numberOfDatabaseLogs += 1;
                  this.localNotificationNumber += 1;
                }
              }
            }
          }
        }
      }
      else {
        //Error handling
        this.notifications = false;
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD USER DETAILS
  /**
   *  This function will be called so that the information of a specific user can be fetched
   * 
   *  @param {string} userID The id number of the user to be found
   * 
   *  @memberof AdminNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails(userID: string) {
    var person = '';
    for (var i = 0; i < this.staff.length; i++) {
      if (this.staff[i].ID == userID) {
        person = this.staff[i].Name + ' ' + this.staff[i].Surname;
      }
    }

    return person;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       REMOVE NOTIFICATIONS
  /**
   *  This function will remove a notification from the notification section on the HTML page.
   * 
   * @param {string} id The id of the notification to be removed
   * 
   * @memberof AdminNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeNotification(id: string) {
    this.newNotifications.push(id);

    this.notificationLoggingService.updateFABIMemberNotifications(this.currentUser.ID, this.newNotifications).subscribe((response: any) => {
      if (response.success == true) {
        //Notification has been removed
      }
      else {
        //Error handling
        this.notificationService.showErrorNotification("Notification Error", "An error occurred when trying to remove this notification. Please try again.");
      }
    }, (err: HttpErrorResponse) => {
      //Error handling
      this.notificationService.showErrorNotification("Notification Error", "An error occurred when trying to remove this notification. Please try again.");
    });
  }

}

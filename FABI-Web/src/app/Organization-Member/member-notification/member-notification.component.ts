/**
 * File Name: member-notification.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\NEW\FABI-Mobile\FABI-Web\src\app\Organization-Member\member-notification\member-notification.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, August 13th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Sunday, October 6th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as core from '@angular/core';
import { Sample } from '../../_services/diagnostic-clinic-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';


@core.Component({
  selector: 'app-member-notification',
  templateUrl: './member-notification.component.html',
  styleUrls: ['./member-notification.component.scss']
})
export class MemberNotificationComponent implements core.OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Object array for holding all of the logs -  @type {any[]} */
  allNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {string[]} */
  newNotifications: string[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {string[]} */
  allLogs: string[] = [];

  /** Holds the div element (sampleContainer) from the HTML page - @type {ElementRef} */
  @core.ViewChild('sampleContainer', { read: core.ViewContainerRef }) sampleContainer;
  /** Holds the div element (notificationContainer) from the HTML page - @type {ElementRef} */
  @core.ViewChild('notificationContainer', { read: core.ViewContainerRef }) notificationContainer;

  /** The ID of the logged in member - @type {string} */
  memberID: string = '1234';
  /** The number of samples belonging to the member - @type {number} */
  numberOfMemberSamples: number;
  /** Indicates if there are notifications to load - @type {boolean} */
  notifications: boolean = false;
  /** Object array for holding the samples for the member -  @type {Sample[]} */
  memberSamples: Sample[] = [];
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
  /** Specifies if the notifications have been retreived to disable the loading spinner - @type {boolean} */
  notificationsLoading: boolean = true;
  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       CONSTRUCTOR
  /**
   * Creates an instance of MemberNotificationComponent.
   * 
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * 
   * @memberof MemberNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private notificationLoggingService: NotificationLoggingService
  ) { }

  
  ngOnInit() {
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        LOAD NOTIFICATIONS
  /**
   *  This function will load the organization member's notifications into the notification section on the HTML page
   * 
   * @memberof MemberNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNotifications() { }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       REMOVE NOTIFICATIONS
  /**
   *  This function will remove a notification from the notification section on the HTML page.
   * 
   * @param {string} id                   //The id of the notification to be removed
   * 
   * @memberof OrganizationNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeNotification(id: string) {
    this.newNotifications.push(id);

    this.notificationLoggingService.updateFABIMemberNotifications(this.currentUser.ID, this.newNotifications).subscribe((response: any) => {
      if (response.success == true) {

      }
      else {
        //Error handling
      }
    });
  }

}

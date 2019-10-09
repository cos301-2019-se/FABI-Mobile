/**
 * File Name: organization-notification.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\NEW\FABI-Mobile\FABI-Web\src\app\Organization\organization-notification\organization-notification.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, August 13th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, October 9th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as core from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosticClinicAPIService, Sample } from '../../_services/diagnostic-clinic-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { Member, UserManagementAPIService } from '../../_services/user-management-api.service';



@core.Component({
  selector: 'app-organization-notification',
  templateUrl: './organization-notification.component.html',
  styleUrls: ['./organization-notification.component.scss']
})
export class OrganizationNotificationComponent implements core.OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Object array for holding all of the logs -  @type {any[]} */
  allNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {string[]} */
  newNotifications: string[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {string[]} */
  allLogs: string[] = [];

  /** Object array for holding the members of the organization -  @type {Member[]} */
  organizationMembers: Member[] = [];
  /** Object array for holding the members of the organization -  @type {Member[]} */
  organizationMembersExample: Member[] = [];
  /** The total number of members in the organization - @type {number} */
  numberOfOrganizationMembers: number;
  notifications: boolean = false;

  /** Holds the div element (membersContainer) from the HTML page - @type {ElementRef} */
  @core.ViewChild('membersContainer', { read: core.ViewContainerRef }) membersContainer;
  /** Holds the div element (notificationContainer) from the HTML page - @type {ElementRef} */
  @core.ViewChild('notificationContainer', { read: core.ViewContainerRef }) notificationContainer;

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
   * Creates an instance of OrganizationNotificationComponent.
   * 
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {UserManagementAPIService} userManagementService For calling the User Management API Service
   * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API Service
   * @param {AuthenticationService} authService for calling the *authentication* service
   * @param {Router} router
   * @param {Resolver} resolver
   * @param {FormBuilder} formBuilder FOr getting the form values from the HTML
   * 
   * @memberof OrganizationNotificationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userManagementService: UserManagementAPIService,
    private diagnosticClinicService: DiagnosticClinicAPIService,
    private resolver: core.ComponentFactoryResolver,
    private formBuilder: FormBuilder,
    public sanitizer: DomSanitizer,
    private notificationLoggingService: NotificationLoggingService,
    private snackBar: MatSnackBar,
  ) {

  }

  ngOnInit() {
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD NOTIFICATIONS
  /**
   *  This function will load the organization's notifications into the notification section on the HTML page
   * 
   * @memberof OrganizationNotificationComponent
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

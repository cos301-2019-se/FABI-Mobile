/**
 * File Name: member-notification.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\NEW\FABI-Mobile\FABI-Web\src\app\Organization-Member\member-notification\member-notification.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, August 13th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, August 13th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { SampleDivComponent } from '../../Dynamic-Components/sample-div/sample-div.component';
import { DiagnosticClinicAPIService, Sample, Species } from '../../_services/diagnostic-clinic-api.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-member-notification',
  templateUrl: './member-notification.component.html',
  styleUrls: ['./member-notification.component.scss']
})
export class MemberNotificationComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Holds the div element (sampleContainer) from the HTML page - @type {ElementRef} */
  @ViewChild('sampleContainer', {read: ViewContainerRef}) sampleContainer;
  /** Holds the div element (notificationContainer) from the HTML page - @type {ElementRef} */
  @ViewChild('notificationContainer', {read: ViewContainerRef}) notificationContainer;

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
  
  constructor() { }

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
  loadNotifications(){}

}

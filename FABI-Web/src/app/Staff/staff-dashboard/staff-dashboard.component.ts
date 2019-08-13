/**
 * File Name: staff-dashboard.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Staff\staff-dashboard\staff-dashboard.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
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

import { Member, UserManagementAPIService } from '../../_services/user-management-api.service';
import { NotificationLoggingService, UserLogs } from '../../_services/notification-logging.service';
import { DiagnosticClinicAPIService, Sample } from '../../_services/diagnostic-clinic-api.service';
import { CultureCollectionAPIService, CMWDeposit, CMWRequest } from '../../_services/culture-collection-api.service';
import { AdminDivComponent } from '../../Dynamic-Components/admin-div/admin-div.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})

export class StaffDashboardComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Object array for holding the administrators -  @type {Member[]} */
  admins: Member[] = [];   

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

  /** Indicates whether there are samples to load or not - @type {boolean} */
  submittedSamples: boolean = false;
  /** Indicates whether there are deposit forms to load or not - @type {boolean} */
  depositForms: boolean = false;
  /** Indicates whether there are request forms to load or not - @type {boolean} */
  requestForms: boolean = false;

  /** Object array for holding the deposits associated with the user -  @type {CMWDeposit[]} */
  deposits: CMWDeposit[] = [];
  /** Object array for holding the requests associated with the user -  @type {CMWRequest[]} */
  requests: CMWRequest[] = [];
  /** Object array for holding the samples associated with the user -  @type {Sample[]} */
  samples: Sample[] = [];

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

  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of StaffDashboardComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API service
   * @param {CultureCollectionAPIService} cultureCollectionService For calling the Culture Collection API service
   * @param {ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
   * @param {AuthenticationService} authService Used for all authentication and session control
   * @param {Router} router
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService, 
    private router: Router, 
    private userManagementService: UserManagementAPIService,
    private diagnosticClinicService: DiagnosticClinicAPIService, 
    private resolver: ComponentFactoryResolver, 
    private notificationLoggingService: NotificationLoggingService,
    private cultureCollectionService: CultureCollectionAPIService
    ) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      NG ON INIT()  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call loadNotifications() | 2. Call loadSamples() | 3. loadDepositForms() | 4. loadRequestForms()
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {

    //******** TEMPORARY LOGIN FOR DEVELOPMENT: ********
    this.authService.temporaryLoginStaff().subscribe((response : any) => {
      this.currentUser = this.authService.getCurrentSessionValue.user;
      this.loadSamples();
      this.loadDepositForms();
      this.loadRequestForms();
    });

    //******** TO BE USED IN PRODUCTION: ********
    // // Set current user logged in
    // this.currentUser = this.authService.getCurrentSessionValue.user;
     //Calling the neccessary functions as the page loads
    //  this.loadSamples();
    //  this.loadDepositForms();
    //  this.loadRequestForms();

  }
  

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    TOGGLE NOTIFICATIONS TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab(){
    this.toggle_status = !this.toggle_status; 
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        LOAD SAMPLES
  /**
   *  This function will load all the samples associated with the user into the HTML page.
   *  @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadSamples() {
    this.diagnosticClinicService.getSamplesForFABIStaff(this.currentUser.ID).subscribe((response: any) => {
      if(response.success == true){
        this.submittedSamples = true;
        var data = response.date.samples;

        for(var i = 0; i < data.length; i++){
          var tempSample: Sample = {userID: data[i].userID, orgName: data[i].orgName, status: data[i].status, referenceNumber: data[i].referenceNmber, data: data[i].data};
          this.samples.push(tempSample);
        }
      }
      else{ 
        //Error handling
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      LOAD DEPOSIT FORMS
  /**
   *  This function will load all the deposit forms associated with the user into the HTML page.
   *  @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadDepositForms() {
    this.cultureCollectionService.getAllDepositLogs().subscribe((response: any) => {
      if(response.success == true){
        var data = response.data.qs.forms;

        for(var i = 0; i < data.length; i++){
          var tempDeposit : CMWDeposit = {userID: data[i].userID, cmwCultureNumber: data[i].cmwCultureNumber, genus: data[i].genus, epitheton: data[i].epitheton, 
            personalCollectionNumber: data[i].personalCollectionNumber, internationalCollectionNumber: data[i].internationalCollectionNumber, herbariumNumber: data[i].herbariumNumber,
            otherFABICollections: data[i].otherFABICollections, name: data[i].name, typeStatus: data[i].typeStatus, host: data[i].host, 
            vector: data[i].vector, substrate: data[i].substrate, continent: data[i].continent, country: data[i].country, region: data[i].region,
            locality: data[i].locality, gps: data[i].gps, collectedBy: data[i].collectedBy, dateCollected: data[i].dateCollected, isolatedBy: data[i].isolatedBy,
            identifiedBy: data[i].identifiedBy, donatedBy: data[i].donatedBy, additionalNotes: data[i].additionalNotes, dateSubmitted: data[i].dateSubmitted};
          
          if(tempDeposit.userID == localStorage.getItem('userID')){
            this.depositForms = true;
            this.deposits.push(tempDeposit);
          }
        }
      }
      else{ 
        //Error handling
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      LOAD REQUEST FORMS
  /**
   *  This function will load all the request forms associated with the user into the HTML page.
   *  @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadRequestForms() {
    this.cultureCollectionService.getAllRequestLogs().subscribe((response: any) => {
      if(response.success == true){
        var data = response.data.qs.forms;

        for(var i = 0; i < data.length; i++){
          var tempRequest : CMWRequest = {userID: data[i].userID, requestor: data[i].requestor, taxonName: data[i].taxonName, cultureNumber: data[i].cultureNumber,
            dateRequested: data[i].dateRequested, referenceNumber: data[i].referenceNumber, notes: data[i].notes, dateSubmitted: data[i].dateSubmitted};

          if(tempRequest.userID == this.currentUser.ID){
            this.requestForms = true;
            this.requests.push(tempRequest);
          }
        }
      }
      else{ 
        //Error handling
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      TOGGLE NOTIFICATIONS 
  /**
   * This function will toggle the display of the notifications side panel
   * 
   * @memberof StaffDashboardComponent
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
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleProfileTab() {
    this.profileTab = !this.profileTab;
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      DISPLAY PROFILE SAVE BUTTON 
  /**
   * This function will display the save button option if any details in the profile have been altered
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayProfileSaveBtn() {
    this.saveBtn = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                   DISPLAY PASSWORD CONFIRM INPUT 
  /**
   * This function will display the confirm password input field in the user's password was altered
   * 
   * @memberof StaffDashboardComponent
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
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleHelpTab() {
    this.helpTab = !this.helpTab;
  }

}

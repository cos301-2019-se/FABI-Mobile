/**
 * File Name: staff-dashboard.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Staff\staff-dashboard\staff-dashboard.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 1st 2019
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

  /** Object array for holding all of the logs -  @type {any[]} */ 
  allNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {any[]} */ 
  newNotifications: any[] = [];
  
  /** Indicates if there are notifications to load - @type {boolean} */           
  notifications: boolean = true; 
  /** The total number of User Logs - @type {number} */           
  numberOfUserLogs: number = 0;
  /** The number of the notifications - @type {number} */   
  localNotificationNumber : number = 1; 

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
  //                                                        GET_DATE
  /**
   *  This function will put the string date provided into a more readable format for the notifications
   * @param {string} date The date of the log
   * @memberof StaffDashboardComponent
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
  //                                                  LOAD_NOTIFICATIONS
  /**
   *  This function will load the staff member's notifications into the notification section on the HTML page
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNotifications(){
    //Making a call too the notification logging service to return all logs belonging to a specific user
    this.notificationLoggingService.getUserLogs(localStorage.getItem('userID')).subscribe((response: any) => {
      if(response.success = true){
        //Temporarily holds the data returned from the API call
        const data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          if(data[i].Type == 'USER'){
            //A temporary instance of UserLogs that will be added to the allNotifications array
            var tempLogU: UserLogs = {LogID: data[i].date, Type: 'USER', Action: data[i].action, Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, Organization1: data[i].org1, Organization2: data[i].org2, MoreInfo: data[i].moreInfo, ID: this.localNotificationNumber};
            
            //Getting the name and surname of the users passed using their id numbers
            const user1 = this.loadUserDetails(tempLogU.Organization2, tempLogU.Details);
            const user2 = this.loadUserDetails(tempLogU.Organization1, tempLogU.User);

            if(tempLogU.Action == 'C'){
              tempLogU.Action = user1 + ' was added to the system by ' + user2;
            }
            else if(tempLogU.Action == 'D'){
              tempLogU.Action = user1 + ' was removed from the system by ' + user2;
            }

            this.allNotifications.push(tempLogU);
            this.numberOfUserLogs += 1;
            this.localNotificationNumber += 1;
          }
        }
      }
      else{
        //Error handling
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_USER_DETAILS
  /**
   *  This function will be called so that the information of a specific user can be fetched
   *  @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails(userOrganization: string, userID: string) {
    //Making a call to the User Management API Service to retrieve a specific users details
    this.userManagementService.getUserDetails(userOrganization, userID).subscribe((response: any) => {
      if(response.success == true){
        //Temporarily holds the data returned from the API call
        const data = response.data;

        //Returns the users name and surname as a connected string
        return data.fname + ' ' + data.surname;
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
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeNotification(id: string){
    for(var i =  0; i < this.allNotifications.length; i++){
      if(this.allNotifications[i].ID != id){
        this.newNotifications.push(this.allNotifications[i]);
      }
    }

    // this.userManagementService.updateFABIMemberNotifications(localStorage.getItem('userID'), this.newNotifications).subscribe((response: any) => {
    //   if(response.success == true){
    //     this.loadNotifications();
    //   }
    //   else{
    //     //Error handling
    //   }
    // });
  } 

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                           TOGGLE_NOTIFICATIONS_TAB
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
  //                                                  LOAD_SAMPLES
  /**
   *  This function will load all the samples associated with the user into the HTML page.
   *  @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadSamples() {
    this.diagnosticClinicService.getSamplesForFABIStaff(localStorage.getItem('userID')).subscribe((response: any) => {
      if(response.success == true){
        this.submittedSamples = true;
        var data = response.date.samples;

        for(var i = 0; i < data.length; i++){
          var tempSample: Sample = {userID: data[i].userID, orgName: data[i].orgName, status: data[i].status, data: data[i].data};
          this.samples.push(tempSample);
        }
      }
      else{ 
        //Error handling
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_DEPOSIT_FORMS
  /**
   *  This function will load all the deposit forms associated with the user into the HTML page.
   *  @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadDepositForms() {
    this.cultureCollectionService.getAllDepositLogs().subscribe((response: any) => {
      if(response.success == true){
        var data = response.data;

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
  //                                                  LOAD_REQUEST_FORMS
  /**
   *  This function will load all the request forms associated with the user into the HTML page.
   *  @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadRequestForms() {
    this.cultureCollectionService.getAllRequestLogs().subscribe((response: any) => {
      if(response.success == true){
        var data = response.data;

        for(var i = 0; i < data.length; i++){
          var tempRequest : CMWRequest = {userID: data[i].userID, requestor: data[i].requestor, taxonName: data[i].taxonName, cultureNumber: data[i].cultureNumber,
            dateRequested: data[i].dateRequested, referenceNumber: data[i].referenceNumber, notes: data[i].notes, dateSubmitted: data[i].dateSubmitted};
          
          if(tempRequest.userID == localStorage.getItem('userID')){
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
  //                                                    NG_ON_INIT()  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call loadNotifications() | 2. Call loadSamples() | 3. loadDepositForms() | 4. loadRequestForms()
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.loadNotifications();
    this.loadSamples();
    this.loadDepositForms();
    this.loadRequestForms()
  }

}

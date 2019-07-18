/**
 * File Name: organization-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\organization-handler\organization-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Thursday, July 18td 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, June 26th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewChild } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../../errors/error-component/error.component';
import { Router } from '@angular/router';
import { ConfirmComponent } from "../../confirm/confirm.component";

//Include Material Components
import { MatPaginator, MatTableDataSource } from '@angular/material';

import * as Interface from '../../interfaces/interfaces';

import { NotificationLoggingService, UserLogs, DatabaseManagementLogs, AccessLogs } from '../../services/notification-logging.service';
import { Member, UserManagementAPIService } from '../../services/user-management-api.service';


@Component({
  selector: 'app-organization-handler',
  templateUrl: './organization-handler.component.html',
  styleUrls: ['./organization-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrganizationHandlerComponent implements OnInit {

  displayedColumns: string[] = ['Organization Name', 'Admin', "Remove"];
  dataSource = new MatTableDataSource([]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /** Object for defining the Create Organisation form -  @type {FormGroup} */
  registerOrgForm: FormGroup;
  /** To check if form has been submitted - @type {boolean} */
  submitted: boolean = false;
  /** To check if form has been submitted correctly - @type {boolean} */
  valid: boolean = false;
  /** If page is busy loading something - @type {boolean} */
  loading: boolean = false;
  /** Selected Organisation from the table - @type {Interface.Organisation} */
  selectedOrg: Interface.Organisation;
  /** Array of Organization objects - @type {Organisation[]} */
  organizations: Interface.Organisation[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Object array for holding all of the logs -  @type {any[]} */ 
  allNotifications: any[] = [];
  /** Object array for holding all of the read logs -  @type {any[]} */ 
  readNotifications: any[] = [];

  /** The total number of User Logs - @type {number} */           
  numberOfUserLogs: number = 0;
  /** The total number of Database Management Logs - @type {number} */           
  numberOfDatabaseLogs: number = 0;
  /** The total number of Access Logs - @type {number} */           
  numberOfAccessLogs: number = 0;

  /** Indicates if there are notifications to load - @type {boolean} */           
  notifications: boolean = true; 
  /** THe number of the notifications - @type {number} */   
  localNotificationNumber : number = 1;   

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
   * Creates an instance of OrganizationHandlerComponent.
   * @param {AdminAPIService} service For calling the API service
   * @param {FormBuilder} formBuilder For creating the login form
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {MatDialog} dialog For dialog pop-up messages
   * @param {Router} router For navigating to other modules/components
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private service: HttpService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog, 
    private router: Router, private userManagementService: UserManagementAPIService, private notificationLoggingService: NotificationLoggingService) {
    this.registerOrgForm = this.formBuilder.group({
      organization_name: ['', Validators.required],
      organization_location: ['', Validators.required],
      admin_name: ['', Validators.required],
      admin_surname: ['', Validators.required],
      admin_email: ['', Validators.required],
      admin_phone: ['', Validators.required]
    })
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET_DATE
  /**
   *  This function will put the string date provided into a more readable format for the notifications
   * @param {string} date The date of the log
   * @memberof OrganizationHandlerComponent
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
  //                                                       LOAD_NOTIFICATIONS
  /**
   *  This function will load the admin's notifications into the notification section on the HTML page
   * 
   * @memberof OrganizationHandlerComponent
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
          var tempLog: UserLogs = {Type: 'USER', Action: data[i].action, Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, Organization1: data[i].org1, Organization2: data[i].org2, MoreInfo: data[i].moreInfo, ID: this.localNotificationNumber};
          
          if(storageNotifications != null && storageNotifications.length != 0){
            for(var j = 0; j < storageNotifications.length; j++){
              if(storageNotifications[j].Type == 'USER' && storageNotifications[i].Action == tempLog.Action && 
                 storageNotifications[i].Date == tempLog.Date && storageNotifications.User == tempLog.User){
                this.readNotifications.push(tempLog);
              }
              else{
                const user1 = this.loadUserDetails(tempLog.Organization2, tempLog.Details);
                const user2 = this.loadUserDetails(tempLog.Organization1, tempLog.User);

                if(tempLog.Action == 'C'){
                  tempLog.Action = user1 + ' was added to the system by ' + user2;
                }
                else if(tempLog.Action == 'D'){
                  tempLog.Action = user1 + ' was removed from the system by ' + user2;
                }
                else if(tempLog.Action == 'U'){
                  tempLog.Action = user1 + ' details where updated by ' + user2;
                }

                this.allNotifications.push(tempLog);
                this.numberOfUserLogs += 1;
                this.localNotificationNumber += 1;
              }
            }
          }
          else{
            const user1 = this.loadUserDetails(tempLog.Organization2, tempLog.Details);
            const user2 = this.loadUserDetails(tempLog.Organization1, tempLog.User);

            if(tempLog.Action == 'C'){
              tempLog.Action = user1 + ' was added to the system by ' + user2;
            }
            else if(tempLog.Action == 'D'){
              tempLog.Action = user1 + ' was removed from the system by ' + user2;
            }
            else if(tempLog.Action == 'U'){
              tempLog.Action = user1 + ' details where updated by ' + user2;
            }

            this.allNotifications.push(tempLog);
            this.numberOfUserLogs += 1;
            this.localNotificationNumber += 1;
          }
        }
      }
      else{
        //Error handling
      }
    });


    //Loading the 'DBML' logs
    this.notificationLoggingService.getAllDatabaseManagementLogs().subscribe((response: any) => {
      if(response.success = true){
        const data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          var tempLog: DatabaseManagementLogs = {Type: 'DBML', Action: data[i].action, Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, Organization1: data[i].org1, Organization2: data[i].org2, MoreInfo: data[i].moreInfo, ID: this.localNotificationNumber};
          
          if(storageNotifications != null && storageNotifications.length != 0){
            for(var j = 0; j < storageNotifications.length; j++){
              if(storageNotifications[j].Type == 'USER' && storageNotifications[i].Action == tempLog.Action && 
                 storageNotifications[i].Date == tempLog.Date && storageNotifications.User == tempLog.User){
                this.readNotifications.push(tempLog);
              }
              else{
                const user1 = this.loadUserDetails(tempLog.Organization1, tempLog.User);

                if(tempLog.Action == 'C'){
                  tempLog.Action = tempLog.Details + ' was added to the system by ' + user1;
                }
                else if(tempLog.Action == 'D'){
                  tempLog.Action = tempLog.Details + ' was removed from the system by ' + user1;
                }
                else if(tempLog.Action == 'U'){
                  tempLog.Action = tempLog.Details + ' details where updated by ' + user1;
                }

                this.allNotifications.push(tempLog);
                this.numberOfUserLogs += 1;
                this.localNotificationNumber += 1;
              }
            }
          }
          else{
            const user1 = this.loadUserDetails(tempLog.Organization1, tempLog.User);

            if(tempLog.Action == 'C'){
              tempLog.Action = tempLog.Details + ' was added to the system by ' + user1;
            }
            else if(tempLog.Action == 'D'){
              tempLog.Action = tempLog.Details + ' was removed from the system by ' + user1;
            }
            else if(tempLog.Action == 'U'){
              tempLog.Action = tempLog.Details + ' details where updated by ' + user1;
            }

            this.allNotifications.push(tempLog);
            this.numberOfUserLogs += 1;
            this.localNotificationNumber += 1;
          }
        }
      }
      else{
        //Error handling
      }
    });


    //Loading the 'ACCL' logs
    this.notificationLoggingService.getAllAccessLogs().subscribe((response: any) => {
      if(response.success = true){
        const data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          var tempLog: AccessLogs = {Type: 'ACCL', Action: 'Access', Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, ID: this.localNotificationNumber};
          
          if(storageNotifications != null && storageNotifications.length != 0){
            for(var j = 0; j < storageNotifications.length; j++){
              if(storageNotifications[j].Type == 'ACCL' && storageNotifications[i].Date == tempLog.Date && 
              storageNotifications.User == tempLog.User){
                  this.readNotifications.push(tempLog);
                }
                else{
                  //Access notifications
                  this.allNotifications.push(tempLog);
                  this.numberOfAccessLogs += 1;
                  this.localNotificationNumber += 1;
                }
            }
          }
          else{
            this.allNotifications.push(tempLog);
            this.numberOfAccessLogs += 1;
            this.localNotificationNumber += 1;
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
  //                                                  LOAD_USER_DETAILS
  /**
   *  This function will be called so that the information of a specific user can be fetched
   *  @memberof OrganizationHandlerComponent
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
  //                                                            NG_ON_INIT()
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.viewOrganizations();
    this.loadNotifications();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       REGISTER ORGANIZATION
  /**
   * This function calls the *http* service to create a new Organisation.
   *
   * @returns
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  registerOrg() {

    this.submitted = true;

    if (this.registerOrgForm.invalid) {
      return;
    }

    this.valid = true;
    this.loading = true;

    const LorgName = this.registerOrgForm.controls.organization_name.value;
    // const LorgLocation = this.createOrgForm.controls.organization_location.value;
    const LadminName = this.registerOrgForm.controls.admin_name.value;
    const LadminSurname = this.registerOrgForm.controls.admin_surname.value;
    const LadminEmail = this.registerOrgForm.controls.admin_email.value;
    const LadminPhone = this.registerOrgForm.controls.admin_phone.value;

    const admin_details: Interface.OrganisationAdmin = { name: LadminName, surname: LadminSurname, email: LadminEmail };
    const org_details: Interface.Organisation = { orgName: LorgName, admin: admin_details };

    this.service.createOrganization(org_details).subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Successfully Registered Organization", "Dismiss", {
          duration: 6000
        });

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Registering Organization", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.registerOrg();
          }
        })
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SELECTED ORGANIZATION
  /**
   * This function sets the Organisation selected by the user in the table
   *
   * @param {Interface.Organisation} org
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  selectOrganisation(org: Interface.Organisation) {
    this.selectedOrg = org;
  }
  

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     REMOVE ORGANIZATION PROMPT
  /**
   * This function prompts the user to confirm if they wish to delete the selected Organisation
   *
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeOrganizationPrompt(org: Interface.Organisation) {
    
    const orgDetails = org.orgName;

    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Remove Organisation",
        message: "Are you sure you want to remove this Organisation?",
        info: orgDetails,
        cancel: "Cancel",
        confirm: "Remove"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "Confirm") {
        this.selectedOrg = org;
        this.removeOrg();
      }
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        REMOVE ORGANIZATION 
  /**
   * This function calls the *http* service to remove the selected Organisation 
   *
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeOrg() {

    this.service.removeOrganization(this.selectedOrg).subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Organization Removed", "Dismiss", {
          duration: 3000
        });
        this.refreshDataSource();
      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Removing", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.removeOrg();
          }
        })
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            REFRESH
  /**
   * This function refreshes the Datasource (in most cases, the table that has changed)
   *
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  refreshDataSource() {
    this.viewOrganizations();
      
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       VIEW ORGANIZATIONS
  /**
   * This function calls the *http* service to get all registered Organizations
   *
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  viewOrganizations() {
    
    this.service.getAllOrganizations().subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        this.organizations = response.data.Organizations;
        console.log(this.organizations);
        this.dataSource = new MatTableDataSource(this.organizations);
        this.dataSource.paginator = this.paginator;

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Sorry there was an error loading the Organisations", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.ngOnInit();
          }
        })
      }
    });
  }

  
}

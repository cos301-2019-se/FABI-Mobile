/**
 * File Name: staff-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\staff-handler\staff-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Sunday, July 28th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewChild } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

import { AuthenticationService } from '../../_services/authentication.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../../_errors/error-component/error.component';
import { Router } from '@angular/router';
import { ConfirmComponent } from "../../confirm/confirm.component";

//Include Material Components
import { MatPaginator, MatTableDataSource } from '@angular/material';


import * as Interface from '../../_interfaces/interfaces';

import { Member, UserManagementAPIService } from '../../_services/user-management-api.service';
import { NotificationLoggingService, UserLogs, DatabaseManagementLogs, AccessLogs } from '../../_services/notification-logging.service';


@Component({
  selector: 'app-staff-handler',
  templateUrl: './staff-handler.component.html',
  styleUrls: ['./staff-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StaffHandlerComponent implements OnInit {

  displayedColumns: string[] = ['First Name', 'Surname', 'Email', 'Remove' ,'Action'];
  dataSource = new MatTableDataSource([]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /** Object for defining the Add Staff form -  @type {FormGroup} */
  addStaffForm: FormGroup;
  /** To check if form has been submitted - @type {boolean} */
  submitted: boolean = false;
  /** To check if form has been submitted correctly - @type {boolean} */
  valid: boolean = false;
  /** If page is busy loading something - @type {boolean} */
  loading: boolean = false;
  /** Selected Staff Member from the table - @type {Interface.Organisation} */
  selectedStaff: Interface.StaffInfo;
  /** Array of Staff Member objects - @type {StaffInfo[]} */
  staffMembers: Interface.StaffInfo[];
  /** Array of User Type objects for form dropdown - @type {UserType[]} */
  userTypes: Interface.UserType[];
  /** Selected user type on dropdown - @type {string} */
  selectedUserType: string;

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

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
   * Creates an instance of StaffHandlerComponent.
   * @param {AdminAPIService} service For calling the API service
   * @param {FormBuilder} formBuilder For creating the login form
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {MatDialog} dialog For dialog pop-up messages
   * @param {Router} router For navigating to other modules/components
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService, 
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, 
    private dialog: MatDialog, 
    private router: Router, 
    private userManagementService: UserManagementAPIService, 
    private notificationLoggingService: NotificationLoggingService
    )  { 
    this.addStaffForm = this.formBuilder.group({
      staff_name: ['', Validators.required],
      staff_surname: ['', Validators.required],
      staff_email: ['', Validators.required],
      staff_phone: ['', Validators.required],
      staff_position: ['', Validators.required]
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                           TOGGLE_NOTIFICATIONS_TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab(){
    this.toggle_status = !this.toggle_status; 
 }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            NG_ON_INIT()
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.displayUserTypes();
    this.viewStaff();
    this.loadNotifications();

    const user2 = this.authService.getCurrentUserValue;
    console.log("///////// USER: " + JSON.stringify(user2));
  }

  logout() {

    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET_DATE
  /**
   *  This function will put the string date provided into a more readable format for the notifications
   * @param {string} date The date of the log
   * @memberof StaffHandlerComponent
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
   * @memberof StaffHandlerComponent
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
   *  @memberof StaffHandlerComponent
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
  //                                                          ADD STAFF MEMBER
  /**
   * This function calls the *user-management* service to add a Staff Member
   *
   * @returns
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addStaff()
  {
    this.submitted = true;

    if (this.addStaffForm.invalid) {
      return;
    }

    this.valid = true;
    this.loading = true;

    const LstaffName = this.addStaffForm.controls.staff_name.value;
    const LstaffSurname = this.addStaffForm.controls.staff_surname.value;
    const LstaffEmail = this.addStaffForm.controls.staff_email.value;
    const LstaffPhone = this.addStaffForm.controls.staff_phone.value;
    const LstaffPosition = this.addStaffForm.controls.staff_position.value;

    const staff_details: Interface.StaffInfo = { name: LstaffName, surname: LstaffSurname, email: LstaffEmail, position: LstaffPosition};

    this.userManagementService.addStaffMember(staff_details).subscribe((response: any) => {
      
      this.loading = false;

      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Staff Member Added", "Dismiss", {
          duration: 6000
        });
        this.refreshDataSource();
      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Adding Staff Member", message: response.message, retry: true }});
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.addStaff();
          }
        })
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SELECTED STAFF MEMBER
  /**
   * This function sets the Staff Member selected by the user in the table
   *
   * @param {Interface.StaffInfo} staffMem
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  selectOrganisation(staffMem: Interface.StaffInfo) {
    this.selectedStaff = staffMem;
  }
  

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     REMOVE STAFF MEMBER PROMPT
  /**
   * This function prompts the user to confirm if they wish to remove the selected Staff Member
   *
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeStaffMemberPrompt(member: Interface.StaffInfo) {
    
    const staffDetails = member.fname + " " + member.surname + " " + member.email;

    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Remove Staff Member",
        message: "Are you sure you want to remove this Staff Member?",
        info: staffDetails,
        cancel: "Cancel",
        confirm: "Remove"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "Confirm") {
        this.selectedStaff = member;
        this.removeStaffMember();
        
      }
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                           REMOVE STAFF   
  /**
   * This function calls the *user-management* service to remove the selected Staff Member 
   *
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeStaffMember() {

    this.userManagementService.removeFABIStaffMember(this.selectedStaff).subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Staff Member Removed", "Dismiss", {
          duration: 3000
        });
        this.refreshDataSource();
      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Removing", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.removeStaffMember();
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
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  refreshDataSource() {
      this.viewStaff();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            VIEW STAFF
  /**
   * This function calls the *user-management* service to get all registered FABI Staff
   *
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  viewStaff() {
    
    this.userManagementService.getAllStaffMembers().subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        this.staffMembers = response.data.qs.staff;
        this.dataSource = new MatTableDataSource(this.staffMembers);
        this.dataSource.paginator = this.paginator;

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Loading Staff", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.viewStaff();
          }
        })
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //    USER TYPES -> TO BE FETCHED FROM DB IN THE FUTURE
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayUserTypes() {

    this.userTypes = [
      {
        "ID":1,
        "Name":"Admin"
      },
      {
        "ID":2,
        "Name":"Staff"
      }
    ]


    // if(this.selectedOrg == "FABI")
    // {
    //   this.userTypes = [
    //     {
    //       "ID":1,
    //       "Name":"Admin"
    //     },
    //     {
    //       "ID":2,
    //       "Name":"Staff"
    //     }
    //   ]

    // }
    // else {
    //   this.userTypes = [
    //     {
    //       "ID":1,
    //       "Name":"Admin"
    //     },
    //     {
    //       "ID":2,
    //       "Name":"Member"
    //     }
    //   ]
    // }

    //-------- Load User Types for Drop Down --------
    // this.service.getUserTypes(this.selectedOrg).subscribe((response: any) => {
    //   if (response.success == true && response.status == 200) {
    //     this.userTypes = response.data;

    //   } else if (response.success == false) {
    //     //POPUP MESSAGE
    //     let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Sorry there was an error loading the User Types", message: response.message, retry: true } });
    //     dialogRef.afterClosed().subscribe((result) => {
    //       if (result == "Retry") {
    //         this.displayUserTypes();
    //       }
    //     })
    //   }
    // });

  }


}

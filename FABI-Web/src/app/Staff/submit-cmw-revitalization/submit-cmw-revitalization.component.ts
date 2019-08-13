/**
 * File Name: submit-cmw-revitalization.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Staff\submit-cmw-revitalization\submit-cmw-revitalization.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, July 16th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, August 13th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NotificationLoggingService, UserLogs } from '../../_services/notification-logging.service';
import { UserManagementAPIService, Member } from '../../_services/user-management-api.service';
import { CultureCollectionAPIService, CMWRevitalization } from '../../_services/culture-collection-api.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-cmw-revitalization',
  templateUrl: './submit-cmw-revitalization.component.html',
  styleUrls: ['./submit-cmw-revitalization.component.scss']
})
export class SubmitCmwRevitalizationComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** The form to submit a CMW revitalization form -  @type {FormGroup} */
  cmwRevitalizationForm: FormGroup;

  /** Object array for holding the staff members -  @type {string[]} */                        
  staff: string[] = []; 
  /** Object array for holding the staff members -  @type {String[]} */
  filteredOptions: Observable<string[]>;
  /** The form control for the autocomplete of the requestor input -  @type {FormControl} */
  requestorControl = new FormControl();

  /** The requestor of the form -  @type {string} */
  requestor: string;
  /** The current name of the form -  @type {string} */
  currentName: string;
  /** The bionumerics name of the form -  @type {string} */
  bionumericsName: string;
  /** The culture number of the form -  @type {string} */
  cultureNumber: string;
  /** The culture condition of the form -  @type {string} */
  cultureCondition: string;
  /** The sequence of the form -  @type {string} */
  sequence: string;
  /** The reference number of the form -  @type {string} */
  referenceNumber: string;
  /** The date requested of the form -  @type {string} */
  dateRequested: string;
  /** The date returned of the form -  @type {string} */
  dateReturned: string;

  /** Object array for holding all of the logs -  @type {any[]} */ 
  allNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {any[]} */ 
  newNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {string[]} */ 
  allLogs: string[] = []; 
  
  /** Indicates if there are notifications to load - @type {boolean} */           
  notifications: boolean = true; 
  /** The total number of User Logs - @type {number} */           
  numberOfUserLogs: number = 0;
  /** THe number of the notifications - @type {number} */   
  localNotificationNumber : number = 1; 

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

  /** The name and surname of a user concatenated as a string - @type {string} */   
  user1: string;
  /** The name and surname of a user concatenated as a string - @type {string} */   
  user2: string;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of SubmitCmwRevitalizationComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For making calls to the User Management API Service
   * @param {CultureCollectionAPIService} cultureCollectionService for making calls to the Culture Collection API Service
   * @param {notificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {AuthenticationService} authService Used for all authentication and session control
   * @param {FormBuilder} formBuilder Used to build the form from the HTML page
   * @param {Router} router
   * 
   * @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar,
    private userManagementService: UserManagementAPIService,
    private cultureCollectionService: CultureCollectionAPIService, 
    private authService: AuthenticationService, 
    private router: Router,
    private notificationLoggingService: NotificationLoggingService
    ) { 
    this.cmwRevitalizationForm = this.formBuilder.group({
      requestor: '',
      current_name: '',
      name_bionumerics: '',
      culture_number: '',
      culture_condition: '',
      sequence_data_submitted: '',
      reference_number: '',
      date_requested: null,
      date_returned: null
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            SET REQUESTOR 
  /*** This function will set the 'requestor' variable according to the option selected in the mat-autocomplete element
   * 
   * @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  setRequestor(event$){
    this.requestor = event$.option.value;
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  SUBMIT CMW REVITALIZATION FORM
  /**
   * This function will submit a CMW Revitalization form based on the information provided in the form on the HTML page.
   * @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitCMWRevitalizationForm(){
    if(this.cmwRevitalizationForm.controls.requestor.value == null || this.cmwRevitalizationForm.controls.requestor.value == ""){
      this.requestor = "";
    }
    else{
      this.requestor = this.cmwRevitalizationForm.controls.requestor.value;
    }

    if(this.cmwRevitalizationForm.controls.current_name.value == null || this.cmwRevitalizationForm.controls.current_name.value == ""){
      this.currentName = "";
    }
    else{
      this.currentName = this.cmwRevitalizationForm.controls.current_name.value;
    }

    if(this.cmwRevitalizationForm.controls.name_bionumerics.value == null || this.cmwRevitalizationForm.controls.name_bionumerics.value == ""){
      this.bionumericsName = "";
    }
    else{
      this.bionumericsName = this.cmwRevitalizationForm.controls.name_bionumerics.value;
    }

    if(this.cmwRevitalizationForm.controls.culture_number.value == null || this.cmwRevitalizationForm.controls.culture_number.value == ""){
      this.cultureNumber = "";
    }
    else{
      this.cultureNumber = this.cmwRevitalizationForm.controls.culture_number.value;
    }

    if(this.cmwRevitalizationForm.controls.culture_condition.value == null || this.cmwRevitalizationForm.controls.culture_condition.value == ""){
      this.cultureCondition = "";
    }
    else{
      this.cultureCondition = this.cmwRevitalizationForm.controls.culture_condition.value;
    }

    if(this.cmwRevitalizationForm.controls.sequence.value == null || this.cmwRevitalizationForm.controls.sequence.value == ""){
      this.sequence = "";
    }
    else{
      this.sequence = this.cmwRevitalizationForm.controls.sequence.value;
    }

    if(this.cmwRevitalizationForm.controls.reference_number.value == null || this.cmwRevitalizationForm.controls.reference_number.value == ""){
      this.referenceNumber = "";
    }
    else{
      this.referenceNumber = this.cmwRevitalizationForm.controls.reference_number.value;
    }

    var temp = (this.cmwRevitalizationForm.controls.date_requested.value).toString();
    var year = temp[0] + temp[1] + temp[2] + temp[3];
    var month = temp[5] + temp[6];
    var day = temp[8] + temp[9];
    this.dateRequested = day + '/' + month + '/' + year;

    var temp = (this.cmwRevitalizationForm.controls.date_requested.value).toString();
    var year = temp[0] + temp[1] + temp[2] + temp[3];
    var month = temp[5] + temp[6];
    var day = temp[8] + temp[9];
    this.dateReturned = day + '/' + month + '/' + year;

    var date = new Date();
    var currentDate = ('0' + date.getDate()).slice(-2) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    //Getting the user's details from local storage
    var tempUser = this.authService.getCurrentSessionValue();

    var revitalization: CMWRevitalization = {userID: tempUser.user.ID, requestor: this.requestor, currentName: this.currentName, nameBionumerics: this.bionumericsName, cultureNumber: this.cultureNumber,
      cultureCondition: this.cultureCondition, sequenceDateSubmitted: this.sequence, referenceNumber: this.referenceNumber, dateRequested: this.dateRequested,
      dateReturned: this.dateReturned, dateSubmitted: currentDate};

    this.cultureCollectionService.submitCMWRevitalizationForm(revitalization).subscribe((response: any) => {
      if(response.success == true){
        //Successfully submitted form
        this.cmwRevitalizationForm.reset();

        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("CMW Revitalization form successfully submitted.", "Dismiss", {
          duration: 3000
        });
      }
      else{
        //Error handling

        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Could not submit CMW Revitalization form. Please try again.", "Dismiss", {
          duration: 3000
        });
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET ALL STAFF
  /**
   *  This function will load of the FABI staff members and administrators into an array so that they can be selected when filling out
   *  the form to submit.
   * @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllStaff(){
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllFABIMembers().subscribe((response: any) => {
      if(response.success == true){
        
        for(var i = 0; i < response.data.qs.admins.length; i++){
          this.staff.push(response.data.qs.admins[i].surname + ', ' + response.data.qs.admins[i].fname[0]);
        }

        for(var i = 0; i < response.data.qs.staff.length; i++){
          this.staff.push(response.data.qs.staff[i].surname + ', ' + response.data.qs.staff[i].fname[0]);
        }
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       LOAD LOGS
  /**
   *  This function will load all of the user's logs into a string array.
   * 
   * @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadLogs(){
    //Getting the user's details from local storage
    var tempUser = this.authService.getCurrentSessionValue();

    //Making a call to the notification logging service to return all logs belonging to the user
    this.notificationLoggingService.getUserLogs(tempUser.user.ID).subscribe((response: any) => {
      if(response.success == true){
        var data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          this.allLogs.push(data[i].id);
        }
      }
      else{
        //Error handling
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        LOAD NOTIFICATIONS
  /**
   *  This function will load the staff member's notifications into the notification section on the HTML page
   * 
   * @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNotifications(){
    //Loading all the logs beloning to the user
    this.loadLogs();

    //Making a call too the notification logging service to return all USER logs
    this.notificationLoggingService.getAllUserLogs().subscribe((response: any) => {
      if(response.success = true){
        //Temporarily holds the data returned from the API call
        const data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          for(var j = 0; j < this.allLogs.length; j++){
            if(data[i].date == this.allLogs[j]){
              //A temporary instance of UserLogs that will be added to the allNotifications array
              var tempLogU: UserLogs = {LogID: data[i].date, Type: 'USER', Action: data[i].action, Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, Organization1: data[i].org1, Organization2: data[i].org2, MoreInfo: data[i].moreInfo, ID: this.localNotificationNumber};
              
              //Getting the name and surname of the users passed using their id numbers
              this.loadUserDetails(tempLogU.Organization1, tempLogU.Details, 'user1');
              
              if(tempLogU.Action == "/createOrganization"){
                tempLogU.Action = "New organization " + tempLogU.User + " was added to the system by " + this.user1;
              }
              else if(tempLogU.Action == "/addStaff"){
                this.loadUserDetails(tempLogU.Organization2, tempLogU.User, 'user2');
                tempLogU.Action = "New user, " + this.user2 + ", was added to the system by " + this.user1;
              }
              else if(tempLogU.Action == "C"){
                this.loadUserDetails(tempLogU.Organization2, tempLogU.User, 'user2');
                tempLogU.Action = "New user, " + this.user2 + ", was added to the system by " + this.user1;
              }
              else if(tempLogU.Action == "/removeOrg"){
                tempLogU.Action = "Organization " + tempLogU.User + " was removed from the system by " + this.user1;
              }
              else if(tempLogU.Action == "/removeStaff"){
                this.loadUserDetails(tempLogU.Organization2, tempLogU.User, 'user2');
                tempLogU.Action = "New user, " + this.user2 + ", was removed from the system by " + this.user1;
              }
  
              this.allNotifications.push(tempLogU);
              this.numberOfUserLogs += 1;
              this.localNotificationNumber += 1;
            }
          }          
        }
      }
      else{
        //Error handling
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        LOAD USER DETAILS
  /**
   *  This function will be called so that the information of a specific user can be fetched
   * 
   *  @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails(userOrganization: string, userID: string, type: string) {
    //Making a call to the User Management API Service to retrieve a specific users details
    this.userManagementService.getUserDetails(userOrganization, userID).subscribe((response: any) => {
      if(response.success == true){
        //Temporarily holds the data returned from the API call
        const data = response.data;

        if(type == 'user1'){
          //Sets the users name and surname as a connected string
          this.user1 = data.fname + ' ' + data.surname;
        }
        else if(type == 'user2'){
          //Sets the users name and surname as a connected string
          this.user2 = data.fname + ' ' + data.surname;
        }
      } 
      else{
        //Error control
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       REMOVE NOTIFICATIONS
  /**
   *  This function will remove a notification from the notification section on the HTML page.
   * 
   * @param {string} id                   //The id of the notification to be removed
   * @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeNotification(id: string){
    for(var i =  0; i < this.allNotifications.length; i++){
      if(this.allNotifications[i].ID == id){
        this.newNotifications.push(this.allNotifications[i]);
      }
    }

    //Getting the user's details from local storage
    var tempUser = this.authService.getCurrentSessionValue();

    this.notificationLoggingService.updateFABIMemberNotifications(tempUser.user.ID, this.newNotifications).subscribe((response: any) => {
      if(response.success == true){
        this.loadNotifications();
      }
      else{
        //Error handling
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      TOGGLE NOTIFICATIONS TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab(){
    this.toggle_status = !this.toggle_status; 
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET DATE
  /**
   *  This function will put the string date provided into a more readable format for the notifications
   * @param {string} date The date of the log
   * @memberof SubmitCmwRevitalizationComponent
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
  //                                                                  FILTER
  /**
   *  This function will filter the autocomplete results on the form.
   * @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.staff.filter(option => option.toLowerCase().includes(filterValue));
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                           NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call loadNotifications() | 2. Call getAllStaff()
   * 
   * @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.loadNotifications();
    this.getAllStaff();
    this.filteredOptions = this.requestorControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
  }

}

/**
 * File Name: submit-cmw-deposit.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Staff\submit-cmw-deposit\submit-cmw-deposit.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, July 16th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 1st 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NotificationLoggingService, UserLogs } from '../../_services/notification-logging.service';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserManagementAPIService, Member } from '../../_services/user-management-api.service';
import { DiagnosticClinicAPIService, CMWDeposit } from '../../_services/diagnostic-clinic-api.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-cmw-deposit',
  templateUrl: './submit-cmw-deposit.component.html',
  styleUrls: ['./submit-cmw-deposit.component.scss']
})
export class SubmitCmwDepositComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** The form to submit a CMW deposit form -  @type {FormGroup} */
  cmwDepositForm: FormGroup;

  /** Object array for holding the staff members -  @type {string[]} */                        
  staff: string[] = []; 
  /** Object array for holding the staff members -  @type {String[]} */
  filteredOptions: Observable<string[]>;
  control = new FormControl();

  /** The cmw culture number of the form -  @type {string} */
  cmwCultureNumber: string;
  /** The genus of the form -  @type {string} */
  genus: string;
  /** The epitheton of the form -  @type {string} */
  epitheton: string;
  /** The personal collection number of the form -  @type {Ststringring} */
  personalCollectionNumber: string;
  /** The internation collection number of the form -  @type {string} */
  internationalCollectionNumber: string;
  /** The herbarium number of the form -  @type {string} */
  herbariumNumber: string;
  /** The other FABI collections of the form -  @type {string} */
  otherFABICollections: string;
  /** The name of the form -  @type {string} */
  name: string;
  /** The type status of the form -  @type {string} */
  typeStatus: string;
  /** The host of the form -  @type {string} */
  host: string;
  /** The vector of the form -  @type {string} */
  vector: string;
  /** The substrate of the form -  @type {string} */
  substrate: string;
  /** The continent of the form -  @type {string} */
  continent: string;
  /** The country of the form -  @type {string} */
  country: string;
  /** The region of the form -  @type {string} */
  region: string;
  /** The locality of the form -  @type {string} */
  locality: string;
  /** The gps of the form -  @type {string} */
  gps: string;
  /** The collected by of the form -  @type {string} */
  collectedBy: string;
  /** The date collected of the form -  @type {Date} */
  dateCollected: Date;
  /** The isolated by of the form -  @type {string} */
  isolatedBy: string;
  /** The identified by of the form -  @type {string} */
  identifiedBy: string;
  /** The donated by of the form -  @type {string} */
  donatedBy: string;
  /** The additional notes of the form -  @type {string} */
  additionalNotes: string;

  /** Object array for holding all of the logs -  @type {any[]} */ 
  allNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {any[]} */ 
  newNotifications: any[] = [];
  
  /** Indicates if there are notifications to load - @type {boolean} */           
  notifications: boolean = true; 
  /** The total number of User Logs - @type {number} */           
  numberOfUserLogs: number = 0;
  /** THe number of the notifications - @type {number} */   
  localNotificationNumber : number = 1; 

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of SubmitCmwDepositComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For making calls to the User Management API Service
   * @param {DiagnosticClinicAPIService} diagnosticClinicService for making calls to the Diagnostic Clinic API Service
   * @param {notificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {DatePipe} datePipe Used to get the current date in a specific format
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @memberof SubmitCmwDepositComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
  constructor(
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar,
    private userManagementService: UserManagementAPIService,
    private diagnosticClinicService: DiagnosticClinicAPIService, 
    private authService: AuthenticationService, 
    private router: Router,
    private datePipe: DatePipe,
    private notificationLoggingService: NotificationLoggingService
    ) { 
    this.cmwDepositForm = this.formBuilder.group({
      cmw_culture_number: '',
      genus: '',
      epitheton: '',
      personal_collection_number: '',
      international_collection_number: '',
      herbarium_number: '',
      other_FABI_collections: '',
      name: '',
      type_status: '',
      host: '',
      vector: '',
      substrate: '',
      continent: '',
      country: '',
      region: '',
      locality: '',
      gps: '',
      collected_by: '',
      date_collected: null,
      isolated_by: '',
      identified_by: '',
      donated_by: '',
      additional_notes: ''
    });
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                              SUBMIT_CMW_DEPOSIT_FORM
  /**
   * This function will submit a CMW Deposit form based on the information provided in the form on the HTML page.
   * @memberof SubmitCmwDepositComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitCMWDepositForm(){
    if(this.cmwDepositForm.controls.cmw_culture_number.value == null || this.cmwDepositForm.controls.cmw_culture_number.value == ""){
      	this.cmwCultureNumber = "";
    }
    else{
      this.cmwCultureNumber = this.cmwDepositForm.controls.cmw_culture_number.value;
    }

    if(this.cmwDepositForm.controls.genus.value == null || this.cmwDepositForm.controls.genus.value == ""){
      this.genus = "";
    }
    else{
      this.genus = this.cmwDepositForm.controls.genus.value;
    }

    if(this.cmwDepositForm.controls.epitheton.value == null || this.cmwDepositForm.controls.epitheton.value == ""){
      this.epitheton = "";
    }
    else{
      this.epitheton = this.cmwDepositForm.controls.epitheton.value;
    }

    if(this.cmwDepositForm.controls.personal_collection_number.value == null || this.cmwDepositForm.controls.personal_collection_number.value == ""){
      this.personalCollectionNumber = "";
    }
    else{
      this.personalCollectionNumber = this.cmwDepositForm.controls.personal_collection_number.value;
    }

    if(this.cmwDepositForm.controls.international_collection_number.value == null || this.cmwDepositForm.controls.international_collection_number.value == ""){
      this.internationalCollectionNumber = "";
    }
    else{
      this.internationalCollectionNumber = this.cmwDepositForm.controls.international_collection_number.value;
    }

    if(this.cmwDepositForm.controls.herbarium_number.value == null || this.cmwDepositForm.controls.herbarium_number.value == ""){
      this.herbariumNumber = "";
    }
    else{
      this.herbariumNumber = this.cmwDepositForm.controls.herbarium_number.value;
    }

    if(this.cmwDepositForm.controls.other_FABI_collections.value == null || this.cmwDepositForm.controls.other_FABI_collections.value == ""){
      this.otherFABICollections = "";
    }
    else{
      this.otherFABICollections = this.cmwDepositForm.controls.other_FABI_collections.value;
    }

    if(this.cmwDepositForm.controls.name.value == null || this.cmwDepositForm.controls.name.value == ""){
      this.name = "";
    }
    else{
      this.name = this.cmwDepositForm.controls.name.value;
    }

    if(this.cmwDepositForm.controls.type_status.value == null || this.cmwDepositForm.controls.type_status.value == ""){
      this.typeStatus = "";
    }
    else{
      this.typeStatus = this.cmwDepositForm.controls.type_status.value;
    }

    if(this.cmwDepositForm.controls.host.value == null || this.cmwDepositForm.controls.host.value == ""){
      this.host = "";
    }
    else{
      this.host = this.cmwDepositForm.controls.host.value;
    }

    if(this.cmwDepositForm.controls.vector.value == null || this.cmwDepositForm.controls.vector.value == ""){
      this.vector = "";
    }
    else{
      this.vector = this.cmwDepositForm.controls.vector.value;
    }

    if(this.cmwDepositForm.controls.substrate.value == null || this.cmwDepositForm.controls.substrate.value == ""){
      this.substrate = "";
    }
    else{
      this.substrate = this.cmwDepositForm.controls.substrate.value;
    }

    if(this.cmwDepositForm.controls.continent.value == null || this.cmwDepositForm.controls.continent.value == ""){
      this.continent = "";
    }
    else{
      this.continent = this.cmwDepositForm.controls.continent.value;
    }

    if(this.cmwDepositForm.controls.country.value == null || this.cmwDepositForm.controls.country.value == ""){
      this.country = "";
    }
    else{
      this.country = this.cmwDepositForm.controls.country.value;
    }

    if(this.cmwDepositForm.controls.region.value == null || this.cmwDepositForm.controls.region.value == ""){
      this.region = "";
    }
    else{
      this.region = this.cmwDepositForm.controls.region.value;
    }

    if(this.cmwDepositForm.controls.locality.value == null || this.cmwDepositForm.controls.locality.value == ""){
      this.locality = "";
    }
    else{
      this.locality = this.cmwDepositForm.controls.locality.value;
    }

    if(this.cmwDepositForm.controls.gps.value == null || this.cmwDepositForm.controls.gps.value == ""){
      this.gps = "";
    }
    else{
      this.gps = this.cmwDepositForm.controls.gps.value;
    }

    if(this.cmwDepositForm.controls.collected_by.value == null || this.cmwDepositForm.controls.collected_by.value == ""){
      this.collectedBy = "";
    }
    else{
      this.collectedBy = this.cmwDepositForm.controls.collected_by.value;
    }
      
    this.dateCollected = this.cmwDepositForm.controls.dateCollected.value;

    if(this.cmwDepositForm.controls.isolated_by.value == null || this.cmwDepositForm.controls.isolated_by.value == ""){
      this.isolatedBy = "";
    }
    else{
      this.isolatedBy = this.cmwDepositForm.controls.isolated_by.value;
    }

    if(this.cmwDepositForm.controls.identified_by.value == null || this.cmwDepositForm.controls.identified_by.value == ""){
      this.identifiedBy = "";
    }
    else{
      this.identifiedBy = this.cmwDepositForm.controls.identified_by.value;
    }

    if(this.cmwDepositForm.controls.donated_by.value == null || this.cmwDepositForm.controls.donated_by.value == ""){
      this.donatedBy = "";
    }
    else{
      this.donatedBy = this.cmwDepositForm.controls.donated_by.value;
    }

    if(this.cmwDepositForm.controls.additional_notes.value == null || this.cmwDepositForm.controls.additional_notes.value == ""){
      this.additionalNotes = "";
    }
    else{
      this.additionalNotes = this.cmwDepositForm.controls.additional_notes.value;
    }

    var date = new Date();
    var currentDate = ('0' + date.getDate()).slice(-2) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    var deposit: CMWDeposit = {userID: localStorage.getItem('userPassword'),cmwCultureNumber: this.cmwCultureNumber, genus: this.genus, epitheton: this.epitheton, personalCollectionNumber: this.personalCollectionNumber,
      internationalCollectionNumber: this.internationalCollectionNumber, herbariumNumber: this.herbariumNumber, otherFABICollections: this.otherFABICollections, name: this.name,
      typeStatus: this.typeStatus, host: this.host, vector: this.vector, substrate: this.substrate, continent: this.continent, country: this.country, region: this.region,
      locality: this.locality, gps: this.gps, collectedBy: this.collectedBy, dateCollected: this.dateCollected.toDateString(), isolatedBy: this.isolatedBy, identifiedBy: this.identifiedBy,
      donatedBy: this.donatedBy, additionalNotes: this.additionalNotes, dateSubmitted: currentDate}

    this.diagnosticClinicService.submitCMWDepositForm(deposit).subscribe((response: any) => {
      if(response.success == true){
        //Successfully submitted deposit form

        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("CMW Deposit form successfully submitted.", "Dismiss", {
          duration: 3000
        });
      }
      else{
        //Error handling

        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Could not submit CMW Deposit form. Please try again.", "Dismiss", {
          duration: 3000
        });
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                            GET_ALL_STAFF
  /**
   *  This function will load of the FABI staff members and administrators into an array so that they can be selected when filling out
   *  the form to submit.
   * @memberof SubmitCmwDepositComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllStaff(){
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllFABIMembers().subscribe((response: any) => {
      if(response.success == true){
        
        for(var i = 0; i <= response.data.qs.admins.length; i++){
          this.staff.push(response.data.qs.admins[i].surname + ', ' + response.data.qs.admins[i].fname[0]);
        }

        for(var i = 0; i <= response.data.qs.admins.length; i++){
          this.staff.push(response.data.qs.admins[i].surname + ', ' + response.data.qs.admins[i].fname[0]);
        }
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_NOTIFICATIONS
  /**
   *  This function will load the staff member's notifications into the notification section on the HTML page
   * 
   * @memberof SubmitCmwDepositComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNotifications(){
    this.notificationLoggingService.getUserLogs(localStorage.getItem('userID')).subscribe((response: any) => {
      if(response.success = true){
        const data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          if(data[i].Type == 'USER'){
            var tempLogU: UserLogs = {LogID: data[i].date, Type: 'USER', Action: data[i].action, Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, Organization1: data[i].org1, Organization2: data[i].org2, MoreInfo: data[i].moreInfo, ID: this.localNotificationNumber};
          
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
   *  @memberof SubmitCmwDepositComponent
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
  //                                                       REMOVE_NOTIFICATIONS
  /**
   *  This function will remove a notification from the notification section on the HTML page.
   * 
   * @param {string} id                   //The id of the notification to be removed
   * @memberof SubmitCmwDepositComponent
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
   * @memberof SubmitCmwDepositComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab(){
    this.toggle_status = !this.toggle_status; 
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET_DATE
  /**
   *  This function will put the string date provided into a more readable format for the notifications
   * @param {string} date The date of the log
   * @memberof SubmitCmwDepositComponent
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
  //                                            FILTER
  /**
   *  This function will filter the autocomplete results on the form.
   * @memberof SubmitCmwDepositComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.staff.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.loadNotifications();
    this.getAllStaff();
    this.filteredOptions = this.control.valueChanges.pipe(startWith(''), map(value => this.filter(value)));
  }

}

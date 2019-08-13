/**
 * File Name: submit-cmw-request.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Staff\submit-cmw-request\submit-cmw-request.component.ts
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog, MatSnackBar } from '@angular/material';

import { NotificationLoggingService, UserLogs } from '../../_services/notification-logging.service';
import { UserManagementAPIService, Member } from '../../_services/user-management-api.service';
import { CultureCollectionAPIService, CMWDeposit, CMWRequest } from '../../_services/culture-collection-api.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-cmw-request',
  templateUrl: './submit-cmw-request.component.html',
  styleUrls: ['./submit-cmw-request.component.scss']
})
export class SubmitCmwRequestComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** The form to submit a CMW request form -  @type {FormGroup} */
  cmwRequestForm: FormGroup;

  /** Object array for holding the staff members -  @type {string[]} */                        
  staff: string[] = []; 
  /** Object array for holding the staff members -  @type {String[]} */
  filteredOptions: Observable<string[]>;
  /** The form control for the autocomplete of the requestor input -  @type {FormControl} */
  requestorControl = new FormControl();

  /** The requestor of the form -  @type {string} */
  requestor: string;
  /** The taxonName of the form -  @type {string} */
  taxonName: string;
  /** The cultureNumber of the form -  @type {string} */
  cultureNumber: string;
  /** The dateRequested of the form -  @type {string} */
  dateRequested: string;
  /** The reference number of the form -  @type {string} */
  referenceNumber: string;
  /** The notes of the form -  @type {string} */
  notes: string;

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;

  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of SubmitCmwRequestComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For making calls to the User Management API Service
   * @param {CultureCollectionAPIService} cultureCollectionService for making calls to the Culture Collection API Service
   * @param {NotificationLoggingAPIService} notificationLoggingService For calling the Notification Logging API service
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {AuthenticationService} authService Used for all authentication and session control
   * @param {FormBuilder} formBuilder Used to build the form from the HTML page
   * @param {Router} router
   * 
   * @memberof SubmitCmwRequestComponent
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
      this.cmwRequestForm = this.formBuilder.group({
      requestor: '',
      taxon_name: '',
      culture_number: '',
      date_requested: null,
      reference_number: '',
      notes: '',
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /*** This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof SubmitCmwRequestComponent
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
   * @memberof SubmitCmwRequestComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  setRequestor(event$){
    this.requestor = event$.option.value;
  }
  
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  SUBMIT CMW REQUEST FORM
  /**
   * This function will submit a CMW Request form based on the information provided in the form on the HTML page.
   * @memberof SubmitCmwRequestComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitCMWRequestForm(){
    if(this.cmwRequestForm.controls.requestor.value == null || this.cmwRequestForm.controls.requestor.value == ""){
      this.requestor = "";
    }
    else{
      this.requestor = this.cmwRequestForm.controls.requestor.value;
    }

    if(this.cmwRequestForm.controls.taxon_name.value == null || this.cmwRequestForm.controls.taxon_name.value == ""){
      this.taxonName = "";
    }
    else{
      this.taxonName = this.cmwRequestForm.controls.taxon_name.value;
    }

    if(this.cmwRequestForm.controls.culture_number.value == null || this.cmwRequestForm.controls.culture_number.value == ""){
      this.cultureNumber = "";
    }
    else{
      this.cultureNumber = this.cmwRequestForm.controls.culture_number.value;
    }

    var temp = (this.cmwRequestForm.controls.date_requested.value).toString();
    var year = temp[0] + temp[1] + temp[2] + temp[3];
    var month = temp[5] + temp[6];
    var day = temp[8] + temp[9];
    this.dateRequested = day + '/' + month + '/' + year;
    
    if(this.cmwRequestForm.controls.reference_number.value == null || this.cmwRequestForm.controls.reference_number.value == ""){
      this.referenceNumber = "";
    }
    else{
      this.referenceNumber = this.cmwRequestForm.controls.reference_number.value;
    }

    if(this.cmwRequestForm.controls.notes.value == null || this.cmwRequestForm.controls.notes.value == ""){
      this.notes = "";
    }
    else{
      this.notes = this.cmwRequestForm.controls.notes.value;
    }

    var date = new Date();
    var currentDate = ('0' + date.getDate()).slice(-2) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    var request: CMWRequest = {userID: this.currentUser.user.ID, requestor: this.requestor, taxonName: this.taxonName, 
        cultureNumber: this.cultureNumber, dateRequested: this.dateRequested, referenceNumber: this.referenceNumber, 
        notes: this.notes, dateSubmitted: currentDate};
    
    this.cultureCollectionService.submitCMWRequestForm(request).subscribe((response: any) => {
      if(response.success == true){
        //Successfully submitted form

        this.cmwRequestForm.reset();

        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("CMW Request form successfully submitted.", "Dismiss", {
          duration: 3000
        });
      }
      else{
        //Error handling

        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Could not submit CMW Request form. Please try again.", "Dismiss", {
          duration: 3000
        });
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      GET ALL STAFF
  /**
   *  This function will load of the FABI staff members and administrators into an array so that they can be selected when filling out
   *  the form to submit.
   * @memberof SubmitCmwRequestComponent
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
  //                                                              FILTER
  /**
   *  This function will filter the autocomplete results on the form.
   * @memberof SubmitCmwRequestComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.staff.filter(option => option.toLowerCase().includes(filterValue));
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      TOGGLE NOTIFICATIONS TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof SubmitCmwRequestComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab(){
    this.toggle_status = !this.toggle_status; 
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call loadNotifications() | 2. Call getAllStaff()
   * 
   * @memberof SubmitCmwRequestComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.currentUser = this.authService.getCurrentSessionValue.user;
    
    //Calling the neccessary functions as the page loads
    this.getAllStaff();
    this.filteredOptions = this.requestorControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
  }

}

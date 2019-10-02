/**
 * File Name: submit-cmw-deposit.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Staff\submit-cmw-deposit\submit-cmw-deposit.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, July 16th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, October 2nd 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NotificationLoggingService, UserLogs } from '../../_services/notification-logging.service';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserManagementAPIService, Member } from '../../_services/user-management-api.service';
import { CultureCollectionAPIService, CMWDeposit } from '../../_services/culture-collection-api.service';
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
  /** The date collected of the form -  @type {string} */
  dateCollected: string;
  /** The isolated by of the form -  @type {string} */
  isolatedBy: string;
  /** The identified by of the form -  @type {string} */
  identifiedBy: string;
  /** The donated by of the form -  @type {string} */
  donatedBy: string;
  /** The additional notes of the form -  @type {string} */
  additionalNotes: string;

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;

  /** The search collected the user is looking for in the form -  @type {string} */
  public searchCollected: string;
  /** The search isolated the user is looking for in the form -  @type {string} */
  public searchIsolated: string;
  /** The search identified the user is looking for in the form -  @type {string} */
  public searchIdentified: string;
  /** The search donated the user is looking for in the form -  @type {string} */
  public searchDonated: string;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of SubmitCmwDepositComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For making calls to the User Management API Service
   * @param {CultureCollectionAPIService} cultureCollectionService for making calls to the Culture Collection API Service
   * @param {NotificationLoggingAPIService} notificationLoggingService For calling the Notification Logging API service
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {AuthenticationService} authService Used for all authentication and session control
   * @param {FormBuilder} formBuilder Used to build the form from the HTML page
   * @param {Router} router
   * 
   * @memberof SubmitCmwDepositComponent
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


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof SubmitCmwDepositComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  SUBMIT CMW DEPOSIT FORM
  /**
   * This function will submit a CMW Deposit form based on the information provided in the form on the HTML page.
   * @memberof SubmitCmwDepositComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitCMWDepositForm(){
    if(this.cmwDepositForm.controls.cmw_culture_number.value == null || this.cmwDepositForm.controls.cmw_culture_number.value == ""){
      this.cmwCultureNumber = "N/A";
    }
    else{
      this.cmwCultureNumber = this.cmwDepositForm.controls.cmw_culture_number.value;
    }

    if(this.cmwDepositForm.controls.genus.value == null || this.cmwDepositForm.controls.genus.value == ""){
      this.genus = "N/A";
    }
    else{
      this.genus = this.cmwDepositForm.controls.genus.value;
    }

    if(this.cmwDepositForm.controls.epitheton.value == null || this.cmwDepositForm.controls.epitheton.value == ""){
      this.epitheton = "N/A";
    }
    else{
      this.epitheton = this.cmwDepositForm.controls.epitheton.value;
    }

    if(this.cmwDepositForm.controls.personal_collection_number.value == null || this.cmwDepositForm.controls.personal_collection_number.value == ""){
      this.personalCollectionNumber = "N/A";
    }
    else{
      this.personalCollectionNumber = this.cmwDepositForm.controls.personal_collection_number.value;
    }

    if(this.cmwDepositForm.controls.international_collection_number.value == null || this.cmwDepositForm.controls.international_collection_number.value == ""){
      this.internationalCollectionNumber = "N/A";
    }
    else{
      this.internationalCollectionNumber = this.cmwDepositForm.controls.international_collection_number.value;
    }

    if(this.cmwDepositForm.controls.herbarium_number.value == null || this.cmwDepositForm.controls.herbarium_number.value == ""){
      this.herbariumNumber = "N/A";
    }
    else{
      this.herbariumNumber = this.cmwDepositForm.controls.herbarium_number.value;
    }

    if(this.cmwDepositForm.controls.other_FABI_collections.value == null || this.cmwDepositForm.controls.other_FABI_collections.value == ""){
      this.otherFABICollections = "N/A";
    }
    else{
      this.otherFABICollections = this.cmwDepositForm.controls.other_FABI_collections.value;
    }

    if(this.cmwDepositForm.controls.name.value == null || this.cmwDepositForm.controls.name.value == ""){
      this.name = "N/A";
    }
    else{
      this.name = this.cmwDepositForm.controls.name.value;
    }

    if(this.cmwDepositForm.controls.type_status.value == null || this.cmwDepositForm.controls.type_status.value == ""){
      this.typeStatus = "N/A";
    }
    else{
      this.typeStatus = this.cmwDepositForm.controls.type_status.value;
    }

    if(this.cmwDepositForm.controls.host.value == null || this.cmwDepositForm.controls.host.value == ""){
      this.host = "N/A";
    }
    else{
      this.host = this.cmwDepositForm.controls.host.value;
    }

    if(this.cmwDepositForm.controls.vector.value == null || this.cmwDepositForm.controls.vector.value == ""){
      this.vector = "N/A";
    }
    else{
      this.vector = this.cmwDepositForm.controls.vector.value;
    }

    if(this.cmwDepositForm.controls.substrate.value == null || this.cmwDepositForm.controls.substrate.value == ""){
      this.substrate = "N/A";
    }
    else{
      this.substrate = this.cmwDepositForm.controls.substrate.value;
    }

    if(this.cmwDepositForm.controls.continent.value == null || this.cmwDepositForm.controls.continent.value == ""){
      this.continent = "N/A";
    }
    else{
      this.continent = this.cmwDepositForm.controls.continent.value;
    }

    if(this.cmwDepositForm.controls.country.value == null || this.cmwDepositForm.controls.country.value == ""){
      this.country = "N/A";
    }
    else{
      this.country = this.cmwDepositForm.controls.country.value;
    }

    if(this.cmwDepositForm.controls.region.value == null || this.cmwDepositForm.controls.region.value == ""){
      this.region = "N/A";
    }
    else{
      this.region = this.cmwDepositForm.controls.region.value;
    }

    if(this.cmwDepositForm.controls.locality.value == null || this.cmwDepositForm.controls.locality.value == ""){
      this.locality = "N/A";
    }
    else{
      this.locality = this.cmwDepositForm.controls.locality.value;
    }

    if(this.cmwDepositForm.controls.gps.value == null || this.cmwDepositForm.controls.gps.value == ""){
      this.gps = "N/A";
    }
    else{
      this.gps = this.cmwDepositForm.controls.gps.value;
    }

    if(this.cmwDepositForm.controls.collected_by.value == null || this.cmwDepositForm.controls.collected_by.value == ""){
      this.collectedBy = "N/A";
    }
    else{
      this.collectedBy = this.cmwDepositForm.controls.collected_by.value;
    }
      
    var temp = (this.cmwDepositForm.controls.date_collected.value).toString();
    var year = temp[0] + temp[1] + temp[2] + temp[3];
    var month = temp[5] + temp[6];
    var day = temp[8] + temp[9];
    this.dateCollected = day + '/' + month + '/' + year;

    if(this.cmwDepositForm.controls.isolated_by.value == null || this.cmwDepositForm.controls.isolated_by.value == ""){
      this.isolatedBy = "N/A";
    }
    else{
      this.isolatedBy = this.cmwDepositForm.controls.isolated_by.value;
    }

    if(this.cmwDepositForm.controls.identified_by.value == null || this.cmwDepositForm.controls.identified_by.value == ""){
      this.identifiedBy = "N/A";
    }
    else{
      this.identifiedBy = this.cmwDepositForm.controls.identified_by.value;
    }

    if(this.cmwDepositForm.controls.donated_by.value == null || this.cmwDepositForm.controls.donated_by.value == ""){
      this.donatedBy = "N/A";
    }
    else{
      this.donatedBy = this.cmwDepositForm.controls.donated_by.value;
    }

    if(this.cmwDepositForm.controls.additional_notes.value == null || this.cmwDepositForm.controls.additional_notes.value == ""){
      this.additionalNotes = "N/A";
    }
    else{
      this.additionalNotes = this.cmwDepositForm.controls.additional_notes.value;
    }

    var date = new Date();
    var currentDate = ('0' + date.getDate()).slice(-2) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    var deposit: CMWDeposit = {userID: this.currentUser.ID, cmwCultureNumber: this.cmwCultureNumber, genus: this.genus, epitheton: this.epitheton, personalCollectionNumber: this.personalCollectionNumber,
      internationalCollectionNumber: this.internationalCollectionNumber, herbariumNumber: this.herbariumNumber, otherFABICollections: this.otherFABICollections, name: this.name,
      typeStatus: this.typeStatus, host: this.host, vector: this.vector, substrate: this.substrate, continent: this.continent, country: this.country, region: this.region,
      locality: this.locality, gps: this.gps, collectedBy: this.collectedBy, dateCollected: this.dateCollected, isolatedBy: this.isolatedBy, identifiedBy: this.identifiedBy,
      donatedBy: this.donatedBy, additionalNotes: this.additionalNotes, dateSubmitted: currentDate, formID: ''};
 
    this.cultureCollectionService.submitCMWDepositForm(deposit).subscribe((response: any) => {
      if(response.success == true){
        //Successfully submitted deposit form
        this.cmwDepositForm.reset();

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
  //                                                      GET ALL STAFF
  /**
   *  This function will load of the FABI staff members and administrators into an array so that they can be selected when filling out
   *  the form to submit.
   * @memberof SubmitCmwDepositComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllStaff(){
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllFABIStaff().subscribe((response: any) => {
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
  //                                                  TOGGLE NOTIFICATIONS TAB
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
  //                                                         NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call getAllStaff()
   * 
   * @memberof SubmitCmwDepositComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.currentUser = this.authService.getCurrentSessionValue.user;
    
    //Calling the neccessary functions as the page loads
    this.getAllStaff();
  }

}

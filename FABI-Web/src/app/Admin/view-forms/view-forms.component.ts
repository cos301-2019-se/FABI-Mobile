/**
 * File Name: view-forms.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\view-forms\view-forms.component.ts
 * Project Name: fabi-web
 * Created Date: Monday, August 5th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Friday, August 9th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit, Renderer2, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

import { NotificationLoggingService, UserLogs, DatabaseManagementLogs, AccessLogs } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CultureCollectionAPIService, CMWDeposit, CMWRequest, CMWRevitalization } from '../../_services/culture-collection-api.service';

@Component({
  selector: 'app-view-forms',
  templateUrl: './view-forms.component.html',
  styleUrls: ['./view-forms.component.scss']
})
export class ViewFormsComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  /** Object array for holding all of the logs -  @type {any[]} */ 
  allNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {any[]} */ 
  newNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {string[]} */ 
  allLogs: string[] = [];

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

  /** Indicates if there are notifications to load - @type {boolean} */           
  notifications: boolean = true; 
  /** The number of the notifications - @type {number} */   
  localNotificationNumber : number = 1; 

  /** The user id of the user submitting the form - @type {string} */ 
  userIDDeposit: string; 
  /** The culture number - @type {string} */                         
  cmwCultureNumberDeposit: string;               
  /** The genus of the culture - @type {string} */ 
  genus: string;                          
  /** The epitheton of the culture - @type {string} */ 
  epitheton: string;                      
  /** The personal collection number (if any) - @type {string} */
  personalCollectionNumber: string;       
  /** The international collection number (if any) - @type {string} */
  internationalCollectionNumber: string;  
  /** The herbarium number of the culture - @type {string} */
  herbariumNumber: string;                
  /** Indicates if there are currently any other collections - @type {string} */
  otherFABICollections: string;           
  /** The name of the culture - @type {string} */
  name: string;                           
  /** The type status of the culture - @type {string} */
  typeStatus: string;                     
  /** The host of the culture - @type {string} */
  host: string;                           
  /** The vector of the culture - @type {string} */
  vector: string;                         
  /** The substrate of the culture - @type {string} */
  substrate: string;                      
  /** The continent where the culture originated from - @type {string} */
  continent: string;                      
  /** The country where the culture originated from - @type {string} */
  country: string;                        
  /** The region where the culture originated from - @type {string} */
  region: string;                         
  /** The locality of the culture - @type {string} */
  locality: string;                       
  /** The GPS coordinates of where the culture originated from - @type {string} */
  gps: string;                            
  /** The user who collected the culture - @type {string} */
  collectedBy: string;                    
  /** The date that the culture was collected - @type {string} */
  dateCollected: string;                  
  /** The user who isolated the culture - @type {string} */
  isolatedBy: string;                     
  /** The user who identified the culture - @type {string} */
  identifiedBy: string;                   
  /** The user who donated the culture (if any) - @type {string} */
  donatedBy: string;                      
  /** Any additional notes (if any) - @type {string} */
  additionalNotes: string;                
  /** The date that the form was submitted - @type {string} */
  dateSubmittedDeposit: string; 
  
  /** The user id of the user submitting the form - @type {string} */ 
  userIDRequest: string; 
  /** The culture number - @type {string} */                         
  cmwCultureNumberRequest: string; 
  /** The date that the form was submitted - @type {string} */
  dateSubmittedRequest: string;
  /** The taxon name of the culture - @type {string} */
  taxonName: string;
  /** The reference number - @type {string} */
  referenceNumberRequest: string;
  /** The date that the culture is requested for - @type {string} */
  dateRequestedRequest: string;
  /** Any notes (if any) - @type {string} */
  notes: string;

  /** The user id of the user submitting the form - @type {string} */ 
  userIDRevitalization: string; 
  /** The culture number - @type {string} */                         
  cmwCultureNumberRevitalization: string; 
  /** The date that the form was submitted - @type {string} */
  dateSubmittedRevitalization: string;
  /** The current name of the culture - @type {string} */
  currentName: string;
  /** The bionumeric name of the culture - @type {string} */
  nameBionumerics: string;
  /** The condition of the culture - @type {string} */
  cultureCondition: string;
  /** The sequence date submitted (if any) - @type {string} */
  sequenceDateSubmitted: string;
  /** The reference number - @type {string} */
  referenceNumberRevitalization: string;
  /** The date that the culture is requested for - @type {string} */
  dateRequestedRevitalization: string;
  /** The date that the culture was returned - @type {string} */
  dateReturned: string;
  
  /** The number of the deposit form currently displayed - @type {number} */
  depositFormNumber: number = 0; 
  /** The number of the request form currently displayed - @type {number} */
  requestFormNumber: number = 0; 
  /** The number of the revitalization form currently displayed - @type {number} */
  revitalizationFormNumber: number = 0;  

  /** An array holding all of the deposit forms - @type {CMWDeposit[]} */
  depositForms: CMWDeposit[] = [];
  /** An array holding all of the request forms - @type {CMWRequest[]} */
  requestForms: CMWRequest[] = []; 
  /** An array holding all of the revitalization forms - @type {CMWRevitalization[]} */
  revitalizationForms: CMWRevitalization[] = [];  

  /** The form to get the process form details -  @type {FormGroup} */
  processForm: FormGroup;

  /** Holds the input element (processFormShow) from the HTML page - @type {ElementRef} */
  @ViewChild("processFormShow") processFormShow : ElementRef;

  /** The name and surname of a user concatenated as a string - @type {string} */   
  user1: string;
  /** The name and surname of a user concatenated as a string - @type {string} */   
  user2: string;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of ReportingComponent.
   * 
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {CultureCollectionAPIService} cultureCollectionService For calling the Culture Collection API Service
   * @param {UserManagementAPIService} userManagementService For calling the User Management API Service
   * @param {AuthenticationService} authService Used for all authentication and session control
   * @param {Router} router
   * @param {FormBuilder} formBuilder Used to get the form elements from the HTML page
   * @param {Renderer2} renderer Used for creating the PDF documents to download
   * 
   * @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private notificationLoggingService: NotificationLoggingService, 
    private userManagementService: UserManagementAPIService,
    private renderer: Renderer2, 
    private formBuilder: FormBuilder,
    private authService: AuthenticationService, 
    private router: Router,
    private cultureCollectionService: CultureCollectionAPIService,
    private ref: ChangeDetectorRef
  ) { 
    this.processForm = this.formBuilder.group({
      statusOfCulture: '',
      agarSlants: '',
      water: '',
      oil: '',
      roomTemperature: '',
      c18: '',
      freezeDried: '',
      freeze: '',
      dateOfCollectionValidation: '',
      microscopeSlides: ''
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  GET_ALL_DEPOSIT_FROMS
  /**
   *  This function will be used to load all of the deposit forms into the HTML page
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllDepositForms(){
    //Making a call to the culture collection api service to load all of the deposit forms
    this.cultureCollectionService.getAllDepositLogs().subscribe((response: any) => {
      if(response.success == true){
        var data = response.data.qs.forms;

        for(var i = 0; i < data.length; i++){
          var tempDeposit: CMWDeposit = {userID: data[i].userID, cmwCultureNumber: data[i].cmwCultureNumber, genus: data[i].genus, epitheton: data[i].epitheton,
            personalCollectionNumber: data[i].personalCollectionNumber, internationalCollectionNumber: data[i].internationalCollectionNumber, herbariumNumber: data[i].herbariumNumber,
            otherFABICollections: data[i].otherFABICollections, name: data[i].name, typeStatus: data[i].typeStatus, host: data[i].host, vector: data[i].vector,
            substrate: data[i].substrate, continent: data[i].continent, country: data[i].country, region: data[i].region, locality: data[i].locality, 
            gps: data[i].gps, collectedBy: data[i].collectedBy, dateCollected: data[i].dateCollected, isolatedBy: data[i].isolatedBy, identifiedBy: data[i].identifiedBy,
            donatedBy: data[i].donatedBy, additionalNotes: data[i].additionalNotes, dateSubmitted: data[i].dateSubmitted};
          

          if(data[i].status == 'submitted'){
            this.depositForms.push(tempDeposit);
          }
        }

        this.depositFormNumber = 0;
        this.loadNextDepositForm();
      }
      else{
        //Error handling
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  GET_ALL_REQUEST_FROMS
  /**
   *  This function will be used to load all of the request forms into the HTML page
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllRequestForms(){
    //Making a call to the culture collection api service to load all of the request forms
    this.cultureCollectionService.getAllRequestLogs().subscribe((response: any) => {
      if(response.success == true){
        var data = response.data.qs.forms;

        for(var i = 0; i < data.length; i++){
          var tempRequest: CMWRequest = {userID: data[i].userID, requestor: data[i].requestor, taxonName: data[i].taxonName, cultureNumber: data[i].cultureNumber,
            dateRequested: data[i].dateRequested, referenceNumber: data[i].referenceNumber, notes: data[i].notes, dateSubmitted: data[i].dateSubmitted};

          this.requestForms.push(tempRequest);
        }

        this.requestFormNumber = 0;
        this.loadNextRequestForm();
      }
      else{
        //Error handling
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  GET_ALL_REVITALIZATION_FROMS
  /**
   *  This function will be used to load all of the revitalization forms into the HTML page
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllRevitalizationForms(){
    //Making a call to the culture collection api service to load all of the revitalization forms
    this.cultureCollectionService.getAllRequestLogs().subscribe((response: any) => {
      if(response.success == true){
        var data = response.data.qs.forms;

        for(var i = 0; i < data.length; i++){
          var tempRevitalization: CMWRevitalization = {userID: data[i].userID, requestor: data[i].requestor, currentName: data[i].currentName, 
            cultureNumber: data[i].cultureNumber, nameBionumerics: data[i].nameBionumerics, cultureCondition: data[i].cultureCondition, sequenceDateSubmitted: data[i].sequenceDateSubmitted,
            dateRequested: data[i].dateRequested, referenceNumber: data[i].referenceNumber, dateReturned: data[i].dateReturned, dateSubmitted: data[i].dateSubmitted};

          this.revitalizationForms.push(tempRevitalization);
        }

        this.revitalizationFormNumber = 0;
        this.loadNextRevitalizationForm();
      }
      else{
        //Error handling
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_NEXT_DEPOSIT_FORM
  /**
   *  This function will be used to load the individual deposit forms
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNextDepositForm(){    
    if(this.depositFormNumber != 0){
      if(this.depositFormNumber == this.depositForms.length - 1){
        this.depositFormNumber = 0;
      }
      else if(this.depositFormNumber == this.depositForms.length){
        this.depositFormNumber = 0;
      }
      else{
        this.depositFormNumber += 1;
      }
    }

    var tempDeposit = this.depositForms[this.depositFormNumber];

    this.loadUserDetailsDeposit("FABI", tempDeposit.userID);
    this.cmwCultureNumberDeposit = tempDeposit.cmwCultureNumber;
    this.genus = tempDeposit.genus;
    this.epitheton = tempDeposit.epitheton;
    this.personalCollectionNumber = tempDeposit.personalCollectionNumber;
    this.internationalCollectionNumber = tempDeposit.internationalCollectionNumber;
    this.herbariumNumber = tempDeposit.herbariumNumber;
    this.otherFABICollections = tempDeposit.otherFABICollections;
    this.name = tempDeposit.name;
    this.typeStatus = tempDeposit.typeStatus;
    this.host = tempDeposit.host;
    this.vector = tempDeposit.vector;
    this.substrate = tempDeposit.substrate;
    this.continent = tempDeposit.continent;
    this.country = tempDeposit.country;
    this.region = tempDeposit.region;
    this.locality = tempDeposit.locality;
    this.gps = tempDeposit.gps;
    this.collectedBy = tempDeposit.collectedBy;
    this.dateCollected = tempDeposit.dateCollected;
    this.isolatedBy = tempDeposit.isolatedBy;
    this.identifiedBy = tempDeposit.identifiedBy;
    this.donatedBy = tempDeposit.donatedBy;
    this.additionalNotes = tempDeposit.additionalNotes;
    this.dateSubmittedDeposit = tempDeposit.dateSubmitted;

    if(this.depositFormNumber == 0){
      this.depositFormNumber += 1;
    }

    this.ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 100);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_PREVIOUS_DEPOSIT_FORM
  /**
   *  This function will be used to load the individual deposit forms
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadPreviousDepositForm(){
    if(this.depositFormNumber != this.depositForms.length){
      if(this.depositFormNumber <= 0){
        this.depositFormNumber = this.depositForms.length - 1;
      }
      else{
        this.depositFormNumber -= 1;
      }
    }

    var tempDeposit = this.depositForms[this.depositFormNumber];

    this.loadUserDetailsDeposit("FABI", tempDeposit.userID);
    this.cmwCultureNumberDeposit = tempDeposit.cmwCultureNumber;
    this.genus = tempDeposit.genus;
    this.epitheton = tempDeposit.epitheton;
    this.personalCollectionNumber = tempDeposit.personalCollectionNumber;
    this.internationalCollectionNumber = tempDeposit.internationalCollectionNumber;
    this.herbariumNumber = tempDeposit.herbariumNumber;
    this.otherFABICollections = tempDeposit.otherFABICollections;
    this.name = tempDeposit.name;
    this.typeStatus = tempDeposit.typeStatus;
    this.host = tempDeposit.host;
    this.vector = tempDeposit.vector;
    this.substrate = tempDeposit.substrate;
    this.continent = tempDeposit.continent;
    this.country = tempDeposit.country;
    this.region = tempDeposit.region;
    this.locality = tempDeposit.locality;
    this.gps = tempDeposit.gps;
    this.collectedBy = tempDeposit.collectedBy;
    this.dateCollected = tempDeposit.dateCollected;
    this.isolatedBy = tempDeposit.isolatedBy;
    this.identifiedBy = tempDeposit.identifiedBy;
    this.donatedBy = tempDeposit.donatedBy;
    this.additionalNotes = tempDeposit.additionalNotes;
    this.dateSubmittedDeposit = tempDeposit.dateSubmitted;

    if(this.depositFormNumber == this.depositForms.length){
      this.depositFormNumber -= 1;
    }

    this.ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 100);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_NEXT_REQUEST_FORM
  /**
   *  This function will be used to load the individual request forms
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNextRequestForm(){
    if(this.requestFormNumber != 0){
      if(this.requestFormNumber == this.requestForms.length - 1){
        this.requestFormNumber = 0;
      }
      else if(this.requestFormNumber == this.requestForms.length){
        this.requestFormNumber = 0;
      }
      else{
        this.requestFormNumber += 1;
      }
    }

    var tempRequest = this.requestForms[this.requestFormNumber];

    this.loadUserDetailsRequest("FABI", tempRequest.userID);
    this.cmwCultureNumberRequest = tempRequest.cultureNumber;
    this.taxonName = tempRequest.taxonName;
    this.referenceNumberRequest = tempRequest.referenceNumber;
    this.dateRequestedRequest = tempRequest.dateRequested;
    this.notes = tempRequest.notes;
    this.dateSubmittedRequest = tempRequest.dateSubmitted;

    if(this.requestFormNumber == 0){
      this.requestFormNumber += 1;
    }

    this.ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 100);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_PREVIOUS_REQUEST_FORM
  /**
   *  This function will be used to load the individual request forms
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadPreviousRequestForm(){
    if(this.requestFormNumber != this.requestForms.length){
      if(this.requestFormNumber == 0){
        this.requestFormNumber = this.requestForms.length - 1;
      }
      else{
        this.requestFormNumber -= 1;
      }
    }

    var tempRequest = this.requestForms[this.requestFormNumber];

    this.loadUserDetailsRequest("FABI", tempRequest.userID);
    this.cmwCultureNumberRequest = tempRequest.cultureNumber;
    this.taxonName = tempRequest.taxonName;
    this.referenceNumberRequest = tempRequest.referenceNumber;
    this.dateRequestedRequest = tempRequest.dateRequested;
    this.notes = tempRequest.notes;
    this.dateSubmittedRequest = tempRequest.dateSubmitted;

    if(this.requestFormNumber == this.requestForms.length){
      this.requestFormNumber -= 1;
    }

    this.ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 100);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_NEXT_REVITALIZATION_FORM
  /**
   *  This function will be used to load the individual revitalization forms
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNextRevitalizationForm(){
    if(this.revitalizationFormNumber != 0){
      if(this.revitalizationFormNumber == this.revitalizationForms.length - 1){
        this.revitalizationFormNumber = 0;
      }
      else if(this.revitalizationFormNumber == this.revitalizationForms.length){
        this.revitalizationFormNumber = 0;
      }
      else{
        this.revitalizationFormNumber += 1;
      }
    }

    var tempRevitalization = this.revitalizationForms[this.revitalizationFormNumber];

    this.loadUserDetailsRevitalization("FABI", tempRevitalization.userID);
    this.cmwCultureNumberRequest = tempRevitalization.cultureNumber;
    this.currentName = tempRevitalization.currentName;
    this.referenceNumberRevitalization = tempRevitalization.referenceNumber;
    this.dateRequestedRevitalization = tempRevitalization.dateRequested;
    this.nameBionumerics = tempRevitalization.nameBionumerics;
    this.cultureCondition = tempRevitalization.cultureCondition;
    this.sequenceDateSubmitted = tempRevitalization.sequenceDateSubmitted;
    this.dateReturned = tempRevitalization.dateReturned;
    this.dateSubmittedRevitalization = tempRevitalization.dateSubmitted;

    if(this.revitalizationFormNumber == 0){
      this.revitalizationFormNumber += 1;
    }

    this.ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 100);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_PREVIOUS_REVITALIZATION_FORM
  /**
   *  This function will be used to load the individual revitalization forms
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadPreviousRevitalizationForm(){
    if(this.revitalizationFormNumber != this.revitalizationForms.length){
      if(this.revitalizationFormNumber == 0){
        this.revitalizationFormNumber = this.revitalizationForms.length - 1;
      }
      else{
        this.revitalizationFormNumber -= 1;
      }
    }

    var tempRevitalization = this.revitalizationForms[this.revitalizationFormNumber];

    this.loadUserDetailsRevitalization("FABI", tempRevitalization.userID);
    this.cmwCultureNumberRequest = tempRevitalization.cultureNumber;
    this.currentName = tempRevitalization.currentName;
    this.referenceNumberRevitalization = tempRevitalization.referenceNumber;
    this.dateRequestedRevitalization = tempRevitalization.dateRequested;
    this.nameBionumerics = tempRevitalization.nameBionumerics;
    this.cultureCondition = tempRevitalization.cultureCondition;
    this.sequenceDateSubmitted = tempRevitalization.sequenceDateSubmitted;
    this.dateReturned = tempRevitalization.dateReturned;
    this.dateSubmittedRevitalization = tempRevitalization.dateSubmitted;

    if(this.revitalizationFormNumber == this.revitalizationForms.length){
      this.revitalizationFormNumber -= 1;
    }

    this.ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 100);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_USER_DETAILS_DEPOSIT
  /**
   *  This function will be called so that the information of a specific user can be fetched
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetailsDeposit(userOrganization: string, userID: string) {
    //Making a call to the User Management API Service to retrieve a specific users details
    this.userManagementService.getUserDetails(userOrganization, userID).subscribe((response: any) => {
      if(response.success == true){
        //Temporarily holds the data returned from the API call
        const data = response.data;

        //Returns the users name and surname as a connected string
        this.userIDDeposit = data.fname + ' ' + data.surname;
      } 
      else{
        //Error control
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_USER_DETAILS_REQUEST
  /**
   *  This function will be called so that the information of a specific user can be fetched
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetailsRequest(userOrganization: string, userID: string) {
    //Making a call to the User Management API Service to retrieve a specific users details
    this.userManagementService.getUserDetails(userOrganization, userID).subscribe((response: any) => {
      if(response.success == true){
        //Temporarily holds the data returned from the API call
        const data = response.data;

        //Returns the users name and surname as a connected string
        this.userIDRequest = data.fname + ' ' + data.surname;
      } 
      else{
        //Error control
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_USER_DETAILS_REVITALIZATION
  /**
   *  This function will be called so that the information of a specific user can be fetched
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetailsRevitalization(userOrganization: string, userID: string) {
    //Making a call to the User Management API Service to retrieve a specific users details
    this.userManagementService.getUserDetails(userOrganization, userID).subscribe((response: any) => {
      if(response.success == true){
        //Temporarily holds the data returned from the API call
        const data = response.data;

        //Returns the users name and surname as a connected string
        this.userIDRevitalization = data.fname + ' ' + data.surname;
      } 
      else{
        //Error control
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_USER_DETAILS
  /**
   *  This function will be called so that the information of a specific user can be fetched
   *  @memberof ViewFormsComponent
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
  //                                                  SHOW_PROCESS_FORM
  /**
   *  This function will be called so that the process form can be displayed
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  showProcessForm(){
    this.renderer.setStyle(this.processFormShow.nativeElement, 'display', 'block');
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  PROCESS_DEPOSIT_FORM
  /**
   *  This function will be called so that a deposit form can be processed and its status updated
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  processDepositForm(){
    var statusOfCulture = this.processForm.controls.statusOfCulture.value;
    var agarSlants = this.processForm.controls.agarSlants.value;
    var water = this.processForm.controls.water.value;
    var oil = this.processForm.controls.oil.value;
    var roomTemperature = this.processForm.controls.roomTemperature.value;
    var c18 = this.processForm.controls.c18.value;
    var freezeDried = this.processForm.controls.freezeDried.value;
    var freeze = this.processForm.controls.freeze.value;
    var dateOfCollectionValidation = this.processForm.controls.dateOfCollectionValidation.value;
    var microscopeSlides = this.processForm.controls.microscopeSlides.value;

    var tempDeposit = this.depositForms[this.depositFormNumber];

    // this.loadNextDepositForm();
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET_DATE
  /**
   *  This function will put the string date provided into a more readable format for the notifications
   * @param {string} date The date of the log
   * @memberof ViewFormsComponent
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
  //                                           TOGGLE_NOTIFICATIONS_TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab(){
    this.toggle_status = !this.toggle_status; 
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       LOAD_LOGS
  /**
   *  This function will load all of the user's logs into a string array.
   * 
   * @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadLogs(){
    //Making a call to the notification logging service to return all logs belonging to the user
    this.notificationLoggingService.getUserLogs(localStorage.getItem('userID')).subscribe((response: any) => {
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
  //                                                       LOAD_NOTIFICATIONS
  /**
   *  This function will load the admin's notifications into the notification section on the HTML page
   * 
   * @memberof ViewFormsComponent
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
              this.loadUserDetails1(tempLogU.Organization1, tempLogU.Details);

              if(tempLogU.Action == "/createOrganization"){
                tempLogU.Action = "New organization " + tempLogU.User + " was added to the system by " + this.user1;
              }
              else if(tempLogU.Action == "/addStaff"){
                this.loadUserDetails2(tempLogU.Organization2, tempLogU.User);
                tempLogU.Action = "New user, " + this.user2 + ", was added to the system by " + this.user1;
              }
              else if(tempLogU.Action == "/removeOrg"){
                tempLogU.Action = "Organization " + tempLogU.User + " was removed from the system by " + this.user1;
              }
              else if(tempLogU.Action == "/removeStaff"){
                this.loadUserDetails2(tempLogU.Organization2, tempLogU.User);
                tempLogU.Action = "New user, " + this.user2 + ", was removed from the system by " + this.user1;
              }
  
              this.allNotifications.push(tempLogU);
              this.localNotificationNumber += 1;
            }
          }          
        }
      }
      else{
        //Error handling
      }
    });

    //Making a call too the notification logging service to return all DBML logs
    this.notificationLoggingService.getAllDatabaseManagementLogs().subscribe((response: any) => {
      if(response.success == true){
        //Temporarily holds the data returned from the API call
        const data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          for(var j = 0; j < this.allLogs.length; j++){
            if(data[i].date == this.allLogs[j]){
              //A temporary instance of DatabaseManagementLogs that will be added to the allNotifications array
              var tempLogD: DatabaseManagementLogs = {LogID: data[i].date, Type: 'DBML', Action: data[i].action, Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, Organization1: data[i].org1, Organization2: data[i].org2, MoreInfo: data[i].moreInfo, ID: this.localNotificationNumber}

              //Getting the name and surname of the users passed using their id numbers
              this.loadUserDetails1(tempLogD.Organization1, tempLogD.User);

              if(tempLogD.Action == "/createDatabase"){
                tempLogD.Action = "New database, " + tempLogD.Details + ", was added to the system by " + this.user1;
              }
              else if(tempLogD.Action == "/porting"){
                tempLogD.Action = tempLogD.Details + " was ported";
              }
              else if(tempLogD.Action == "C"){
                tempLogD.Action = "New database, " + tempLogD.Details + ", was added to the system by " + this.user1;
              }

              this.allNotifications.push(tempLogD);
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
  //                                                  LOAD_USER_DETAILS1
  /**
   *  This function will be called so that the information of a specific user can be fetched
   * 
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails1(userOrganization: string, userID: string) {
    //Making a call to the User Management API Service to retrieve a specific users details
    this.userManagementService.getUserDetails(userOrganization, userID).subscribe((response: any) => {
      if(response.success == true){
        //Temporarily holds the data returned from the API call
        const data = response.data;

        //Returns the users name and surname as a connected string
        this.user1 = data.fname + ' ' + data.surname;
      } 
      else{
        //Error control
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_USER_DETAILS2
  /**
   *  This function will be called so that the information of a specific user can be fetched
   * 
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails2(userOrganization: string, userID: string) {
    //Making a call to the User Management API Service to retrieve a specific users details
    this.userManagementService.getUserDetails(userOrganization, userID).subscribe((response: any) => {
      if(response.success == true){
        //Temporarily holds the data returned from the API call
        const data = response.data;

        //Returns the users name and surname as a connected string
        this.user2 = data.fname + ' ' + data.surname;
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
   * @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeNotification(id: string){
    for(var i =  0; i < this.allNotifications.length; i++){
      if(this.allNotifications[i].ID == id){
        this.newNotifications.push(this.allNotifications[i]);
      }
    }

    this.notificationLoggingService.updateFABIMemberNotifications(localStorage.getItem('userID'), this.newNotifications).subscribe((response: any) => {
      if(response.success == true){
        this.loadNotifications();
      }
      else{
        //Error handling
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    NG_ON_INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call loadNotifications() | 2. Call loadDepositForms() | 3. Call getAllRequestForms() |
   *              4. Call getAllRevitalizationForms()
   * 
   * @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    //Calling the neccessary functions as the page loads
    this.loadNotifications();
    this.getAllDepositForms();
    this.getAllRequestForms();
    this.getAllRevitalizationForms();
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }
}

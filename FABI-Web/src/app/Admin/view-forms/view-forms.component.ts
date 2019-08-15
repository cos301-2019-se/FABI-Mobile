/**
 * File Name: view-forms.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\view-forms\view-forms.component.ts
 * Project Name: fabi-web
 * Created Date: Monday, August 5th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 15th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit, Renderer2, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NotificationLoggingService, UserLogs, DatabaseManagementLogs, AccessLogs } from '../../_services/notification-logging.service';
import { UserManagementAPIService, Member } from '../../_services/user-management-api.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CultureCollectionAPIService, CMWDeposit, CMWRequest, CMWRevitalization, ProcessedForm, UpdateDepositForm } from '../../_services/culture-collection-api.service';

@Component({
  selector: 'app-view-forms',
  templateUrl: './view-forms.component.html',
  styleUrls: ['./view-forms.component.scss']
})
export class ViewFormsComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

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
  /** The id number of the deposit form - @type {string} */
  formID: string;
  
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
  /** The number of the processed form currently displayed - @type {number} */
  processedFormNumber: number = 0; 

  /** An array holding all of the deposit forms - @type {CMWDeposit[]} */
  depositForms: CMWDeposit[] = [];
  /** An array holding all of the request forms - @type {CMWRequest[]} */
  requestForms: CMWRequest[] = []; 
  /** An array holding all of the revitalization forms - @type {CMWRevitalization[]} */
  revitalizationForms: CMWRevitalization[] = []; 
  /** An array holding all of the processed forms - @type {ProcessedForm[]} */
  processedForms: ProcessedForm[] = []; 

  /** The form to get the process form details -  @type {FormGroup} */
  processForm: FormGroup;

  /** Holds the input element (processFormShow) from the HTML page - @type {ElementRef} */
  @ViewChild("processFormShow") processFormShow : ElementRef;
  /** Holds the input element (associatedDepositForm) from the HTML page - @type {ElementRef} */
  @ViewChild("associatedDepositForm") associatedDepositForm : ElementRef;

  /** The user id in the deposit process form - @type {string} */   
  userIDProcessed: string;
  /** The status of the culture in the deposit process form - @type {string} */   
  statusOfCulture: string;
  /** The agar slants in the deposit process form - @type {string} */   
  agarSlants: string;
  /** The water in the deposit process form - @type {string} */   
  water: string;
  /** The oil in the deposit process form - @type {string} */   
  oil: string;
  /** The room temperature in the deposit process form - @type {string} */   
  roomTemperature: string;
  /** The c18 in the deposit process form - @type {string} */   
  c18: string;
  /** The freeze dried in the deposit process form - @type {string} */   
  freezeDried: string;
  /** The freeze in the deposit process form - @type {string} */   
  freeze: string;
  /** The date of the collection validation in the deposit process form - @type {string} */   
  dateOfCollectionValidation: string;
  /** The microscope slide in the deposit process form - @type {string} */   
  microscopeSlides: string;
  /** The date submitted in the deposit process form - @type {string} */   
  dateSubmittedProcessedForm: string;
  /** The culture number in the deposit process form - @type {string} */   
  cmwCultureNumberProcessed: string;

  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;

  /** Object array for holding the staff members -  @type {Member[]} */                        
  staff: Member[] = []; 

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

  /** Indicates if the deposit forms tab is hidden/shown - @type {boolean} */  
  depositFormTab: boolean = false;
  /** Indicates if the request forms tab is hidden/shown - @type {boolean} */  
  requestFormTab: boolean = false;
  /** Indicates if the revitalization forms tab is hidden/shown - @type {boolean} */  
  revitalizationFormTab: boolean = false;
  /** Indicates if the processed forms tab is hidden/shown - @type {boolean} */  
  processedFormTab: boolean = false;


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
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {FormBuilder} formBuilder Used to get the form elements from the HTML page
   * @param {Renderer2} renderer Used for creating the PDF documents to download
   * 
   * @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private notificationLoggingService: NotificationLoggingService, 
    private userManagementService: UserManagementAPIService,
    private snackBar: MatSnackBar,
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
  //                                                    GET ALL STAFF
  /**
   *  This function will be used to get all the staff members of FABI and load them into an array
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllStaff(){
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllFABIMembers().subscribe((response: any) => {
     if(response.success == true){
       //Temporary array to hold the array of admins retuned from the API call
       var data = response.data.qs.admins;
       for(var i = 0; i < data.length; i++){
         var tempMember : Member = {Email: data[i].email, Name: data[i].fname, Surname: data[i].surname, ID: data[i].id};
         this.staff.push(tempMember);
       }
      
       //Temporary array to hold the array of staff returned from the API call
       var data = response.data.qs.staff;
       for(var i = 0; i < data.length; i++){
         var tempMember : Member = {Email: data[i].email, Name: data[i].fname, Surname: data[i].surname, ID: data[i].id};
         this.staff.push(tempMember);
       }
     }
     else{
       //Error handling
       }
   });
 }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  GET ALL DEPOSIT FROMS
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
            donatedBy: data[i].donatedBy, additionalNotes: data[i].additionalNotes, dateSubmitted: data[i].dateSubmitted, formID: data[i].id};
          

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
  //                                                  GET ALL REQUEST FROMS
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
  //                                                  GET ALL REVITALIZATION FROMS
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
  //                                                  GET ALL PROCESSED FROMS
  /**
   *  This function will be used to load all of the processed forms into the HTML page
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllProcessedForms(){
    //Making a call to the culture collection api service to load all of the processed forms
    this.cultureCollectionService.getAllProcessedLogs().subscribe((response: any) => {
      if(response.success == true){
        var data = response.data.qs.forms;

        for(var i = 0; i < data.length; i++){
          var tempProcessed: ProcessedForm = {userID: data[i].userID, statusOfCulture: data[i].statusOfCulture, agarSlants: data[i].agarSlants,
            water: data[i].water, oil: data[i].oil, roomTemperature: data[i].roomTemperature, c18: data[i].c18, freezeDried: data[i].freezeDried,
            freeze: data[i].freeze, dateOfCollectionValidation: data[i].dateOfCollectionValidation, microscopeSlides: data[i].microscopeSlides,
            dateSubmittedProcessedForm: data[i].dateSubmittedProcessedForm, cultureCollectionNumber: data[i].cultureCollectionNumber};

          this.processedForms.push(tempProcessed);
        }

        this.processedFormNumber = 0;
        this.loadNextProcessedForm();
      }
      else{
        //Error handling
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD NEXT DEPOSIT FORM
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

    this.loadUserDetails(tempDeposit.userID, 'deposit');
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
    this.formID = tempDeposit.formID;

    if(this.depositFormNumber == 0){
      this.depositFormNumber += 1;
    }

    this.ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 100);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD PREVIOUS DEPOSIT FORM
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

    this.loadUserDetails(tempDeposit.userID, 'deposit');
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
    this.formID = tempDeposit.formID;

    if(this.depositFormNumber == this.depositForms.length){
      this.depositFormNumber -= 1;
    }

    this.ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 100);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        LOAD NEXT REQUEST FORM
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

    this.loadUserDetails(tempRequest.userID, 'request');
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
  //                                                    LOAD PREVIOUS REQUEST FORM
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

    this.loadUserDetails(tempRequest.userID, 'request');
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
  //                                                    LOAD NEXT REVITALIZATION FORM
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

    this.loadUserDetails(tempRevitalization.userID, 'revitalization');
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
  //                                                    LOAD PREVIOUS REVITALIZATION FORM
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

    this.loadUserDetails(tempRevitalization.userID, 'revitalization');
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
  //                                                          LOAD NEXT PROCESSED FORM
  /**
   *  This function will be used to load the individual processed forms
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNextProcessedForm(){
    if(this.processedFormNumber != 0){
      if(this.processedFormNumber == this.processedForms.length - 1){
        this.processedFormNumber = 0;
      }
      else if(this.processedFormNumber == this.processedForms.length){
        this.processedFormNumber = 0;
      }
      else{
        this.processedFormNumber += 1;
      }
    }

    var tempProcessed = this.processedForms[this.processedFormNumber];

    this.loadUserDetails(tempProcessed.userID, 'processed');
    this.statusOfCulture = tempProcessed.statusOfCulture;
    this.agarSlants = tempProcessed.agarSlants;
    this.water = tempProcessed.water;
    this.oil = tempProcessed.oil;
    this.roomTemperature = tempProcessed.roomTemperature;
    this.c18 = tempProcessed.c18;
    this.freezeDried = tempProcessed.freezeDried;
    this.freeze = tempProcessed.freeze;
    this.dateOfCollectionValidation = tempProcessed.dateOfCollectionValidation;
    this.microscopeSlides = tempProcessed.microscopeSlides;
    this.dateSubmittedProcessedForm = tempProcessed.dateSubmittedProcessedForm;
    this.cmwCultureNumberProcessed = tempProcessed.cultureCollectionNumber;

    if(this.processedFormNumber == 0){
      this.processedFormNumber += 1;
    }

    this.ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 100);

    this.loadNextDepositForm();
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    LOAD PREVIOUS PROCESSED FORM
  /**
   *  This function will be used to load the individual processed forms
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadPreviousProcessedForm(){
    if(this.processedFormNumber != this.processedForms.length){
      if(this.processedFormNumber == 0){
        this.processedFormNumber = this.processedForms.length - 1;
      }
      else{
        this.processedFormNumber -= 1;
      }
    }

    var tempProcessed = this.processedForms[this.processedFormNumber];

    this.loadUserDetails(tempProcessed.userID, 'processed');
    this.statusOfCulture = tempProcessed.statusOfCulture;
    this.agarSlants = tempProcessed.agarSlants;
    this.water = tempProcessed.water;
    this.oil = tempProcessed.oil;
    this.roomTemperature = tempProcessed.roomTemperature;
    this.c18 = tempProcessed.c18;
    this.freezeDried = tempProcessed.freezeDried;
    this.freeze = tempProcessed.freeze;
    this.dateOfCollectionValidation = tempProcessed.dateOfCollectionValidation;
    this.microscopeSlides = tempProcessed.microscopeSlides;
    this.dateSubmittedProcessedForm = tempProcessed.dateSubmittedProcessedForm;
    this.cmwCultureNumberProcessed = tempProcessed.cultureCollectionNumber;

    if(this.processedFormNumber == this.processedForms.length){
      this.processedFormNumber -= 1;
    }

    this.ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 100);

    this.loadPreviousDepositForm();
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                   LOAD USER DETAILS
  /**
   *  This function will be called so that the information of a specific user can be fetched
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails(userID: string, type: string) {
    var person = '';

    for(var i = 0; i < this.staff.length; i++){
      if(this.staff[i].ID == userID){
        person = this.staff[i].Name + ' ' + this.staff[i].Surname;
      }
    }

    if(type == 'deposit'){
      this.userIDDeposit = person;
    }
    else if(type == 'request'){
      this.userIDRequest = person;
    }
    else if(type == 'revitalization'){
      this.userIDRevitalization = person;
    }
    else if(type == 'processed'){
      this.userIDProcessed = person;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SHOW PROCESS FORM
  /**
   *  This function will be called so that the process form can be displayed
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  showProcessForm(){
    this.renderer.setStyle(this.processFormShow.nativeElement, 'display', 'block');
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  VIEW ASSOCIATED DEPOSIT FORM
  /**
   *  This function will be called so that the deposit form associated with the process form on the screen, can be displayed.
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  viewAssociatedDepositForm(){
    this.renderer.setStyle(this.associatedDepositForm.nativeElement, 'display', 'block');
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  HIDE ASSOCIATED DEPOSIT FORM
  /**
   *  This function will be called so that the deposit form associated with the process form on the screen, can be hidden.
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  hideAssociatedDepositForm(){
    this.renderer.setStyle(this.associatedDepositForm.nativeElement, 'display', 'none');
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        TOGGLE NOTIFICATIONS TAB
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    PROCESS DEPOSIT PROCESSED FORM 
  /**
   * This function is used to submit details about a deposit form that has been processed.
   * 
   * @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  processDepositProcessedForm(){
    this.userIDProcessed = this.currentUser.user.ID;
    this.cmwCultureNumberProcessed = this.cmwCultureNumberDeposit;

    if(this.processForm.controls.statusOfCulture.value == "" || this.processForm.controls.statusOfCulture.value == null){
      this.statusOfCulture = "";
    }
    else{
      this.statusOfCulture = this.processForm.controls.statusOfCulture.value;
    }

    if(this.processForm.controls.agarSlants.value == "" || this.processForm.controls.agarSlants.value == null){
      this.agarSlants = "";
    }
    else{
      this.agarSlants = this.processForm.controls.agarSlants.value;
    }

    if(this.processForm.controls.water.value == "" || this.processForm.controls.water.value == null){
      this.water = "";
    }
    else{
      this.water = this.processForm.controls.water.value;
    }

    if(this.processForm.controls.oil.value == "" || this.processForm.controls.oil.value == null){
      this.oil = "";
    }
    else{
      this.oil = this.processForm.controls.oil.value;
    }

    if(this.processForm.controls.roomTemperature.value == "" || this.processForm.controls.roomTemperature.value == null){
      this.roomTemperature = "";
    }
    else{
      this.roomTemperature = this.processForm.controls.roomTemperature.value;
    }

    if(this.processForm.controls.c18.value == "" || this.processForm.controls.c18.value == null){
      this.c18 = "";
    }
    else{
      this.c18 = this.processForm.controls.c18.value;
    }

    if(this.processForm.controls.freezeDried.value == "" || this.processForm.controls.freezeDried.value == null){
      this.freezeDried = "";
    }
    else{
      this.freezeDried = this.processForm.controls.freezeDried.value;
    }

    if(this.processForm.controls.freeze.value == "" || this.processForm.controls.freeze.value == null){
      this.freeze = "";
    }
    else{
      this.freeze = this.processForm.controls.freeze.value;
    }

    var temp = (this.processForm.controls.dateOfCollectionValidation.value).toString();
    var year = temp[0] + temp[1] + temp[2] + temp[3];
    var month = temp[5] + temp[6];
    var day = temp[8] + temp[9];
    this.dateOfCollectionValidation = day + '/' + month + '/' + year;

    if(this.processForm.controls.microscopeSlides.value == "" || this.processForm.controls.microscopeSlides.value == null){
      this.microscopeSlides = "";
    }
    else{
      this.microscopeSlides = this.processForm.controls.microscopeSlides.value;
    }

    var date = new Date();
    var currentDate = ('0' + date.getDate()).slice(-2) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    this.dateSubmittedProcessedForm = currentDate;

    var tempProcessedForm: ProcessedForm = {userID: this.currentUser.user.ID, statusOfCulture: this.statusOfCulture, agarSlants: this.agarSlants, water: this.water,
      oil: this.oil, roomTemperature: this.roomTemperature, c18: this.c18, freezeDried: this.freezeDried, freeze: this.freeze,
      dateOfCollectionValidation: this.dateOfCollectionValidation, microscopeSlides: this.microscopeSlides, dateSubmittedProcessedForm: this.dateSubmittedProcessedForm,
      cultureCollectionNumber: this.cmwCultureNumberDeposit};

    this.cultureCollectionService.submitProcessedForm(tempProcessedForm).subscribe((response: any) => {
      if(response.success == true){
        var tempUpdate: UpdateDepositForm = {userID: this.currentUser.user.ID, status: 'processed', formID: this.formID};

        this.cultureCollectionService.updateDepositFormStatus(tempUpdate).subscribe((response: any) => {
          if(response.success == true){
            //Successfully submitted process form
            this.processForm.reset();

            //POPUP MESSAGE
            let snackBarRef = this.snackBar.open("CMW Deposit process form successfully submitted.", "Dismiss", {
              duration: 3000
            });
          }
          else{
            //Error handling

            //POPUP MESSAGE
            let snackBarRef = this.snackBar.open("Could not submit CMW Deposit process form. Please try again.", "Dismiss", {
              duration: 3000
            });
          }
        });
      }
      else{
        //Error handling

        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Could not submit CMW Deposit process form. Please try again.", "Dismiss", {
          duration: 3000
        });
      }
    });

  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call loadNotifications() | 2. Call loadDepositForms() | 3. Call getAllRequestForms() |
   *              4. Call getAllRevitalizationForms() | 5. Call getAllProcessedForm()
   * 
   * @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.currentUser = this.authService.getCurrentSessionValue.user;
    
    //Calling the neccessary functions as the page loads
    this.getAllStaff();
    this.getAllDepositForms();
    this.getAllRequestForms();
    this.getAllRevitalizationForms();
    this.getAllProcessedForms();
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE NOTIFICATIONS 
  /**
   * This function will toggle the display of the notifications side panel
   * 
   * @memberof ViewFormsComponent
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
   * @memberof ViewFormsComponent
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
   * @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayProfileSaveBtn() {
    this.saveBtn = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     DISPLAY PASSWORD CONFIRM INPUT 
  /**
   * This function will display the confirm password input field in the user's password was altered
   * 
   * @memberof ViewFormsComponent
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
   * @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleHelpTab() {
    this.helpTab = !this.helpTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE DEPOSIT FORMS 
  /**
   * This function will toggle the display of the deposit form section
   * 
   * @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleDepositFormsTab() {
    this.depositFormTab = !this.depositFormTab;
    this.requestFormTab = false;
    this.revitalizationFormTab  = false;
    this.processedFormTab = false;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE REQUEST FORMS 
  /**
   * This function will toggle the display of the request form section
   * 
   * @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleRequestFormsTab() {
    this.requestFormTab = !this.requestFormTab;
    this.depositFormTab = false;
    this.revitalizationFormTab  = false;
    this.processedFormTab = false;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE REVITALIZATION FORMS 
  /**
   * This function will toggle the display of the revitalization form section
   * 
   * @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleRevitalizationFormsTab() {
    this.revitalizationFormTab = !this.revitalizationFormTab;
    this.requestFormTab = false;
    this.depositFormTab  = false;
    this.processedFormTab = false;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE PROCESSED FORMS 
  /**
   * This function will toggle the display of the processes formd section
   * 
   * @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleProcessedFormsTab() {
    this.processedFormTab = !this.processedFormTab;
    this.requestFormTab = false;
    this.revitalizationFormTab  = false;
    this.depositFormTab = false;
  }
}

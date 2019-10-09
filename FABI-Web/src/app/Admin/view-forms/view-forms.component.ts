/**
 * File Name: view-forms.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\view-forms\view-forms.component.ts
 * Project Name: fabi-web
 * Created Date: Monday, August 5th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, October 8th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import * as core from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';

//These imports are used to created a downloadable PDF of the forms
import * as jspdf from 'jspdf';

import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CultureCollectionAPIService, ProcessedForm, UpdateDepositForm } from '../../_services/culture-collection-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { Member, UserManagementAPIService } from '../../_services/user-management-api.service';
import { NotificationService } from '../../_services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';


@core.Component({
  selector: 'app-view-forms',
  templateUrl: './view-forms.component.html',
  styleUrls: ['./view-forms.component.scss']
})
export class ViewFormsComponent implements core.OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */
  private toggle_status: boolean = false;

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

  /** The id number of the form - @type {string} */
  formID: string;
  /** The id number of the processed form - @type {string} */
  processedFormID: string;

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

  /** An array holding all of the deposit forms - @type {any[]} */
  depositForms: any[] = [];
  /** An array holding all of the request forms - @type {any[]} */
  requestForms: any[] = [];
  /** An array holding all of the revitalization forms - @type {any[]} */
  revitalizationForms: any[] = [];
  /** An array holding all of the processed forms - @type {any[]} */
  processedForms: any[] = [];

  /** The form to get the process form details -  @type {FormGroup} */
  processForm: FormGroup;

  /** Holds the input element (processFormShow) from the HTML page - @type {ElementRef} */
  @core.ViewChild("processFormShow") processFormShow: core.ElementRef;
  /** Holds the input element (associatedDepositForm) from the HTML page - @type {ElementRef} */
  @core.ViewChild("associatedDepositForm") associatedDepositForm: core.ElementRef;

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
  /** Indicates if the associated forms tab is hidden/shown - @type {boolean} */
  associatedFormTab: boolean = false;

  /** Will hide the navigational arrows when the form is to be downloaded - @type {boolean} */
  downloadDeposit: boolean = true;
  /** Will hide the navigational arrows when the form is to be downloaded - @type {boolean} */
  downloadRequest: boolean = true;
  /** Will hide the navigational arrows when the form is to be downloaded - @type {boolean} */
  downloadRevitalization: boolean = true;
  /** Will hide the navigational arrows when the form is to be downloaded - @type {boolean} */
  downloadProcessed: boolean = true;

  /** Holds the table element (depositFormPDF) from the HTML page - @type {ElementRef} */
  @core.ViewChild("depositFormPDF") depositFormPDF: core.ElementRef;
  /** Holds the table element (requestFormPDF) from the HTML page - @type {ElementRef} */
  @core.ViewChild("requestFormPDF") requestFormPDF: core.ElementRef;
  /** Holds the table element (revitalizationFormPDF) from the HTML page - @type {ElementRef} */
  @core.ViewChild("revitalizationFormPDF") revitalizationFormPDF: core.ElementRef;
  /** Holds the table element (processedFormPDF) from the HTML page - @type {ElementRef} */
  @core.ViewChild("processedFormPDF") processedFormPDF: core.ElementRef;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of ReportingComponent.
   * 
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {NotificationService} notificationService FOr calling the Notification service
   * @param {CultureCollectionAPIService} cultureCollectionService For calling the Culture Collection API Service
   * @param {UserManagementAPIService} userManagementService For calling the User Management API Service
   * @param {AuthenticationService} authService for calling the *authentication* service
   * @param {Router} router
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {FormBuilder} formBuilder Used to get the form elements from the HTML page
   * @param {core.Renderer2} renderer Used for creating the PDF documents to download
   * 
   * @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private notificationLoggingService: NotificationLoggingService,
    private userManagementService: UserManagementAPIService,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private renderer: core.Renderer2,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private cultureCollectionService: CultureCollectionAPIService,
    private ref: core.ChangeDetectorRef
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
  getAllStaff() {
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllFABIStaff().subscribe((response: any) => {
      if (response.success == true) {
        //Temporary array to hold the array of admins retuned from the API call
        var data = response.data.qs.admins;
        for (var i = 0; i < data.length; i++) {
          var tempMember: Member = { Email: data[i].email, Name: data[i].fname, Surname: data[i].surname, ID: data[i].id };
          this.staff.push(tempMember);
        }

        //Temporary array to hold the array of staff returned from the API call
        var data = response.data.qs.staff;
        for (var i = 0; i < data.length; i++) {
          var tempMember: Member = { Email: data[i].email, Name: data[i].fname, Surname: data[i].surname, ID: data[i].id };
          this.staff.push(tempMember);
        }
      }
      else {
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
  getAllDepositForms() {
    //Making a call to the culture collection api service to load all of the deposit forms
    this.cultureCollectionService.getAllDepositLogs().subscribe((response: any) => {
      if (response.success == true) {
        var data = response.data.qs.forms;

        for (var i = 0; i < data.length; i++) {
          var tempDeposit = [];
          tempDeposit.push(data[i].userID);
          tempDeposit.push(data[i].cmwCultureNumber);
          tempDeposit.push(data[i].genus);
          tempDeposit.push(data[i].epitheton);
          tempDeposit.push(data[i].personalCollectionNumber);
          tempDeposit.push(data[i].internationalCollectionNumber);
          tempDeposit.push(data[i].herbariumNumber);
          tempDeposit.push(data[i].otherFABICollections);
          tempDeposit.push(data[i].name);
          tempDeposit.push(data[i].typeStatus);
          tempDeposit.push(data[i].host);
          tempDeposit.push(data[i].vector);
          tempDeposit.push(data[i].substrate);
          tempDeposit.push(data[i].continent);
          tempDeposit.push(data[i].country);
          tempDeposit.push(data[i].region);
          tempDeposit.push(data[i].locality);
          tempDeposit.push(data[i].gps);

          if (!data[i].collected_by) {
            tempDeposit.push(data[i].collectedBy);
          }
          else {
            tempDeposit.push(data[i].collected_by);
          }

          tempDeposit.push(data[i].dateCollected);
          tempDeposit.push(data[i].isolatedBy);
          tempDeposit.push(data[i].identifiedBy);
          tempDeposit.push(data[i].donatedBy);
          tempDeposit.push(data[i].additionalNotes);
          tempDeposit.push(data[i].dateSubmitted);
          tempDeposit.push(data[i].id);

          if (data[i].status == 'submitted') {
            this.depositForms.push(tempDeposit);
          }
        }

        this.depositFormNumber = 0;
        this.loadNextDepositForm();
      }
      else {
        //Error handling
        this.notificationService.showErrorNotification("Error loading Deposit Forms", "An error occurred trying to load the deposit forms. Please refresh the page.");
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
  getAllRequestForms() {
    //Making a call to the culture collection api service to load all of the request forms
    this.cultureCollectionService.getAllRequestLogs().subscribe((response: any) => {
      if (response.success == true) {
        var data = response.data.qs.forms;

        for (var i = 0; i < data.length; i++) {
          var tempRequest = [];
          tempRequest.push(data[i].userID);
          tempRequest.push(data[i].requestor);
          tempRequest.push(data[i].taxonName);
          tempRequest.push(data[i].cultureNumber);
          tempRequest.push(data[i].dateRequested);
          tempRequest.push(data[i].referenceNumber);
          tempRequest.push(data[i].notes);
          tempRequest.push(data[i].dateSubmitted);
          tempRequest.push(data[i].id);

          this.requestForms.push(tempRequest);
        }

        this.requestFormNumber = 0;
        this.loadNextRequestForm();
      }
      else {
        //Error handling
        this.notificationService.showErrorNotification("Error loading Request Forms", "An error occurred trying to load the request forms. Please refresh the page.");
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
  getAllRevitalizationForms() {
    //Making a call to the culture collection api service to load all of the revitalization forms
    this.cultureCollectionService.getAllRequestLogs().subscribe((response: any) => {
      if (response.success == true) {
        var data = response.data.qs.forms;

        for (var i = 0; i < data.length; i++) {
          var tempRevitalization = [];
          tempRevitalization.push(data[i].userID);
          tempRevitalization.push(data[i].requestor);
          tempRevitalization.push(data[i].currentName);
          tempRevitalization.push(data[i].cultureNumber);
          tempRevitalization.push(data[i].nameBionumerics);
          tempRevitalization.push(data[i].cultureCondition);
          tempRevitalization.push(data[i].sequenceDateSubmitted);
          tempRevitalization.push(data[i].dateRequested);
          tempRevitalization.push(data[i].referenceNumber);
          tempRevitalization.push(data[i].dateReturned);
          tempRevitalization.push(data[i].dateSubmitted);
          tempRevitalization.push(data[i].id);

          this.revitalizationForms.push(tempRevitalization);
        }

        this.revitalizationFormNumber = 0;
        this.loadNextRevitalizationForm();
      }
      else {
        //Error handling
        this.notificationService.showErrorNotification("Error loading Revitalization Forms", "An error occurred trying to load the revitalization forms. Please refresh the page.");
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
  getAllProcessedForms() {
    //Making a call to the culture collection api service to load all of the processed forms
    this.cultureCollectionService.getAllProcessedLogs().subscribe((response: any) => {
      if (response.success == true) {
        var data = response.data.qs.forms;

        for (var i = 0; i < data.length; i++) {
          var tempProcessed = [];
          tempProcessed.push(data[i].userID);
          tempProcessed.push(data[i].statusOfCulture);
          tempProcessed.push(data[i].agarSlants);
          tempProcessed.push(data[i].water);
          tempProcessed.push(data[i].oil);
          tempProcessed.push(data[i].roomTemperature);
          tempProcessed.push(data[i].c18);
          tempProcessed.push(data[i].freezeDried);
          tempProcessed.push(data[i].freeze);
          tempProcessed.push(data[i].dateOfCollectionValidation);
          tempProcessed.push(data[i].microscopeSlides);
          tempProcessed.push(data[i].dateSubmittedProcessedForm);
          tempProcessed.push(data[i].cultureCollectionNumber);
          tempProcessed.push(data[i].id);

          this.processedForms.push(tempProcessed);
        }

        this.processedFormNumber = 0;
        this.loadNextProcessedForm();
      }
      else {
        //Error handling
        this.notificationService.showErrorNotification("Error loading Processed Forms", "An error occurred trying to load the processed forms. Please refresh the page.");
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
  loadNextDepositForm() {
    if(this.depositForms.length == 0){
      this.notificationService.showWarningNotification("No Deposit Forms", "There are no deposit forms to load.");
      return;
    }

    if (this.depositFormNumber != 0) {
      if (this.depositFormNumber == this.depositForms.length - 1) {
        this.depositFormNumber = 0;
      }
      else if (this.depositFormNumber == this.depositForms.length) {
        this.depositFormNumber = 0;
      }
      else {
        this.depositFormNumber += 1;
      }
    }

    var tempDeposit = this.depositForms[this.depositFormNumber];

    if (!tempDeposit[0]) {
      this.userIDDeposit = "";
    }
    else {
      this.userIDDeposit = this.loadUserDetails(tempDeposit[0]);
    }

    this.cmwCultureNumberDeposit = tempDeposit[1];
    this.genus = tempDeposit[2];
    this.epitheton = tempDeposit[3];
    this.personalCollectionNumber = tempDeposit[4];
    this.internationalCollectionNumber = tempDeposit[5];
    this.herbariumNumber = tempDeposit[6];
    this.otherFABICollections = tempDeposit[7];
    this.name = tempDeposit[8];
    this.typeStatus = tempDeposit[9];
    this.host = tempDeposit[10];
    this.vector = tempDeposit[11];
    this.substrate = tempDeposit[12];
    this.continent = tempDeposit[13];
    this.country = tempDeposit[14];
    this.region = tempDeposit[15];
    this.locality = tempDeposit[16];
    this.gps = tempDeposit[17];
    this.collectedBy = tempDeposit[18];
    this.dateCollected = tempDeposit[19];
    this.isolatedBy = tempDeposit[20];
    this.identifiedBy = tempDeposit[21];
    this.donatedBy = tempDeposit[22];
    this.additionalNotes = tempDeposit[23];
    this.dateSubmittedDeposit = tempDeposit[24];
    this.formID = tempDeposit[25];

    if (this.depositFormNumber == 0) {
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
  loadPreviousDepositForm() {
    if(this.depositForms.length == 0){
      this.notificationService.showWarningNotification("No Deposit Forms", "There are no deposit forms to load.");
      return;
    }

    if (this.depositFormNumber != this.depositForms.length) {
      if (this.depositFormNumber <= 0) {
        this.depositFormNumber = this.depositForms.length - 1;
      }
      else {
        this.depositFormNumber -= 1;
      }
    }

    var tempDeposit = this.depositForms[this.depositFormNumber];

    if (!tempDeposit[0]) {
      this.userIDDeposit = "";
    }
    else {
      this.userIDDeposit = this.loadUserDetails(tempDeposit[0]);
    }

    this.cmwCultureNumberDeposit = tempDeposit[1];
    this.genus = tempDeposit[2];
    this.epitheton = tempDeposit[3];
    this.personalCollectionNumber = tempDeposit[4];
    this.internationalCollectionNumber = tempDeposit[5];
    this.herbariumNumber = tempDeposit[6];
    this.otherFABICollections = tempDeposit[7];
    this.name = tempDeposit[8];
    this.typeStatus = tempDeposit[9];
    this.host = tempDeposit[10];
    this.vector = tempDeposit[11];
    this.substrate = tempDeposit[12];
    this.continent = tempDeposit[13];
    this.country = tempDeposit[14];
    this.region = tempDeposit[15];
    this.locality = tempDeposit[16];
    this.gps = tempDeposit[17];
    this.collectedBy = tempDeposit[18];
    this.dateCollected = tempDeposit[19];
    this.isolatedBy = tempDeposit[20];
    this.identifiedBy = tempDeposit[21];
    this.donatedBy = tempDeposit[22];
    this.additionalNotes = tempDeposit[23];
    this.dateSubmittedDeposit = tempDeposit[24];
    this.formID = tempDeposit[25];

    if (this.depositFormNumber == this.depositForms.length) {
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
  loadNextRequestForm() {
    if(this.requestForms.length == 0){
      this.notificationService.showWarningNotification("No Request Forms", "There are no request forms to load.");
      return;
    }

    if (this.requestFormNumber != 0) {
      if (this.requestFormNumber == this.requestForms.length - 1) {
        this.requestFormNumber = 0;
      }
      else if (this.requestFormNumber == this.requestForms.length) {
        this.requestFormNumber = 0;
      }
      else {
        this.requestFormNumber += 1;
      }
    }

    var tempRequest = this.requestForms[this.requestFormNumber];

    if (!tempRequest[0]) {
      this.userIDRequest = "";
    }
    else {
      this.userIDRequest = this.loadUserDetails(tempRequest[0]);
    }

    this.cmwCultureNumberRequest = tempRequest[3];
    this.taxonName = tempRequest[2];
    this.referenceNumberRequest = tempRequest[5];
    this.dateRequestedRequest = tempRequest[4];
    this.notes = tempRequest[6];
    this.dateSubmittedRequest = tempRequest[7];
    this.formID = tempRequest[8];

    if (this.requestFormNumber == 0) {
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
  loadPreviousRequestForm() {
    if(this.requestForms.length == 0){
      this.notificationService.showWarningNotification("No Request Forms", "There are no request forms to load.");
      return;
    }

    if (this.requestFormNumber != this.requestForms.length) {
      if (this.requestFormNumber == 0) {
        this.requestFormNumber = this.requestForms.length - 1;
      }
      else {
        this.requestFormNumber -= 1;
      }
    }

    var tempRequest = this.requestForms[this.requestFormNumber];

    if (!tempRequest[0]) {
      this.userIDRequest = "";
    }
    else {
      this.userIDRequest = this.loadUserDetails(tempRequest[0]);
    }

    this.cmwCultureNumberRequest = tempRequest[3];
    this.taxonName = tempRequest[2];
    this.referenceNumberRequest = tempRequest[5];
    this.dateRequestedRequest = tempRequest[4];
    this.notes = tempRequest[6];
    this.dateSubmittedRequest = tempRequest[7];
    this.formID = tempRequest[8];

    if (this.requestFormNumber == this.requestForms.length) {
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
  loadNextRevitalizationForm() {
    if(this.revitalizationForms.length == 0){
      this.notificationService.showWarningNotification("No Revitalization Forms", "There are no revitalization forms to load.");
      return;
    }

    if (this.revitalizationFormNumber != 0) {
      if (this.revitalizationFormNumber == this.revitalizationForms.length - 1) {
        this.revitalizationFormNumber = 0;
      }
      else if (this.revitalizationFormNumber == this.revitalizationForms.length) {
        this.revitalizationFormNumber = 0;
      }
      else {
        this.revitalizationFormNumber += 1;
      }
    }

    var tempRevitalization = this.revitalizationForms[this.revitalizationFormNumber];

    if (!tempRevitalization[0]) {
      this.userIDRevitalization = "";
    }
    else {
      this.userIDRevitalization = this.loadUserDetails(tempRevitalization[0]);
    }

    this.cmwCultureNumberRequest = tempRevitalization[3];
    this.currentName = tempRevitalization[2];
    this.referenceNumberRevitalization = tempRevitalization[8];
    this.dateRequestedRevitalization = tempRevitalization[7];
    this.nameBionumerics = tempRevitalization[4];
    this.cultureCondition = tempRevitalization[5];
    this.sequenceDateSubmitted = tempRevitalization[6];
    this.dateReturned = tempRevitalization[9];
    this.dateSubmittedRevitalization = tempRevitalization[10];
    this.formID = tempRevitalization[11];

    if (this.revitalizationFormNumber == 0) {
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
  loadPreviousRevitalizationForm() {
    if(this.revitalizationForms.length == 0){
      this.notificationService.showWarningNotification("No Revitalization Forms", "There are no revitalization forms to load.");
      return;
    }

    if (this.revitalizationFormNumber != this.revitalizationForms.length) {
      if (this.revitalizationFormNumber == 0) {
        this.revitalizationFormNumber = this.revitalizationForms.length - 1;
      }
      else {
        this.revitalizationFormNumber -= 1;
      }
    }

    var tempRevitalization = this.revitalizationForms[this.revitalizationFormNumber];

    if (!tempRevitalization[0]) {
      this.userIDRevitalization = "";
    }
    else {
      this.userIDRevitalization = this.loadUserDetails(tempRevitalization[0]);
    }

    this.cmwCultureNumberRequest = tempRevitalization[3];
    this.currentName = tempRevitalization[2];
    this.referenceNumberRevitalization = tempRevitalization[8];
    this.dateRequestedRevitalization = tempRevitalization[7];
    this.nameBionumerics = tempRevitalization[4];
    this.cultureCondition = tempRevitalization[5];
    this.sequenceDateSubmitted = tempRevitalization[6];
    this.dateReturned = tempRevitalization[9];
    this.dateSubmittedRevitalization = tempRevitalization[10];
    this.formID = tempRevitalization[11];

    if (this.revitalizationFormNumber == this.revitalizationForms.length) {
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
  loadNextProcessedForm() {
    if(this.processedForms.length == 0){
      this.notificationService.showWarningNotification("No Processed Forms", "There are no processed forms to load.");
      return;
    }

    if (this.processedFormNumber != 0) {
      if (this.processedFormNumber == this.processedForms.length - 1) {
        this.processedFormNumber = 0;
      }
      else if (this.processedFormNumber == this.processedForms.length) {
        this.processedFormNumber = 0;
      }
      else {
        this.processedFormNumber += 1;
      }
    }

    var tempProcessed = this.processedForms[this.processedFormNumber];

    if (!tempProcessed[0]) {
      this.userIDProcessed = "";
    }
    else {
      this.userIDProcessed = this.loadUserDetails(tempProcessed[0]);
    }

    this.statusOfCulture = tempProcessed[1];
    this.agarSlants = tempProcessed[2];
    this.water = tempProcessed[3];
    this.oil = tempProcessed[4];
    this.roomTemperature = tempProcessed[5];
    this.c18 = tempProcessed[6];
    this.freezeDried = tempProcessed[7];
    this.freeze = tempProcessed[8];
    this.dateOfCollectionValidation = tempProcessed[9];
    this.microscopeSlides = tempProcessed[10];
    this.dateSubmittedProcessedForm = tempProcessed[11];
    this.cmwCultureNumberProcessed = tempProcessed[12];
    this.processedFormID = tempProcessed[13];

    if (this.processedFormNumber == 0) {
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
  loadPreviousProcessedForm() {
    if(this.processedForms.length == 0){
      this.notificationService.showWarningNotification("No Processed Forms", "There are no processed forms to load.");
      return;
    }

    if (this.processedFormNumber != this.processedForms.length) {
      if (this.processedFormNumber == 0) {
        this.processedFormNumber = this.processedForms.length - 1;
      }
      else {
        this.processedFormNumber -= 1;
      }
    }

    var tempProcessed = this.processedForms[this.processedFormNumber];

    if (!tempProcessed[0]) {
      this.userIDProcessed = "";
    }
    else {
      this.userIDProcessed = this.loadUserDetails(tempProcessed[0]);
    }

    this.statusOfCulture = tempProcessed[1];
    this.agarSlants = tempProcessed[2];
    this.water = tempProcessed[3];
    this.oil = tempProcessed[4];
    this.roomTemperature = tempProcessed[5];
    this.c18 = tempProcessed[6];
    this.freezeDried = tempProcessed[7];
    this.freeze = tempProcessed[8];
    this.dateOfCollectionValidation = tempProcessed[9];
    this.microscopeSlides = tempProcessed[10];
    this.dateSubmittedProcessedForm = tempProcessed[11];
    this.cmwCultureNumberProcessed = tempProcessed[12];
    this.processedFormID = tempProcessed[13];

    if (this.processedFormNumber == this.processedForms.length) {
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
  loadUserDetails(userID: string) {
    var person = '';

    for (var i = 0; i < this.staff.length; i++) {
      if (this.staff[i].ID == userID) {
        person = this.staff[i].Name + ' ' + this.staff[i].Surname;
      }
    }

    return person;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SHOW PROCESS FORM
  /**
   *  This function will be called so that the process form can be displayed
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  showProcessForm() {
    //this.renderer.setStyle(this.processFormShow.nativeElement, 'display', 'block');
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  VIEW ASSOCIATED DEPOSIT FORM
  /**
   *  This function will be called so that the deposit form associated with the process form on the screen, can be displayed.
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  viewAssociatedDepositForm() {
    this.associatedFormTab = !this.associatedFormTab;

    var tempDeposit;

    for (var i = 0; i < this.depositForms.length; i++) {
      if (this.depositForms[i][1] == this.cmwCultureNumberProcessed) {
        tempDeposit = this.depositForms[i];
      }
    }

    if (tempDeposit != null) {
      if (!tempDeposit[0]) {
        this.userIDDeposit = "";
      }
      else {
        this.userIDDeposit = this.loadUserDetails(tempDeposit[0]);
      }

      this.cmwCultureNumberDeposit = tempDeposit[1];
      this.genus = tempDeposit[2];
      this.epitheton = tempDeposit[3];
      this.personalCollectionNumber = tempDeposit[4];
      this.internationalCollectionNumber = tempDeposit[5];
      this.herbariumNumber = tempDeposit[6];
      this.otherFABICollections = tempDeposit[7];
      this.name = tempDeposit[8];
      this.typeStatus = tempDeposit[9];
      this.host = tempDeposit[10];
      this.vector = tempDeposit[11];
      this.substrate = tempDeposit[12];
      this.continent = tempDeposit[13];
      this.country = tempDeposit[14];
      this.region = tempDeposit[15];
      this.locality = tempDeposit[16];
      this.gps = tempDeposit[17];
      this.collectedBy = tempDeposit[18];
      this.dateCollected = tempDeposit[19];
      this.isolatedBy = tempDeposit[20];
      this.identifiedBy = tempDeposit[21];
      this.donatedBy = tempDeposit[22];
      this.additionalNotes = tempDeposit[23];
      this.dateSubmittedDeposit = tempDeposit[24];
      this.formID = tempDeposit[25];
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  HIDE ASSOCIATED DEPOSIT FORM
  /**
   *  This function will be called so that the deposit form associated with the process form on the screen, can be hidden.
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  hideAssociatedDepositForm() {
    //this.renderer.setStyle(this.associatedDepositForm.nativeElement, 'display', 'none');
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
  toggleNotificaitonsTab() {
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
  processDepositProcessedForm() {
    this.userIDProcessed = this.currentUser.ID;
    this.cmwCultureNumberProcessed = this.cmwCultureNumberDeposit;

    if (this.processForm.controls.statusOfCulture.value == "" || this.processForm.controls.statusOfCulture.value == null) {
      this.statusOfCulture = "";
    }
    else {
      this.statusOfCulture = this.processForm.controls.statusOfCulture.value;
    }

    if (this.processForm.controls.agarSlants.value == "" || this.processForm.controls.agarSlants.value == null) {
      this.agarSlants = "";
    }
    else {
      this.agarSlants = this.processForm.controls.agarSlants.value;
    }

    if (this.processForm.controls.water.value == "" || this.processForm.controls.water.value == null) {
      this.water = "";
    }
    else {
      this.water = this.processForm.controls.water.value;
    }

    if (this.processForm.controls.oil.value == "" || this.processForm.controls.oil.value == null) {
      this.oil = "";
    }
    else {
      this.oil = this.processForm.controls.oil.value;
    }

    if (this.processForm.controls.roomTemperature.value == "" || this.processForm.controls.roomTemperature.value == null) {
      this.roomTemperature = "";
    }
    else {
      this.roomTemperature = this.processForm.controls.roomTemperature.value;
    }

    if (this.processForm.controls.c18.value == "" || this.processForm.controls.c18.value == null) {
      this.c18 = "";
    }
    else {
      this.c18 = this.processForm.controls.c18.value;
    }

    if (this.processForm.controls.freezeDried.value == "" || this.processForm.controls.freezeDried.value == null) {
      this.freezeDried = "";
    }
    else {
      this.freezeDried = this.processForm.controls.freezeDried.value;
    }

    if (this.processForm.controls.freeze.value == "" || this.processForm.controls.freeze.value == null) {
      this.freeze = "";
    }
    else {
      this.freeze = this.processForm.controls.freeze.value;
    }

    var temp = (this.processForm.controls.dateOfCollectionValidation.value).toString();
    var year = temp[0] + temp[1] + temp[2] + temp[3];
    var month = temp[5] + temp[6];
    var day = temp[8] + temp[9];
    this.dateOfCollectionValidation = day + '/' + month + '/' + year;

    if (this.processForm.controls.microscopeSlides.value == "" || this.processForm.controls.microscopeSlides.value == null) {
      this.microscopeSlides = "";
    }
    else {
      this.microscopeSlides = this.processForm.controls.microscopeSlides.value;
    }

    var date = new Date();
    var currentDate = ('0' + date.getDate()).slice(-2) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    this.dateSubmittedProcessedForm = currentDate;

    var tempProcessedForm: ProcessedForm = {
      userID: this.currentUser.ID, statusOfCulture: this.statusOfCulture, agarSlants: this.agarSlants, water: this.water,
      oil: this.oil, roomTemperature: this.roomTemperature, c18: this.c18, freezeDried: this.freezeDried, freeze: this.freeze,
      dateOfCollectionValidation: this.dateOfCollectionValidation, microscopeSlides: this.microscopeSlides, dateSubmittedProcessedForm: this.dateSubmittedProcessedForm,
      cultureCollectionNumber: this.cmwCultureNumberDeposit
    };

    this.cultureCollectionService.submitProcessedForm(tempProcessedForm).subscribe((response: any) => {
      if (response.success == true) {
        var tempUpdate: UpdateDepositForm = { userID: this.currentUser.ID, status: 'processed', formID: this.formID };

        this.cultureCollectionService.updateDepositFormStatus(tempUpdate).subscribe((response: any) => {
          if (response.success == true) {
            //Successfully submitted process form
            this.processForm.reset();

            //POPUP MESSAGE
            this.notificationService.showSuccessNotification("Submitted Processed Form", "The processed form has been successfully submitted.");
          }
          else {
            //Error handling
            this.notificationService.showErrorNotification("Error Submitting Form", "There was an error submitting the form. Please make sure all relevant information is provided.");
          }
        });
      }
      else {
        //Error handling
        this.notificationService.showErrorNotification("Error Submitting Form", "There was an error submitting the form. Please make sure all relevant information is provided.");
      }
    }, (err: HttpErrorResponse) => {
      //Error handling
      this.notificationService.showErrorNotification("Error Submitting Form", "There was an error submitting the form. Please make sure all relevant information is provided.");
    });

  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call getAllStaff() | 2. Call getAllDepositForms() | 3. Call getAllRequestForms() |
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
  toggleNotificationsTab() {
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
    this.depositFormTab = true;
    this.requestFormTab = false;
    this.revitalizationFormTab = false;
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
    this.requestFormTab = true;
    this.depositFormTab = false;
    this.revitalizationFormTab = false;
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
    this.revitalizationFormTab = true;
    this.requestFormTab = false;
    this.depositFormTab = false;
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
    this.processedFormTab = true;
    this.requestFormTab = false;
    this.revitalizationFormTab = false;
    this.depositFormTab = false;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  DOWNLOAD DEPOSIT FORM
  /**
   *  This function will be used to download the deposit form that is displayed on screen as a PDF document.
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  downloadDepositForm() {
    this.downloadDeposit = false;

    var report = this.depositFormPDF.nativeElement;
    html2canvas(report).then(canvas => {
      var imageWidth = 190;
      var pageHeight = 295;
      var imageHeight = canvas.height * imageWidth / canvas.width;
      var heightLeft = imageHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imageWidth, imageHeight);
      pdf.save('Deposit_Form.pdf');
    });

    this.downloadDeposit = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  DOWNLOAD REQUEST FORM
  /**
   *  This function will be used to download the request form that is displayed on screen as a PDF document.
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  downloadRequestForm() {
    this.downloadRequest = false;

    var report = this.requestFormPDF.nativeElement;
    html2canvas(report).then(canvas => {
      var imageWidth = 180;
      var pageHeight = 295;
      var imageHeight = canvas.height * imageWidth / canvas.width;
      var heightLeft = imageHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imageWidth, imageHeight);
      pdf.save('Request_Form.pdf');
    });

    this.downloadRequest = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                               DOWNLOAD REVITALIZATION FORM
  /**
   *  This function will be used to download the revitalization form that is displayed on screen as a PDF document.
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  downloadRevitalizationForm() {
    this.downloadRevitalization = false;

    var report = this.revitalizationFormPDF.nativeElement;
    html2canvas(report).then(canvas => {
      var imageWidth = 208;
      var pageHeight = 295;
      var imageHeight = canvas.height * imageWidth / canvas.width;
      var heightLeft = imageHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imageWidth, imageHeight);
      pdf.save('Revitalization_Form.pdf');
    });

    this.downloadRevitalization = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  DOWNLOAD PROCESSED FORM
  /**
   *  This function will be used to download the processed form that is displayed on screen as a PDF document.
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  downloadProcessedForm() {
    this.downloadProcessed = false;

    var report = this.processedFormPDF.nativeElement;
    html2canvas(report).then(canvas => {
      var imageWidth = 180;
      var pageHeight = 295;
      var imageHeight = canvas.height * imageWidth / canvas.width;
      var heightLeft = imageHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imageWidth, imageHeight);
      pdf.save('Processed_Form.pdf');
    });

    this.downloadProcessed = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  DELETE DEPOSIT FORM
  /**
   *  This function will be used to delete the deposit form that is displayed on screen as a PDF document.
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  deleteDepositForm() {
    //Deleting the currently displayed deposit form
    this.cultureCollectionService.deleteDepositForm(this.currentUser.ID, this.formID).subscribe((response: any) => {
      if (response.success == true) {
        //Successfully deleted deposit form

        //Deleting the processed form associated with the deposit form deleted
        for (var i = 0; i < this.processedForms.length; i++) {
          var temp = this.processedForms[i];
          if (temp[12] == this.cmwCultureNumberDeposit) {
            this.deleteProcessedForm();

            this.loadNextDepositForm();
            this.loadNextProcessedForm();
          }
        }

        this.notificationService.showSuccessNotification("Deleted Deposit Form", "The deposit form was successfully deleted");
      }
      else{
        //Error handling
        this.notificationService.showErrorNotification("Error Deleting Form", "There was an error deleting the deposit form. Please try again.");
      }
    }, (err: HttpErrorResponse) => {
      //Error handling
      this.notificationService.showErrorNotification("Error Deleting Form", "There was an error deleting the deposit form. Please try again.");
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  DELETE REQUEST FORM
  /**
   *  This function will be used to delete the request form that is displayed on screen as a PDF document.
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  deleteRequestForm() {
    //Deleting the currently displayed request form
    this.cultureCollectionService.deleteRequestForm(this.currentUser.ID, this.formID).subscribe((response: any) => {
      if (response.success == true) {
        this.loadNextRequestForm();

        this.notificationService.showSuccessNotification("Deleted Request Form", "The request form was successfully deleted");
      }
      else{
        //Error handling
        this.notificationService.showErrorNotification("Error Deleting Form", "There was an error deleting the request form. Please try again.");
      }
    }, (err: HttpErrorResponse) => {
      //Error handling
      this.notificationService.showErrorNotification("Error Deleting Form", "There was an error deleting the request form. Please try again.");
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                               DELETE REVITALIZATION FORM
  /**
   *  This function will be used to delete the revitalization form that is displayed on screen as a PDF document.
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  deleteRevitalizationForm() {
    //Deleting the currently displayed revitalization form
    this.cultureCollectionService.deleteRevitalizationForm(this.currentUser.ID, this.formID).subscribe((response: any) => {
      if (response.success == true) {
        this.loadNextRevitalizationForm();

        this.notificationService.showSuccessNotification("Deleted Revitalization Form", "The revitalization form was successfully deleted");
      }
      else{
        //Error handling
        this.notificationService.showErrorNotification("Error Deleting Form", "There was an error deleting the revitalization form. Please try again.");
      }
    }, (err: HttpErrorResponse) => {
      //Error handling
      this.notificationService.showErrorNotification("Error Deleting Form", "There was an error deleting the revitalization form. Please try again.");
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  DELETE PROCESSED FORM
  /**
   *  This function will be used to delete the processed form that is displayed on screen as a PDF document.
   *  @memberof ViewFormsComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  deleteProcessedForm() {
    //Deleting the currently displayed processed form
    this.cultureCollectionService.deleteProcessedForm(this.currentUser.ID, this.processedFormID).subscribe((response: any) => {
      if (response.success == true) {
        this.loadNextProcessedForm();

        this.notificationService.showSuccessNotification("Deleted Processed Form", "The processed form was successfully deleted");
      }
      else{
        //Error handling
        this.notificationService.showErrorNotification("Error Deleting Form", "There was an error deleting the processed form. Please try again.");
      }
    }, (err: HttpErrorResponse) => {
      //Error handling
      this.notificationService.showErrorNotification("Error Deleting Form", "There was an error deleting the processed form. Please try again.");
    });
  }
}

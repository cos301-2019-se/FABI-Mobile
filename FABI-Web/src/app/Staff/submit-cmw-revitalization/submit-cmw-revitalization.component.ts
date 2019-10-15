/**
 * File Name: submit-cmw-revitalization.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Staff\submit-cmw-revitalization\submit-cmw-revitalization.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, July 16th 2019
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
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CMWRevitalization, CultureCollectionAPIService } from '../../_services/culture-collection-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';
import { NotificationService } from '../../_services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@core.Component({
  selector: 'app-submit-cmw-revitalization',
  templateUrl: './submit-cmw-revitalization.component.html',
  styleUrls: ['./submit-cmw-revitalization.component.scss']
})
export class SubmitCmwRevitalizationComponent implements core.OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** The form to submit a CMW revitalization form -  @type {FormGroup} */
  cmwRevitalizationForm: FormGroup;

  /** Object array for holding the staff members -  @type {string[]} */
  staff: string[] = [];

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

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */
  private toggle_status: boolean = false;

  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;

  /** The search item the user is looking for in the form -  @type {string} */
  public searchItem: string;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of SubmitCmwRevitalizationComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For making calls to the User Management API Service
   * @param {NotificationService} notificationService For calling the Notification service
   * @param {CultureCollectionAPIService} cultureCollectionService for making calls to the Culture Collection API Service
   * @param {notificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {AuthenticationService} authService for calling the *authentication* service
   * @param {FormBuilder} formBuilder Used to build the form from the HTML page
   * @param {Router} router
   * 
   * @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
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
  //                                                  SUBMIT CMW REVITALIZATION FORM
  /**
   * This function will submit a CMW Revitalization form based on the information provided in the form on the HTML page.
   * @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitCMWRevitalizationForm() {
    if (this.cmwRevitalizationForm.controls.requestor.value == null || this.cmwRevitalizationForm.controls.requestor.value == "") {
      this.requestor = "N/A";
    }
    else {
      this.requestor = this.cmwRevitalizationForm.controls.requestor.value;
    }

    if (this.cmwRevitalizationForm.controls.current_name.value == null || this.cmwRevitalizationForm.controls.current_name.value == "") {
      this.currentName = "N/A";
    }
    else {
      this.currentName = this.cmwRevitalizationForm.controls.current_name.value;
    }

    if (this.cmwRevitalizationForm.controls.name_bionumerics.value == null || this.cmwRevitalizationForm.controls.name_bionumerics.value == "") {
      this.bionumericsName = "N/A";
    }
    else {
      this.bionumericsName = this.cmwRevitalizationForm.controls.name_bionumerics.value;
    }

    if (this.cmwRevitalizationForm.controls.culture_number.value == null || this.cmwRevitalizationForm.controls.culture_number.value == "") {
      this.cultureNumber = "N/A";
    }
    else {
      this.cultureNumber = this.cmwRevitalizationForm.controls.culture_number.value;
    }

    if (this.cmwRevitalizationForm.controls.culture_condition.value == null || this.cmwRevitalizationForm.controls.culture_condition.value == "") {
      this.cultureCondition = "N/A";
    }
    else {
      this.cultureCondition = this.cmwRevitalizationForm.controls.culture_condition.value;
    }

    if (this.cmwRevitalizationForm.controls.sequence.value == null || this.cmwRevitalizationForm.controls.sequence.value == "") {
      this.sequence = "N/A";
    }
    else {
      this.sequence = this.cmwRevitalizationForm.controls.sequence.value;
    }

    if (this.cmwRevitalizationForm.controls.reference_number.value == null || this.cmwRevitalizationForm.controls.reference_number.value == "") {
      this.referenceNumber = "N/A";
    }
    else {
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

    var revitalization: CMWRevitalization = {
      userID: this.currentUser.ID, requestor: this.requestor, currentName: this.currentName, nameBionumerics: this.bionumericsName, cultureNumber: this.cultureNumber,
      cultureCondition: this.cultureCondition, sequenceDateSubmitted: this.sequence, referenceNumber: this.referenceNumber, dateRequested: this.dateRequested,
      dateReturned: this.dateReturned, dateSubmitted: currentDate
    };

    this.cultureCollectionService.submitCMWRevitalizationForm(revitalization).subscribe((response: any) => {
      if (response.success == true) {
        //Successfully submitted form
        this.cmwRevitalizationForm.reset();

        //POPUP MESSAGE
        this.notificationService.showSuccessNotification("Submitted Revitalization Form", "Your CMW revitalization form has been successfully submitted");
      }
      else {
        //Error handling
        this.notificationService.showErrorNotification("Error Submitting Form", "There was an error in submiting the revitalization form. Please try again");
      }
    }, (err: HttpErrorResponse) => {
      //Error handling
      this.notificationService.showErrorNotification("Error Submitting Form", "There was an error in submiting the revitalization form. Please try again");
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
  getAllStaff() {
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllFABIStaff().subscribe((response: any) => {
      if (response.success == true) {
        for (var i = 0; i < response.data.qs.staff.length; i++) {
          this.staff.push(response.data.qs.staff[i].surname + ', ' + response.data.qs.staff[i].fname[0]);
        }
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
  toggleNotificaitonsTab() {
    this.toggle_status = !this.toggle_status;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                           NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call getAllStaff()
   * 
   * @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.currentUser = this.authService.getCurrentSessionValue.user;

    this.getAllStaff();
  }

}

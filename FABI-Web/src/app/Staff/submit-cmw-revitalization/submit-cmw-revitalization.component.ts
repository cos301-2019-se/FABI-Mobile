/**
 * File Name: submit-cmw-revitalization.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Staff\submit-cmw-revitalization\submit-cmw-revitalization.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, July 16th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, July 30th 2019
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
import { UserManagementAPIService, Member } from '../../_services/user-management-api.service';
import { DiagnosticClinicAPIService, CMWDeposit, CMWRevitalization } from '../../_services/diagnostic-clinic-api.service';
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
  control = new FormControl();

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
  dateRequested: Date;
  /** The date returned of the form -  @type {string} */
  dateReturned: Date;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of SubmitCmwRevitalizationComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For making calls to the User Management API Service
   * @param {DiagnosticClinicAPIService} diagnosticClinicService for making calls to the Diagnostic Clinic API Service
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private formBuilder: FormBuilder, 
    private userManagementService: UserManagementAPIService,
    private diagnosticClinicService: DiagnosticClinicAPIService, 
    private authService: AuthenticationService, 
    private router: Router
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

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                               SUBMIT_CMW_REVITALIZATION_FORM
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

    this.dateRequested = this.cmwRevitalizationForm.controls.date_requested.value;
    this.dateReturned = this.cmwRevitalizationForm.controls.date_returned.value;

    var date = new Date();
    var currentDate = ('0' + date.getDate()).slice(-2) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    var revitalization: CMWRevitalization = {userID: localStorage.getItem('userPassword'), requestor: this.requestor, currentName: this.currentName, nameBionumerics: this.bionumericsName, cultureNumber: this.cultureNumber,
      cultureCondition: this.cultureCondition, sequenceDateSubmitted: this.sequence, referenceNumber: this.referenceNumber, dateRequested: this.dateRequested.toDateString(),
      dateReturned: this.dateReturned.toDateString(), dateSubmitted: currentDate};

    this.diagnosticClinicService.submitCMWRevitalizationForm(revitalization).subscribe((response: any) => {
      if(response.success == true){
        //Successfully submitted form
      }
      else{
        //Error handling
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                            GET_ALL_STAFF
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
  //                                            FILTER
  /**
   *  This function will filter the autocomplete results on the form.
   * @memberof SubmitCmwRevitalizationComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.staff.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.filteredOptions = this.control.valueChanges.pipe(startWith(''), map(value => this.filter(value)));
  }

}

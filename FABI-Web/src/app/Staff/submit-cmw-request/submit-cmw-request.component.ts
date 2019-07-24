/**
 * File Name: submit-cmw-request.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Staff\submit-cmw-request\submit-cmw-request.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, July 16th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, July 24th 2019
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
import { DiagnosticClinicAPIService, CMWRequest } from '../../_services/diagnostic-clinic-api.service';

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
  control = new FormControl();

  /** The requestor of the form -  @type {string} */
  requestor: string;
  /** The taxonName of the form -  @type {string} */
  taxonName: string;
  /** The cultureNumber of the form -  @type {string} */
  cultureNumber: string;
  /** The dateRequested of the form -  @type {Date} */
  dateRequested: Date;
  /** The reference number of the form -  @type {string} */
  referenceNumber: string;
  /** The notes of the form -  @type {string} */
  notes: string;

  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of SubmitCmwRequestComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For making calls to the User Management API Service
   * @param {DiagnosticClinicAPIService} diagnosticClinicService for making calls to the Diagnostic Clinic API Service
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @memberof SubmitCmwRequestComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private formBuilder: FormBuilder, private userManagementService: UserManagementAPIService,
    private diagnosticClinicService: DiagnosticClinicAPIService) { 
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
  //                                              SUBMIT_CMW_REQUEST_FORM
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

    this.dateRequested = this.cmwRequestForm.controls.date_requested.value;
    
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
    var currentDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + date.getMonth() + 1).slice(-2) + '/' + date.getFullYear();

    var request: CMWRequest = {requestor: this.requestor, taxonName: this.taxonName, cultureNumber: this.cultureNumber, dateRequested: this.dateRequested,
      referenceNumber: this.referenceNumber, notes: this.notes, dateSubmitted: currentDate}
  
    this.diagnosticClinicService.submitCMWRequestForm(request).subscribe((response: any) => {
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
   * @memberof SubmitCmwRequestComponent
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
   * @memberof SubmitCmwRequestComponent
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

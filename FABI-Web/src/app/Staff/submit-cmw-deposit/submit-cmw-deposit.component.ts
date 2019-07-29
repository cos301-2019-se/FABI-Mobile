/**
 * File Name: submit-cmw-deposit.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Staff\submit-cmw-deposit\submit-cmw-deposit.component.ts
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
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserManagementAPIService, Member } from '../../_services/user-management-api.service';
import { DiagnosticClinicAPIService, CMWDeposit } from '../../_services/diagnostic-clinic-api.service';

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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of SubmitCmwDepositComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For making calls to the User Management API Service
   * @param {DiagnosticClinicAPIService} diagnosticClinicService for making calls to the Diagnostic Clinic API Service
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {DatePipe} datePipe Used to get the current date in a specific format
   * @memberof SubmitCmwDepositComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private formBuilder: FormBuilder, private userManagementService: UserManagementAPIService,
    private diagnosticClinicService: DiagnosticClinicAPIService, private datePipe: DatePipe) { 
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
    this.filteredOptions = this.control.valueChanges.pipe(startWith(''), map(value => this.filter(value)));
  }

}

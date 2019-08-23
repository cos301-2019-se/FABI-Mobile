<<<<<<< HEAD
import { ClientFormData } from '../organization-api.service';
import { OrganizationInfo } from '../organization-api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginInfo } from '../api-connection.service';
import { OrganizationApiService } from '../organization-api.service';
import { AdminAPIService } from '../admin-api.service';
=======
/**
 * File Name: sample-form.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\sample-form\sample-form.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 22nd 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import * as Interface from '../_interfaces/interfaces';
import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
>>>>>>> develop
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../_errors/error-component/error.component';
import { Router } from '@angular/router';
import { DiagnosticClinicAPIService } from '../_services/diagnostic-clinic-api.service';
import { MapsWindowComponent } from '../maps-window/maps-window.component';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SampleFormComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  sampleForm: FormGroup;             // FormGroup object to reference add user type form
  submitted: boolean = false;       // if form has been submitted
  success: boolean = false;         // if form was succesfully filled out
  sent: boolean = false;                // to check if user is logged in
  errors: boolean = false;
  organizations: Object;            //array for Organization dropdown
<<<<<<< HEAD

  // sampleForm = new FormGroup({
  //   sample_form_name: new FormControl(),
  //   sample_form_company: new FormControl(),
  //   sample_form_address: new FormControl(),
  //   sample_form_contact: new FormControl(),
  //   sample_form_email: new FormControl(),
  //   sample_form_tree_species: new FormControl(),
  //   sample_form_number_samples: new FormControl(),
  //   sample_form_location1: new FormControl(),
  //   sample_form_location2: new FormControl(),
  //   sample_form_compartment: new FormControl(),
  //   sample_form_gps: new FormControl(),
  //   sample_form_date_collection: new FormControl(),
  //   sample_form_date_sent: new FormControl(),
  //   sample_type_soil: new FormControl(),
  //   sample_type_stems: new FormControl(),
  //   sample_type_roots: new FormControl(),
  //   sample_type_twigs: new FormControl(),
  //   sample_type_leaves: new FormControl(),
  //   sample_type_seedlings: new FormControl(),
  //   sample_type_media: new FormControl(),
  //   sample_type_water: new FormControl(),
  //   symptom_wilt: new FormControl(),
  //   symptom_stunting: new FormControl(),
  //   symptom_leafspot: new FormControl(),
  //   symptom_rootrot: new FormControl(),
  //   symptom_dieback: new FormControl(),
  //   symptom_cankers: new FormControl(),
  //   symptom_death: new FormControl(),
  //   symptom_wood: new FormControl(),
  //   symptom_other: new FormControl(),
  //   distribution_localized: new FormControl(),
  //   distributed_scattered: new FormControl(),
  //   distributed_general: new FormControl(),
  //   conditions_affected: new FormControl(),
  //   conditions_problem_noticed: new FormControl(),
  //   conditions_date_planted: new FormControl(),
  //   conditions_weather_disturbances: new FormControl(),
  //   conditions_weather_prior: new FormControl(),
  //   conditions_others: new FormControl(),
  //   conditions_additional: new FormControl(),
  //   landowner: new FormControl(),
  //   landowner_signature: new FormControl()

  // });

  // api: APIconnectionService;

  constructor(private service: OrganizationApiService, private adminServce: AdminAPIService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) {
    this.sampleForm = this.formBuilder.group({

      organization: ['', Validators.required],
      sample_form_tree_species: ['', Validators.required],
      sample_form_number_samples: ['', Validators.required],
      sample_form_location1: ['', Validators.required],
      sample_form_location2: ['', Validators.required],
      sample_form_compartment: ['', Validators.required],

      sample_form_gps: ['', Validators.required],
      sample_form_date_collection: ['', Validators.required],
      sample_form_date_sent: ['', Validators.required],

      sample_type_soil: ['', Validators.required],
      sample_type_stems: ['', Validators.required],
      sample_type_roots: ['', Validators.required],
      sample_type_twigs: ['', Validators.required],
      sample_type_leaves: ['', Validators.required],
      sample_type_seedlings: ['', Validators.required],
      sample_type_media: ['', Validators.required],
      sample_type_water: ['', Validators.required],

      symptom_wilt: ['', Validators.required],
      symptom_stunting: ['', Validators.required],
      symptom_leafspot: ['', Validators.required],
      symptom_rootrot: ['', Validators.required],
      symptom_dieback: ['', Validators.required],
      symptom_cankers: ['', Validators.required],
      symptom_death: ['', Validators.required],
      symptom_wood: ['', Validators.required],
      symptom_other: ['', Validators.required],

      distribution_localized: ['', Validators.required],
      distributed_scattered: ['', Validators.required],
      distributed_general: ['', Validators.required],

      conditions_affected: ['', Validators.required],
      conditions_problem_noticed: ['', Validators.required],
      conditions_date_planted: ['', Validators.required],
      conditions_weather_disturbances: ['', Validators.required],
      conditions_weather_prior: ['', Validators.required],
      conditions_others: ['', Validators.required],
      conditions_additional: ['', Validators.required]
=======
  plantationAddress: Interface.Address;
  plantationLocation: Interface.Location;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of SampleFormComponent.
   * 
   * @param {AuthenticationService} authService Used for all authentication and session control
   * @param {DiagnosticClinicAPIService} clinicService Used for making calls to the Diagnostic Clinic API Service
   * @param {FormBuilder} formBuilder Used to build the HTML form
   * @param {MatSnackBar} snackBar Used to create pop-up notifications for the user
   * @param {MatDialog} dialog Used to create pop-up notifications for the user
   * @param {Router} router
   * @param {Injector} injector Used to pass data between this component and the pre-diagnosis component
   * 
   * @memberof SampleFormComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService, 
    private clinicService: DiagnosticClinicAPIService,
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, 
    private dialog: MatDialog, 
    private injector: Injector, 
    private router: Router
    ) {
      this.sampleForm = this.formBuilder.group({

      // Sample Details
      sample_plant_species: [''],
      sample_num_samples: [''],
      date_sample_collected: [''],
      date_sample_sent: [],
      
      // Plantation Details
      sample_street: [''],
      sample_area: [''],
      sample_city: [''],
      sample_farm: [''],
      sample_province: [''],
      sample_gps: [''],

      // Type of Sample
      sample_type_soil: [''],
      sample_type_stems: [''],
      sample_type_roots: [''],
      sample_type_twigs: [''],
      sample_type_leaves: [''],
      sample_type_seedlings: [''],
      sample_type_media: [''],
      sample_type_water: [''],
      sample_type_insect: [''],
      sample_type_nuts: [''],
      sample_type_other: [''],

      // Symptoms
      symptom_wilt: [''],
      symptom_stunting: [''],
      symptom_leafspot: [''],
      symptom_rootrot: [''],
      symptom_dieback: [''],
      symptom_cankers: [''],
      symptom_death: [''],
      symptom_wood: [''],
      symptom_other: [''],

      // Distribution of Symptoms
      distribution_localized: [''],
      distributed_scattered: [''],
      distributed_general: [''],
      distributed_clumps: [''],
      distributed_na: [''],
      distributed_other: [''],
      percentage_plants_affected: [''],

      // Conditions
      conditions_date_problem_noticed: [''],
      conditions_date_planted: [''],
      conditions_weather_disturbances: [''],
      conditions_weather_prior: [''],
      conditions_others: [''],
      conditions_additional: [''],

      // Permission
      landowner_name: [''],
      permission_granted: [''] 
>>>>>>> develop
    })
  }


  ngOnInit() {
    let today = new Date();
    this.sampleForm.patchValue( {
      date_sample_sent: today
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      SEND FORM
  /**
   *  This function will be used to submit the sample form to the API service so that it can be stored in the database.
   * 
   * @memberof SampleFormComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  sendForm() {
    this.submitted = true;

    const formDetails: Interface.SampleFormData = {
      // Sample Details
      sample_plant_species: this.sampleForm.controls.sample_plant_species.value,
      sample_num_samples: this.sampleForm.controls.sample_num_samples.value,
      date_sample_collected: this.sampleForm.controls.date_sample_collected.value,
      date_sample_sent: this.sampleForm.controls.date_sample_sent.value,

      // Plantation Details
      sample_street: this.sampleForm.controls.sample_street.value,
      sample_area: this.sampleForm.controls.sample_area.value,
      sample_city: this.sampleForm.controls.sample_city.value,
      sample_farm: this.sampleForm.controls.sample_farm.value,
      sample_province: this.sampleForm.controls.sample_province.value,
      sample_gps: this.sampleForm.controls.sample_gps.value,

      // Type of Sample
      sample_type_soil: this.sampleForm.controls.sample_type_soil.value,
      sample_type_stems: this.sampleForm.controls.sample_type_stems.value,
      sample_type_roots: this.sampleForm.controls.sample_type_roots.value,
      sample_type_twigs: this.sampleForm.controls.sample_type_twigs.value,
      sample_type_leaves: this.sampleForm.controls.sample_type_leaves.value,
      sample_type_seedlings: this.sampleForm.controls.sample_type_seedlings.value,
      sample_type_media: this.sampleForm.controls.sample_type_media.value,
      sample_type_water: this.sampleForm.controls.sample_type_water.value,
      sample_type_insect: this.sampleForm.controls.sample_type_insect.value,
      sample_type_nuts: this.sampleForm.controls.sample_type_nuts.value,
      sample_type_other: this.sampleForm.controls.sample_type_other.value,

      // Symptoms
      symptom_wilt: this.sampleForm.controls.symptom_wilt.value,
      symptom_stunting: this.sampleForm.controls.symptom_stunting.value,
      symptom_leafspot: this.sampleForm.controls.symptom_leafspot.value,
      symptom_rootrot: this.sampleForm.controls.symptom_rootrot.value,
      symptom_dieback: this.sampleForm.controls.symptom_dieback.value,
      symptom_cankers: this.sampleForm.controls.symptom_cankers.value,
      symptom_death: this.sampleForm.controls.symptom_death.value,
      symptom_wood: this.sampleForm.controls.symptom_wood.value,
      symptom_other: this.sampleForm.controls.symptom_other.value,

      // Distribution of Symptoms
      distribution_localized: this.sampleForm.controls.distribution_localized.value,
      distributed_scattered: this.sampleForm.controls.distributed_scattered.value,
      distributed_general: this.sampleForm.controls.distributed_general.value,
      distributed_clumps: this.sampleForm.controls.distributed_clumps.value,
      distributed_na: this.sampleForm.controls.distributed_na.value,
      distributed_other: this.sampleForm.controls.distributed_other.value,
      percentage_plants_affected: this.sampleForm.controls.percentage_plants_affected.value,

      // Conditons
      conditions_date_problem_noticed: this.sampleForm.controls.conditions_date_problem_noticed.value,
      conditions_date_planted: this.sampleForm.controls.conditions_date_planted.value,
      conditions_weather_disturbances: this.sampleForm.controls.conditions_weather_disturbances.value,
      conditions_weather_prior: this.sampleForm.controls.conditions_weather_prior.value,
      conditions_others: this.sampleForm.controls.conditions_others.value,
      conditions_additional: this.sampleForm.controls.conditions_additional.value,

      // Permissions
      landowner_name: this.sampleForm.controls.landowner_name.value,
      permission_granted: this.sampleForm.controls.permission_granted.value
    };

<<<<<<< HEAD
    const orgDetails: OrganizationInfo = { orgName: this.sampleForm.controls.organization.value };


    this.service.submitSampleForm(orgDetails, formDetails).subscribe((response: any) => {
      console.log("HERE");
      if (response.success == true) {
=======
    // const orgDetails: Interface.Organisation = { orgName: this.authService.getCurrentSessionValue.user.organisation };

    this.clinicService.submitSampleForm(formDetails).subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
>>>>>>> develop
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Successfully Submitted Form", "Dismiss", {
          duration: 3000
        });

<<<<<<< HEAD
        console.log("Reference Number : " + response.data.content.referenceNumber);
=======
        // console.log(JSON.stringify(response));
        //Set pre-diagnosis
        localStorage.setItem('pre-diagnosis', response.data.prediagnosis);
>>>>>>> develop

        //Navigate to the pre-diagnosis 
        this.router.navigate(['/pre-diagnosis']);
      } 
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error: "Could Not Submit Form", message: response.message } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.sendForm();
          }
          //Take out when authenication is working - Just for test/demp purposes
          //this.router.navigate(['sample-form']);
          //
        })
      }
    }, (err: HttpErrorResponse) => {
      //POPUP MESSAGE
      let dialogRef = this.dialog.open(ErrorComponent, { data: { error: "Could Not Submit Form", message: err.message } });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == "Retry") {
          this.sendForm();
        }
        //Take out when authenication is working - Just for test/demp purposes
        //this.router.navigate(['sample-form']);
        //
      });
    })

  }

<<<<<<< HEAD
  ngOnInit() {
    this.adminServce.getAllOrganizations().subscribe((response:any) => {
      if(response.success == true) {
        // var orgs = response.data.content.qs.Organizations;
        // forEach(var i in orgs)
        // {
        //   this.organizations.push(i);
        // }
        this.organizations = response.data.content.qs.Organizations;
        
      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, {data: {error: "Could Not Load Organizations", message: response.error.message}});
        dialogRef.afterClosed().subscribe((result) => {
          if(result == "Retry") {
            this.ngOnInit();
          }
        })
      }    
    }, (err: HttpErrorResponse) => {
      //POPUP MESSAGE
      let dialogRef = this.dialog.open(ErrorComponent, {data: {error: "Could Not Load Organizations", message: err.message}});
      dialogRef.afterClosed().subscribe((result) => {
        if(result == "Retry") {
          this.ngOnInit();
        }
      })
      console.log("ERROR:" + err.message);
    })
  }
=======
>>>>>>> develop

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SELECT LOCATION
  /**
   *  This function is used to get the location of where the user took the sample.
   * 
   * @memberof SampleFormComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  selectLocation() {
    let mapRef = this.dialog.open(MapsWindowComponent, { height: '80%', width: '80%'});
    
    mapRef.afterClosed().subscribe((data) => {
      this.plantationAddress = data.address;
      this.plantationLocation = data.location; 

      this.sampleForm.patchValue( {
        sample_street: this.plantationAddress.street,
        sample_area: this.plantationAddress.area,
        sample_city: this.plantationAddress.city,
        sample_province: this.plantationAddress.province,
        sample_gps: `${this.plantationLocation.latitude},${this.plantationLocation.longitude}`,
      });

      this.sampleForm.get('sample_street').disable();
      this.sampleForm.get('sample_area').disable();
      this.sampleForm.get('sample_city').disable();
      this.sampleForm.get('sample_province').disable();
      this.sampleForm.get('sample_gps').disable();
      this.sampleForm.get('date_sample_sent').disable();  
    });
  }
}

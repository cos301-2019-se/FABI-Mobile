/**
 * File Name: sample-form.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\sample-form\sample-form.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, October 9th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import * as core from '@agm/core';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { MapsWindowComponent } from '../maps-window/maps-window.component';
import * as Interface from '../_interfaces/interfaces';
import { LoadingComponent } from '../_loading/loading.component';
import { AuthenticationService } from '../_services/authentication.service';
import { DiagnosticClinicAPIService } from '../_services/diagnostic-clinic-api.service';
import { NotificationService } from '../_services/notification.service';

/** Global declaration of 'google' so that it can be used throught this page - @type {any} */
declare var google: any;

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
  plantationAddress: Interface.Address;
  plantationLocation: Interface.Location;
  sampleDetails: boolean = false;
  sampleType: boolean = false;
  symptoms: boolean = false;
  symptomDistribution: boolean = false;
  /** The location in longitude and latitude - @type {Interface.Location} */
  public location: Interface.Location = { latitude: 0, longitude: 0 };
  /** The address that contains the street name, city, province, and country - @type {Interface.Address} */
  public address: Interface.Address = { street: '', city: '', province: '', country: '', formatted_address: '' };
  private geocoder: any;
  sampleTypesSelected: string[] = [];

  /** Specifies what step of the form the user is on - @type {boolean} */
  stepOneContent: boolean = false;
  stepTwoContent: boolean = false;
  stepThreeContent: boolean = false;
  stepFourContent: boolean = false;
  stepFiveContent: boolean = false;

  sample_types: any = [
    {
      value: "soil",
      name: "Soil",
    },
    {
      value: "stems",
      name: "Stems"
    },
    {
      value: "root",
      name: "root"
    },
    {
      value: "twigs",
      name: "Twigs/Branches"
    },
    {
      value: "leaves",
      name: "Leaves/Needles"
    },
    {
      value: "seedlings",
      name: "Seedlings/Cuttings"
      // name: "Seed/Cuttings"
    },
    {
      value: "media",
      name: "Media Plates"
    },
    {
      value: "water",
      name: "Water"
    },
    {
      value: "insect",
      name: "Insect Specimens"
    },
    {
      value: "nuts",
      name: "Nuts"
    },
    {
      value: "rootcollar",
      name: "Root-Collar"
    }
  ]

  type_symptoms: any = [
    {
      value: "wilted",
      name: "Wilted"
    },
    {
      value: "Stunting",
      name: "Stunting"
    },
    {
      value: "Dry",
      name: "Dry"
    },
    {
      value: "Leaf Spot",
      name: "Leaf Spot"
    },
    {
      value: "Root Rot",
      name: "Root Rot"
    },
    {
      value: "Die-back",
      name: "Die-back"
    },
    {
      value: "Cankers",
      name: "Cankers"
    },
    {
      value: "Death",
      name: "Death"
    },
    {
      value: "Wood Borer Damage/Holes/Tunnels/Frass(sawdust)",
      name: "Wood Borer Damage/Holes/Tunnels/Frass(sawdust)"
    }
  ]

  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of SampleFormComponent.
   * 
   * @param {AuthenticationService} authService for calling the *authentication* service
   * @param {DiagnosticClinicAPIService} clinicService Used for making calls to the Diagnostic Clinic API Service
   * @param {Location} pageLocation Used to navigate back to the previous page
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
    private pageLocation: Location,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private mapLoader: core.MapsAPILoader,
    private ngZone: NgZone,
    private notificationService: NotificationService
  ) {
    this.sampleForm = this.formBuilder.group({

      // Sample Details
      sample_details: this.formBuilder.group({
        plant_species: ['', Validators.required],
        plant_genus: ['', Validators.required],
        num_samples: ['', Validators.required],
        date_collected: ['', Validators.required],
        date_sent: ['', Validators.required],
      }),

      // Plantation Details
      plantation_details: this.formBuilder.group({
        street: ['', Validators.required],
        area: ['', Validators.required],
        city: ['', Validators.required],
        farm: ['', Validators.required],
        province: ['', Validators.required],
        gps: ['', Validators.required],
      }),

      // Type of Sample
      types: this.formBuilder.group({
        set_types: new FormArray([]),
        other: [''],
      }, { validator: this.requireCheckboxesToBeCheckedValidator() }),

      // Symptoms
      symptoms: this.formBuilder.group({
        soil: new FormArray([]),
        stems: new FormArray([]),
        root: new FormArray([]),
        twigs: new FormArray([]),
        leaves: new FormArray([]),
        seedlings: new FormArray([]),
        media: new FormArray([]),
        water: new FormArray([]),
        insect: new FormArray([]),
        nuts: new FormArray([]),
        rootcollar: new FormArray([]),
        // other: new FormArray([]),
      }, { validator: this.requireCheckboxesToBeCheckedValidator() }),

      // Distribution of Symptoms
      distribution: this.formBuilder.group({
        localized: [false],
        scattered: [false],
        general: [false],
        clumps: [false],
        na: [false],
        other: [''],
      }, { validator: this.requireCheckboxesToBeCheckedValidator() }),

      // Percentage of plants affected
      percentage_plants_affected: ['', Validators.required],

      // Conditions
      conditions: this.formBuilder.group({
        date_problem_noticed: ['', Validators.required],
        date_planted: ['', Validators.required],
        weather_disturbances: ['', Validators.required],
        weather_prior: ['', Validators.required],
        others: ['', Validators.required],
        additional: [''],
      }),

      // Permission
      permissions: this.formBuilder.group({
        landowner_name: ['', Validators.required],
        permission_granted: ['', Validators.required]
      })
    })
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @memberof SampleFormComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.currentUser = this.authService.getCurrentSessionValue.user;

    this.mapLoader.load().then(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: Position) => {
          if (position) {
            this.location.latitude = position.coords.latitude;
            this.location.longitude = position.coords.longitude;
            this.plantationLocation = this.location;
            this.getAddress(this.location.latitude, this.location.longitude);
          }
        }, (error: PositionError) => console.log(error));
      } else {
        alert("Geolocation is not supported by this browser.");
      }

      this.geocoder = new google.maps.Geocoder;
    });


    let today: Date = new Date();

    this.sampleForm.patchValue({
      sample_details: {
        date_sent: today.toISOString().substring(0, 10)
      }
    });

    this.sample_types.map(() => {
      const control = new FormControl(false);
      (this.sampleForm.get('types').get('set_types') as FormArray).push(control)
    });

    this.type_symptoms.map(() => {
      const control = new FormControl(false);
      (this.sampleForm.get('symptoms').get('soil') as FormArray).push(control)
    });
    this.type_symptoms.map(() => {
      const control = new FormControl(false);
      (this.sampleForm.get('symptoms').get('stems') as FormArray).push(control)
    });
    this.type_symptoms.map(() => {
      const control = new FormControl(false);
      (this.sampleForm.get('symptoms').get('root') as FormArray).push(control)
    });
    this.type_symptoms.map(() => {
      const control = new FormControl(false);
      (this.sampleForm.get('symptoms').get('twigs') as FormArray).push(control)
    });
    this.type_symptoms.map(() => {
      const control = new FormControl(false);
      (this.sampleForm.get('symptoms').get('leaves') as FormArray).push(control)
    });
    this.type_symptoms.map(() => {
      const control = new FormControl(false);
      (this.sampleForm.get('symptoms').get('media') as FormArray).push(control)
    });
    this.type_symptoms.map(() => {
      const control = new FormControl(false);
      (this.sampleForm.get('symptoms').get('seedlings') as FormArray).push(control)
    });
    this.type_symptoms.map(() => {
      const control = new FormControl(false);
      (this.sampleForm.get('symptoms').get('water') as FormArray).push(control)
    });
    this.type_symptoms.map(() => {
      const control = new FormControl(false);
      (this.sampleForm.get('symptoms').get('insect') as FormArray).push(control)
    });
    this.type_symptoms.map(() => {
      const control = new FormControl(false);
      (this.sampleForm.get('symptoms').get('nuts') as FormArray).push(control)
    });
    this.type_symptoms.map(() => {
      const control = new FormControl(false);
      (this.sampleForm.get('symptoms').get('rootcollar') as FormArray).push(control)
    });

    this.stepOneContent = true;
    this.sampleDetails = true;
    this.symptoms = true;
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
    // this.submitted = true;

    // if (this.sampleForm.invalid) {
    //   return;
    // }

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Updating Password" } });

    let types: Interface.SampleTypeDescription[] = [];

    this.sampleTypesSelected.forEach((type: any) => {

      let symptoms: string[] = [];

      this.sampleForm.get('symptoms').get(type.value).value.forEach((value, i) => {

        if (value == true) {
          symptoms.push(this.type_symptoms[i].value);
        }

      });

      let typeDescription: Interface.SampleTypeDescription = {
        type: type.name,
        symptoms: symptoms.join()
      };

      types.push(typeDescription);
    });


    const formDetails: Interface.SampleFormData = {
      // Sample Details
      sample_details: {
        plant_species: this.sampleForm.get('sample_details').get('plant_species').value,
        plant_genus: this.sampleForm.get('sample_details').get('plant_genus').value,
        num_samples: this.sampleForm.get('sample_details').get('num_samples').value,
        date_collected: this.sampleForm.get('sample_details').get('date_collected').value,
        date_sent: this.sampleForm.get('sample_details').get('date_sent').value,
      },

      // Plantation Details
      plantation_details: {
        street: this.sampleForm.get('plantation_details').get('street').value,
        area: this.sampleForm.get('plantation_details').get('area').value,
        city: this.sampleForm.get('plantation_details').get('city').value,
        farm: this.sampleForm.get('plantation_details').get('farm').value,
        province: this.sampleForm.get('plantation_details').get('province').value,
        gps: this.sampleForm.get('plantation_details').get('gps').value
      },

      // Type of Sample
      types: types,

      // Distribution of Symptoms
      distribution: "",

      percentage_plants_affected: "",

      // Conditons
      conditions: {
        date_problem_noticed: this.sampleForm.get('conditions').get('date_problem_noticed').value,
        date_planted: this.sampleForm.get('conditions').get('date_planted').value,
        weather_disturbances: this.sampleForm.get('conditions').get('weather_disturbances').value,
        weather_prior: this.sampleForm.get('conditions').get('weather_prior').value,
        others: this.sampleForm.get('conditions').get('others').value,
        additional: this.sampleForm.get('conditions').get('additional').value
      },

      // Permissions
      permissions: {
        landowner_name: this.sampleForm.get('permissions').get('landowner_name').value,
        permission_granted: this.sampleForm.get('permissions').get('permission_granted').value
      }

    };

    this.clinicService.submitSampleForm(formDetails).subscribe((response: any) => {

      loadingRef.close();

      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        this.notificationService.showSuccessNotification('Sample Form Sent', 'Please see your email for reference number');

        //Set pre-diagnosis
        localStorage.setItem('pre-diagnosis', response.data.prediagnosis);

        if (this.currentUser.organisation == 'FABI') {
          //Navigate to the pre-diagnosis 
          this.router.navigate(['/pre-diagnosis']);
        }
        else {
          this.pageLocation.back();
        }
      }
      else if (response.success == false) {
        //POPUP MESSAGE
        this.notificationService.showErrorNotification('Error', 'An error occurred while trying to send sample form');
      }
    }, (err: HttpErrorResponse) => {
      loadingRef.close();
      //Handled in error-handler
      this.notificationService.showErrorNotification('Error', 'An error occurred while trying to send sample form');
    })

  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SELECT LOCATION
  /**
   *  This function is used to get the location of where the user took the sample.
   * 
   * @memberof SampleFormComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  selectLocation() {
    let mapRef = this.dialog.open(MapsWindowComponent, { height: '80%', width: '80%' });

    mapRef.afterClosed().subscribe((data) => {

      if (data.address && data.location) {
        this.plantationAddress = data.address;
        this.plantationLocation = data.location;

        this.sampleForm.patchValue({
          plantation_details: {
            street: this.plantationAddress.street,
            area: this.plantationAddress.area,
            city: this.plantationAddress.city,
            province: this.plantationAddress.province,
            gps: `${this.plantationLocation.latitude},${this.plantationLocation.longitude}`
          }
        });

        // this.sampleForm.get('plantation_details').disable();
        this.sampleForm.get('plantation_details').get('farm').enable();
      }

    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         GET ADDRESS  
  /**
   * This function is used to get the address based on the longitude and latitude provided.
   * 
   * @memberof MapsWindowComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAddress(latitude, longitude) {
    this.geocoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          let address_details = results[0];

          this.address.formatted_address = address_details.formatted_address;

          address_details.address_components.forEach(component => {
            if (component.types[0] == "street_number") {
              this.address.street_number = component.long_name;

            } else if (component.types[0] == "route") {
              this.address.street = component.long_name;

            } else if (component.types[0] == "sublocality" || component.types[0] == "political") {

              if (component.types[1] == "sublocality") {
                this.address.area = component.long_name;
              }

            } else if (component.types[0] == "locality") {
              this.address.city = component.long_name;

            } else if (component.types[0] == "administrative_area_level_1") {
              this.address.province = component.long_name;

            } else if (component.types[0] == "country") {
              this.address.country = component.long_name;

            } else if (component.types[0] == "postal_code") {
              this.address.postal_code = component.long_name;
            }
          });

          this.plantationAddress = this.address;

          this.sampleForm.patchValue({
            plantation_details: {
              street: this.plantationAddress.street,
              area: this.plantationAddress.area,
              city: this.plantationAddress.city,
              province: this.plantationAddress.province,
              gps: `${this.plantationLocation.latitude},${this.plantationLocation.longitude}`
            }
          });

          // this.sampleForm.get('plantation_details').disable();
          this.sampleForm.get('plantation_details').get('farm').enable();

        } else {
          window.alert('No results found for location address');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          SELECT SAMPLE TYPES
  /**
   * This functions  dynamically adds the users selected sample types to the symptoms section on the form, so a user can select 
   *  symptoms for each type
   *
   * @memberof SampleFormComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  selectSampleType() {
    this.sampleTypesSelected = [];

    this.sampleForm.get('types').get('set_types').value.forEach((value, i) => {
      if (value == true) {
        this.sampleTypesSelected.push(this.sample_types[i]);
      }
    });

    let types = this.sampleForm.get('types').value;

    for (const key in types) {
      if (types.hasOwnProperty(key)) {
        if (key == 'other' && (types[key] != '' && types[key] != ' ' && types[key] != null)) {
          this.sampleTypesSelected.push(types[key]);
        } else if (types[key] == true) {
          this.sampleTypesSelected.push(key);
        }
      }
    }

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CHECKBOX VALIDATOR
  /**
   * This function validates if the minimum nymber of checkboxes have been checked on the sample form.
   *
   * @param {number} [minRequired=1]
   * @returns {ValidatorFn}
   * @memberof SampleFormComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
    return function validate(formGroup: FormGroup) {
      let checked = 0;

      Object.keys(formGroup.controls).forEach(key => {

        const control = formGroup.controls[key];

        if (((control.value).length > 1)) {

          for (const key in control.value) {

            if (control.value.hasOwnProperty(key)) {
              if (control.value[key] === true || (control.value[key] != '' && control.value[key] != ' ' && control.value[key] != null)) {
                checked++;
              }
            }
          }
        } else {
          if (control.value == true || (control.value != '' && control.value != ' ' && control.value != null)) {
            checked++;
          }
        }
      });

      if (checked < minRequired) {
        return {
          requireCheckboxesToBeChecked: true,
        };
      }

      return null;
    };
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        FORM INTERFACE CHANGES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  showStepTwo() {
    if (this.sampleForm.get('plantation_details').invalid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;

    this.stepOneContent = false;
    this.stepTwoContent = true;
    this.stepThreeContent = false;
    this.stepFourContent = false;
    this.stepFiveContent = false;

    $('#step-two-number').addClass('active');

    $('#step-one-number').removeClass('active');
    $('#step-three-number').removeClass('active');
    $('#step-four-number').removeClass('active');
    $('#step-five-number').removeClass('active');

    $('#step-two-description').addClass('active');

    $('#step-one-description').removeClass('active');
    $('#step-three-description').removeClass('active');
    $('#step-four-description').removeClass('active');
    $('#step-five-description').removeClass('active');

  }

  showStepOne() {
    this.stepOneContent = true;
    this.stepTwoContent = false;
    this.stepThreeContent = false;
    this.stepFourContent = false;
    this.stepFiveContent = false;

    $('#step-one-number').addClass('active');

    $('#step-two-number').removeClass('active');
    $('#step-three-number').removeClass('active');
    $('#step-four-number').removeClass('active');
    $('#step-five-number').removeClass('active');

    $('#step-one-description').addClass('active');

    $('#step-two-description').removeClass('active');
    $('#step-three-description').removeClass('active');
    $('#step-four-description').removeClass('active');
    $('#step-five-description').removeClass('active');
  }

  showSampleDetails() {
    this.sampleDetails = true;
    this.sampleType = false;

    $('#sample-type-link').removeClass('active');
    $('#sample-details-link').addClass('active');
  }

  showSampleType() {
    this.sampleDetails = false;
    this.sampleType = true;

    $('#sample-details-link').removeClass('active');
    $('#sample-type-link').addClass('active');

  }

  showStepThree() {
    if (this.sampleForm.get('sample_details').invalid || this.sampleForm.get('types').invalid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;

    this.stepOneContent = false;
    this.stepTwoContent = false;
    this.stepThreeContent = true;
    this.stepFourContent = false;
    this.stepFiveContent = false;

    $('#step-three-number').addClass('active');

    $('#step-one-number').removeClass('active');
    $('#step-two-number').removeClass('active');
    $('#step-four-number').removeClass('active');
    $('#step-five-number').removeClass('active');

    $('#step-three-description').addClass('active');

    $('#step-one-description').removeClass('active');
    $('#step-two-description').removeClass('active');
    $('#step-four-description').removeClass('active');
    $('#step-five-description').removeClass('active');
  }


  showSymptoms() {
    this.symptoms = true;
    this.symptomDistribution = false;

    $('#symptom-distribution-link').removeClass('active');
    $('#symptoms-link').addClass('active');
  }

  showSymptomDistribution() {
    this.symptoms = false;
    this.symptomDistribution = true;

    $('#symptoms-link').removeClass('active');
    $('#symptom-distribution-link').addClass('active');
  }

  showStepFour() {
    // if (this.sampleForm.get('symptoms').invalid || this.sampleForm.get('distribution').invalid) {
    //   this.submitted = true;
    //   return;
    // }
    this.submitted = false;

    this.stepOneContent = false;
    this.stepTwoContent = false;
    this.stepThreeContent = false;
    this.stepFourContent = true;
    this.stepFiveContent = false;

    $('#step-four-number').addClass('active');

    $('#step-one-number').removeClass('active');
    $('#step-two-number').removeClass('active');
    $('#step-three-number').removeClass('active');
    $('#step-five-number').removeClass('active');

    $('#step-four-description').addClass('active');

    $('#step-one-description').removeClass('active');
    $('#step-two-description').removeClass('active');
    $('#step-three-description').removeClass('active');
    $('#step-five-description').removeClass('active');
  }

  showStepFive() {
    if (this.sampleForm.get('conditions').invalid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;

    this.stepOneContent = false;
    this.stepTwoContent = false;
    this.stepThreeContent = false;
    this.stepFourContent = false;
    this.stepFiveContent = true;

    $('#step-five-number').addClass('active');

    $('#step-one-number').removeClass('active');
    $('#step-two-number').removeClass('active');
    $('#step-three-number').removeClass('active');
    $('#step-four-number').removeClass('active');

    $('#step-five-description').addClass('active');

    $('#step-one-description').removeClass('active');
    $('#step-two-description').removeClass('active');
    $('#step-three-description').removeClass('active');
    $('#step-four-description').removeClass('active');
  }

}

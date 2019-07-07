// import { ClientFormData } from '../organization-api.service';
import * as Interface from '../interfaces/interfaces';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpService } from '../services/http.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../errors/error-component/error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SampleFormComponent implements OnInit {

  sampleForm: FormGroup;             // FormGroup object to reference add user type form
  submitted: boolean = false;       // if form has been submitted
  success: boolean = false;         // if form was succesfully filled out
  sent: boolean = false;                // to check if user is logged in
  errors: boolean = false;
  organizations: Object;            //array for Organization dropdown

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

  constructor(private service: HttpService, private adminServce: HttpService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) {
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
    })
  }

  sendForm() {
    // this.submitted = true;

    // if (this.sampleForm.invalid) {
    //   this.errors = true;
    //   return;
    // }

    this.success = true;

    const formDetails: Interface.ClientFormData = {

      tree_species : this.sampleForm.controls.sample_form_tree_species.value,
      number_samples : this.sampleForm.controls.sample_form_number_samples.value,
      location1 : this.sampleForm.controls.sample_form_location1.value,
      location2 : this.sampleForm.controls.sample_form_location2.value,
      compartment : this.sampleForm.controls.sample_form_compartment.value,

      gps : this.sampleForm.controls.sample_form_gps.value,
      date_collection : this.sampleForm.controls.sample_form_date_collection.value,
      date_sent : this.sampleForm.controls.sample_form_date_sent.value,

      type_soil : this.sampleForm.controls.sample_type_soil.value,
      type_stems : this.sampleForm.controls.sample_type_stems.value,
      type_roots : this.sampleForm.controls.sample_type_roots.value,
      type_twigs : this.sampleForm.controls.sample_type_twigs.value,
      type_leaves : this.sampleForm.controls.sample_type_leaves.value,
      type_seedlings : this.sampleForm.controls.sample_type_seedlings.value,
      type_media : this.sampleForm.controls.sample_type_media.value,
      type_water : this.sampleForm.controls.sample_type_water.value,

      symptom_wilt : this.sampleForm.controls.symptom_wilt.value,
      symptom_stunting : this.sampleForm.controls.symptom_stunting.value,
      symptom_leafspot : this.sampleForm.controls.symptom_leafspot.value,
      symptom_rootrot : this.sampleForm.controls.symptom_rootrot.value,
      symptom_dieback : this.sampleForm.controls.symptom_dieback.value,
      symptom_cankers : this.sampleForm.controls.symptom_cankers.value,
      symptom_death : this.sampleForm.controls.symptom_death.value,
      symptom_wood : this.sampleForm.controls.symptom_wood.value,
      symptom_other : this.sampleForm.controls.symptom_other.value,

      distribution_localized : this.sampleForm.controls.distribution_localized.value,
      distribution_scattered : this.sampleForm.controls.distributed_scattered.value,
      distribution_general : this.sampleForm.controls.distributed_general.value,

      conditions_affected : this.sampleForm.controls.conditions_affected.value,
      conditions_problem_noticed : this.sampleForm.controls.conditions_problem_noticed.value,
      conditions_date_planted : this.sampleForm.controls.conditions_date_planted.value,
      conditions_weather_disturbance : this.sampleForm.controls.conditions_weather_disturbances.value,
      conditions_weather_prior : this.sampleForm.controls.conditions_weather_prior.value,
      conditions_other : this.sampleForm.controls.conditions_others.value,
      conditions_additional : this.sampleForm.controls.conditions_additional.value,
    };

    const orgDetails: Interface.Organisation = { orgName: localStorage.getItem('orgName') };


    this.service.submitSampleForm(orgDetails, formDetails).subscribe((response: any) => {
      console.log("HERE");
      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Successfully Submitted Form", "Dismiss", {
          duration: 3000
        });

        console.log("Reference Number : " + response.data.referenceNumber);

      } else if (response.success == false) {
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
      })
      console.log("ERROR:" + err.message);
    })

  }

  ngOnInit() {

  }

}

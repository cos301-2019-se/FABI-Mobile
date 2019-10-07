/**
 * File Name: clinic-admin-view-samples.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\NEW\FABI-Mobile\FABI-Web\src\app\Admin\clinic-admin-view-samples\clinic-admin-view-samples.component.ts
 * Project Name: fabi-web
 * Created Date: Monday, August 19th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Sunday, October 6th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as core from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { LoadingComponent } from 'src/app/_loading/loading.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosticClinicAPIService } from 'src/app/_services/diagnostic-clinic-api.service';

@core.Component({
  selector: 'app-clinic-admin-view-samples',
  templateUrl: './clinic-admin-view-samples.component.html',
  styleUrls: ['./clinic-admin-view-samples.component.scss']
})
export class ClinicAdminViewSamplesComponent implements core.OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */
  private toggle_status: boolean = false;
  /** The search item the user is looking for in the table -  @type {string} */
  public searchSample: string = "";
  statusTypes = ["complete", "submitted", "diagnosing"];
  updateSampleStatusForm: FormGroup;
  editingSample: any;
  isEditingSample: boolean = false;
  sampleFields: any[] = [];
  samples: any[];
  selectedSampleData: any
  /** Specifies if the list of samples have been retreived to disable the loading spinner - @type {boolean} */
  sampleTableLoading: boolean = true;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of ClinicAdminViewSamplesComponent.
   * @param {AuthenticationService} authService for calling the *authentication* service
   * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API service
   * @param {MatDialog} dialog For pop-up dialogs
   * @param {Router} router for routing/navigating to other components
   * 
   * @memberof ClinicAdminViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService,
    private diagnosticClinicService: DiagnosticClinicAPIService,
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.updateSampleStatusForm = this.formBuilder.group({
      sample_status: ['', Validators.required]
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                           NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call viewSamples()
   * @memberof ClinicAdminViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    //Calling the neccessary functions as the page loads
    this.viewSamples();
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    TOGGLE NOTIFICATIONS TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof ClinicAdminViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab() {
    this.toggle_status = !this.toggle_status;
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof ClinicAdminViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            VIEW SAMPLES 
  /**
   * This function will be used to load all of the samples belonging to all organization into the HTML page
   * 
   * @memberof ClinicAdminViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  viewSamples() {

    this.diagnosticClinicService.getAllSamples().subscribe((response: any) => {

      if (response.success == true && response.code == 200) {

        this.samples = response.data.samples;

        //Deactivate loading table spinners
        this.sampleTableLoading = false;

      } else if (response.success == false) {
        //POPUP MESSAGE
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            SELECT SAMPLE 
  /**
   * Called when a user selects a sample and sets the selected sample as well as it's data fields
   *
   * @param {*} sample
   * @memberof ClinicAdminViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  selectSample(sample: any) {
    this.selectedSampleData = sample.data;
    Object.keys(this.selectedSampleData).forEach((column) => {

      let obj = {
        'name': column
      }
      this.sampleFields.push(obj);
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            RESET SAMPLE FIELDS 
  /**
   * Resets the display fields for the sample
   *
   * @memberof ClinicAdminViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  resetSampleFields() {
    this.sampleFields = [];
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          UPDATING SAMPLE STATUS ?
  /**
   *  Checks whether the user is updating the sample status. Used to update interface.
   *
   * @param {*} sample
   * @memberof ClinicAdminViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  updatingSampleStatus(sample: any) {
    this.editingSample = sample;
    this.isEditingSample = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          UPDATE SAMPLE STATUS
  /**
   * This function is used to update the sample status of a specific sample.
   *
   * @param {*} sample
   * @memberof ClinicAdminViewSamplesComponent
   */
  updateSampleStatus(sample: any) {

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Updating Sample Status" } });

    this.diagnosticClinicService.updateSamplesStatus(sample, this.updateSampleStatusForm.controls.sample_status.value).subscribe((response: any) => {

      if (response.success == true && response.code == 200) {

        loadingRef.close();

        this.viewSamples();

      } else if (response.success == false) {
        //POPUP MESSAGE
      }
    });
  }
}

/**
 * File Name: clinic-admin-view-samples.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\NEW\FABI-Mobile\FABI-Web\src\app\Admin\clinic-admin-view-samples\clinic-admin-view-samples.component.ts
 * Project Name: fabi-web
 * Created Date: Monday, August 19th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Saturday, October 5th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ErrorComponent } from 'src/app/_errors/error-component/error.component';
import { Router } from '@angular/router';
import { DiagnosticClinicAPIService } from 'src/app/_services/diagnostic-clinic-api.service';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingComponent } from 'src/app/_loading/loading.component';

@Component({
  selector: 'app-clinic-admin-view-samples',
  templateUrl: './clinic-admin-view-samples.component.html',
  styleUrls: ['./clinic-admin-view-samples.component.scss']
})
export class ClinicAdminViewSamplesComponent implements OnInit {

  sampleFields: any[] = [];
  samples: any[];
  selectedSampleData: any

  /** Specifies if the list of samples have been retreived to disable the loading spinner - @type {boolean} */
  sampleTableLoading: boolean = true;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

  /** The search item the user is looking for in the table -  @type {string} */
  public searchSample: string = "";

  statusTypes = ["complete", "submitted", "diagnosing"];

  updateSampleStatusForm: FormGroup;

  editingSample: any;

  isEditingSample: boolean = false;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of ClinicAdminViewSamplesComponent.
   * @param {AuthenticationService} authService Used for all authentication and session control
   * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API service
   * @param {MatDialog} dialog
   * @param {Router} router
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
   * 
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
  toggleNotificaitonsTab(){
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

  selectSample(sample: any) {

    this.selectedSampleData = sample.data;
        
    Object.keys(this.selectedSampleData).forEach((column) => {

      let obj = {
        'name': column
      }
      this.sampleFields.push(obj);

    });
        
  }

  resetSampleFields() {
    this.sampleFields = [];
  }

  updatingSampleStatus(sample: any) {
    this.editingSample = sample;
    this.isEditingSample = true;
  }

  updateSampleStatus(sample: any) {

    let loadingRef = this.dialog.open(LoadingComponent, {data: { title: "Updating Sample Status" }});

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

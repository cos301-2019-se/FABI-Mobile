/**
 * File Name: organization-view-samples.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization\organization-view-samples\organization-view-samples.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, October 10th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as http from '@angular/common/http';
import * as core from '@angular/core';
//Include Material Components
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosticClinicAPIService } from 'src/app/_services/diagnostic-clinic-api.service';
import { NotificationService } from 'src/app/_services/notification.service';


@core.Component({
  selector: 'app-organization-view-samples',
  templateUrl: './organization-view-samples.component.html',
  styleUrls: ['./organization-view-samples.component.scss'],
  encapsulation: core.ViewEncapsulation.None
})


export class OrganizationViewSamplesComponent implements core.OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  sampleFields: any[] = [];
  plantationFields: any[] = [];
  conditonsFields: any[] = [];
  typesFields: any[] = [];
  samples: any[];
  selectedSampleData: any;
  /** Specifies if the list of samples have been retreived to disable the loading spinner - @type {boolean} */
  sampleTableLoading: boolean = true;
  /** The search item the user is looking for in the table -  @type {string} */
  public searchSample: string = "";

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of OrganizationViewSamplesComponent.
   * @param {AuthenticationService} authService for calling the *authentication* service
   * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API service
   * @param {MatDialog} dialog
   * @param {Router} router
   * 
   * @memberof OrganizationViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService,
    private diagnosticClinicService: DiagnosticClinicAPIService,
    private dialog: MatDialog,
    private router: Router,
    private notificationService: NotificationService
  ) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                           NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call viewSamples()
   * 
   * @memberof OrganizationViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    //Calling the neccessary functions as the page loads
    this.viewSamples();
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof OrganizationViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            VIEW SAMPLES 
  /**
   * This function will be used to load all of the samples belonging to the organization into the HTML page
   * 
   * @memberof OrganizationViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  viewSamples() {

    this.diagnosticClinicService.retrieveAllOrganizationSamples().subscribe((response: any) => {

      if (response.success == true && response.code == 200) {

        this.samples = response.data.samples;
        //Deactivate loading table spinners
        this.sampleTableLoading = false;

      } else {
        //POPUP MESSAGE
        this.notificationService.showWarningNotification('Error', 'Could not load samples.');
      }
    }, (err: http.HttpErrorResponse) => {
      this.notificationService.showWarningNotification('Error', 'Could not load samples.');
      //Handled in error-handler
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            SELECT SAMPLE 
  /**
   * Called when a user selects a sample and sets the selected sample as well as it's data fields
   *
   * @param {*} sample
   * @memberof OrganizationViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  selectSample(sample: any) {

    this.selectedSampleData = sample.data.sample;

    Object.keys(this.selectedSampleData).forEach((column) => {

      if(column == "plantation_details") {
        Object.keys(this.selectedSampleData[column]).forEach((field) => {
          let obj = {
            'name': field,
            "data": this.selectedSampleData['plantation_details'][field]
          }
          this.plantationFields.push(obj);
        });
      }
      if(column == "sample_details") {
        Object.keys(this.selectedSampleData[column]).forEach((field) => {
          let obj = {
            'name': field,
            "data": this.selectedSampleData['sample_details'][field]
          }
          this.sampleFields.push(obj);
        });
      }
      if(column == "types") {
        // Object.keys(this.selectedSampleData[column]).forEach((field) => {
          this.selectedSampleData[column].forEach(element => {
            let obj = {
              'name': element['type'],
              "data": element['symptoms']
            }
            this.typesFields.push(obj);
          });
        // });
      }
      if(column == "conditions") {
        Object.keys(this.selectedSampleData[column]).forEach((field) => {
          let obj = {
            'name': field,
            "data": this.selectedSampleData['conditions'][field]
          }
          this.conditonsFields.push(obj);
        });
      }

    });

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            RESET SAMPLE FIELDS 
  /**
   * Resets the display fields for the sample
   *
   * @memberof OrganizationViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  resetSampleFields() {
    this.sampleFields = [];
  }

}

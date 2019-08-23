/**
 * File Name: organization-view-samples.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization\organization-view-samples\organization-view-samples.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, August 21st 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewEncapsulation } from '@angular/core';

//Include Material Components
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ErrorComponent } from 'src/app/_errors/error-component/error.component';
import { Router } from '@angular/router';
import { DiagnosticClinicAPIService } from 'src/app/_services/diagnostic-clinic-api.service';

@Component({
  selector: 'app-organization-view-samples',
  templateUrl: './organization-view-samples.component.html',
  styleUrls: ['./organization-view-samples.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class OrganizationViewSamplesComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  sampleFields: any[] = [];
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
   * @param {AuthenticationService} authService Used for all authentication and session control
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
    private router: Router
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

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Retrieving Samples", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.viewSamples();
          }
        })
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

}

/**
 * File Name: member-view-samples.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization-Member\member-view-samples\member-view-samples.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Monday, August 19th 2019
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
  selector: 'app-member-view-samples',
  templateUrl: './member-view-samples.component.html',
  styleUrls: ['./member-view-samples.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemberViewSamplesComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  sampleFields: any[] = [];
  samples: any[];
  selectedSampleData: any

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of MemberViewSamplesComponent.
   * @param {AuthenticationService} authService Used for all authentication and session control
   * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API service
   * @param {MatDialog} dialog
   * @param {Router} router
   * 
   * @memberof MemberViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService, 
    private diagnosticClinicService: DiagnosticClinicAPIService,
    private dialog: MatDialog, 
    private router: Router
    ) { }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  TOGGLE NOTIFICATIONS TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof MemberViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab(){
    this.toggle_status = !this.toggle_status; 
  }

  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call viewSamples()
   * 
   * @memberof MemberViewSamplesComponent
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
   * @memberof MemberViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            VIEW SAMPLES 
  /**
   * This function will be used to display all the samples associated with the user in the HTML page
   * 
   * @memberof MemberViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  viewSamples() {

    this.diagnosticClinicService.retrieveMemberSamples().subscribe((response: any) => {

      if (response.success == true && response.code == 200) {

        this.samples = response.data.samples;
        
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

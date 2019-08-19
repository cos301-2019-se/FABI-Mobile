/**
 * File Name: pre-diagnosis.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\pre-diagnosis\pre-diagnosis.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, August 18th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Sunday, August 19th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CultureCollectionAPIService } from '../_services/culture-collection-api.service';

@Component({
  selector: 'app-pre-diagnosis',
  templateUrl: './pre-diagnosis.component.html',
  styleUrls: ['./pre-diagnosis.component.scss']
})
export class PreDiagnosisComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** The pre-diagnosis to be placed in the HTML page - @type {string} */
  diagnosis: string;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
   * Creates an instance of PreDiagnosisComponent.
   * 
   * @param {CultureCollectionAPIService} cultureCollectionService For making calls to the Culture Collection API Service
   * @param {AuthenticationService} authService Used for all authentication and session control
   * 
   * @memberof PreDiagnosisComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService,
    private cultureCollectionService: CultureCollectionAPIService
  ) { }
  

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call getPreDiagnosis()
   * 
   * @memberof PreDiagnosisComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.getPreDiagnosis();
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      GET PRE DIAGNOSIS 
  /**
   * This function is used to get the pre-diagnosis of a sample that has been submitted.
   * 
   * @memberof PreDiagnosisComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getPreDiagnosis(){
    //Using the culture collection service to get the pre-diagnosis
    this.cultureCollectionService.getSamplePreDiagnosis().subscribe((response: any) => {
      if(response.success == true){

      }
      else{
        //Error handling
      }
    });
  }

}

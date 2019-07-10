/**
 * File Name: member-dashboard.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization-Member\member-dashboard\member-dashboard.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, July 10th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { SampleDivComponent } from '../../Dynamic-Components/sample-div/sample-div.component';
import { DiagnosticClinicAPIService, Sample, Species } from '../../services/diagnostic-clinic-api.service';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.scss']
})

export class MemberDashboardComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Holds the div element (sampleContainer) from the HTML page - @type {ElementRef} */
  @ViewChild('sampleContainer', {read: ViewContainerRef}) sampleContainer;

  /** The ID of the logged in member - @type {string} */ 
  memberID: string = '1234';

  /** Object array for holding the samples for the member -  @type {Sample[]} */               
  memberSamples: Sample[] = [];

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of MemberDashboardComponent.
   * @param {ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
   * @param {DiagnosticClinicAPIService} diagnosticClinicService For calling the Diagnostic Clinic API service
   * @memberof MemberDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private resolver: ComponentFactoryResolver, private diagnosticClinicService: DiagnosticClinicAPIService) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                            GET_NUMBER_OF_MEMBER_SAMPLES
  /**
   *  This function will use an API service to get all the samples of a member. These samples will be read into the
   *  'samples' Object. The function does not receive any parameters but it will populate a 'heading' element on the
   *  HTML page with the number of samples belonging to the member.
   * 
   * @memberof MemberDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getNumberOfMemberSamples(){
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.diagnosticClinicService.getAllSamplesForMember(this.memberID).subscribe((response: any) => {
      if(response.success == true){
        //Populating the arrays with the returned data
        var tempSamples = response.data.samples;
        for(var i = 0; i < tempSamples.length; i++){
          var tempSpecies: Species = {species: tempSamples[i].data.species};
          var tempSample: Sample = {userID: tempSamples[i].userID, orgName: tempSamples[i].orgName, status: tempSamples[i].status, data: tempSpecies};
          this.memberSamples.push(tempSample);
        }

        if(this.memberSamples.length == 0){
          //Dynamically loads one div if no samples are returned
          const sampleDivRef = this.sampleContainer.createComponent(this.resolver.resolveComponentFactory(SampleDivComponent));
          sampleDivRef.instance.Number = 0;
          sampleDivRef.instance.Status = 'You currently have no samples.';
          sampleDivRef.instance.Details = '';
        }
        else{
          //Dynamically loads all the samples into the HTML page
          for(var i = 0; i < this.memberSamples.length; i++){
            const sampleDivRef = this.sampleContainer.createComponent(this.resolver.resolveComponentFactory(SampleDivComponent));
            sampleDivRef.instance.Number = i + 1;
            sampleDivRef.instance.Status = this.memberSamples[i].status;
            sampleDivRef.instance.Details = this.memberSamples[i].data.species;
          }
        }
      }
      else{
        //Could not return samples
        const sampleDivRef = this.sampleContainer.createComponent(this.resolver.resolveComponentFactory(SampleDivComponent));
        sampleDivRef.instance.Number = 0;
        sampleDivRef.instance.Status = 'Samples could not be loaded.';
        sampleDivRef.instance.Details = '';
      }
    });
  }

 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            GET_NUMBER_OF_COMPLETED_MEMBER_SAMPLES
  /**
   *  This function will use an API service to get all the completed (processed) samples of a member. These 
   *  samples will be read into the 'completedSamples' Object. The function does not receive any parameters but it will 
   *  populate a 'heading' element on the HTML page with the percentage of completed samples belonging to the member.
   * 
   * @memberof MemberDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getNumberOfCompletedMemberSamples(){}


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      LOAD_SAMPLES
  /**
   *  This function will use an API call to populate the sample section provided on the HTML page.
   * 
   * @memberof MemberDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadSamples(){}

 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_NOTIFICATIONS
  /**
   *  This function will load the organization member's notifications into the notification section on the HTML page
   * 
   * @memberof MemberDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNotifications(){}

  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    NG_ON_INIT()  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call getNumberOfMemberSamples() | 2. Call getNumberOfCompletedMemberSamples() | 
   *              3. Call loadSamples() | 4. Call loadNotifications()
   * @memberof MemberDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.getNumberOfMemberSamples();
    this.getNumberOfCompletedMemberSamples();
    this.loadSamples();
    this.loadNotifications();
  }

}

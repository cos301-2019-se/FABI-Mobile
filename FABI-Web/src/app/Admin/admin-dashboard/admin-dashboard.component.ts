import { Component, OnInit, ViewChild, ElementRef, isDevMode, Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { sharedStylesheetJitUrl } from '@angular/compiler';

import { Member, UserManagementAPIService } from '../../user-management-api.service';
import { DiagnosticClinicAPIService } from '../../diagnostic-clinic-api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements OnInit {
  
  //Global string variables to dynamically load the HTML statistic elements
  userStats: string;
  sampleStats: string;

  admins: Member[] = [];                         //array containing all FABI members that are admins
  staff: Member[] = [];                          //array containing all the members of FABI with the user type of 'staff'
  databaseAdmins: Member[] = [];                 //array containing all the members of FABI with the user type of 'databaseAdmins'
  cultureCurators: Member[] = [];                //array containing all the members of FABI with the user type of 'cultureCurators'
  diagnosticClinicAdmins: Member[] = [];         //array containing all the members of FABI with the user type of 'diagnosticClinicAdmins'
  samples: Object[] = [];                        //array containing all current samples for FABI
  completedSamples: Object[] = [];               //array containing all completed samples for FABI
  numberOfFABIMembers: number;                   //a variable holding the total number of FABI members
  numberOfSamples: number;                       //a variable holding the total number of samples

  constructor(public sanitizer: DomSanitizer, private userManagementService: UserManagementAPIService,
    private diagnosticClinicService: DiagnosticClinicAPIService) { }

  /*
    This function will use an API service to get all the members of FABI. These members will be read into the
    'members' Object. The function does not receive any parameters but it will populate a 'heading' element on the
    HTML page with the number of members belonging to FABI. This function will also use API calls to populate
    the admins object.
  */
  getNumberOfFABIMembers(){
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllFABIMembers().subscribe((response: any) => {
      if(response.success == true){
        //Populating the arrays with the returned data
        this.admins = response.data.qs.admins;
        this.staff = response.data.qs.staff;
        this.databaseAdmins = response.data.qs.databaseAdmins;
        this.cultureCurators = response.data.qs.cultureCurators;
        this.diagnosticClinicAdmins = response.data.qs.diagnosticClinicAdmins;

        this.numberOfFABIMembers = this.admins.length + this.staff.length + this.databaseAdmins.length + this.cultureCurators.length + this.diagnosticClinicAdmins.length;
        this.userStats = this.numberOfFABIMembers.toString();
      }
      else{
        //The FABI members could not be retrieved
      }
    });
  }

  /*
    This function will use an API service to get all the samples of FABI. These samples will be read into the
    'samples' Object. The function does not receive any parameters but it will populate a 'heading' element on the
    HTML page with the number of samples belonging to FABI.
  */
  getNumberOfFABISamples(){
    //Subscribing to the DiagnosticClinicAPIService to get a list containing all of FABI's samples
    this.diagnosticClinicService.getAllSamples().subscribe((response: any) => {
      if(response.success == true){
        //Populating the arrays with the returned data
        this.samples = response.data.samples;

        this.numberOfSamples = this.samples.length;
        this.sampleStats = this.numberOfSamples.toString();
      }
      else{
        //The FABI members could not be retrieved
      }
    });
  }

  /*
    This function will use an API service to get all the completed (processed) samples of FABI. These 
    samples will be read into the 'completedSamples' Object. The function does not receive any parameters but it will 
    populate a 'heading' element on the HTML page with the percentage of completed samples belonging to FABI.
  */
  getNumberOfCompletedFABISamples(){}

  /*
    This function will load all the admin staff into the section provided on the HTML page
  */
  loadAdmins(){}

  /*
    This function will load all the staff members into the section provided on the HTML page
  */
  loadStaff(){}

  /*
    This function will load the admin's notifications into the notification section on the HTML page
  */
  loadNotifications(){}

  ngOnInit() { 
    this.loadAdmins();
    this.loadStaff();
    this.loadNotifications();

    this.getNumberOfFABIMembers();
    this.getNumberOfFABISamples();
  }
}

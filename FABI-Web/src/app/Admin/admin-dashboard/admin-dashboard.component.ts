import { Component, OnInit, isDevMode, Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { sharedStylesheetJitUrl } from '@angular/compiler';

declare var require: any;

//Object for defining how a member of FABI is structured
export interface Member {
  ID: string;       //This will contain the ID retreived from the DB 
  Name: string;     //This will be the name of the member
  Surname: string;  //This will be the surname of the member
}

//Object for defining how a sample is structured
export interface Sample {
  ID: string; //This will contain the ID retreived from the DB 
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})

export class AdminDashboardComponent implements OnInit {
  navWidth: string;

  /*
    GLOBALS
  */
  members: Object;            //array containing all FABI members that are not admins
  admins: Object;             //array containing all FABI members that are admins
  samples: Object;            //array containing all current samples for FABI
  completedSamples: Object;   //array containing all completed samples for FABI

  constructor(public sanitizer: DomSanitizer) { }

  /*
    This function will use an API service to get all the members of FABI. These members will be read into the
    'members' Object. The function does not receive any parameters but it will populate a 'heading' element on the
    HTML page with the number of members belonging to FABI. This function will also use API calls to populate
    the admins object.
  */
  getNumberOfFABIMembers(){}

  /*
    This function will use an API service to get all the samples of FABI. These samples will be read into the
    'samples' Object. The function does not receive any parameters but it will populate a 'heading' element on the
    HTML page with the number of samples belonging to FABI.
  */
  getNumberOfFABISamples(){}

  /*
    This function will use an API service to get all the completed (processed) samples of FABI. These 
    samples will be read into the 'completedSamples' Object. The function does not receive any parameters but it will 
    populate a 'heading' element on the HTML page with the percentage of completed samples belonging to FABI.
  */
  getNumberOfCompletedFABISamples(){}


  ngOnInit() { 
  }
}

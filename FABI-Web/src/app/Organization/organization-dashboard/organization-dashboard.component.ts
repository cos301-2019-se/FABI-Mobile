import { Component, OnInit } from '@angular/core';
// import { OrganizationAPIService } from '../organization-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
// import { ErrorComponent } from '../error/error.component';
import { Router } from '@angular/router';

//Object for defining how a member of an organization is structured
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
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss']
})

export class OrganizationDashboardComponent implements OnInit {

  /*
    GLOBALS
  */
  members: Object;            //array containing all of the organization's members
  samples: Object;            //array containing all current samples for the organization
  completedSamples: Object;   //array containing all completed samples for the organization

  constructor() { }

  /*
    This function will use an API service to get all the members of an organization. These members will be read into the
    'members' Object. The function does not receive any parameters but it will populate a 'heading' element on the
    HTML page with the number of members belonging to the organization.
  */
  getNumberOfOrganizationMembers(){}

  /*
    This function will use an API service to get all the samples of an organization. These samples will be read into the
    'samples' Object. The function does not receive any parameters but it will populate a 'heading' element on the
    HTML page with the number of samples belonging to the organization.
  */
  getNumberOfOrganizationSamples(){}

  /*
    This function will use an API service to get all the completed (processed) samples of an organization. These 
    samples will be read into the 'completedSamples' Object. The function does not receive any parameters but it will 
    populate a 'heading' element on the HTML page with the percentage of completed samples belonging to the organization.
  */
  getNumberOfCompletedOrganizationSamples(){}

  /*
    This function will load the organization's members into the HTML page
  */
  loadMembers(){}

  /*
    This function will load the organization's notifications into the notification section on the HTML page
  */
  loadNotifications(){}

  /*
    This function will remove a notification for the notification section when the user clicks on the 'exit'
    button/icon associated with that notification
  */
  removeNotification(){}

  ngOnInit() {
    //These functions are called when the page loads and the component is created
    this.getNumberOfOrganizationMembers();
    this.getNumberOfOrganizationSamples();
    this.getNumberOfCompletedOrganizationSamples();
    this.loadMembers();
    this.loadNotifications();
  }

}

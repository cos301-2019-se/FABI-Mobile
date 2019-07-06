import { Component, OnInit } from '@angular/core';
// import { OrganizationAPIService } from '../organization-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.scss']
})

export class MemberDashboardComponent implements OnInit {


  constructor() { }

  /*
  *  This function will use an API service to get all the samples of a member. These samples will be read into the
  *  'samples' Object. The function does not receive any parameters but it will populate a 'heading' element on the
  *  HTML page with the number of samples belonging to the member.
  */
  getNumberOfMemberSamples(){}

  /*
  *  This function will use an API service to get all the completed (processed) samples of a member. These 
  *  samples will be read into the 'completedSamples' Object. The function does not receive any parameters but it will 
  *  populate a 'heading' element on the HTML page with the percentage of completed samples belonging to the member.
  */
  getNumberOfCompletedMemberSamples(){}

  /*
  *  This function will use an API call to populate the sample section provided on the HTML page.
  */
  loadSamples(){}

  /*
  *  This function will load the organization member's notifications into the notification section on the HTML page
  */
  loadNotifications(){}

  sidenavToggle(){
    if(document.getElementById("sidenav_div").style.width == "22%")
    {
      document.getElementById("sidenav_div").style.width = "0";
    }
    else{
      document.getElementById("sidenav_div").style.width = "22%";
    } 
  }

  closeNav(){
    document.getElementById("sidenav_div").style.width = "0";
  }

  //These functions are called when the page loads and the component is created
  ngOnInit() {
    this.getNumberOfMemberSamples();
    this.getNumberOfCompletedMemberSamples();
    this.loadSamples();
    this.loadNotifications();
  }

}

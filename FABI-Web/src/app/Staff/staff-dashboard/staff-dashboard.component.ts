import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})
export class StaffDashboardComponent implements OnInit {

  constructor() { }

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

  /*
    This function will load admin users into the section provided on the HTML page
  */
  loadAdmins(){}

  /*
    This function will load the staff member's notifications into the notification section on the HTML page
  */
  loadNotifications(){}

  /*
    This function will remove a notification for the notification section when the user clicks on the 'exit'
    button/icon associated with that notification
  */
 removeNotification(){}

  ngOnInit() {
    this.loadAdmins();
    this.loadNotifications();
  }

}

/**
 * File Name: admin-dashboard.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\admin-dashboard\admin-dashboard.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, June 25th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit } from '@angular/core';
// import { SidenavComponent } from '../../sidenav/sidenav.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements OnInit {
  constructor() { }

  
  /**
   * 
   *
   * @memberof AdminDashboardComponent
   */
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

  ngOnInit() { }

}

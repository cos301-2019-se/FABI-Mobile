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

declare var require: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})

export class AdminDashboardComponent implements OnInit {
  constructor() { }

  
  /**
   * 
   *
   * @memberof AdminDashboardComponent
   */
  sidenavToggle(){
    if(document.getElementById("sidenav_div").style.width == this.navWidth)
    {
      document.getElementById("sidenav_div").style.width = "0";
    }
    else{
      document.getElementById("sidenav_div").style.width = this.navWidth;
    } 
  }

  closeNav(){
    document.getElementById("sidenav_div").style.width = "0";
  }

  ngOnInit() { 
    if(window.innerWidth <= 520){
      //Mobile device
      require("style-loader!./../../../assets/admin_dashboard_styles/mobile_style.scss");
      this.navWidth = "100%";
    }
    else if(window.innerWidth <= 1400 && window.innerWidth > 520){
      //Tablet device
      require("style-loader!./../../../assets/admin_dashboard_styles/tablet_style.scss");

      if(window.innerWidth > 920 && window.innerWidth < 1000){
        this.navWidth = "50%";
      }
      else if(window.innerWidth >= 1000 && window.innerWidth < 1050){
        this.navWidth = "40%";
      }
      else{
        this.navWidth = "34%";
      }
    }
    else if(window.innerWidth <= 2500 && window.innerWidth > 1400){
      //Laptop device
      require("style-loader!./admin-dashboard.component.scss");
      this.navWidth = "22%";
    }
    else if(window.innerWidth > 2500){
      //Desktop device
      require("style-loader!./../../../assets/admin_dashboard_styles/desktop_style.scss");
      this.navWidth = "70%";
    }
  }
}

/**
 * File Name: admin-menu.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\admin-menu\admin-menu.component.ts
 * Project Name: fabi-web
 * Created Date: Wednesday, August 14th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, August 21st 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';

import * as Interface from '../../_interfaces/interfaces';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;
  currentUserPrivileges: any

  constructor(
    private authService: AuthenticationService,
    private userManagementService: UserManagementAPIService,
  ) { }

  ngOnInit() {
    //******** TEMPORARY LOGIN FOR DEVELOPMENT: ********
      this.currentUser = this.authService.getCurrentSessionValue.user;
      this.currentUserPrivileges = this.authService.getCurrentUserValue;

      console.log("PRIVILEGES: " + JSON.stringify(this.currentUserPrivileges));

    //******** TO BE USED IN PRODUCTION: ********
    // // Set current user logged in
    // this.currentUser = this.authService.getCurrentSessionValue.user;
    // //Calling the neccessary functions as the page loads
    // this.getDBNames();

  }

}

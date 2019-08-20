/**
 * File Name: staff-view-databases.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\NEW\FABI-Mobile\FABI-Web\src\app\Staff\staff-view-databases\staff-view-databases.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, August 20th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, August 20th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { DatabaseManagementService } from "../../_services/database-management.service";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { ErrorComponent } from '../../_errors/error-component/error.component';
import {MatTableModule} from '@angular/material/table';

import { Porting } from '../../_services/porting.service';
import { NotificationLoggingService, UserLogs, DatabaseManagementLogs, AccessLogs } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';

import * as Interface  from '../../_interfaces/interfaces';
import { LoadingComponent } from 'src/app/_loading/loading.component';

@Component({
  selector: 'app-staff-view-databases',
  templateUrl: './staff-view-databases.component.html',
  styleUrls: ['./staff-view-databases.component.scss']
})
export class StaffViewDatabasesComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Indicates if a file is loading or not - @type {boolean} */
  loading: boolean = false;

  /** The data source of the HTML table - @type {MatTableDataSource([])} */ 
  databaseData: any[];
  fields: any[] = [];
  databases: Interface.DatabasePrivilege[];
  databasePrivileges: any = {'create': false, 'retrieve': true, 'update': false, 'delete': false};
  selectedDatabase: string;
  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;
  currentUserPrivileges: any

  constructor(
    private authService: AuthenticationService, 
    private snackBar: MatSnackBar, 
    private dialog: MatDialog, 
    private resolver: ComponentFactoryResolver, 
    private userManagementService: UserManagementAPIService, 
    private dbService: DatabaseManagementService,
    private formBuilder: FormBuilder, 
  ) { }

  ngOnInit() {
    //******** TEMPORARY LOGIN FOR DEVELOPMENT: ********
    this.authService.temporaryLoginSuperUser().subscribe((response : any) => {
      this.currentUser = this.authService.getCurrentSessionValue.user;
      this.currentUserPrivileges = this.authService.getFABIUserPrivileges();
      this.databases = this.currentUserPrivileges.databases;
    });
    
    //******** TO BE USED IN PRODUCTION: ********
    // // Set current user logged in
    // this.currentUser = this.authService.getCurrentSessionValue.user;
    // //Calling the neccessary functions as the page loads
    //Load Databases for Drop Down
    // this.currentUserPrivileges = this.authService.getFABIUserPrivileges;
  }


   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        VIEW DATABASE
  /**
   *  This function is used to load the selected database and display it in the HTML page
   * 
   *  @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public viewDatabase(database : Interface.DatabasePrivilege) {

    let loadingRef = this.dialog.open(LoadingComponent, {data: { title: "Retrieving Database" }});

    this.dbService.retrieveDatabase(database.name).subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        Object.keys(response.data.docs[0]).forEach((column) => {
          let obj = {
            'name': column
          }
          this.fields.push(obj);
        });

        this.databaseData = response.data.docs;

        // if(database.privileges.indexOf('create') != -1) {
        //   this.databasePrivileges.create = true;
        // }

        // if(database.privileges.indexOf('retrieve') != -1) {
        //   this.databasePrivileges.retrieve = true;
        // }

        // if(database.privileges.indexOf('update') != -1) {
        //   this.databasePrivileges.update = true;
        // }

        // if(database.privileges.indexOf('delete') != -1) {
        //   this.databasePrivileges.delete = true;
        // }
  
      } 
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Sorry there was an error loading the data", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.ngOnInit();
          }
        })
      }

      loadingRef.close();
    });

  }

  resetDatabaseFields() {
    this.fields = [];
    this.databaseData = [];
  }

}

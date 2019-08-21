/**
 * File Name: staff-view-databases.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\NEW\FABI-Mobile\FABI-Web\src\app\Staff\staff-view-databases\staff-view-databases.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, August 20th 2019
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
import { DatabaseManagementService } from "../../_services/database-management.service";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { ErrorComponent } from '../../_errors/error-component/error.component';
import { MatTableModule } from '@angular/material/table';

import { Porting } from '../../_services/porting.service';
import { NotificationLoggingService, UserLogs, DatabaseManagementLogs, AccessLogs } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';

import * as Interface from '../../_interfaces/interfaces';
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
  databasePrivileges: any = { 'create': false, 'retrieve': true, 'update': false, 'delete': false };
  selectedDatabase: string;
  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;
  currentUserPrivileges: any;

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */
  notificationsTab: boolean = false;
  /** Indicates if the profile tab is hidden/shown - @type {boolean} */
  profileTab: boolean = false;
  /** Indicates if the save button is hidden/shown on the profile tab- @type {boolean} */
  saveBtn: boolean = false;
  /** Indicates if the confirm password tab is hidden/shown on the profile tab - @type {boolean} */
  confirmPasswordInput: boolean = false;
  /** Indicates if the help tab is hidden/shown - @type {boolean} */
  helpTab: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private resolver: ComponentFactoryResolver,
    private userManagementService: UserManagementAPIService,
    private dbService: DatabaseManagementService,
    private formBuilder: FormBuilder,
    private portCSV: Porting
  ) { }

  ngOnInit() {
    //******** TEMPORARY LOGIN FOR DEVELOPMENT: ********
    this.authService.temporaryLoginStaff().subscribe((response : any) => {
      this.currentUser = this.authService.getCurrentSessionValue.user;
      this.authService.getFABIUserPrivileges();
      // this.databases = this.currentUserPrivileges.databases;
    });

    //******** TO BE USED IN PRODUCTION: ********
    // // Set current user logged in
    // this.currentUser = this.authService.getCurrentSessionValue.user;
    // //Calling the neccessary functions as the page loads
    //Load Databases for Drop Down
    // this.currentUserPrivileges = this.authService.getFABIUserPrivileges;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET CSV
  /**
   *  This function will be used to download the selected database in the format of a .csv file.
   * 
   *  @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getCSV(){  


    let data = "";
    let dbname = this.selectedDatabase;

    let loadingRef = this.dialog.open(LoadingComponent, {data: { title: "Downloading CSV" }});
    
    this.dbService.retrieveDatabase(dbname).subscribe((response:any) => {
        if(response.success == true && response.code == 200) {
          data = response.data.docs;
          let CSVdata = this.portCSV.extractDatabase(data, dbname);
          
          //Save data in csv file and show download dialog
          var blob = new Blob([CSVdata], {type: 'text/csv;charset=utf-8'});
          var downloadLink = document.createElement('a');
          downloadLink.setAttribute('download', dbname+".csv" );
          downloadLink.setAttribute('href', window.URL.createObjectURL(blob) );
          var event = new MouseEvent("click");
          downloadLink.dispatchEvent(event);
        } 
        else if (response.success == false) {
          //POPUP MESSAGE
          let dialogRef = this.dialog.open(ErrorComponent, {data: {error: "Could not port CSV file", message: response.error.message}});
          dialogRef.afterClosed().subscribe((result) => {
            if(result == "Retry") {
              this.ngOnInit();
            }
          })
        }    

        loadingRef.close();
      }, (err: HttpErrorResponse) => {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, {data: {error: "Could not port CSV file", message: err.message}});
        dialogRef.afterClosed().subscribe((result) => {
          if(result == "Retry") {
            this.ngOnInit();
          }
        });
      
        loadingRef.close();
    }); 
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        VIEW DATABASE
  /**
   *  This function is used to load the selected database and display it in the HTML page
   * 
   *  @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public viewDatabase(database: Interface.DatabasePrivilege) {

    this.selectedDatabase = database.name

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Retrieving Database" } });

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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      TOGGLE NOTIFICATIONS 
  /**
   * This function will toggle the display of the notifications side panel
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificationsTab() {
    this.notificationsTab = !this.notificationsTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE PROFILE 
  /**
   * This function will toggle the display of the profile side panel
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleProfileTab() {
    this.profileTab = !this.profileTab;
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      DISPLAY PROFILE SAVE BUTTON 
  /**
   * This function will display the save button option if any details in the profile have been altered
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayProfileSaveBtn() {
    this.saveBtn = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                   DISPLAY PASSWORD CONFIRM INPUT 
  /**
   * This function will display the confirm password input field in the user's password was altered
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayConfirmPasswordInput() {
    this.confirmPasswordInput = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE HELP 
  /**
   * This function will toggle the display of the help side panel
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleHelpTab() {
    this.helpTab = !this.helpTab;
  }

}

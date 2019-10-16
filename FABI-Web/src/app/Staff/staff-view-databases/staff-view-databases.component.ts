/**
 * File Name: staff-view-databases.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\NEW\FABI-Mobile\FABI-Web\src\app\Staff\staff-view-databases\staff-view-databases.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, August 20th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, October 16th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as http from '@angular/common/http';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LoadingComponent } from 'src/app/_loading/loading.component';
import { NotificationService } from 'src/app/_services/notification.service';
import * as Interface from '../../_interfaces/interfaces';
import { AuthenticationService } from '../../_services/authentication.service';
import { DatabaseManagementService } from "../../_services/database-management.service";
import { Porting } from '../../_services/porting.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';


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
  /** The search item the user is looking for in the table -  @type {string} */
  public searchDatabase: string = "";
  /** The search item the user is looking for in the table -  @type {string} */
  public searchView: string = "";


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of StaffViewDatabasesComponent.
   * 
   * @param {HttpService} service For calling the 'http' API service
   * @param {MatSnackBar} snackBar 
   * @param {MatDialog} dialog 
   * @param {Router} router
   * @param {ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {DatabaseManagementService} dbService For calling the Database Management API service
   * @param {FormBuilder} formBuilder For building the HTML form to get its values
   * @param {AuthenticationService} authService for calling the *authentication* serviceFor authenticating the user
   * @param {Router} router
   * 
   * @memberof StaffViewDatabasesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private resolver: ComponentFactoryResolver,
    private userManagementService: UserManagementAPIService,
    private dbService: DatabaseManagementService,
    private formBuilder: FormBuilder,
    private portCSV: Porting,
    private router: Router,
    private notificationService: NotificationService
  ) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @memberof StaffViewDatabasesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    // Set current user logged in
    this.currentUser = this.authService.getCurrentSessionValue.user;
    //Calling the neccessary functions as the page loads
    // Load Databases for Drop Down
    this.currentUserPrivileges = this.authService.getFABIUserPrivileges();
    this.databases = this.currentUserPrivileges.databases;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET CSV
  /**
   *  This function will be used to download the selected database in the format of a .csv file.
   * 
   *  @memberof StaffViewDatabasesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getCSV() {
    let data = "";
    let dbname = this.selectedDatabase;

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Downloading CSV" } });

    this.dbService.retrieveDatabase(dbname).subscribe((response: any) => {

      loadingRef.close();

      if (response.success == true && response.code == 200) {
        data = response.data.docs;
        let CSVdata = this.portCSV.extractDatabase(data, dbname);

        //Save data in csv file and show download dialog
        var blob = new Blob([CSVdata], { type: 'text/csv;charset=utf-8' });
        var downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', dbname + ".csv");
        downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
        var event = new MouseEvent("click");
        downloadLink.dispatchEvent(event);
      }
      else {
        //POPUP MESSAGE
        this.notificationService.showErrorNotification('Download Failed', 'An error occurred while downloading');
      }

    }, (err: http.HttpErrorResponse) => {
      //Handled in error-handler
      this.notificationService.showErrorNotification('Download Failed', 'An error occurred while downloading');
      loadingRef.close();
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        VIEW DATABASE
  /**
   *  This function is used to load the selected database and display it in the HTML page
   * 
   *  @memberof StaffViewDatabasesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public viewDatabase(database: Interface.DatabasePrivilege) {
    this.selectedDatabase = database.name

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Retrieving Database" } });

    this.dbService.retrieveDatabase(database.name).subscribe((response: any) => {

      loadingRef.close();

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

      } else {
        //POPUP MESSAGE
        loadingRef.close();
        this.notificationService.showWarningNotification('Error', 'Could not load database details');
      }

    }, (err: http.HttpErrorResponse) => {
      loadingRef.close();
      this.notificationService.showWarningNotification('Error', 'Could not load database details');
      //Handled in error-handler
    });

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      RESET DATABASE FIELDS 
  /**
   * This function will clear the modal containing information about the database being viewed
   * 
   * @memberof StaffViewDatabasesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  resetDatabaseFields() {
    this.fields = [];
    this.databaseData = [];
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      TOGGLE NOTIFICATIONS 
  /**
   * This function will toggle the display of the notifications side panel
   * 
   * @memberof StaffViewDatabasesComponent
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
   * @memberof StaffViewDatabasesComponent
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
   * @memberof StaffViewDatabasesComponent
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
   * @memberof StaffViewDatabasesComponent
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
   * @memberof StaffViewDatabasesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleHelpTab() {
    this.helpTab = !this.helpTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof StaffViewDatabasesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

}

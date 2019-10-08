/**
 * File Name: database-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\database-handler\database-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, October 8th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as http from '@angular/common/http';
import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LoadingComponent } from 'src/app/_loading/loading.component';
import * as Interface from '../../_interfaces/interfaces';
import { AuthenticationService } from '../../_services/authentication.service';
import { DatabaseManagementService } from "../../_services/database-management.service";
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { Porting } from '../../_services/porting.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';
import { NotificationService } from 'src/app/_services/notification.service';



@Component({
  selector: 'app-database-handler',
  templateUrl: './database-handler.component.html',
  styleUrls: ['./database-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatabaseHandlerComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Indicates if a file is loading or not - @type {boolean} */
  loading: boolean = false;
  /** Indicates if the preview table can be loaded or not - @type {boolean} */
  preview: boolean = false;
  /** Array holding the headings of the new database - @type {any} */
  headings: any = [];
  /** Array holding the columns of the new database - @type {any} */
  columns: any = [];
  jsonData: any;
  /** The data source of the HTML table - @type {MatTableDataSource([])} */
  databaseData: any[];
  fields: any[] = [];
  /** Object for defining the Porting form -  @type {FormGroup} */
  portingForm: FormGroup;
  allDatabaseNames: Interface.DatabasePrivilege[];
  selectedDatabase: string;
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
  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;
  /** The name of the database to create via porting - @type {string} */
  dbname: string;
  /** Used to read the csv file for porting - @type {FileReader} */
  reader: FileReader;
  /** The value sent through when the file is chosen for porting - @type {any} */
  fileInput: any;
  /** Indicates if the database has been ported or not - @type {boolean} */
  ported: boolean = false;
  currentUserPrivileges: any;
  /** The search item the user is looking for in the table -  @type {string} */
  public searchDatabase: string = "";
  /** Specifies if the list of databases have been retreived to disable the loading spinner - @type {boolean} */
  databaseTableLoading: boolean = true;
  /** Specifies if the selected database has been retreived to disable the loading spinner - @type {boolean} */
  viewDatabaseLoading: boolean = true;
  deleteData: Interface.Confirm = { title: '', message: '', info: '', cancel: '', confirm: '' };
  submitted: boolean = false;

  /** Holds the div element (rpDBname) from the HTML page - @type {ElementRef} */
  @ViewChild("rpDBname") rPort: ElementRef;
  /** Holds the div element (pDBname) from the HTML page - @type {ElementRef} */
  @ViewChild("pDBname") port: ElementRef;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          FORM VALIDATORS
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  porting_validators = {
    'databaseName': [
      { type: 'required', message: 'Database name is required' },
    ],
    'file': [
      { type: 'required', message: 'Please choose a CSV file' }
    ]
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of DatabaseHandlerComponent.
   * 
   * @param {HttpService} service For calling the 'http' API service
   * @param {MatSnackBar} snackBar 
   * @param {MatDialog} dialog 
   * @param {Router} router for routing/navigating to other components
   * @param {ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * 
   * @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private userManagementService: UserManagementAPIService,
    private notificationLoggingService: NotificationLoggingService,
    private dbService: DatabaseManagementService,
    private formBuilder: FormBuilder,
    private portCSV: Porting,
    private notificationService: NotificationService
  ) {
    this.portingForm = this.formBuilder.group({
      databaseName: ['', Validators.required],
      file: ['', Validators.required]
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call loadNotifications() 
   * 
   * @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {

    // Set current user logged in
    this.currentUser = this.authService.getCurrentSessionValue.user;
    //Calling the neccessary functions as the page loads
    this.getDBNames();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          SUBMIT CSV
  /**
   *  This function will be used to submit a .csv file so that it can be converted into a database for the user
   *  @param {any} input
   * 
   *  @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public submitCSV(input?) {

    this.submitted = true;

    if (input) {
      this.fileInput = input;
    }

    if (this.fileInput == '' || this.fileInput == null) {
      return;
    }

    if (this.portingForm.invalid) {
      return;
    }

    this.dbname = '';
    this.loading = false;
    this.headings = [];
    this.columns = [];

    this.loading = true;
    this.dbname = this.port.nativeElement.value;

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "" } });

    this.submitted = false;

    const reader = new FileReader();
    reader.readAsText(this.fileInput.files[0]);
    reader.onload = () => {
      let text = reader.result;

      //converts file to JSON Object
      this.jsonData = this.portCSV.convertToJSON(text);

      var columnsIn = this.jsonData[0];
      var tempString = '';
      var valid = false;
      for (var key in columnsIn) {
        if (key.indexOf(',') > -1) {
          this.headings.push(key);
          valid = true;
        }
        else {
          tempString += key + ',';
        }
      }

      if (valid == false) {
        tempString = tempString.slice(0, -1);
        this.headings.push(tempString);
      }

      var valid = false;
      for (var i = 0; i < this.jsonData.length; i++) {
        columnsIn = this.jsonData[i];
        var tempString = '';
        for (var key in columnsIn) {
          if (key.indexOf(',') > -1) {
            this.columns.push(this.jsonData[i][key]);
            valid = true;
          }
          else {
            tempString += this.jsonData[i][key] + ',';
          }
        }

        if (valid == false) {
          tempString = tempString.slice(0, -1);
          this.columns.push(tempString);
        }
      }

      if (this.headings.length != 0) {
        this.preview = true;
      }

      //Making the columns into an array instead of a string
      for (var i = 0; i < this.columns.length; i++) {
        this.columns[i] = this.columns[i].split(',');
      }

      //Making the headings into an array instead of a string
      var headingNames = this.headings[0];
      this.headings = headingNames.split(',');
    }

    loadingRef.close();
    this.preview = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET CSV
  /**
   *  This function will be used to download the selected database in the format of a .csv file.
   * 
   *  @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getCSV() {

    this.submitted = true;

    let data = "";
    let dbname = this.selectedDatabase;

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Downloading CSV" } });

    this.submitted = false;

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
      else if (response.success == false) {
        //POPUP MESSAGE
        this.notificationService.showErrorNotification('Error', 'An error occurred while downloading');
      }
 
    }, (err: http.HttpErrorResponse) => {
      //Handled in error-handler
      this.notificationService.showErrorNotification('Error', 'An error occurred while downloading');
      loadingRef.close();
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET DATABASE NAMES
  /**
   * This functions is used to get all the database names from the server
   *
   * @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getDBNames() {
    this.userManagementService.getDatabaseNames().subscribe((response: any) => {
      if (response.success == true && response.code == 200) {

        this.allDatabaseNames = response.data.docs;

        //Deactivate loading table spinners
        this.databaseTableLoading = false;

      }
      else if (response.success == false) {
        //POPUP MESSAGE
        this.notificationService.showWarningNotification('Error', 'Could not load databases');
      }
    }, (err: http.HttpErrorResponse) => {
      this.notificationService.showWarningNotification('Error', 'Could not load databases');
      //Handled in error-handler
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
  public viewDatabase(databaseName: string) {
    this.selectedDatabase = databaseName;

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Retrieving Database" } });

    this.dbService.retrieveDatabase(databaseName).subscribe((response: any) => {
      loadingRef.close();

      if (response.success == true && response.code == 200) {
        Object.keys(response.data.docs[0]).forEach((column) => {
          let obj = {
            'name': column
          }
          this.fields.push(obj);
        });

        this.databaseData = response.data.docs;

        //Deactivate loading view database spinners
        this.viewDatabaseLoading = false;

      }
      else if (response.success == false) {
        //POPUP MESSAGE
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  SUBMIT DATABASE
  /**
   *  This function will be used to submit the file chosen for porting and create a database using the .csv file, if the user 
   *  selects that the database preview table shown in correct.
   *  @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitDatabase() {
    if (this.ported == true) {
      let snackBarRef = this.snackBar.open("The file has already been ported", "Dismiss", {
        duration: 4000
      });
    }
    else {
      let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Porting" } });

      this.dbService.porting(this.portingForm.get('databaseName').value, this.jsonData).subscribe((response: any) => {
        loadingRef.close();
        if (response.success == true && response.code == 200) {
          //POPUP MESSAGE
          let snackBarRef = this.snackBar.open("Successfully ported CSV file", "Dismiss", {
            duration: 3000
          });

          this.ported = true;

          this.refreshDataSource();

        }
        else if (response.success == false) {
          //POPUP MESSAGE
        }
      }, (err: http.HttpErrorResponse) => {
        //Handled in error-handler
      });
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        REMOVE PREVIEW
  /**
   *  This function will be used to hide the preview table and stop the processing of the .csv file submitted into a database, if
   *  the user selects that the database shown in the preview table is not in the correct format.
   *  @param input
   *  @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removePreview() {
    this.preview = false;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     DROP DATABASE PROMPT 1
  /**
   * This function prompts the user to confirm if they wish to remove the selected database
   *
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  dropDatabasePrompt1(dbname: string) {

    this.selectedDatabase = dbname;

    this.deleteData = {
      title: "Drop Database",
      message: "Are you sure you want to remove this database? ",
      info: `Database : ${dbname}`,
      cancel: "Cancel",
      confirm: "Yes"
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     DROP DATABASE PROMPT 2
  /**
   * This function prompts the user to confirm if they wish to remove the selected database
   *
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  dropDatabasePrompt2() {

    this.deleteData = {
      title: "Destructive Operation",
      message: "All data will be permanently removed from this system",
      info: `Database : ${this.selectedDatabase}`,
      cancel: "Cancel",
      confirm: "Drop"
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                           DROP DATABASE   
  /**
   * This function calls the *database-management* service to remove the selected database
   *
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  dropDatabase() {
    this.dbService.removeDatabase(this.selectedDatabase).subscribe((response: any) => {

      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Database Removed", "Dismiss", {
          duration: 3000
        });
        this.refreshDataSource();
      }
      else if (response.success == false) {
        //POPUP MESSAGE
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                REFRESH
  /**
   * This function refreshes the Datasource (in most cases, the table that has changed)
   *
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  refreshDataSource() {
    this.getDBNames();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       TOGGLE NOTIFICATIONS 
  /**
   * This function will toggle the display of the notifications side panel
   * 
   * @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificationsTab() {
    this.notificationsTab = !this.notificationsTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         TOGGLE PROFILE 
  /**
   * This function will toggle the display of the profile side panel
   * 
   * @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleProfileTab() {
    this.profileTab = !this.profileTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                   DISPLAY PROFILE SAVE BUTTON 
  /**
   * This function will display the save button option if any details in the profile have been altered
   * 
   * @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayProfileSaveBtn() {
    this.saveBtn = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                DISPLAY PASSWORD CONFIRM INPUT 
  /**
   * This function will display the confirm password input field in the user's password was altered
   * 
   * @memberof DatabaseHandlerComponent
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
   * @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleHelpTab() {
    this.helpTab = !this.helpTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          RESET DATABASE FIELDS
  /**
   * This function refreshes the databsase fields
   *
   * @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  resetDatabaseFields() {
    this.fields = [];
    this.databaseData = [];
  }

}

<<<<<<< HEAD
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminAPIService } from '../../admin-api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { ErrorComponent } from '../../error/error.component';
=======
/**
 * File Name: database-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\database-handler\database-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 22nd 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */
>>>>>>> develop


<<<<<<< HEAD
=======
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
import { MatTableModule } from '@angular/material/table';

import { Porting } from '../../_services/porting.service';
import { NotificationLoggingService, UserLogs, DatabaseManagementLogs, AccessLogs } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';

import * as Interface  from '../../_interfaces/interfaces';
import { LoadingComponent } from 'src/app/_loading/loading.component';
>>>>>>> develop

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

  /** Holds the div element (rpDBname) from the HTML page - @type {ElementRef} */
  @ViewChild("rpDBname") rPort : ElementRef;
  /** Holds the div element (pDBname) from the HTML page - @type {ElementRef} */
  @ViewChild("pDBname") port : ElementRef;

  /** The data source of the HTML table - @type {MatTableDataSource([])} */ 
  databaseData: any[];
  fields: any[] = [];

  public portingForm: {
    file: any,
    databaseName: string
  };

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
  /** The search item the user is looking for in the table -  @type {string} */
  public searchView: string = "";

  /** Specifies if the list of databases have been retreived to disable the loading spinner - @type {boolean} */
  databaseTableLoading: boolean = true;
/** Specifies if the selected database has been retreived to disable the loading spinner - @type {boolean} */
  viewDatabaseLoading: boolean = true;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of DatabaseHandlerComponent.
   * 
   * @param {HttpService} service For calling the 'http' API service
   * @param {MatSnackBar} snackBar 
   * @param {MatDialog} dialog 
   * @param {Router} router
   * @param {ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * 
   * @memberof DatabaseHandlerComponent
   */
<<<<<<< HEAD
  loading: boolean = false;
=======
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
    private portCSV: Porting
    ) {
      this.portingForm = {
        file: null,
        databaseName: ''
      }      
  }  
>>>>>>> develop

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
    //******** TEMPORARY LOGIN FOR DEVELOPMENT: ********
    // this.authService.temporaryLoginSuperUser().subscribe((response : any) => {
    //   this.currentUser = this.authService.getCurrentSessionValue.user;
    //   this.getDBNames();
    // });
    
    //******** TO BE USED IN PRODUCTION: ********
    // Set current user logged in
    this.currentUser = this.authService.getCurrentSessionValue.user;
    //Calling the neccessary functions as the page loads
    this.getDBNames();
  }

<<<<<<< HEAD
  constructor(private service: AdminAPIService, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) { }
=======
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
    this.dbname = '';
    this.fileInput = '';
    this.loading = false;
    this.headings = [];
    this.columns = [];
>>>>>>> develop

    this.fileInput = input;
    this.loading = true;
    this.dbname = this.port.nativeElement.value;

    let loadingRef = this.dialog.open(LoadingComponent, {data: { title: "" }});
    
    if(input) {
      this.portingForm.file = input;
    } 

    if(this.portingForm.databaseName == "" || this.portingForm.databaseName == null){
      let snackBarRef = this.snackBar.open("Please enter a name for the database", "Dismiss", { duration: 3000 });
      return;
    }

    if(this.portingForm.file == null || this.portingForm.file == '') {
      let snackBarRef = this.snackBar.open("Please select a database to port", "Dismiss", { duration: 3000 });
      return;
    }

    const reader = new FileReader();
    reader.readAsText(this.portingForm.file.files[0]);
    reader.onload = () => {
      let text = reader.result;

      //converts file to JSON Object
      this.jsonData = this.portCSV.convertToJSON(text);
      
      var columnsIn = this.jsonData[0];
      var tempString = '';
      var valid = false;
      for(var key in columnsIn){
        if(key.indexOf(',') > -1){
          this.headings.push(key);
          valid = true;
        }
        else{
          tempString += key + ',';
        }
      } 

      if(valid == false){
        tempString = tempString.slice(0, -1);
        this.headings.push(tempString);
      }
      
      var valid = false;
      for(var i = 0; i < this.jsonData.length; i++){
        columnsIn = this.jsonData[i];
        var tempString = '';
        for(var key in columnsIn){
          if(key.indexOf(',') > -1){
            this.columns.push(this.jsonData[i][key]);
            valid = true;
          }
          else{
            tempString += this.jsonData[i][key] + ',';
          }
        } 
        
        if(valid == false){
          tempString = tempString.slice(0, -1);
          this.columns.push(tempString);
        }
      }

      if(this.headings.length != 0){
        this.preview = true;
      }

      //Making the columns into an array instead of a string
      for(var i = 0; i < this.columns.length; i++){
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


  getDBNames() {

    this.userManagementService.getDatabaseNames().subscribe( (response:any) => {
      if (response.success == true && response.code == 200) {

        this.allDatabaseNames = response.data.docs;

        //Deactivate loading table spinners
        this.databaseTableLoading = false;
        
      } 
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Loading Database Names", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.getDBNames();
          }
        })
      }
    });
  }

  refreshDatasource() {
    this.getDBNames();
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        VIEW DATABASE
  /**
   *  This function is used to load the selected database and display it in the HTML page
   * 
   *  @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public viewDatabase(databaseName : string) {

    this.selectedDatabase = databaseName;
    
    let loadingRef = this.dialog.open(LoadingComponent, {data: { title: "Retrieving Database" }});

    this.dbService.retrieveDatabase(databaseName).subscribe((response: any) => {
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
  
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  SUBMIT DATABASE
  /**
   *  This function will be used to submit the file chosen for porting and create a database using the .csv file, if the user 
   *  selects that the database preview table shown in correct.
   *  @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitDatabase(){
    if(this.ported == true){
      let snackBarRef = this.snackBar.open("The file has already been ported", "Dismiss", {
        duration: 4000
      });
    }
    else{
      let loadingRef = this.dialog.open(LoadingComponent, {data: { title: "Porting" }});

      this.dbService.porting(this.portingForm.databaseName, this.jsonData).subscribe((response:any) => {
        loadingRef.close();
        if(response.success == true && response.code == 200) {
          //POPUP MESSAGE
          let snackBarRef = this.snackBar.open("Successfully ported CSV file", "Dismiss", {
            duration: 3000
          });

          this.ported = true;

          this.refreshDatasource();
          
        }
        else if (response.success == false) {
          //POPUP MESSAGE
          let dialogRef = this.dialog.open(ErrorComponent, {data: {error: "Could not port CSV file", message: response.error.message}});
          dialogRef.afterClosed().subscribe((result) => {
            if(result == "Retry") {
              this.ngOnInit();
            }
          });
        }    
        }, (err: HttpErrorResponse) => {
          //POPUP MESSAGE
          let dialogRef = this.dialog.open(ErrorComponent, {data: {error: "Could not port CSV file", message: err.message}});
          dialogRef.afterClosed().subscribe((result) => {
            if(result == "Retry") {
              this.ngOnInit();
            }
          });
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
  removePreview(){
    this.preview = false;
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

<<<<<<< HEAD
  public submitCSV(input) {

    this.loading = true;

    const reader = new FileReader();
    reader.onload = () => {
      let text = reader.result;
      let jsonData = this.portCSV.convertToJSON(text); //converts file to JSON Object
      console.log(jsonData);


      // ** place api calls here ** //
      this.service.porting(jsonData).subscribe((response:any) => {
        this.loading = false;
        if(response.success == true) {
          //POPUP MESSAGE
          let snackBarRef = this.snackBar.open("Successfully ported CSV file", "Dismiss", {
            duration: 3000
          });
        } else if (response.success == false) {

          //POPUP MESSAGE
          let dialogRef = this.dialog.open(ErrorComponent, {data: {error: "Could not port CSV file", message: response.error.message}});
          dialogRef.afterClosed().subscribe((result) => {
            if(result == "Retry") {
              this.ngOnInit();
            }
          })
        }    
      }, (err: HttpErrorResponse) => {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, {data: {error: "Could not port CSV file", message: err.message}});
        dialogRef.afterClosed().subscribe((result) => {
          if(result == "Retry") {
            this.ngOnInit();
          }
        })
        console.log("ERROR:" + err.message);
      })
    };
    reader.readAsText(input.files[0]);
=======
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       TOGGLE NOTIFICATIONS 
  /**
   * This function will toggle the display of the notifications side panel
   * 
   * @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificationsTab(){ 
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

  resetDatabaseFields() {
    this.fields = [];
    this.databaseData = [];
>>>>>>> develop
  }

}

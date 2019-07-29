/**
 * File Name: database-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\database-handler\database-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Sunday, July 28th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { DatabaseManagementService } from "../../_services/database-management.service";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  /** An instance of the Porting class - @type {Porting} */
  portCSV: Porting = new Porting();
  /** Array holding the headings of the new database - @type {any} */
  headings: any = [];
  /** Array holding the columns of the new database - @type {any} */
  columns: any = [];
  /** The name of the database to create via porting - @type {string} */
  dbname: string;
  /** Used to read the csv file for porting - @type {FileReader} */
  reader: FileReader;
  /** The value sent through when the file is chosen for porting - @type {any} */
  fileInput: any;
  /** Indicates if the database has been ported or not - @type {boolean} */
  ported: boolean = false;

  jsonData: any;
  

  /** Holds the div element (rpDBname) from the HTML page - @type {ElementRef} */
  @ViewChild("rpDBname") rPort : ElementRef;
  /** Holds the div element (pDBname) from the HTML page - @type {ElementRef} */
  @ViewChild("pDBname") port : ElementRef;

  /** Object array for holding all of the logs -  @type {any[]} */ 
  allNotifications: any[] = [];
  /** Object array for holding all of the read logs -  @type {any[]} */ 
  readNotifications: any[] = [];

  /** The total number of User Logs - @type {number} */           
  numberOfUserLogs: number = 0;
  /** The total number of Database Management Logs - @type {number} */           
  numberOfDatabaseLogs: number = 0;
  /** The total number of Access Logs - @type {number} */           
  numberOfAccessLogs: number = 0;

  /** Indicates if there are notifications to load - @type {boolean} */           
  notifications: boolean = true; 
  /** THe number of the notifications - @type {number} */   
  localNotificationNumber : number = 1; 

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

  displayedColumns: string[];
  dataSource = new MatTableDataSource([]);
  fields: any[] = [];

  databases: any[];
  databasePrivileges: any = {'create': false, 'retrieve': true, 'update': false, 'delete': false};
  
  selectedDatabase: string;


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
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private authService: AuthenticationService, 
    private snackBar: MatSnackBar, 
    private dialog: MatDialog, 
    private router: Router, 
    private resolver: ComponentFactoryResolver, 
    private userManagementService: UserManagementAPIService, 
    private notificationLoggingService: NotificationLoggingService,
    private dbService: DatabaseManagementService
    ) { }

  
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET_DATE
  /**
   *  This function will put the string date provided into a more readable format for the notifications
   * @param {string} date The date of the log
   * @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getDate(date: string){
    var tempDate = (date).split(' ');
    var newDate = '';

    newDate += tempDate[2];

    if(tempDate[0] == 'Mon'){
      newDate += ' Monday ';
    }
    else if(tempDate[0] == 'Tue' || tempDate[0] == 'Tu' || tempDate[0] == 'Tues'){
      newDate += ' Tuesday ';
    }
    else if(tempDate[0] == 'Wed'){
      newDate += ' Wednesday ';
    }
    else if(tempDate[0] == 'Thu' || tempDate[0] == 'Thur' || tempDate[0] == 'Thurs'){
      newDate += ' Thursday ';
    }
    else if(tempDate[0] == 'Fri'){
      newDate += ' Friday ';
    }
    else if(tempDate[0] == 'Sat'){
      newDate += ' Saturday ';
    }
    else if(tempDate[0] == 'Sun'){
      newDate += ' Sunday ';
    }

    if(tempDate[1] == 'Jan'){
      newDate += 'January';
    }
    else if(tempDate[1] == 'Feb'){
      newDate += 'February';
    }
    else if(tempDate[1] == 'Mar'){
      newDate += 'March';
    }
    else if(tempDate[1] == 'Apr'){
      newDate += 'April';
    }
    else if(tempDate[1] == 'Jun'){
      newDate += 'June';
    }
    else if(tempDate[1] == 'Jul'){
      newDate += 'July';
    }
    else if(tempDate[1] == 'Aug'){
      newDate += 'August';
    }
    else if(tempDate[1] == 'Sep' || tempDate[1] == 'Sept'){
      newDate += 'September';
    }
    else if(tempDate[1] == 'Oct'){
      newDate += 'October';
    }
    else if(tempDate[1] == 'Nov'){
      newDate += 'November';
    }
    else if(tempDate[1] == 'Dec'){
      newDate += 'December';
    }

    newDate += ' ' + tempDate[3];

    return newDate;
  }  
  
  
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       LOAD_NOTIFICATIONS
  /**
   *  This function will load the admin's notifications into the notification section on the HTML page
   * 
   * @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNotifications(){
    //Need to fetch all notifications from local storage to make sure that notifications that have been read are not reloaded
    const storageNotifications = JSON.parse(localStorage.getItem('readNotifications'));

    //Loading the 'USER' logs
    this.notificationLoggingService.getAllUserLogs().subscribe((response: any) => {
      if(response.success = true){
        const data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          var tempLog: UserLogs = {Type: 'USER', Action: data[i].action, Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, Organization1: data[i].org1, Organization2: data[i].org2, MoreInfo: data[i].moreInfo, ID: this.localNotificationNumber};
          
          if(storageNotifications != null && storageNotifications.length != 0){
            for(var j = 0; j < storageNotifications.length; j++){
              if(storageNotifications[j].Type == 'USER' && storageNotifications[i].Action == tempLog.Action && 
                 storageNotifications[i].Date == tempLog.Date && storageNotifications.User == tempLog.User){
                this.readNotifications.push(tempLog);
              }
              else{
                const user1 = this.loadUserDetails(tempLog.Organization2, tempLog.Details);
                const user2 = this.loadUserDetails(tempLog.Organization1, tempLog.User);

                if(tempLog.Action == 'C'){
                  tempLog.Action = user1 + ' was added to the system by ' + user2;
                }
                else if(tempLog.Action == 'D'){
                  tempLog.Action = user1 + ' was removed from the system by ' + user2;
                }
                else if(tempLog.Action == 'U'){
                  tempLog.Action = user1 + ' details where updated by ' + user2;
                }

                this.allNotifications.push(tempLog);
                this.numberOfUserLogs += 1;
                this.localNotificationNumber += 1;
              }
            }
          }
          else{
            const user1 = this.loadUserDetails(tempLog.Organization2, tempLog.Details);
            const user2 = this.loadUserDetails(tempLog.Organization1, tempLog.User);

            if(tempLog.Action == 'C'){
              tempLog.Action = user1 + ' was added to the system by ' + user2;
            }
            else if(tempLog.Action == 'D'){
              tempLog.Action = user1 + ' was removed from the system by ' + user2;
            }
            else if(tempLog.Action == 'U'){
              tempLog.Action = user1 + ' details where updated by ' + user2;
            }

            this.allNotifications.push(tempLog);
            this.numberOfUserLogs += 1;
            this.localNotificationNumber += 1;
          }
        }
      }
      else{
        //Error handling
      }
    });


    //Loading the 'DBML' logs
    this.notificationLoggingService.getAllDatabaseManagementLogs().subscribe((response: any) => {
      if(response.success = true){
        const data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          var tempLog: DatabaseManagementLogs = {Type: 'DBML', Action: data[i].action, Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, Organization1: data[i].org1, Organization2: data[i].org2, MoreInfo: data[i].moreInfo, ID: this.localNotificationNumber};
          
          if(storageNotifications != null && storageNotifications.length != 0){
            for(var j = 0; j < storageNotifications.length; j++){
              if(storageNotifications[j].Type == 'USER' && storageNotifications[i].Action == tempLog.Action && 
                 storageNotifications[i].Date == tempLog.Date && storageNotifications.User == tempLog.User){
                this.readNotifications.push(tempLog);
              }
              else{
                const user1 = this.loadUserDetails(tempLog.Organization1, tempLog.User);

                if(tempLog.Action == 'C'){
                  tempLog.Action = tempLog.Details + ' was added to the system by ' + user1;
                }
                else if(tempLog.Action == 'D'){
                  tempLog.Action = tempLog.Details + ' was removed from the system by ' + user1;
                }
                else if(tempLog.Action == 'U'){
                  tempLog.Action = tempLog.Details + ' details where updated by ' + user1;
                }

                this.allNotifications.push(tempLog);
                this.numberOfUserLogs += 1;
                this.localNotificationNumber += 1;
              }
            }
          }
          else{
            const user1 = this.loadUserDetails(tempLog.Organization1, tempLog.User);

            if(tempLog.Action == 'C'){
              tempLog.Action = tempLog.Details + ' was added to the system by ' + user1;
            }
            else if(tempLog.Action == 'D'){
              tempLog.Action = tempLog.Details + ' was removed from the system by ' + user1;
            }
            else if(tempLog.Action == 'U'){
              tempLog.Action = tempLog.Details + ' details where updated by ' + user1;
            }

            this.allNotifications.push(tempLog);
            this.numberOfUserLogs += 1;
            this.localNotificationNumber += 1;
          }
        }
      }
      else{
        //Error handling
      }
    });


    //Loading the 'ACCL' logs
    this.notificationLoggingService.getAllAccessLogs().subscribe((response: any) => {
      if(response.success = true){
        const data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          var tempLog: AccessLogs = {Type: 'ACCL', Action: 'Access', Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, ID: this.localNotificationNumber};
          
          if(storageNotifications != null && storageNotifications.length != 0){
            for(var j = 0; j < storageNotifications.length; j++){
              if(storageNotifications[j].Type == 'ACCL' && storageNotifications[i].Date == tempLog.Date && 
              storageNotifications.User == tempLog.User){
                  this.readNotifications.push(tempLog);
                }
                else{
                  //Access notifications
                  this.allNotifications.push(tempLog);
                  this.numberOfAccessLogs += 1;
                  this.localNotificationNumber += 1;
                }
            }
          }
          else{
            this.allNotifications.push(tempLog);
            this.numberOfAccessLogs += 1;
            this.localNotificationNumber += 1;
          }
        }
      }
      else{
        //Error handling
      }
    });

    //Pushing the readNotifications array to local storage
    localStorage.setItem('readNotifications', JSON.stringify(this.readNotifications));
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_USER_DETAILS
  /**
   *  This function will be called so that the information of a specific user can be fetched
   *  @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails(userOrganization: string, userID: string) {
    this.userManagementService.getUserDetails(userOrganization, userID).subscribe((response: any) => {
      if(response.success == true){
        const data = response.data;

        return data.fname + ' ' + data.surname;
      } 
      else{
        //Error control
      }
    });
  }

  ngOnInit() {
    this.loadNotifications();

    //-------- Load Databases for Drop Down --------
    const user2 = this.authService.getCurrentUserValue;
    const user = this.authService.getCurrentSessionValue;


    console.log("///////// USER: " + JSON.stringify(user2));
    // this.databases = user.databases;
    this.databases = user.user.databases;


  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  SUBMIT_CSV
  /**
   *  This function will be used to submit a .csv file so that it can be converted into a database for the user
   *  @param {any} input
   *  @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public submitCSV(input) {
    this.fileInput = input;
    this.loading = true;
    this.dbname = this.port.nativeElement.value;

    if(this.dbname == ""){
      let snackBarRef = this.snackBar.open("Please enter a name for the database", "Dismiss", { duration: 3000 });
      return;
    }

    const reader = new FileReader();
    reader.readAsText(this.fileInput.files[0]);
    reader.onload = () => {
      let text = reader.result;

      console.log("porting data:");
      this.jsonData = this.portCSV.convertToJSON(text); //converts file to JSON Object

      var columnsIn = this.jsonData[0];
      for(var key in columnsIn){;
        this.headings.push(key);
      } 
      
      for(var i = 0; i < this.jsonData.length; i++){
        var columnsIn = this.jsonData[i];
        for(var key in columnsIn){
          this.columns.push(this.jsonData[i][key]);
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

    this.preview = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET_CSV
  /**
   *  This function will be used to download the selected database in the format of a .csv file.
   *  @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getCSV(){
    let data = "";
    let dbname = this.selectedDatabase;

    this.dbService.reversePorting(dbname).subscribe((response:any) => {
        this.loading = false;
        if(response.success == true && response.code == 200) {
          data = response.data.docs;
          let CSVdata = this.portCSV.extractDatabase(data, dbname);
          
          //Save data in csv file and show download dialog
          var blob = new Blob([CSVdata], {type: 'application/csv;charset=utf-8'});
          var downloadLink = document.createElement('a');
          downloadLink.setAttribute('download', dbname+".csv" );
          downloadLink.setAttribute('href', window.URL.createObjectURL(blob) );
          var event = new MouseEvent("click");
          downloadLink.dispatchEvent(event);
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
        });
      
        console.log("ERROR:" + err.message);
    }); 
  }


  public viewDatabase() {
    this.dbService.retrieveDatabase(this.selectedDatabase).subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        
        console.log("---- RESPONSE: " + JSON.stringify(response));

        Object.keys(response.data.docs[0]).forEach((column) => {

          let obj = {
            'name': column
          }
          this.fields.push(obj);

        });

        this.displayedColumns= this.fields.map(field => field.name);

        var databaseDetails = this.databases.find(database => {
          return database.name == this.selectedDatabase;
        });

        if(databaseDetails && (databaseDetails != null && databaseDetails != '') && databaseDetails.privileges.indexOf('create') != -1) {
          this.databasePrivileges.create = true;
        }
        if(databaseDetails && databaseDetails != null && databaseDetails != '' && databaseDetails.privileges.indexOf('retrieve') != -1) {
          this.databasePrivileges.retrieve = true;
        }
        if(databaseDetails && databaseDetails != null && databaseDetails != '' && databaseDetails.privileges.indexOf('update') != -1) {
          this.databasePrivileges.update = true;
          this.displayedColumns.push("Update");
        }
        if(databaseDetails && databaseDetails != null && databaseDetails != '' && databaseDetails.privileges.indexOf('delete') != -1) {
          this.databasePrivileges.delete = true;
          this.displayedColumns.push("Remove");
        }

        this.dataSource = new MatTableDataSource(response.data.docs);
        
        // this.dataSource.paginator = this.paginator;
  
      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Sorry there was an error loading the data", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.ngOnInit();
          }
        })
      }
    });

  }
  
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  SUBMIT_DATABASE
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
      this.dbService.porting(this.dbname, this.jsonData).subscribe((response:any) => {
        this.loading = false;
        if(response.success == true && response.code == 200) {
          //POPUP MESSAGE
          let snackBarRef = this.snackBar.open("Successfully ported CSV file", "Dismiss", {
            duration: 3000
          });

          this.ported = true;
        }else if (response.success == false) {
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
          console.log("ERROR:" + err.message);
      });
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  REMOVE_PREVIEW
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
  //                                           TOGGLE_NOTIFICATIONS_TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof DatabaseHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab(){
    this.toggle_status = !this.toggle_status; 
 }


 logout() {

  this.authService.logoutUser();
  this.router.navigate(['/login']);

}

}

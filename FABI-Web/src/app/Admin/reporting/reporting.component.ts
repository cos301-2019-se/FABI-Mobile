/**
 * File Name: reporting.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\reporting\reporting.component.ts
 * Project Name: fabi-web
 * Created Date: Wednesday, July 17td 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Monday, July 22nd 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  /** Indicates if there are logs of type USER - @type {boolean} */
  userLogs: boolean = false;
  /** Indicates if there are logs of type DBML - @type {boolean} */
  databaseLogs: boolean = false;
  /** Indicates if there are logs of type ACCL - @type {boolean} */
  accessLogs: boolean = false;
  /** Indicates if there are logs of type ERRL - @type {boolean} */
  errorLogs: boolean = false;

  /** Indicates if the error report has been generated - @type {boolean} */
  errorReport: boolean = false;

  /** Array holding the user logs - @type {any} */
  userLogsArray: any[] = [];
  /** Array holding the database logs - @type {any} */
  databaseLogsArray: any[] = [];
  /** Array holding the access logs - @type {any} */
  accessLogsArray: any[] = [];
  /** Array holding the error logs - @type {any} */
  errorLogsArray: any[] = [];

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

  /** Holds the table element (userLogsTable) from the HTML page - @type {ElementRef} */
  @ViewChild("userLogsTable") userLogsTable : ElementRef;
  /** Holds the table element (databaseLogsTable) from the HTML page - @type {ElementRef} */
  @ViewChild("databaseLogsTable") databaseLogsTable : ElementRef;
  /** Holds the table element (userLogsTable) from the HTML page - @type {ElementRef} */
  @ViewChild("accessLogsTable") accessLogsTable : ElementRef;
  /** Holds the table element (userLogsTable) from the HTML page - @type {ElementRef} */
  @ViewChild("errorLogsTable") errorLogsTable : ElementRef;

  /** Holds the table element (userAdd) from the HTML page - @type {ElementRef} */
  @ViewChild("userAdd") userAdd : ElementRef;
  /** Holds the table element (databaseAdd) from the HTML page - @type {ElementRef} */
  @ViewChild("databaseAdd") databaseAdd : ElementRef;
  /** Holds the table element (accessAdd) from the HTML page - @type {ElementRef} */
  @ViewChild("accessAdd") accessAdd : ElementRef;
  /** Holds the table element (errorAdd) from the HTML page - @type {ElementRef} */
  @ViewChild("errorAdd") errorAdd : ElementRef;

  /** Holds the table element (userCollapse) from the HTML page - @type {ElementRef} */
  @ViewChild("userCollapse") userCollapse : ElementRef;
  /** Holds the table element (databaseCollapse) from the HTML page - @type {ElementRef} */
  @ViewChild("databaseCollapse") databaseCollapse : ElementRef;
  /** Holds the table element (accessCollapse) from the HTML page - @type {ElementRef} */
  @ViewChild("accessCollapse") accessCollapse : ElementRef;
  /** Holds the table element (errorCollapse) from the HTML page - @type {ElementRef} */
  @ViewChild("errorCollapse") errorCollapse : ElementRef;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of ReportingComponent.
   * 
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private notificationLoggingService: NotificationLoggingService, private userManagementService: UserManagementAPIService,
    private renderer: Renderer2) { }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_USER_DETAILS
  /**
   *  This function will be called so that the information of a specific user can be fetched
   *  @memberof ReportingComponent
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


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_ALL_LOGS
  /**
   *  This function will be called so that all the logs can be fetched and inserted into a table
   *  on the HTML page.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadAllLogs() {
    //Loading the 'USER' logs
    this.notificationLoggingService.getAllUserLogs().subscribe((response: any) => {
      if(response.success = true){
        var data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          var tempArray: any = [];
          if(data[i].action == 'C'){
            tempArray.push('Added new user');
          }
          else if(data[i].action == 'R'){
            tempArray.push('Viewed user profile');
          }
          else if(data[i].action == 'U'){
            tempArray.push('Updated user details');
          }
          else if(data[i].action == 'D'){
            tempArray.push('Removed user from system');
          }
          
          tempArray.push(this.getDate(data[i].dateString));

          //Fetch user information
          tempArray.push(this.loadUserDetails(data[i].org2, data[i].details));
          tempArray.push(this.loadUserDetails(data[i].org1, data[i].user));

          this.userLogsArray.push(tempArray);
        }
      }
      else{
        //Error handling
      }
    });


    //Loading the 'DBML' logs
    this.notificationLoggingService.getAllDatabaseManagementLogs().subscribe((response: any) => {
      if(response.success = true){
        var data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          var tempArray: any = [];
          if(data[i].action == 'C'){
            tempArray.push('Added new database');
          }
          else if(data[i].action == 'R'){
            tempArray.push('Viewed database');
          }
          else if(data[i].action == 'U'){
            tempArray.push('Updated database');
          }
          else if(data[i].action == 'D'){
            tempArray.push('Removed database');
          }
          
          tempArray.push(this.getDate(data[i].dateString));

          //Fetch user information
          tempArray.push(this.loadUserDetails(data[i].org1, data[i].user));

          tempArray.push(data[i].details);

          this.databaseLogsArray.push(tempArray);
        }
      }
      else{
        //Error handling
      }
    });


    //Loading the 'ACCL' logs
    this.notificationLoggingService.getAllAccessLogs().subscribe((response: any) => {
      if(response.success = true){
        var data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          var tempArray: any = [];
          
          tempArray.push(data[i].details);
          tempArray.push(this.getDate(data[i].dateString));

          //Fetch user information
          tempArray.push(this.loadUserDetails(data[i].org1, data[i].user));

          tempArray.push(data[i].moreInfo);

          this.accessLogsArray.push(tempArray);
        }
      }
      else{
        //Error handling
      }
    });


    //Loading the 'ERRL' logs
    this.notificationLoggingService.getAllErrorLogs().subscribe((response: any) => {
      if(response.success = true){
        var data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          var tempArray: any = [];
          
          tempArray.push(data[i].statusCode);
          tempArray.push(this.getDate(data[i].dateString));
          tempArray.push(data[i].details);

          //Fetch user information
          tempArray.push(this.loadUserDetails(data[i].org1, data[i].user));

          this.errorLogsArray.push(tempArray);
        }
      }
      else{
        //Error handling
      }
    });

    //Determines if the
    if(this.userLogsArray != null){
      this.userLogs = true;
    }

    if(this.databaseLogsArray != null){
      this.databaseLogs = true;
    }

    if(this.accessLogsArray != null){
      this.accessLogs = true;
    }

    if(this.errorLogsArray != null){
      this.errorLogs = true;
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  GENERATE_ERROR_REPORT
  /**
   *  This function will be used to generate the error report and display it on screen
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  generateErrorReport() {
    this.errorReport = true;

    //Loading the 'ERRL' logs
    this.notificationLoggingService.getAllErrorLogs().subscribe((response: any) => {
      if(response.success = true){
        var data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          var tempArray: any = [];
          
          tempArray.push(data[i].statusCode);
          tempArray.push(this.getDate(data[i].dateString));
          tempArray.push(data[i].details);

          //Fetch user information
          tempArray.push(this.loadUserDetails(data[i].org1, data[i].user));

          this.errorLogsArray.push(tempArray);
        }
      }
      else{
        //Error handling
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        GET_DATE
  /**
   *  This function will put the string date provided into a more readable format for the notifications
   * @param {string} date The date of the log
   * @memberof ReportingComponent
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
  //                                           TOGGLE_NOTIFICATIONS_TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab(){
    this.toggle_status = !this.toggle_status; 
 }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  EXPAND_USER_LOG_TABLE
  /**
   *  This function will be used to expand the table containing the user logs on depand.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  expandUserLogTable(){
    this.renderer.setStyle(this.userLogsTable.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.userCollapse.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.userAdd.nativeElement, 'display', 'none');
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  EXPAND_DATABASE_LOG_TABLE
  /**
   *  This function will be used to expand the table containing the database logs on depand.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  expandDatabaseLogTable(){
    this.renderer.setStyle(this.databaseLogsTable.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.databaseCollapse.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.databaseAdd.nativeElement, 'display', 'none');
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  EXPAND_ACCESS_LOG_TABLE
  /**
   *  This function will be used to expand the table containing the access logs on depand.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  expandAccessLogTable(){
    this.renderer.setStyle(this.accessLogsTable.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.accessCollapse.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.accessAdd.nativeElement, 'display', 'none');
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  EXPAND_ERROR_LOG_TABLE
  /**
   *  This function will be used to expand the table containing the error logs on depand.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  expandErrorLogTable(){
    this.renderer.setStyle(this.errorLogsTable.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.errorCollapse.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.errorAdd.nativeElement, 'display', 'none');
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  COLLAPSE_USER_LOG_TABLE
  /**
   *  This function will be used to collapse the table containing the user logs on depand.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  collapseUserLogTable(){
    this.renderer.setStyle(this.userLogsTable.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.userCollapse.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.userAdd.nativeElement, 'display', 'block');
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  COLLAPSE_DATABASE_LOG_TABLE
  /**
   *  This function will be used to collapse the table containing the database logs on depand.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  collapseDatabaseLogTable(){
    this.renderer.setStyle(this.databaseLogsTable.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.databaseCollapse.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.databaseAdd.nativeElement, 'display', 'block');
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  COLLAPSE_ACCESS_LOG_TABLE
  /**
   *  This function will be used to collapse the table containing the access logs on depand.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  collapseAccessLogTable(){
    this.renderer.setStyle(this.accessLogsTable.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.accessCollapse.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.accessAdd.nativeElement, 'display', 'block');
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  COLLAPSE_ERROR_LOG_TABLE
  /**
   *  This function will be used to collapse the table containing the error logs on depand.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  collapseErrorLogTable(){
    this.renderer.setStyle(this.errorLogsTable.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.errorCollapse.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.errorAdd.nativeElement, 'display', 'block');
  }

  ngOnInit() {
    this.loadAllLogs();
  }

}

/**
 * File Name: reporting.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\reporting\reporting.component.ts
 * Project Name: fabi-web
 * Created Date: Wednesday, July 17td 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 2nd 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { NotificationLoggingService, UserLogs, DatabaseManagementLogs, AccessLogs } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { CultureCollectionAPIService } from '../../_services/culture-collection-api.service';

//These imports are used to created a downloadable PDF of the reports
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

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
  /** Indicates if there are logs of type REQUEST - @type {boolean} */
  requestLogs: boolean = false;
  /** Indicates if there are logs of type DEPOSIT - @type {boolean} */
  depositLogs: boolean = false;
  /** Indicates if there are logs of type REVITALIZATION - @type {boolean} */
  revitalizationLogs: boolean = false;

  /** Indicates if the error report has been generated - @type {boolean} */
  errorReport: boolean = false;
  /** Indicates if the request report has been generated - @type {boolean} */
  requestReport: boolean = false;
  /** Indicates if the deposit report has been generated - @type {boolean} */
  depositReport: boolean = false;
  /** Indicates if the revitalization report has been generated - @type {boolean} */
  revitalizationReport: boolean = false;

  /** The current date in string format - @type {string} */
  date: string;
  /** The date that the logs must start from - @type {string} */
  dateFrom: string = '';
  /** The date that the logs must end at - @type {string} */
  dateTo: string = '';

  /** Object array for holding all of the logs -  @type {any[]} */ 
  allNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {any[]} */ 
  newNotifications: any[] = [];

  /** Array holding the user logs - @type {any} */
  userLogsArray: any[] = [];
  /** Array holding the database logs - @type {any} */
  databaseLogsArray: any[] = [];
  /** Array holding the access logs - @type {any} */
  accessLogsArray: any[] = [];
  /** Array holding the error logs - @type {any} */
  errorLogsArray: any[] = [];
  /** Array holding the request logs - @type {any} */
  requestLogsArray: any[] = [];
  /** Array holding the deposit logs - @type {any} */
  depositLogsArray: any[] = [];
  /** Array holding the revitalization logs - @type {any} */
  revitalizationLogsArray: any[] = [];

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

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

  /** Holds the table element (errorReportPDF) from the HTML page - @type {ElementRef} */
  @ViewChild("errorReportPDF") errorReportPDF : ElementRef;
  /** Holds the table element (requestReportPDF) from the HTML page - @type {ElementRef} */
  @ViewChild("requestReportPDF") requestReportPDF : ElementRef;
  /** Holds the table element (depositReportPDF) from the HTML page - @type {ElementRef} */
  @ViewChild("depositReportPDF") depositReportPDF : ElementRef;
  /** Holds the table element (revitalizationReportPDF) from the HTML page - @type {ElementRef} */
  @ViewChild("revitalizationReportPDF") revitalizationReportPDF : ElementRef;

  /** Holds the table element (requestDateFrom) from the HTML page - @type {ElementRef} */
  @ViewChild("requestDateFrom") requestDateFrom : ElementRef;
  /** Holds the table element (requestDateTo) from the HTML page - @type {ElementRef} */
  @ViewChild("requestDateTo") requestDateTo : ElementRef;
  /** Holds the table element (depositDateFrom) from the HTML page - @type {ElementRef} */
  @ViewChild("depositDateFrom") depositDateFrom : ElementRef;
  /** Holds the table element (depositDateTo) from the HTML page - @type {ElementRef} */
  @ViewChild("depositDateTo") depositDateTo : ElementRef;
  /** Holds the table element (revitalizationDateFrom) from the HTML page - @type {ElementRef} */
  @ViewChild("revitalizationDateFrom") revitalizationDateFrom : ElementRef;
  /** Holds the table element (revitalizationDateTo) from the HTML page - @type {ElementRef} */
  @ViewChild("revitalizationDateTo") revitalizationDateTo : ElementRef;
  

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of ReportingComponent.
   * 
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {CultureCollectionAPIService} cultureCollectionService For calling the Culture Collection API Service
   * @param {UserManagementAPIService} userManagementService For calling the User Management API Service
   * @param {AuthenticationService} authService Used for all authentication and session control
   * @param {Router} router
   * @param {Renderer2} renderer Used for creating the PDF documents to download
   * 
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private notificationLoggingService: NotificationLoggingService, 
    private userManagementService: UserManagementAPIService,
    private renderer: Renderer2, 
    private authService: AuthenticationService, 
    private router: Router,
    private cultureCollectionService: CultureCollectionAPIService
    ) { }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_USER_DETAILS
  /**
   *  This function will be called so that the information of a specific user can be fetched
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails(userOrganization: string, userID: string) {
    //Making a call to the User Management API Service to retrieve a specific users details
    this.userManagementService.getUserDetails(userOrganization, userID).subscribe((response: any) => {
      if(response.success == true){
        //Temporarily holds the data returned from the API call
        const data = response.data;

        //Returns the users name and surname as a connected string
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
        //Temporarily holds the data returned from the API call
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
        //Temporarily holds the data returned from the API call
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
        //Temporarily holds the data returned from the API call
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
        //Temporarily holds the data returned from the API call
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

    //Determines if there are user logs to load or not
    if(this.userLogsArray != null){
      this.userLogs = true;
    }

    //Determines if there are database logs to load or not
    if(this.databaseLogsArray != null){
      this.databaseLogs = true;
    }

    //Determines if there are access logs to load or not
    if(this.accessLogsArray != null){
      this.accessLogs = true;
    }

    //Determines if there are error logs to load or not
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
    this.requestReport = false;
    this.depositReport = false;
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
  //                                                  DOWNLOAD_ERROR_REPORT
  /**
   *  This function will be used to download the error report that is displayed on screen as a PDF document.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  downloadErrorReport() {
    var report = this.errorReportPDF.nativeElement;
    html2canvas(report).then(canvas => {
      var imageWidth = 208;
      var pageHeight = 295;
      var imageHeight = canvas.height * imageWidth / canvas.width;
      var heightLeft = imageHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imageWidth, imageHeight);
      pdf.save('Error_Report.pdf');
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  GENERATE_REQUEST_REPORT
  /**
   *  This function will be used to generate the request report and display it on screen
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  generateRequestReport() {
    this.errorReport = false;
    this.depositReport = false;
    this.requestReport = true;
    this.revitalizationReport = false;

    //Loading the Request forms
    this.cultureCollectionService.getAllRequestLogs().subscribe((response: any) => {
      if(response.success = true){
        var data = response.data.qs.forms;

        if(this.dateFrom != '' && this.dateTo != ''){
          this.requestLogsArray = [];
          for(var j = 0; j < data.length; j++){
            if(data[j].dateSubmitted == this.dateFrom || data[j].dateSubmitted == this.dateTo){
              var tempArray: any = [];
              
              tempArray.push(this.loadUserDetails('FABI', data[j].userID));
              tempArray.push(data[j].requestor);
              tempArray.push(data[j].cultureNumber);
              tempArray.push(data[j].taxonName);
              tempArray.push(data[j].referenceNumber);
              tempArray.push(data[j].dateRequested);
              tempArray.push(data[j].dateSubmitted);
    
              this.requestLogsArray.push(tempArray);
            }
            else{
              var month = Number(data[j].dateSubmitted[3] + data[j].dateSubmitted[4]);
              var monthFrom = Number(this.dateFrom[3] + this.dateFrom[4]);

              if(month == monthFrom){
                var day = Number(data[j].dateSubmitted[0] + data[j].dateSubmitted[1]);
                var dayFrom = Number(this.dateFrom[0] + this.dateFrom[1]);

                if(day >= dayFrom){
                  var tempArray: any = [];
              
                  tempArray.push(this.loadUserDetails('FABI', data[j].userID));
                  tempArray.push(data[j].requestor);
                  tempArray.push(data[j].cultureNumber);
                  tempArray.push(data[j].taxonName);
                  tempArray.push(data[j].referenceNumber);
                  tempArray.push(data[j].dateRequested);
                  tempArray.push(data[j].dateSubmitted);
        
                  this.requestLogsArray.push(tempArray);
                }
              }

              var monthTo = Number(this.dateTo[3] + this.dateTo[4]);

              if(month == monthTo){
                var day = Number(data[j].dateSubmitted[0] + data[j].dateSubmitted[1]);
                var dayTo = Number(this.dateTo[0] + this.dateTo[1]);

                if(day <= dayTo){
                  var tempArray: any = [];
              
                  tempArray.push(this.loadUserDetails('FABI', data[j].userID));
                  tempArray.push(data[j].requestor);
                  tempArray.push(data[j].cultureNumber);
                  tempArray.push(data[j].taxonName);
                  tempArray.push(data[j].referenceNumber);
                  tempArray.push(data[j].dateRequested);
                  tempArray.push(data[j].dateSubmitted);
        
                  this.requestLogsArray.push(tempArray);
                }
              }

              if(month >= monthFrom && month <= monthTo){
                var tempArray: any = [];
              
                tempArray.push(this.loadUserDetails('FABI', data[j].userID));
                tempArray.push(data[j].requestor);
                tempArray.push(data[j].cultureNumber);
                tempArray.push(data[j].taxonName);
                tempArray.push(data[j].referenceNumber);
                tempArray.push(data[j].dateRequested);
                tempArray.push(data[j].dateSubmitted);
      
                this.requestLogsArray.push(tempArray);
              }
            }
          }
        }
        else{
          for(var i = 0; i < data.length; i++){
            var tempArray: any = [];
            
            tempArray.push(this.loadUserDetails('FABI', data[i].userID));
            tempArray.push(data[i].requestor);
            tempArray.push(data[i].cultureNumber);
            tempArray.push(data[i].taxonName);
            tempArray.push(data[i].referenceNumber);
            tempArray.push(data[i].dateRequested);
            tempArray.push(data[i].dateSubmitted);
  
            this.requestLogsArray.push(tempArray);
          }
        }
      }
      else{
        //Error handling
      }
    });

    if(this.requestLogsArray != null){
      this.requestLogs = true;
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  DOWNLOAD_REQUEST_REPORT
  /**
   *  This function will be used to download the request report that is displayed on screen as a PDF document.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  downloadRequestReport() {
    var report = this.requestReportPDF.nativeElement;
    html2canvas(report).then(canvas => {
      var imageWidth = 208;
      var pageHeight = 295;
      var imageHeight = canvas.height * imageWidth / canvas.width;
      var heightLeft = imageHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imageWidth, imageHeight);
      pdf.save('Request_Report.pdf');
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  GENERATEE_DEPOSIT_REPORT
  /**
   *  This function will be used to generate the deposit report and display it on screen
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  generateDepositReport() {
    this.errorReport = false;
    this.depositReport = true;
    this.requestReport = false;
    this.revitalizationReport = false;

    //Loading the Deposit forms
    this.cultureCollectionService.getAllDepositLogs().subscribe((response: any) => {
      if(response.success = true){
        var data = response.data.qs.forms;

        if(this.dateFrom != '' && this.dateTo != ''){
          this.depositLogsArray = [];
          for(var j = 0; j < data.length; j++){
            if(data[j].dateSubmitted == this.dateFrom || data[j].dateSubmitted == this.dateTo){
              var tempArray: any = [];
              
              tempArray.push(this.loadUserDetails('FABI', data[j].userID));
              tempArray.push(data[j].cmwCultureNumber);
              tempArray.push(data[j].name);
              tempArray.push(data[j].collectedBy);
              tempArray.push(data[j].dateCollected);
              tempArray.push(data[j].isolatedBy);
              tempArray.push(data[j].identifiedBy);
              tempArray.push(data[j].dateSubmitted);
    
              this.depositLogsArray.push(tempArray);
            }
            else{
              var month = Number(data[j].dateSubmitted[3] + data[j].dateSubmitted[4]);
              var monthFrom = Number(this.dateFrom[3] + this.dateFrom[4]);

              if(month == monthFrom){
                var day = Number(data[j].dateSubmitted[0] + data[j].dateSubmitted[1]);
                var dayFrom = Number(this.dateFrom[0] + this.dateFrom[1]);

                if(day >= dayFrom){
                  var tempArray: any = [];
              
                  tempArray.push(this.loadUserDetails('FABI', data[j].userID));
                  tempArray.push(data[j].cmwCultureNumber);
                  tempArray.push(data[j].name);
                  tempArray.push(data[j].collectedBy);
                  tempArray.push(data[j].dateCollected);
                  tempArray.push(data[j].isolatedBy);
                  tempArray.push(data[j].identifiedBy);
                  tempArray.push(data[j].dateSubmitted);
        
                  this.depositLogsArray.push(tempArray);
                }
              }

              var monthTo = Number(this.dateTo[3] + this.dateTo[4]);

              if(month == monthTo){
                var day = Number(data[j].dateSubmitted[0] + data[j].dateSubmitted[1]);
                var dayTo = Number(this.dateTo[0] + this.dateTo[1]);

                if(day <= dayTo){
                  var tempArray: any = [];
              
                  tempArray.push(this.loadUserDetails('FABI', data[j].userID));
                  tempArray.push(data[j].cmwCultureNumber);
                  tempArray.push(data[j].name);
                  tempArray.push(data[j].collectedBy);
                  tempArray.push(data[j].dateCollected);
                  tempArray.push(data[j].isolatedBy);
                  tempArray.push(data[j].identifiedBy);
                  tempArray.push(data[j].dateSubmitted);
        
                  this.depositLogsArray.push(tempArray);
                }
              }

              if(month >= monthFrom && month <= monthTo){
                var tempArray: any = [];
              
                tempArray.push(this.loadUserDetails('FABI', data[j].userID));
                tempArray.push(data[j].requestor);
                tempArray.push(data[j].cultureNumber);
                tempArray.push(data[j].taxonName);
                tempArray.push(data[j].referenceNumber);
                tempArray.push(data[j].dateRequested);
                tempArray.push(data[j].dateSubmitted);
      
                this.depositLogsArray.push(tempArray);
              }
            }
          }
        }
        else{
          for(var i = 0; i < data.length; i++){
            var tempArray: any = [];
            
            tempArray.push(this.loadUserDetails('FABI', data[i].userID));
            tempArray.push(data[i].requestor);
            tempArray.push(data[i].cultureNumber);
            tempArray.push(data[i].taxonName);
            tempArray.push(data[i].referenceNumber);
            tempArray.push(data[i].dateRequested);
            tempArray.push(data[i].dateSubmitted);
  
            this.depositLogsArray.push(tempArray);
          }
        }
      }
      else{
        //Error handling
      }
    });

    if(this.depositLogsArray != null){
      this.depositLogs = true;
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  DOWNLOAD_DEPOSIT_REPORT
  /**
   *  This function will be used to download the deposit report that is displayed on screen as a PDF document.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  downloadDepositReport() {
    var report = this.depositReportPDF.nativeElement;
    html2canvas(report).then(canvas => {
      var imageWidth = 208;
      var pageHeight = 295;
      var imageHeight = canvas.height * imageWidth / canvas.width;
      var heightLeft = imageHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imageWidth, imageHeight);
      pdf.save('Deposit_Report.pdf');
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  GENERATE_REVITALIZATION_REPORT
  /**
   *  This function will be used to generate the revitalization report and display it on screen
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  generateRevitalizationReport() {
    this.requestReport = false;
    this.depositReport = false;
    this.errorReport = false;
    this.revitalizationReport = true;

    //Loading the Revitalization forms
    this.cultureCollectionService.getAllRevitalizationLogs().subscribe((response: any) => {
      if(response.success = true){
        var data = response.data.qs.forms;

        if(this.dateFrom != '' && this.dateTo != ''){
          this.revitalizationLogsArray = [];
          for(var j = 0; j < data.length; j++){
            if(data[j].dateSubmitted == this.dateFrom || data[j].dateSubmitted == this.dateTo){
              var tempArray: any = [];
              
              tempArray.push(this.loadUserDetails('FABI', data[j].userID));
              tempArray.push(data[j].requestor);
              tempArray.push(data[j].cultureNumber);
              tempArray.push(data[j].currentName);
              tempArray.push(data[j].referenceNumber);
              tempArray.push(data[j].dateRequested);
              tempArray.push(data[j].dateReturned);
              tempArray.push(data[j].dateSubmitted);
    
              this.revitalizationLogsArray.push(tempArray);
            }
            else{
              var month = Number(data[j].dateSubmitted[3] + data[j].dateSubmitted[4]);
              var monthFrom = Number(this.dateFrom[3] + this.dateFrom[4]);

              if(month == monthFrom){
                var day = Number(data[j].dateSubmitted[0] + data[j].dateSubmitted[1]);
                var dayFrom = Number(this.dateFrom[0] + this.dateFrom[1]);

                if(day >= dayFrom){
                  var tempArray: any = [];
              
                  tempArray.push(this.loadUserDetails('FABI', data[j].userID));
                  tempArray.push(data[j].requestor);
                  tempArray.push(data[j].cultureNumber);
                  tempArray.push(data[j].currentName);
                  tempArray.push(data[j].referenceNumber);
                  tempArray.push(data[j].dateRequested);
                  tempArray.push(data[j].dateReturned);
                  tempArray.push(data[j].dateSubmitted);
        
                  this.revitalizationLogsArray.push(tempArray);
                }
              }

              var monthTo = Number(this.dateTo[3] + this.dateTo[4]);

              if(month == monthTo){
                var day = Number(data[j].dateSubmitted[0] + data[j].dateSubmitted[1]);
                var dayTo = Number(this.dateTo[0] + this.dateTo[1]);

                if(day <= dayTo){
                  var tempArray: any = [];
              
                  tempArray.push(this.loadUserDetails('FABI', data[j].userID));
                  tempArray.push(data[j].requestor);
                  tempArray.push(data[j].cultureNumber);
                  tempArray.push(data[j].currentName);
                  tempArray.push(data[j].referenceNumber);
                  tempArray.push(data[j].dateRequested);
                  tempArray.push(data[j].dateReturned);
                  tempArray.push(data[j].dateSubmitted);
        
                  this.revitalizationLogsArray.push(tempArray);
                }
              }

              if(month >= monthFrom && month <= monthTo){
                var tempArray: any = [];
              
                tempArray.push(this.loadUserDetails('FABI', data[j].userID));
                tempArray.push(data[j].requestor);
                tempArray.push(data[j].cultureNumber);
                tempArray.push(data[j].currentName);
                tempArray.push(data[j].referenceNumber);
                tempArray.push(data[j].dateRequested);
                tempArray.push(data[j].dateReturned);
                tempArray.push(data[j].dateSubmitted);
      
                this.revitalizationLogsArray.push(tempArray);
              }
            }
          }
        }
        else{
          for(var i = 0; i < data.length; i++){
            var tempArray: any = [];
            
            tempArray.push(this.loadUserDetails('FABI', data[i].userID));
            tempArray.push(data[i].requestor);
            tempArray.push(data[i].cultureNumber);
            tempArray.push(data[i].currentName);
            tempArray.push(data[i].referenceNumber);
            tempArray.push(data[i].dateRequested);
            tempArray.push(data[i].dateReturned);
            tempArray.push(data[i].dateSubmitted);
  
            this.revitalizationLogsArray.push(tempArray);
          }
        }
      }
      else{
        //Error handling
      }
    });

    if(this.revitalizationLogsArray != null){
      this.revitalizationLogs = true;
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  DOWNLOAD_REVITALIZATION_REPORT
  /**
   *  This function will be used to download the revitalization report that is displayed on screen as a PDF document.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  downloadRevitalizationReport() {
    var report = this.revitalizationReportPDF.nativeElement;
    html2canvas(report).then(canvas => {
      var imageWidth = 208;
      var pageHeight = 295;
      var imageHeight = canvas.height * imageWidth / canvas.width;
      var heightLeft = imageHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imageWidth, imageHeight);
      pdf.save('Revitalization_Report.pdf');
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


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  SET_DATE_FROM
  /**
   *  This function will set the starting date for the logs on the reporting page.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  setDateFrom(){
    var temp;

    if(this.requestReport == true){
      temp = this.requestDateFrom.nativeElement.value;
    }
    else if(this.depositReport == true){
      temp = this.depositDateFrom.nativeElement.value;
    }
    else if(this.revitalizationReport == true){
      temp = this.revitalizationDateFrom.nativeElement.value;
    }
    
    var day = temp[8] + temp[9];
    var month = temp[5] + temp[6];
    var year = temp[0] + temp[1] + temp[2] + temp[3];

    this.dateFrom = day + '/' + month + '/' + year;

    if(this.dateTo == ''){
      var tempDate = new Date();
      this.dateTo = ('0' + tempDate.getDate()).slice(-2) + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    }
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  SET_DATE_TO
  /**
   *  This function will set the ending date for the logs on the reporting page.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  setDateTo(){
    var temp;

    if(this.requestReport == true){
      temp = this.requestDateTo.nativeElement.value;
    }
    else if(this.depositReport == true){
      temp = this.depositDateTo.nativeElement.value;
    }
    else if(this.revitalizationReport == true){
      temp = this.revitalizationDateTo.nativeElement.value;
    }

    var day = temp[8] + temp[9];
    var month = temp[5] + temp[6];
    var year = temp[0] + temp[1] + temp[2] + temp[3];
    
    this.dateTo = day + '/' + month + '/' + year;

    if(this.dateFrom == ''){
      var tempDate = new Date();
      this.dateFrom = ('0' + tempDate.getDate()).slice(-2) + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    }

    if(this.requestReport == true){
      this.generateRequestReport();
    }
    else if(this.depositReport == true){
      this.generateDepositReport();
    }
    else if(this.revitalizationReport == true){
      this.generateRevitalizationReport();
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       LOAD_NOTIFICATIONS
  /**
   *  This function will load the admin's notifications into the notification section on the HTML page
   * 
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNotifications(){
    //Making a call too the notification logging service to return all logs belonging to a specific user
    this.notificationLoggingService.getUserLogs(localStorage.getItem('userID')).subscribe((response: any) => {
      if(response.success = true){
        //Temporarily holds the data returned from the API call
        const data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          if(data[i].Type == 'USER'){
            //A temporary instance of UserLogs that will be added to the allNotifications array
            var tempLogU: UserLogs = {LogID: data[i].date, Type: 'USER', Action: data[i].action, Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, Organization1: data[i].org1, Organization2: data[i].org2, MoreInfo: data[i].moreInfo, ID: this.localNotificationNumber};
            
            //Getting the name and surname of the users passed using their id numbers
            const user1 = this.loadUserDetails(tempLogU.Organization2, tempLogU.Details);
            const user2 = this.loadUserDetails(tempLogU.Organization1, tempLogU.User);

            if(tempLogU.Action == 'C'){
              tempLogU.Action = user1 + ' was added to the system by ' + user2;
            }
            else if(tempLogU.Action == 'D'){
              tempLogU.Action = user1 + ' was removed from the system by ' + user2;
            }
            else if(tempLogU.Action == 'U'){
              tempLogU.Action = user1 + ' details where updated by ' + user2;
            }

            this.allNotifications.push(tempLogU);
            this.numberOfUserLogs += 1;
            this.localNotificationNumber += 1;
          }
          else if(data[i].Type == 'DBML'){
            //A temporary instance of DatabaseManagementLogs that will be added to the allNotifications array
            var tempLogD: DatabaseManagementLogs = {LogID: data[i].date, Type: 'DBML', Action: data[i].action, Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, Organization1: data[i].org1, Organization2: data[i].org2, MoreInfo: data[i].moreInfo, ID: this.localNotificationNumber}

            //Getting the name and surname of the users passed using their id numbers
            const user1 = this.loadUserDetails(tempLogD.Organization1, tempLogD.User);

            if(tempLogD.Action == 'C'){
              tempLogD.Action = tempLogD.Details + ' was added to the system by ' + user1;
            }
            else if(tempLogD.Action == 'D'){
              tempLogD.Action = tempLogD.Details + ' was removed from the system by ' + user1;
            }
            else if(tempLogD.Action == 'U'){
              tempLogD.Action = tempLogD.Details + ' details where updated by ' + user1;
            }

            this.allNotifications.push(tempLogD);
            this.numberOfUserLogs += 1;
            this.localNotificationNumber += 1;
          }
          else if(data[i].Type == 'ACCL'){
            //A temporary instance of AccessLogs that will be added to the allNotifications array
            var tempLogA: AccessLogs = {LogID: data[i].date, Type: 'ACCL', Action: 'Access', Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, ID: this.localNotificationNumber};
          
            this.allNotifications.push(tempLogA);
            this.numberOfAccessLogs += 1;
            this.localNotificationNumber += 1;
          }
          
        }
      }
      else{
        //Error handling
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       REMOVE_NOTIFICATIONS
  /**
   *  This function will remove a notification from the notification section on the HTML page.
   * 
   * @param {string} id                   //The id of the notification to be removed
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeNotification(id: string){
    for(var i =  0; i < this.allNotifications.length; i++){
      if(this.allNotifications[i].ID != id){
        this.newNotifications.push(this.allNotifications[i]);
      }
    }

    // this.userManagementService.updateFABIMemberNotifications(localStorage.getItem('userID'), this.newNotifications).subscribe((response: any) => {
    //   if(response.success == true){
    //     this.loadNotifications();
    //   }
    //   else{
    //     //Error handling
    //   }
    // });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    NG_ON_INIT  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call loadNotifications() 
   * 
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    //Calling the neccessary functions as the page loads
    this.loadNotifications();

    var currentDate = new Date();
    this.date = ('0' + currentDate.getDate()).slice(-2) + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
    this.loadAllLogs();
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }
  
}

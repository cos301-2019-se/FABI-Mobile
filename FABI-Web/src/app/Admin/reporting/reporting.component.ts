/**
 * File Name: reporting.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\reporting\reporting.component.ts
 * Project Name: fabi-web
 * Created Date: Wednesday, July 17td 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, October 9th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import * as core from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';

//These imports are used to created a downloadable PDF of the reports
import * as jspdf from 'jspdf';
import 'jspdf-autotable';

import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CultureCollectionAPIService } from '../../_services/culture-collection-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';


export interface userLogInterface {
  action: string;
  date: string;
  user1: string;
  user2: string;
}

export interface databaseLogInterface {
  action: string;
  date: string;
  user: string;
  details: string;
}

export interface accessLogInterface {
  details: string;
  date: string;
  user: string;
}

export interface errorLogInterface {
  code: string;
  date: string;
  details: string;
  user: string;
}

export interface requestReportInterface {
  user: string;
  requestor: string;
  cultureNumber: string;
  taxonName: string;
  referenceNumber: string;
  dateRequested: string;
  dateSubmitted: string;
}

export interface depositReportInterface {
  user: string;
  cultureNumber: string;
  name: string;
  collectedBy: string;
  dateCollected: string;
  isolatedBy: string;
  identifiedBy: string;
  dateSubmitted: string;
}

export interface revitalizationReportInterface {
  user: string;
  requestor: string;
  cultureNumber: string;
  cultureName: string;
  referenceNumber: string;
  dateRequested: string;
  dateReturned: string;
  dateSubmitted: string;
}

export interface StaffMember {
  fname: string;
  surname: string;
  email: string;
  id: string;
}

@core.Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements core.OnInit {

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
  /** Array holding the user logs - @type {userLogInterface} */
  userLogsArray: userLogInterface[] = [];
  /** Array holding the database logs - @type {databaseLogInterface} */
  databaseLogsArray: databaseLogInterface[] = [];
  /** Array holding the access logs - @type {accessLogInterface} */
  accessLogsArray: accessLogInterface[] = [];
  /** Array holding the error logs - @type {errorLogInterface} */
  errorLogsArray: errorLogInterface[] = [];
  /** Array holding the request logs - @type {requestReportInterface} */
  requestLogsArray: requestReportInterface[] = [];
  /** Array holding the deposit logs - @type {depositReportInterface} */
  depositLogsArray: depositReportInterface[] = [];
  /** Array holding the revitalization logs - @type {revitalizationReportInterface} */
  revitalizationLogsArray: revitalizationReportInterface[] = [];

  /** Holds the table element (errorReportPDF) from the HTML page - @type {ElementRef} */
  @core.ViewChild("errorReportPDF") errorReportPDF: core.ElementRef;
  /** Holds the table element (requestReportPDF) from the HTML page - @type {ElementRef} */
  @core.ViewChild("requestReportPDF") requestReportPDF: core.ElementRef;
  /** Holds the table element (depositReportPDF) from the HTML page - @type {ElementRef} */
  @core.ViewChild("depositReportPDF") depositReportPDF: core.ElementRef;
  /** Holds the table element (revitalizationReportPDF) from the HTML page - @type {ElementRef} */
  @core.ViewChild("revitalizationReportPDF") revitalizationReportPDF: core.ElementRef;

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
  /** Indicates if the reporting tab is hidden/shown - @type {boolean} */
  reportingTab: boolean = false;
  /** Indicates if the log tab is hidden/shown - @type {boolean} */
  logsTab: boolean = false;
  /** The details of the user currently logged in -  @type {any} */
  currentUser: any;
  /** Object array for holding the staff members -  @type {StaffMember[]} */
  staff: StaffMember[] = [];

  /** Stores the data table -  @type {string} */
  public tableWidget: any;
  /** The search item the user is looking for in the table -  @type {string} */
  public searchItem: string = "";
  /** The search item the user is looking for in the table -  @type {string} */
  public searchReports: string = "";


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       CONSTRUCTOR
  /**
   * Creates an instance of ReportingComponent.
   * 
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {CultureCollectionAPIService} cultureCollectionService For calling the Culture Collection API Service
   * @param {UserManagementAPIService} userManagementService For calling the User Management API Service
   * @param {AuthenticationService} authService for calling the *authentication* service
   * @param {Router} router
   * @param {core.Renderer2} renderer Used for creating the PDF documents to download
   * 
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private notificationLoggingService: NotificationLoggingService,
    private userManagementService: UserManagementAPIService,
    private renderer: core.Renderer2,
    private authService: AuthenticationService,
    private router: Router,
    private cultureCollectionService: CultureCollectionAPIService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.currentUser = this.authService.getCurrentSessionValue.user;
    this.getAllStaff();

    //Calling the neccessary functions as the page loads
    var currentDate = new Date();
    this.date = ('0' + currentDate.getDate()).slice(-2) + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
    this.loadAllLogs();

    //Generate first displayed report so that it is ready to load
    this.generateRequestReport();

    //Generate first displayed log so that it is ready to load
    this.setUserLogTable();
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    GET ALL STAFF
  /**
   *  This function will be used to get all the staff members of FABI and load them into an array
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllStaff() {
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllFABIStaff().subscribe((response: any) => {
      if (response.success == true) {
        var data = response.data.qs.staff;

        for (var i = 0; i < data.length; i++) {
          var tempStaff: StaffMember = { fname: data[i].fname, surname: data[i].surname, email: data[i].email, id: data[i].id };
          this.staff.push(tempStaff);
        }
      }
      else {
        //Error handling
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD USER DETAILS
  /**
   *  This function will be called so that the information of a specific user can be fetched
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails(userID: string) {
    var person = '';
    for (var i = 0; i < this.staff.length; i++) {
      if (this.staff[i].id == userID) {
        person = this.staff[i].fname + ' ' + this.staff[i].surname;
      }
    }

    return person
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD ALL LOGS
  /**
   *  This function will be called so that all the logs can be fetched and inserted into a table
   *  on the HTML page.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadAllLogs() {
    this.getAllStaff();

    //Loading the 'USER' logs
    this.notificationLoggingService.getAllUserLogs().subscribe((response: any) => {
      if (response.success = true) {
        //Temporarily holds the data returned from the API call
        var data = response.data.content.data.Logs;

        for (var i = 0; i < data.length; i++) {
          // var tempArray: any = [];
          var tempArray: userLogInterface = { action: "", date: "", user1: "", user2: "" };

          if (data[i].action == "/createOrganization") {
            tempArray.action = "New organization was added";

            tempArray.date = this.getDate(data[i].dateString);

            //Fetch user information
            tempArray.user1 = this.loadUserDetails(data[i].details);
            tempArray.user2 = data[i].org2;
          }
          else if (data[i].action == "/removeOrg") {
            tempArray.action = "Organization removed";

            tempArray.date = this.getDate(data[i].dateString);

            //Fetch user information
            tempArray.user1 = this.loadUserDetails(data[i].details);
            tempArray.user2 = data[i].org2;
          }
          else if (data[i].action == '/addStaff') {
            tempArray.action = 'Added new user';

            tempArray.date = this.getDate(data[i].dateString);

            //Fetch user information
            tempArray.user1 = this.loadUserDetails(data[i].details);
            tempArray.user2 = this.loadUserDetails(data[i].user);
          }
          else if (data[i].action == '/updateStaffMember') {
            tempArray.action = 'Updated user details';

            tempArray.date = this.getDate(data[i].dateString);

            //Fetch user information
            tempArray.user1 = this.loadUserDetails(data[i].details);
            tempArray.user2 = this.loadUserDetails(data[i].user);
          }
          else if (data[i].action == '/removeStaff') {
            tempArray.action = 'Removed user from system';

            tempArray.date = this.getDate(data[i].dateString);

            //Fetch user information
            tempArray.user1 = this.loadUserDetails(data[i].details);
            tempArray.user2 = this.loadUserDetails(data[i].user);
          }
          else if (data[i].action == "/udateStaffDatabaseAccess" || data[i].action == "/updateStaffDatabaseAccess") {
            tempArray.action = 'User database access updated';

            tempArray.date = this.getDate(data[i].dateString);

            //Fetch user information
            tempArray.user1 = this.loadUserDetails(data[i].details);
            tempArray.user2 = this.loadUserDetails(data[i].user);
          }

          this.userLogsArray.push(tempArray);
        }
      }
      else {
        //Error handling
      }
    });

    //Loading the 'DBML' logs
    this.notificationLoggingService.getAllDatabaseManagementLogs().subscribe((response: any) => {
      if (response.success = true) {
        //Temporarily holds the data returned from the API call
        var data = response.data.content.data.Logs;

        for (var i = 0; i < data.length; i++) {
          var tempArray: databaseLogInterface = { action: "", date: "", user: "", details: "" };

          if (data[i].action == '/createDatabase' || data[i].action == 'C') {
            tempArray.action = 'Added new database';
          }
          else if (data[i].action == '/addDoc') {
            tempArray.action = 'Document added to database';
          }
          else if (data[i].action == '/porting') {
            tempArray.action = 'Database was ported';
          }
          else if (data[i].action == '/retrieveDatabase') {
            tempArray.action = 'Database was retrieved';
          }

          tempArray.date = this.getDate(data[i].dateString);

          //Fetch user information
          tempArray.user = this.loadUserDetails(data[i].user);

          tempArray.details = data[i].details;
          this.databaseLogsArray.push(tempArray);
        }
      }
      else {
        //Error handling
      }
    });


    //Loading the 'ACCL' logs
    this.notificationLoggingService.getAllAccessLogs().subscribe((response: any) => {
      if (response.success = true) {
        //Temporarily holds the data returned from the API call
        var data = response.data.content.data.Logs;

        for (var i = 0; i < data.length; i++) {
          var tempArray: accessLogInterface = { details: '', date: '', user: '' };

          tempArray.details = data[i].details;
          tempArray.date = this.getDate(data[i].dateString);

          //Fetch user information
          tempArray.user = this.loadUserDetails(data[i].user);

          this.accessLogsArray.push(tempArray);
        }
      }
      else {
        //Error handling
      }
    });


    //Loading the 'ERRL' logs
    this.notificationLoggingService.getAllErrorLogs().subscribe((response: any) => {
      if (response.success = true) {
        //Temporarily holds the data returned from the API call
        var data = response.data.content.data.Logs;

        for (var i = 0; i < data.length; i++) {
          var tempArray: errorLogInterface = { code: '', date: '', details: '', user: '' };

          tempArray.code = data[i].statusCode;
          tempArray.date = this.getDate(data[i].dateString);
          tempArray.details = data[i].details;

          //Fetch user information
          tempArray.user = this.loadUserDetails(data[i].user);

          this.errorLogsArray.push(tempArray);
        }
      }
      else {
        //Error handling
      }
    });

    //Determines if there are user logs to load or not
    if (this.userLogsArray != null) {
      this.userLogs = true;
    }

    //Determines if there are database logs to load or not
    if (this.databaseLogsArray != null) {
      this.databaseLogs = true;
    }

    //Determines if there are access logs to load or not
    if (this.accessLogsArray != null) {
      this.accessLogs = true;
    }

    //Determines if there are error logs to load or not
    if (this.errorLogsArray != null) {
      this.errorLogs = true;
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  GENERATE ERROR REPORT
  /**
   *  This function will be used to generate the error report and display it on screen
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  generateErrorReport() {
    this.requestReport = false;
    this.depositReport = false;
    this.revitalizationReport = false;
    this.errorReport = true;

    //Loading the 'ERRL' logs
    this.notificationLoggingService.getAllErrorLogs().subscribe((response: any) => {
      if (response.success = true) {
        var data = response.data.content.data.Logs;

        for (var i = 0; i < data.length; i++) {
          var tempArray: errorLogInterface = { code: '', date: '', details: '', user: '' };

          tempArray.code = data[i].statusCode;
          tempArray.date = this.getDate(data[i].dateString);
          tempArray.details = data[i].details;

          //Fetch user information
          tempArray.user = this.loadUserDetails(data[i].user);

          this.errorLogsArray.push(tempArray);
        }
      }
      else {
        //Error handling
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  DOWNLOAD ERROR REPORT
  /**
   *  This function will be used to download the error report that is displayed on screen as a PDF document.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  downloadErrorReport() {
    var report = this.errorReportPDF.nativeElement;
    html2canvas(report).then(canvas => {
      var imageWidth = 180;
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
  //                                                  GENERATE REQUEST REPORT
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
      if (response.success = true) {
        var data = response.data.qs.forms;

        for (var i = 0; i < data.length; i++) {
          var tempArray: requestReportInterface = {
            user: '', requestor: '', cultureNumber: '', taxonName: '',
            referenceNumber: '', dateRequested: '', dateSubmitted: ''
          };

          tempArray.user = this.loadUserDetails(data[i].userID);
          tempArray.requestor = data[i].requestor;
          tempArray.cultureNumber = data[i].cultureNumber;
          tempArray.taxonName = data[i].taxonName;
          tempArray.referenceNumber = data[i].referenceNumber;
          tempArray.dateRequested = data[i].dateRequested;
          tempArray.dateSubmitted = data[i].dateSubmitted;

          this.requestLogsArray.push(tempArray);
        }
      }
      else {
        //Error handling
      }
    });

    if (this.requestLogsArray != null) {
      this.requestLogs = true;
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  DOWNLOAD REQUEST REPORT
  /**
   *  This function will be used to download the request report that is displayed on screen as a PDF document.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  downloadRequestReport() {
    var report = this.requestReportPDF.nativeElement;
    html2canvas(report).then(canvas => {
      var imageWidth = 180;
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
  //                                                  GENERATE DEPOSIT REPORT
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
      if (response.success = true) {
        var data = response.data.qs.forms;

        for (var i = 0; i < data.length; i++) {
          var tempArray: depositReportInterface = {
            user: '', cultureNumber: '', name: '', collectedBy: '',
            dateCollected: '', isolatedBy: '', identifiedBy: '', dateSubmitted: ''
          };

          tempArray.user = this.loadUserDetails(data[i].userID);
          tempArray.cultureNumber = data[i].cmwCultureNumber;
          tempArray.name = data[i].name;

          if (!data[i].collected_by) {
            tempArray.collectedBy = data[i].collectedBy;
          }
          else {
            tempArray.collectedBy = data[i].collected_by;
          }

          tempArray.dateCollected = data[i].dateCollected;
          tempArray.isolatedBy = data[i].isolatedBy;
          tempArray.identifiedBy = data[i].identifiedBy;
          tempArray.dateSubmitted = data[i].dateSubmitted;

          this.depositLogsArray.push(tempArray);
        }
      }
      else {
        //Error handling
      }
    });

    if (this.depositLogsArray != null) {
      this.depositLogs = true;
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  DOWNLOAD DEPOSIT REPORT
  /**
   *  This function will be used to download the deposit report that is displayed on screen as a PDF document.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  downloadDepositReport() {
    var report = this.depositReportPDF.nativeElement;
    html2canvas(report).then(canvas => {
      var imageWidth = 180;
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
  //                                                  GENERATE REVITALIZATION REPORT
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
      if (response.success = true) {
        var data = response.data.qs.forms;

        for (var i = 0; i < data.length; i++) {
          var tempArray: revitalizationReportInterface = {
            user: '', requestor: '', cultureNumber: '', cultureName: '',
            referenceNumber: '', dateRequested: '', dateReturned: '', dateSubmitted: ''
          };

          tempArray.user = this.loadUserDetails(data[i].userID);
          tempArray.requestor = data[i].requestor;
          tempArray.cultureNumber = data[i].cultureNumber;
          tempArray.cultureName = data[i].currentName;
          tempArray.referenceNumber = data[i].referenceNumber;
          tempArray.dateRequested = data[i].dateRequested;
          tempArray.dateReturned = data[i].dateReturned;
          tempArray.dateSubmitted = data[i].dateSubmitted;

          this.revitalizationLogsArray.push(tempArray);
        }
      }
      else {
        //Error handling
      }
    });

    if (this.revitalizationLogsArray != null) {
      this.revitalizationLogs = true;
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  DOWNLOAD REVITALIZATION REPORT
  /**
   *  This function will be used to download the revitalization report that is displayed on screen as a PDF document.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  downloadRevitalizationReport() {
    var report = this.revitalizationReportPDF.nativeElement;
    html2canvas(report).then(canvas => {
      var imageWidth = 157;
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
  //                                                        GET DATE
  /**
   *  This function will put the string date provided into a more readable format for the notifications
   * @param {string} date The date of the log
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getDate(date: string) {
    var tempDate = (date).split(' ');
    var newDate = '';

    newDate += tempDate[2];

    if (tempDate[0] == 'Mon') {
      newDate += ' Monday ';
    }
    else if (tempDate[0] == 'Tue' || tempDate[0] == 'Tu' || tempDate[0] == 'Tues') {
      newDate += ' Tuesday ';
    }
    else if (tempDate[0] == 'Wed') {
      newDate += ' Wednesday ';
    }
    else if (tempDate[0] == 'Thu' || tempDate[0] == 'Thur' || tempDate[0] == 'Thurs') {
      newDate += ' Thursday ';
    }
    else if (tempDate[0] == 'Fri') {
      newDate += ' Friday ';
    }
    else if (tempDate[0] == 'Sat') {
      newDate += ' Saturday ';
    }
    else if (tempDate[0] == 'Sun') {
      newDate += ' Sunday ';
    }

    if (tempDate[1] == 'Jan') {
      newDate += 'January';
    }
    else if (tempDate[1] == 'Feb') {
      newDate += 'February';
    }
    else if (tempDate[1] == 'Mar') {
      newDate += 'March';
    }
    else if (tempDate[1] == 'Apr') {
      newDate += 'April';
    }
    else if (tempDate[1] == 'Jun') {
      newDate += 'June';
    }
    else if (tempDate[1] == 'Jul') {
      newDate += 'July';
    }
    else if (tempDate[1] == 'Aug') {
      newDate += 'August';
    }
    else if (tempDate[1] == 'Sep' || tempDate[1] == 'Sept') {
      newDate += 'September';
    }
    else if (tempDate[1] == 'Oct') {
      newDate += 'October';
    }
    else if (tempDate[1] == 'Nov') {
      newDate += 'November';
    }
    else if (tempDate[1] == 'Dec') {
      newDate += 'December';
    }

    newDate += ' ' + tempDate[3];

    return newDate;
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       TOGGLE NOTIFICATIONS 
  /**
   * This function will toggle the display of the notifications side panel
   * 
   * @memberof ReportingComponent
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
   * @memberof ReportingComponent
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
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayProfileSaveBtn() {
    this.saveBtn = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    DISPLAY PASSWORD CONFIRM INPUT 
  /**
   * This function will display the confirm password input field in the user's password was altered
   * 
   * @memberof ReportingComponent
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
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleHelpTab() {
    this.helpTab = !this.helpTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE REPORTING 
  /**
   * This function will toggle the display of the reporting tab section
   * 
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleReportSection() {
    this.reportingTab = !this.reportingTab;
    this.logsTab = false;

    //Generate the Request report so that it is ready to be displayed when the report menu option is clicked
    this.requestLogs = true;
    this.userLogs = false;

    //Display request report immediately since it is the first active tab
    this.requestReport = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE LOG 
  /**
   * This function will toggle the display of the logs tab section
   * 
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleLogSection() {
    this.logsTab = !this.logsTab;
    this.reportingTab = false;
    this.requestLogs = false;
    this.requestReport = false;

    this.userLogs = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         SET USER LOGS TABLE 
  /**
   * This function will display the user logs table
   * 
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  setUserLogTable() {
    this.userLogs = true;
    this.databaseLogs = false;
    this.accessLogs = false;
    this.errorLogs = false;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                      SET DATABASE LOGS TABLE 
  /**
   * This function will display the database logs table
   * 
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  setDatabaseLogTable() {
    this.userLogs = false;
    this.databaseLogs = true;
    this.accessLogs = false;
    this.errorLogs = false;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         SET ACCESS LOGS TABLE 
  /**
   * This function will display the access logs table
   * 
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  setAccessLogTable() {
    this.userLogs = false;
    this.databaseLogs = false;
    this.accessLogs = true;
    this.errorLogs = false;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         SET ERROR LOGS TABLE 
  /**
   * This function will display the error logs table
   * 
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  setErrorLogTable() {
    this.userLogs = false;
    this.databaseLogs = false;
    this.accessLogs = false;
    this.errorLogs = true;
  }
}

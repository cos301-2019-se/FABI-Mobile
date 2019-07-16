import { Component, OnInit } from '@angular/core';

import { NotificationLoggingService } from '../../services/notification-logging.service';
import { UserManagementAPIService, Member } from '../../services/user-management-api.service';

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

  /** Array holding the user logs - @type {any} */
  userLogsArray: any[] = [];
  /** Array holding the database logs - @type {any} */
  databaseLogsArray: any[] = [];
  /** Array holding the access logs - @type {any} */
  accessLogsArray: any[] = [];
  /** Array holding the error logs - @type {any} */
  errorLogsArray: any[] = [];

  /** Array holding all FABI staff - @type {Member[]} */
  staff: Member[] = [];
  /** Array holding all FABI administrators - @type {Member[]} */
  admins: Member[] = [];

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of ReportingComponent.
   * 
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @param {userManagementService} userManagementService  For calling the User Management API service
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private notificationLoggingService: NotificationLoggingService, private userManagementService: UserManagementAPIService) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_ALL_LOGS
  /**
   *  This function will be called so that all the logs can be fetched and inserted into a table
   *  on the HTML page.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadAllLogs() {
    this.userManagementService.getAllFABIMembers().subscribe((response: any) => {
      if(response.success == true){
        //Populating the arrays with the returned data
        var tempStaff = response.data.qs.staff;
        for(var i = 0; i < tempStaff.length; i++){
          var tempMember: Member = {Name: tempStaff[i].fname, Surname: tempStaff[i].surname, Email: tempStaff[i].email};
          this.staff.push(tempMember);
        }
      }
      else{
        //Error handling
      }
    });

    this.userManagementService.getAllFABIAdmins().subscribe((response: any) => {
      if(response.success == true){
        //Populating the arrays with the returned data
        var tempAdmins = response.data.qs.admins;
        for(var i = 0; i < tempAdmins.length; i++){
          var tempMember: Member = {Name: tempAdmins[i].fname, Surname: tempAdmins[i].surname, Email: tempAdmins[i].email};
          this.admins.push(tempMember);
        }
      }
      else{
        //Error handling
      }
    });

    this.notificationLoggingService.getAllUserAndDatabaseLogs().subscribe((response: any) => {
      if(response.success = true){
        var data = response.data;

        for(var i = 0; i < data.length; i++){
          if(data[i].type == 'USER'){
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
            
            tempArray.push(data[i].date);

            //Fetch user information
            for(var j = 0; j < this.staff.length; j++){
              if(this.staff[i].Email == data[i].user){
                tempArray.push(data[i].user);
              }
            }

            for(var j = 0; j < this.admins.length; j++){
              if(this.admins[i].Email == data[i].user){
                tempArray.push(data[i].user);
              }
            }

            for(var j = 0; j < this.staff.length; j++){
              if(this.staff[i].Email == data[i].details){
                tempArray.push(data[i].details);
              }
            }

            for(var j = 0; j < this.admins.length; j++){
              if(this.admins[i].Email == data[i].details){
                tempArray.push(data[i].details);
              }
            }

            this.userLogsArray.push(tempArray);
          }
          else{
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
              tempArray.push('Removed database from system');
            }
            
            tempArray.push(data[i].date);

            //Fetch user information
            for(var j = 0; j < this.staff.length; j++){
              if(this.staff[i].Email == data[i].user){
                tempArray.push(data[i].user);
              }
            }

            for(var j = 0; j < this.admins.length; j++){
              if(this.admins[i].Email == data[i].user){
                tempArray.push(data[i].user);
              }
            }

            tempArray.push(data[i].details);
            this.databaseLogsArray.push(tempArray);
          }
        }
      }
      else{
        //Error handling
      }
    });

    this.notificationLoggingService.getAllAccessAndErrorLogs().subscribe((response: any) => {
      if(response.success = true){
        var data = response.data;

        for(var i = 0; i < data.length; i++){
          if(data[i].type == 'ACCL'){
            var tempArray: any = [];
            tempArray.push(data[i].details);            
            tempArray.push(data[i].date);

            //Fetch user information
            for(var j = 0; j < this.staff.length; j++){
              if(this.staff[i].Email == data[i].user){
                tempArray.push(data[i].user);
              }
            }

            for(var j = 0; j < this.admins.length; j++){
              if(this.admins[i].Email == data[i].user){
                tempArray.push(data[i].user);
              }
            }

            this.accessLogsArray.push(tempArray);
          }
          else{
            var tempArray: any = [];            
            tempArray.push(data[i].statusCode);
            tempArray.push(data[i].details);
            tempArray.push(data[i].date);

            //Fetch user information
            for(var j = 0; j < this.staff.length; j++){
              if(this.staff[i].Email == data[i].user){
                tempArray.push(data[i].user);
              }
            }

            for(var j = 0; j < this.admins.length; j++){
              if(this.admins[i].Email == data[i].user){
                tempArray.push(data[i].user);
              }
            }

            this.errorLogsArray.push(tempArray);
          }
        }
      }
      else{
        //Error handling
      }
    });

    //Setting variables to either display or not display the tables on the HTML page
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

  ngOnInit() {

  }

}

import { Component, OnInit } from '@angular/core';

import { NotificationLoggingService } from '../../services/notification-logging.service';

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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of ReportingComponent.
   * 
   * @param {NotificationLoggingService} notificationLoggingService For calling the Notification Logging API service
   * @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private notificationLoggingService: NotificationLoggingService) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_ALL_LOGS
  /**
   *  This function will be called so that all the logs can be fetched and inserted into a table
   *  on the HTML page.
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadAllLogs() {
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

            this.accessLogsArray.push(tempArray);
          }
          else{
            var tempArray: any = [];            
            tempArray.push(data[i].statusCode);
            tempArray.push(data[i].details);
            tempArray.push(data[i].date);

            //Fetch user information

            this.errorLogsArray.push(tempArray);
          }
        }
      }
      else{
        //Error handling
      }
    });
  }

  ngOnInit() {

  }

}

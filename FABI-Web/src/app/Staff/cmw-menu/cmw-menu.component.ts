import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { Member, UserManagementAPIService } from '../../_services/user-management-api.service';
import { NotificationLoggingService, UserLogs } from '../../_services/notification-logging.service';
import { DiagnosticClinicAPIService, Sample } from '../../_services/diagnostic-clinic-api.service';
import { CultureCollectionAPIService, CMWDeposit, CMWRequest } from '../../_services/culture-collection-api.service';
import { AdminDivComponent } from '../../Dynamic-Components/admin-div/admin-div.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cmw-menu',
  templateUrl: './cmw-menu.component.html',
  styleUrls: ['./cmw-menu.component.scss']
})
export class CmwMenuComponent implements OnInit {

  /** Object array for holding the administrators -  @type {Member[]} */
  admins: Member[] = [];   

  /** Object array for holding all of the logs -  @type {any[]} */ 
  allNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {any[]} */ 
  newNotifications: any[] = [];
  
  /** Indicates if there are notifications to load - @type {boolean} */           
  notifications: boolean = true; 
  /** The total number of User Logs - @type {number} */           
  numberOfUserLogs: number = 0;
  /** The number of the notifications - @type {number} */   
  localNotificationNumber : number = 1;
  /** Object array for holding all of the logs that have not been read -  @type {string[]} */ 
  allLogs: string[] = []; 

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

  /** Indicates whether there are samples to load or not - @type {boolean} */
  submittedSamples: boolean = false;
  /** Indicates whether there are deposit forms to load or not - @type {boolean} */
  depositForms: boolean = false;
  /** Indicates whether there are request forms to load or not - @type {boolean} */
  requestForms: boolean = false;

  /** Object array for holding the deposits associated with the user -  @type {CMWDeposit[]} */
  deposits: CMWDeposit[] = [];
  /** Object array for holding the requests associated with the user -  @type {CMWRequest[]} */
  requests: CMWRequest[] = [];
  /** Object array for holding the samples associated with the user -  @type {Sample[]} */
  samples: Sample[] = [];

  /** The name and surname of a user concatenated as a string - @type {string} */   
  user1: string;
  /** The name and surname of a user concatenated as a string - @type {string} */   
  user2: string;

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
    private router: Router, 
    private userManagementService: UserManagementAPIService,
    private diagnosticClinicService: DiagnosticClinicAPIService, 
    private resolver: ComponentFactoryResolver, 
    private notificationLoggingService: NotificationLoggingService,
    private cultureCollectionService: CultureCollectionAPIService
    ) { }

  ngOnInit() {
    this.loadNotifications();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       LOAD_LOGS
  /**
   *  This function will load all of the user's logs into a string array.
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadLogs(){
    //Making a call to the notification logging service to return all logs belonging to the user
    this.notificationLoggingService.getUserLogs(localStorage.getItem('userID')).subscribe((response: any) => {
      if(response.success == true){
        var data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          this.allLogs.push(data[i].id);
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
   * @memberof StaffDashboardComponent
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
  //                                                  LOAD_NOTIFICATIONS
  /**
   *  This function will load the staff member's notifications into the notification section on the HTML page
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNotifications(){
    //Loading all the logs beloning to the user
    this.loadLogs();

    //Making a call too the notification logging service to return all USER logs
    this.notificationLoggingService.getAllUserLogs().subscribe((response: any) => {
      if(response.success = true){
        //Temporarily holds the data returned from the API call
        const data = response.data.content.data.Logs;

        for(var i = 0; i < data.length; i++){
          for(var j = 0; j < this.allLogs.length; j++){
            if(data[i].date == this.allLogs[j]){
              //A temporary instance of UserLogs that will be added to the allNotifications array
              var tempLogU: UserLogs = {LogID: data[i].date, Type: 'USER', Action: data[i].action, Date: this.getDate(data[i].dateString), Details: data[i].details, User: data[i].user, Organization1: data[i].org1, Organization2: data[i].org2, MoreInfo: data[i].moreInfo, ID: this.localNotificationNumber};
              
              //Getting the name and surname of the users passed using their id numbers
              this.loadUserDetails1(tempLogU.Organization1, tempLogU.Details);
              
              if(tempLogU.Action == "/createOrganization"){
                tempLogU.Action = "New organization " + tempLogU.User + " was added to the system by " + this.user1;
              }
              else if(tempLogU.Action == "/addStaff"){
                this.loadUserDetails2(tempLogU.Organization2, tempLogU.User);
                tempLogU.Action = "New user, " + this.user2 + ", was added to the system by " + this.user1;
              }
              else if(tempLogU.Action == "C"){
                this.loadUserDetails2(tempLogU.Organization2, tempLogU.User);
                tempLogU.Action = "New user, " + this.user2 + ", was added to the system by " + this.user1;
              }
              else if(tempLogU.Action == "/removeOrg"){
                tempLogU.Action = "Organization " + tempLogU.User + " was removed from the system by " + this.user1;
              }
              else if(tempLogU.Action == "/removeStaff"){
                this.loadUserDetails2(tempLogU.Organization2, tempLogU.User);
                tempLogU.Action = "New user, " + this.user2 + ", was removed from the system by " + this.user1;
              }
  
              this.allNotifications.push(tempLogU);
              this.numberOfUserLogs += 1;
              this.localNotificationNumber += 1;
            }
          }          
        }
      }
      else{
        //Error handling
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_USER_DETAILS1
  /**
   *  This function will be called so that the information of a specific user can be fetched
   * 
   *  @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails1(userOrganization: string, userID: string) {
    //Making a call to the User Management API Service to retrieve a specific users details
    this.userManagementService.getUserDetails(userOrganization, userID).subscribe((response: any) => {
      if(response.success == true){
        //Temporarily holds the data returned from the API call
        const data = response.data;

        //Returns the users name and surname as a connected string
        this.user1 = data.fname + ' ' + data.surname;
      } 
      else{
        //Error control
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_USER_DETAILS2
  /**
   *  This function will be called so that the information of a specific user can be fetched
   * 
   *  @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails2(userOrganization: string, userID: string) {
    //Making a call to the User Management API Service to retrieve a specific users details
    this.userManagementService.getUserDetails(userOrganization, userID).subscribe((response: any) => {
      if(response.success == true){
        //Temporarily holds the data returned from the API call
        const data = response.data;

        //Returns the users name and surname as a connected string
        this.user2 = data.fname + ' ' + data.surname;
      } 
      else{
        //Error control
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       REMOVE_NOTIFICATIONS
  /**
   *  This function will remove a notification from the notification section on the HTML page.
   * 
   * @param {string} id                   //The id of the notification to be removed
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeNotification(id: string){
    for(var i =  0; i < this.allNotifications.length; i++){
      if(this.allNotifications[i].ID == id){
        this.newNotifications.push(this.allNotifications[i]);
      }
    }

    this.notificationLoggingService.updateFABIMemberNotifications(localStorage.getItem('userID'), this.newNotifications).subscribe((response: any) => {
      if(response.success == true){
        this.loadNotifications();
      }
      else{
        //Error handling
      }
    });
  } 

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE NOTIFICATIONS 
  /**
   * This function will toggle the display of the notifications side panel
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificationsTab(){ 
    this.notificationsTab = !this.notificationsTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE PROFILE 
  /**
   * This function will toggle the display of the profile side panel
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleProfileTab() {
    this.profileTab = !this.profileTab;
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            DISPLAY PROFILE SAVE BUTTON 
  /**
   * This function will display the save button option if any details in the profile have been altered
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayProfileSaveBtn() {
    this.saveBtn = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            DISPLAY PASSWORD CONFIRM INPUT 
  /**
   * This function will display the confirm password input field in the user's password was altered
   * 
   * @memberof AdminDashboardComponent
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
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleHelpTab() {
    this.helpTab = !this.helpTab;
  }

}
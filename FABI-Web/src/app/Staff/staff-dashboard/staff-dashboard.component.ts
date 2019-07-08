/**
 * File Name: staff-dashboard.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Staff\staff-dashboard\staff-dashboard.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Monday, July 8th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { Member, UserManagementAPIService } from '../../services/user-management-api.service';
import { AdminDivComponent } from '../../Dynamic-Components/admin-div/admin-div.component';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})

export class StaffDashboardComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Holds the div element (adminContainer) from the HTML page - @type {ElementRef} */
  @ViewChild('adminContainer', {read: ViewContainerRef}) adminContainer;

  /** Object array for holding the administrators -  @type {Member[]} */
  admins: Member[] = [];         


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of StaffDashboardComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {ComponentFactoryResolver} resolver For dynamically inserting elements into the HTML page
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private userManagementService: UserManagementAPIService, private resolver: ComponentFactoryResolver) { }

 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                LOAD_ADMINS
  /**
   *  This function will load admin users into the section provided on the HTML page. 
   *  This function will also dynamically load elements containing information about the administrators
   *  to the HTML page dynamically
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadAdmins(){
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllFABIAdmins().subscribe((response: any) => {
      if(response.success == true){
        //Populating the arrays with the returned data
        var tempAdmins = response.data.qs.admins;
        for(var i = 0; i < tempAdmins.length; i++){
          var tempMember: Member = {Name: tempAdmins[i].fname, Surname: tempAdmins[i].surname, Email: tempAdmins[i].email};
          this.admins.push(tempMember);
        }

        //Dynamically loads all the admins into the HTML page
        for(var i = 0; i < this.admins.length; i++){
          const adminDivRef = this.adminContainer.createComponent(this.resolver.resolveComponentFactory(AdminDivComponent));
          adminDivRef.instance.Name = this.admins[i].Name;
          adminDivRef.instance.Surname = this.admins[i].Surname;
          adminDivRef.instance.Email = this.admins[i].Email;
        }
      }
      else{
        //The FABI administrators could not be retrieved
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_NOTIFICATIONS
  /**
   *  This function will load the staff member's notifications into the notification section on the HTML page
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadNotifications(){}


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                              REMOVE_NOTIFICATIONS
  /**
   *  This function will remove a notification for the notification section when the user clicks on the 'exit'
   *  button/icon associated with that notification
   * 
   * @memberof StaffDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeNotification(){}


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    NG_ON_INIT()  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Call loadAdmins() | 2. Call loadNotifications() 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.loadAdmins();
    this.loadNotifications();
  }

}

/**
 * File Name: staff-profile.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Staff\staff-profile\staff-profile.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, July 16th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, July 17th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit } from '@angular/core';

import { Member, UserManagementAPIService } from '../../services/user-management-api.service';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss']
})
export class StaffProfileComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** The name of the user - @type {string} */           
  name: string = ''; 
  /** The surname of the user - @type {string} */           
  surname: string = '';
  /** The organization that the user belongs to - @type {string} */           
  organization: string = '';
  /** The email address of the user - @type {string} */           
  email: string = '';

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of StaffProfileComponent.
   * 
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @memberof StaffProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private userManagementService: UserManagementAPIService) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD_USER_DETAILS
  /**
   *  This function will be called so that the information of a specific user can be fetched
   *  @memberof ReportingComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadUserDetails() {
    this.email = localStorage.getItem('email');
    this.organization = localStorage.getItem('organization');

    this.userManagementService.getAllFABIMembers().subscribe((response: any) => {
      if(response.success == true){
        var tempStaff = response.data.qs.staff;
        for(var i = 0; i < tempStaff.length; i++){
          if(tempStaff[i].email == this.email){
            this.name = tempStaff[i].fname;
            this.surname = tempStaff[i].surname;
          }
        }
      } 
      else{
        //Error control
      }
    });
  }

  ngOnInit() {
    this.loadUserDetails();
  }

}

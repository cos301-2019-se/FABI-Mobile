/**
 * File Name: member-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization\member-handler\member-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 1st 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewChild } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

//Include Material Components
import { MatPaginator, MatTableDataSource } from '@angular/material';

import * as Interface from "../../_interfaces/interfaces";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../../_errors/error-component/error.component';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { AuthenticationService } from '../../_services/authentication.service';
import { ConfirmComponent } from "../../confirm/confirm.component";
import { UserManagementAPIService } from 'src/app/_services/user-management-api.service';


@Component({
  selector: 'app-member-handler',
  templateUrl: './member-handler.component.html',
  styleUrls: ['./member-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemberHandlerComponent implements OnInit {

  displayedColumns: string[] = ['First Name', 'Surname', 'Email', 'Remove' ,'Action' ];
  dataSource = new MatTableDataSource([]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /** Object for defining the Add Member form -  @type {FormGroup} */
  addMemberForm: FormGroup;
  /** To check if form has been submitted - @type {boolean} */
  submitted: boolean = false;
  /** To check if form has been submitted correctly - @type {boolean} */
  valid: boolean = false;
  /** If page is busy loading something - @type {boolean} */
  loading: boolean = false;
  /** Selected Member from the table - @type {Interface.OrganisationMember} */
  selectedMember: Interface.OrganisationMember;
  /** Array of Organization objects - @type {Organisation[]} */
  organizations: Interface.Organisation[];
   /** Array of Member objects - @type {OrganisationMember[]} */
  orgMembers: Interface.OrganisationMember[];

  /** Object array for holding all of the logs -  @type {any[]} */ 
  allNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {any[]} */ 
  newNotifications: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
   * Creates an instance of MemberHandlerComponent.
   * @param {FormBuilder} formBuilder For creating the login form
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {MatDialog} dialog For dialog pop-up messages
   * @param {Router} router For navigating to other modules/components
   * @param {MatDialog} dialog
   * @param {AuthenticationService} authService Used for all authentication and session control
   * 
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService, 
    private userManagementService: UserManagementAPIService,
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, 
    private dialog: MatDialog, 
    private router: Router
    ) {
    this.addMemberForm = this.formBuilder.group({
      member_name: ['', Validators.required],
      member_surname: ['', Validators.required],
      member_location: ['', Validators.required],
      member_email: ['', Validators.required],
      member_phone: ['', Validators.required]

    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    TOGGLE_NOTIFICATIONS_TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab(){
    this.toggle_status = !this.toggle_status; 
 }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            NG_ON_INIT()
  /**
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.viewMembers();

    //Get the Organization's Details
    this.userManagementService.getOrganizationDetails().subscribe((response: any) => {
      if (response.success == true && response.status == 200) {
        // ***********************************
        // POLPULATE FIELDS BASED ALREADY KNOWN INFORMATION
        // *************

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error: "Could Not Load Organizations' Details", message: response.message } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.ngOnInit();
          }
        })
      }
    });

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          ADD_MEMBER
  /**
   * This function calls the *http* service to add a new Organization Member
   *
   * @returns
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addMember() {    
    this.submitted = true;

    if (this.addMemberForm.invalid) {
      return;
    }

    this.valid = true;
    this.loading = true;

    
    // const LmemberLocation = this.addMemberForm.controls.member_location.value;
    const LmemberName = this.addMemberForm.controls.member_name.value;
    const LmemberSurname = this.addMemberForm.controls.member_surname.value;
    const LmemberEmail = this.addMemberForm.controls.member_email.value;
    const LmemberPhone = this.addMemberForm.controls.member_phone.value;

    const user = this.authService.getCurrentSessionValue;
    const org_details: Interface.Organisation = { orgName: user.user.organisation };
    const member_details: Interface.OrganisationMember = { name: LmemberName, surname: LmemberSurname, email: LmemberEmail };


    this.userManagementService.addOrgMember(org_details, member_details).subscribe((response: any) => {

      console.log("////// RESPONSE: " + response);

      this.loading = false;
      
      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Member Added", "Dismiss", {
          duration: 6000
        });
        this.refreshDataSource();
      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Adding Member", message: response.message } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.addMember();
          }
        })
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SELECT_ORGANIZATION
  /**
   * This function sets the Member selected by the user in the table
   *
   * @param {Interface.OrganisationMember} member
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  selectOrganisation(member: Interface.OrganisationMember) {
    this.selectedMember = member;
  }

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     REMOVE_MEMBER_PROMPT
  /**
   * This function prompts the user to confirm if they wish to remove the selected Member
   *
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeMemberPrompt(member: Interface.OrganisationMember) {    
    const memberDetails = member.fname + " " + member.surname + " " + member.email;

    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Remove Member",
        message: "Are you sure you want to remove this Member?",
        info: memberDetails,
        cancel: "Cancel",
        confirm: "Remove"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "Confirm") {
        this.selectedMember = member;
        this.removeMember();
      }
    })
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                           REMOVE_MEMBER   
  /**
   * This function calls the *http* service to remove the selected Organisation 
   *
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeMember() {
    this.userManagementService.removeOrganizationMember(this.selectedMember).subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Member Removed", "Dismiss", {
          duration: 3000
        });
        this.refreshDataSource();
      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Removing", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.removeMember();
          }
        })
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            REFRESH
  /**
   * This function refreshes the Datasource (in most cases, the table that has changed)
   *
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  refreshDataSource() {
      this.viewMembers();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            VIEW_MEMBERS
  /**
   * This function calls the *http* service to get all registered Organization Members
   *
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  viewMembers() {    
    console.log("orgName: " + localStorage.getItem('orgName'));
    
    this.userManagementService.getAllOrganizationMembers().subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        this.orgMembers = response.data.members;
        this.dataSource = new MatTableDataSource(this.orgMembers);
        this.dataSource.paginator = this.paginator;

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Loading Members", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.viewMembers();
          }
        })
      }
    });
  }

}

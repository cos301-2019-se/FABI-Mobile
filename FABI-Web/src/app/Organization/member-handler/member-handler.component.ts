/**
 * File Name: member-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization\member-handler\member-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Monday, July 15th 2019
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
import { HttpService } from '../../_services/http.service';
import { ConfirmComponent } from "../../confirm/confirm.component";


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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
   * Creates an instance of MemberHandlerComponent.
   * @param {AdminAPIService} service For calling the API service
   * @param {FormBuilder} formBuilder For creating the login form
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {MatDialog} dialog For dialog pop-up messages
   * @param {Router} router For navigating to other modules/components
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private service: HttpService, private adminService: HttpService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) {
    this.addMemberForm = this.formBuilder.group({
      member_name: ['', Validators.required],
      member_surname: ['', Validators.required],
      member_location: ['', Validators.required],
      member_email: ['', Validators.required],
      member_phone: ['', Validators.required]

    })
  }

  sidenavToggle() {
    if (document.getElementById("sidenav_div").style.width == "22%") {
      document.getElementById("sidenav_div").style.width = "0";
    }
    else {
      document.getElementById("sidenav_div").style.width = "22%";
    }
  }

  closeNav() {
    document.getElementById("sidenav_div").style.width = "0";
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            NG_ON_INIT()
  /**
   *  
   *
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.viewMembers();

    //--- Get the Organization's Details
    this.service.getOrganizationDetails().subscribe((response: any) => {
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
  //                                                          ADD MEMBER
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
      console.log("------------ HERE -----------");

      return;
    }

    this.valid = true;
    this.loading = true;

    
    // const LmemberLocation = this.addMemberForm.controls.member_location.value;
    const LmemberName = this.addMemberForm.controls.member_name.value;
    const LmemberSurname = this.addMemberForm.controls.member_surname.value;
    const LmemberEmail = this.addMemberForm.controls.member_email.value;
    const LmemberPhone = this.addMemberForm.controls.member_phone.value;

    const org_details: Interface.Organisation = { orgName: localStorage.getItem('orgName') };
    const member_details: Interface.OrganisationMember = { name: LmemberName, surname: LmemberSurname, email: LmemberEmail };


    this.service.addOrgMember(org_details, member_details).subscribe((response: any) => {

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
  //                                                        SELECTED MEMBER
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
  //                                                     REMOVE MEMBER PROMPT
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
  //                                                           REMOVE MEMBER   
  /**
   * This function calls the *http* service to remove the selected Organisation 
   *
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeMember() {

    this.service.removeOrganizationMember(this.selectedMember).subscribe((response: any) => {
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
  //                                                            VIEW STAFF
  /**
   * This function calls the *http* service to get all registered Organization Members
   *
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  viewMembers() {
    
    console.log("orgName: " + localStorage.getItem('orgName'));
    console.log("--------- HELLO ----------");

    
    this.service.getAllOrganizationMembers().subscribe((response: any) => {
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

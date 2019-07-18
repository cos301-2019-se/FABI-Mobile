/**
 * File Name: staff-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\staff-handler\staff-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, June 26th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewChild } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../../errors/error-component/error.component';
import { Router } from '@angular/router';
import { ConfirmComponent } from "../../confirm/confirm.component";

//Include Material Components
import { MatPaginator, MatTableDataSource } from '@angular/material';


import * as Interface from '../../interfaces/interfaces';


@Component({
  selector: 'app-staff-handler',
  templateUrl: './staff-handler.component.html',
  styleUrls: ['./staff-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StaffHandlerComponent implements OnInit {

  displayedColumns: string[] = ['First Name', 'Surname', 'Email', 'Remove' ,'Action'];
  dataSource = new MatTableDataSource([]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /** Object for defining the Add Staff form -  @type {FormGroup} */
  addStaffForm: FormGroup;
  /** To check if form has been submitted - @type {boolean} */
  submitted: boolean = false;
  /** To check if form has been submitted correctly - @type {boolean} */
  valid: boolean = false;
  /** If page is busy loading something - @type {boolean} */
  loading: boolean = false;
  /** Selected Staff Member from the table - @type {Interface.Organisation} */
  selectedStaff: Interface.StaffInfo;
  /** Array of Staff Member objects - @type {StaffInfo[]} */
  staffMembers: Interface.StaffInfo[];
  /** Array of User Type objects for form dropdown - @type {UserType[]} */
  userTypes: Interface.UserType[];
  /** Selected user type on dropdown - @type {string} */
  selectedUserType: string;

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
   * Creates an instance of StaffHandlerComponent.
   * @param {AdminAPIService} service For calling the API service
   * @param {FormBuilder} formBuilder For creating the login form
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {MatDialog} dialog For dialog pop-up messages
   * @param {Router} router For navigating to other modules/components
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private service: HttpService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router)
  { 
    this.addStaffForm = this.formBuilder.group({
      staff_name: ['', Validators.required],
      staff_surname: ['', Validators.required],
      staff_email: ['', Validators.required],
      staff_phone: ['', Validators.required],
      staff_position: ['', Validators.required]
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                           TOGGLE_NOTIFICATIONS_TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof AdminDashboardComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab(){
    this.toggle_status = !this.toggle_status; 
 }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            NG_ON_INIT()
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.displayUserTypes();
    this.viewStaff();
    
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          ADD STAFF MEMBER
  /**
   * This function calls the *http* service to add a Staff Member
   *
   * @returns
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addStaff()
  {
    this.submitted = true;

    if (this.addStaffForm.invalid) {
      return;
    }

    this.valid = true;
    this.loading = true;

    const LstaffName = this.addStaffForm.controls.staff_name.value;
    const LstaffSurname = this.addStaffForm.controls.staff_surname.value;
    const LstaffEmail = this.addStaffForm.controls.staff_email.value;
    const LstaffPhone = this.addStaffForm.controls.staff_phone.value;
    const LstaffPosition = this.addStaffForm.controls.staff_position.value;

    const staff_details: Interface.StaffInfo = { name: LstaffName, surname: LstaffSurname, email: LstaffEmail, position: LstaffPosition};

    this.service.addStaffMember(staff_details).subscribe((response: any) => {
      
      this.loading = false;

      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Staff Member Added", "Dismiss", {
          duration: 6000
        });
        this.refreshDataSource();
      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Adding Staff Member", message: response.message, retry: true }});
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.addStaff();
          }
        })
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SELECTED STAFF MEMBER
  /**
   * This function sets the Staff Member selected by the user in the table
   *
   * @param {Interface.StaffInfo} staffMem
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  selectOrganisation(staffMem: Interface.StaffInfo) {
    this.selectedStaff = staffMem;
  }
  

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     REMOVE STAFF MEMBER PROMPT
  /**
   * This function prompts the user to confirm if they wish to remove the selected Staff Member
   *
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeStaffMemberPrompt(member: Interface.StaffInfo) {
    
    const staffDetails = member.fname + " " + member.surname + " " + member.email;

    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Remove Staff Member",
        message: "Are you sure you want to remove this Staff Member?",
        info: staffDetails,
        cancel: "Cancel",
        confirm: "Remove"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "Confirm") {
        this.selectedStaff = member;
        this.removeStaffMember();
        
      }
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                           REMOVE STAFF   
  /**
   * This function calls the *http* service to remove the selected Staff Member 
   *
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeStaffMember() {

    this.service.removeFABIStaffMember(this.selectedStaff).subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Staff Member Removed", "Dismiss", {
          duration: 3000
        });
        this.refreshDataSource();
      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Removing", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.removeStaffMember();
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
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  refreshDataSource() {
      this.viewStaff();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            VIEW STAFF
  /**
   * This function calls the *http* service to get all registered FABI Staff
   *
   * @memberof StaffHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  viewStaff() {
    
    this.service.getAllStaffMembers().subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        this.staffMembers = response.data.qs.staff;
        this.dataSource = new MatTableDataSource(this.staffMembers);
        this.dataSource.paginator = this.paginator;

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Loading Staff", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.viewStaff();
          }
        })
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //    USER TYPES -> TO BE FETCHED FROM DB IN THE FUTURE
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayUserTypes() {

    this.userTypes = [
      {
        "ID":1,
        "Name":"Admin"
      },
      {
        "ID":2,
        "Name":"Staff"
      }
    ]


    // if(this.selectedOrg == "FABI")
    // {
    //   this.userTypes = [
    //     {
    //       "ID":1,
    //       "Name":"Admin"
    //     },
    //     {
    //       "ID":2,
    //       "Name":"Staff"
    //     }
    //   ]

    // }
    // else {
    //   this.userTypes = [
    //     {
    //       "ID":1,
    //       "Name":"Admin"
    //     },
    //     {
    //       "ID":2,
    //       "Name":"Member"
    //     }
    //   ]
    // }

    //-------- Load User Types for Drop Down --------
    // this.service.getUserTypes(this.selectedOrg).subscribe((response: any) => {
    //   if (response.success == true && response.status == 200) {
    //     this.userTypes = response.data;

    //   } else if (response.success == false) {
    //     //POPUP MESSAGE
    //     let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Sorry there was an error loading the User Types", message: response.message, retry: true } });
    //     dialogRef.afterClosed().subscribe((result) => {
    //       if (result == "Retry") {
    //         this.displayUserTypes();
    //       }
    //     })
    //   }
    // });

  }


}

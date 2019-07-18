/**
 * File Name: organization-profile.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization\organization-profile\organization-profile.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, June 25th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as Interface from "../../interfaces/interfaces";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../../errors/error-component/error.component';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { HttpService } from '../../services/http.service';
import { ConfirmComponent } from "../../confirm/confirm.component";

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrganizationProfileComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of OrganizationProfileComponent.
   * 
   * 
   * @memberof OrganizationProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private service: HttpService, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) { }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                           TOGGLE_NOTIFICATIONS_TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof OrganizationProfileComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab(){
    this.toggle_status = !this.toggle_status; 
 }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            NG_ON_INIT()
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {

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

}

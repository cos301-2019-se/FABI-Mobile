/**
 * File Name: home.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\home\home.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, June 25th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, June 25th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import {ViewEncapsulation} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../services/http.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../errors/error-component/error.component';
import { Router } from '@angular/router';
import { ConfirmComponent } from "../confirm/confirm.component";

import * as Interface from '../interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       REGISTER ORGANIZATION
  /**
   * This function calls the *http* service to create a new Organisation.
   *
   * @returns
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  registerOrg() {

    this.submitted = true;

    if (this.registerOrgForm.invalid) {
      return;
    }

    this.valid = true;
    this.loading = true;

    const LorgName = this.registerOrgForm.controls.organization_name.value;
    // const LorgLocation = this.createOrgForm.controls.organization_location.value;
    const LadminName = this.registerOrgForm.controls.admin_name.value;
    const LadminSurname = this.registerOrgForm.controls.admin_surname.value;
    const LadminEmail = this.registerOrgForm.controls.admin_email.value;
    const LadminPhone = this.registerOrgForm.controls.admin_phone.value;

    const admin_details: Interface.OrganisationAdmin = { fname: LadminName, surname: LadminSurname, email: LadminEmail, password: LadminPhone };
    const org_details: Interface.Organisation = { orgName: LorgName, admin: admin_details };

    this.service.createOrganization(org_details).subscribe((response: any) => {
      if (response.success == true && response.status == 200) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Successfully Registered Organization", "Dismiss", {
          duration: 6000
        });

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Registering Organization", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.registerOrg();
          }
        })
      }
    });
  }

}


/**
 * File Name: update.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\update\update.component.ts
 * Project Name: fabi-web
 * Created Date: Wednesday, June 26th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, June 26th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import * as Interface from "../interfaces/interfaces";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../errors/error-component/error.component';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { HttpService } from '../services/http.service';
import { ConfirmComponent } from "../confirm/confirm.component";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  //                        ********************      GLOBAL VARIABLES      ******************************
  submitted = false;                     // if form has been submitted
  success = false;                       // if form was succesfully filled out

  updateProfileForm: FormGroup;          // Form Group for updating a product

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private formBuilder: FormBuilder, private service: HttpService, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) 
  { 
    this.updateProfileForm = this.formBuilder.group({
      OrgName: ['', Validators.required],
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      Email: ['', Validators.required]
    })
  }

  ngOnInit() {
    
    //--- Get the Members's Details
    this.service.getOrganizationMemberDetails().subscribe((response: any) => {
      
      if (response.success == true && response.code == 200) {
        this.data.name = response.data.Member.fname;
        this.data.surname = response.data.Member.surname;
        this.data.email = response.data.Member.email;
        this.data.orgName = localStorage.getItem('orgName');

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error: "Could Not Load Details", message: response.message } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.ngOnInit();
          }
        })
      }
    });
  }

  updateProfile() {
    return;
  }

}

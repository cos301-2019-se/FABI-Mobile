/**
 * File Name: member-profile.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization-Member\member-profile\member-profile.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
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
import * as Interface from "../../interfaces/interfaces";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../../errors/error-component/error.component';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { HttpService } from '../../services/http.service';
import { ConfirmComponent } from "../../confirm/confirm.component";
import { UpdateComponent } from "../../update/update.component";
import { template } from '@angular/core/src/render3';


@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {
  
  orgName = "";
  name = "";
  surname = "";
  email = "";

  
  constructor(private service: HttpService, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router)
  {

  }

  ngOnInit() {


    
    //--- Get the Members's Details
    this.service.getOrganizationMemberDetails().subscribe((response: any) => {
      
      if (response.success == true && response.code == 200) {
        console.log("---- HERE -----");
        this.name = response.data.Member.fname;
        this.surname = response.data.Member.surname;
        this.email = response.data.Member.email;
        this.orgName = localStorage.getItem('orgName');

      } else if (response.success == false) {
        console.log("---- HERE -----");
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                               UPDATE PROFILE 
  /**
   * @description Display a popup for the user to edit their profile details
   */
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  updateProfile(product_id : number)
  {
    let dialogRef = this.dialog.open(UpdateComponent, {data: {orgName: localStorage.getItem('orgName')}});
  }

}

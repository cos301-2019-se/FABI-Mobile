/**
 * File Name: home.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\home\home.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, June 25th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 1st 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


import { UserManagementAPIService } from "../_services/user-management-api.service";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../_errors/error-component/error.component';
import { ConfirmComponent } from "../confirm/confirm.component";

import * as Interface from '../_interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  contact_form: FormGroup;
  /** Object for storing all forms that require validation-  @type {HTMLCollectionOf<Element>} */
  forms: HTMLCollectionOf<Element> = null;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
   * Creates an instance of OrganizationHandlerComponent.
   * @param {AdminAPIService} service For calling the API service
   * @param {FormBuilder} formBuilder For creating the login form
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {MatDialog} dialog For dialog pop-up messages
   * @param {Router} router For navigating to other modules/components
   * @memberof OrganizationHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private userManagementService: UserManagementAPIService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.contact_form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mesage: ['', Validators.required]
    })
  }

  ngOnInit() {
    //-------- Form Validation --------
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    this.forms = document.getElementsByClassName("needs-validation");
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(this.forms, function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       CONTACT
  /**
   * This function sends an email to the admin
   *
   * @returns
   * @memberof HomeComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  contact() {


  }

}


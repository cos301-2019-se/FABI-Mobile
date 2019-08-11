/**
 * File Name: login.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\login\login.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 8th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UserManagementAPIService } from "../_services/user-management-api.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../_errors/error-component/error.component';

import * as Interface from '../_interfaces/interfaces';

@Component({
  selector: 'app-sign-up-request',
  templateUrl: './sign-up-request.component.html',
  styleUrls: ['./sign-up-request.component.scss']
})
export class SignUpRequestComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /** Object for defining the Create Organisation form -  @type {FormGroup} */
  registerOrgForm: FormGroup;
  contactForm: FormGroup;
  /** To check if form has been submitted - @type {boolean} */
  submitted: boolean = false;
  /** To check if form has been submitted correctly - @type {boolean} */
  valid: boolean = false;
  /** If page is busy loading something - @type {boolean} */
  loading: boolean = false;
  /** Selected Organisation from the table - @type {Interface.Organisation} */
  selectedOrg: Interface.Organisation;
  /** Array of Organization objects - @type {Organisation[]} */
  organizations: Interface.Organisation[];
  /** Object for defining the login form -  @type {FormGroup} */
  login_form: FormGroup;
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
   * @memberof SignUpRequestComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private userManagementService: UserManagementAPIService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.registerOrgForm = this.formBuilder.group({
      organization_name: ['', Validators.required],
      organization_location: ['', Validators.required],
      admin_name: ['', Validators.required],
      admin_surname: ['', Validators.required],
      admin_email: ['', Validators.required],
      admin_phone: ['', Validators.required]
    })
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mesage: ['', Validators.required]
    })
  }

  ngOnInit() {

    //-------- Location --------
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.displayLocationInfo(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    //-------- Form Validation --------
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    this.forms = document.getElementsByClassName("needs-validation");
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(this.forms, function(form) {
      form.addEventListener(
        "submit",
        function(event) {
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
  //                                                       DISPLAY LOCATION
  /**
   * This function retreives the current location of the user
   *
   * @returns
   * @memberof SignUpRequestComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayLocationInfo(position) {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;

    console.log(`longitude: ${lng} | latitude: ${lat}`);
    console.log(`Position: ${position}`);
    console.log(`Coords: ${JSON.stringify(position.coord)}`);

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       REGISTER ORGANIZATION
  /**
   * This function calls the *user-management* service to create a new Organisation.
   *
   * @returns
   * @memberof SignUpRequestComponent
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

    const admin_details: Interface.OrganisationAdmin = { name: LadminName, surname: LadminSurname, email: LadminEmail };
    const org_details: Interface.Organisation = { orgName: LorgName, admin: admin_details };

    this.userManagementService.createOrganization(org_details).subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
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

/**
 * File Name: home.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\home\home.component.ts
 * Project Name: fabi-web
 * Created Date: Tuesday, June 25th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Sunday, October 6th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as core from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import * as Interface from '../_interfaces/interfaces';
import { LoadingComponent } from "../_loading/loading.component";
import { UserManagementAPIService } from "../_services/user-management-api.service";
import { CookieService } from 'ngx-cookie-service';



@core.Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: core.ViewEncapsulation.None
})
export class HomeComponent implements core.OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  contact_form: FormGroup;
  /** Object for storing all forms that require validation-  @type {HTMLCollectionOf<Element>} */
  forms: HTMLCollectionOf<Element> = null;
  request_register_org: FormGroup;
  submitted: boolean = false;
  valid: boolean = false;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          FORM VAIDATORS
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  register_organization_validators = {
    'organization_name': [
      { type: 'required', message: 'Organization name is required' },
    ],
    'admin_email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Invalid email' }
    ],
    'admin_name': [
      { type: 'required', message: 'First name is required' }
    ],
    'admin_surname': [
      { type: 'required', message: 'Surname is required' }
    ],
    'admin_phone': [
      { type: 'required', message: 'Phone No. is required' },
      // { type: 'pattern', message: 'Please enter a valid number' }
    ],
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
   * Creates an instance of OrganizationHandlerComponent.
   * @param {AdminAPIService} service For calling the API service
   * @param {FormBuilder} formBuilder For creating the login form
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {MatDialog} dialog For dialog pop-up messages
   * @param {Router} router for routing/navigating to other components
   * @memberof HomeComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private userManagementService: UserManagementAPIService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.contact_form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    })

    this.request_register_org = this.formBuilder.group({
      organization_name: ['', Validators.required],
      admin_name: ['', Validators.required],
      admin_surname: ['', Validators.required],
      admin_email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      admin_phone: ['', Validators.compose([
        Validators.required,
        // Validators.pattern('')
      ])]

    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @memberof HomeComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {

    this.cookieService.set('SameSite', 'None');

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


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       REQUEST TO REGISTER
  /**
   * This function allwos an organizaion to request to register for the system
   *
   * @returns
   * @memberof HomeComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  requestToRegister() {

    this.submitted = true;

    if (this.request_register_org.invalid) {
      return;
    }

    this.valid = true;

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Sending Request" } });

    const LorgName = this.request_register_org.controls.organization_name.value;
    const LadminName = this.request_register_org.controls.admin_name.value;
    const LadminSurname = this.request_register_org.controls.admin_surname.value;
    const LadminEmail = this.request_register_org.controls.admin_email.value;
    const LadminPhone = this.request_register_org.controls.admin_phone.value;

    const admin_details: Interface.OrganisationAdmin = { fname: LadminName, surname: LadminSurname, email: LadminEmail };
    const org_details: Interface.Organisation = { orgName: LorgName, admin: admin_details };

    this.userManagementService.sendRequestToRegisterOrganization(org_details).subscribe((response: any) => {

      loadingRef.close();

      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE

        let snackBarRef = this.snackBar.open("Successfully Sent Request", "Dismiss", {
          duration: 6000
        });

      } else if (response.success == false) {
        //POPUP MESSAGE
      }
    });

  }

}


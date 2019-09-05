/**
 * File Name: login.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\login\login.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 22nd 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { UserManagementAPIService } from "../_services/user-management-api.service";
import { ErrorComponent } from '../_errors/error-component/error.component';
import * as Interface from '../_interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /** Object for defining the login form -  @type {FormGroup} */
  loginForm: FormGroup;
  /** Object for storing all forms that require validation-  @type {HTMLCollectionOf<Element>} */
  forms: HTMLCollectionOf<Element> = null;
  /** To check if form has been submitted - @type {boolean} */
  submitted: boolean = false;
  /** To check if form has been submitted correctly - @type {boolean} */
  valid: boolean = false;
  /** To check if user is logged in - @type {boolean} */
  loggedIn: boolean = false;
  /** Array of Organization objects for form dropdown - @type {Organisation[]} */
  organizations: Interface.Organisation[];
  /** Array of User Type objects for form dropdown - @type {UserType[]} */
  userTypes: Interface.UserType[];
  /** If page is busy loading something - @type {boolean} */
  loading: boolean = false;
  /** Selected organisation on dropdown. Used to adjust login form according to organisation selected - @type {string} */
  selectedOrg: string;

  login_validation_messages = {
    'organization': [
      { type:  'required', message: 'Organization is required'}
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Invalid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      // { type: 'minlength', message: 'Password must be at least 8 characters long' },
      // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of LoginComponent.
   * 
   * @param {AdminAPIService} authService For calling the *authentication* API service
   * @param {FormBuilder} formBuilder For creating the login form
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {MatDialog} dialog For dialog pop-up messages
   * @param {Router} router For navigating to other modules/components
   * @memberof LoginComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService, 
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, 
    private dialog: MatDialog, 
    private router: Router, 
    private toaster: ToastrService,
    private userManagementServicee: UserManagementAPIService
    ) {

    // if(!this.previousUserData.email && this.previousUserData.email == null) {
    //   var email = '';
    // }

    // if(!this.previousUserData.organization && this.previousUserData.organization == null) {
    //   var organization = '';
    // }

    this.loginForm = this.formBuilder.group({
      organization: ['', Validators.required],
      email: ['',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.required]
    })
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                              LOGIN
  /**
   * This function calls the *authentication* service to authenticate the user's login details. If the user is authenticated, they're directed 
   * to their respective dashboard. If they're NOT authenticated, an appropriate error message is shown.
   * 
   * @returns If form input is invalid (eg. not filled out correctly etc.) 
   * @memberof LoginComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  login() {

    this.submitted = true;

    // Check if form input is valid 
    if (this.loginForm.invalid) {
      return;
    }

    this.valid = true;
    this.loading = true;

    // Get form details
    const Lemail = this.loginForm.controls.email.value;
    const Lpassw = this.loginForm.controls.password.value;
    const Lorg = this.loginForm.controls.organization.value;

    // User details to be passed to API
    const details: Interface.LoginInfo = { email: Lemail, password: Lpassw, orgName: Lorg };

    this.authService.login(details).subscribe((response: any) => {
      this.loading = false;
      // API Request successful
      if (response.success == true && response.code == 200) {        
        // User NOT Authorised
        if (response.title != "AUTHORIZED") {
          //POPUP MESSAGE
          let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: response.data.title, message: response.data.message, retry: false } });
          return;
        }
        // ELSE user Authorised:

        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Welcome", "Dismiss", {
          duration: 3000
        });

        // Navigate to specific dashboard, based on user's type
        if(response.userDetails.userType == 'SuperUser') {
          this.router.navigate(['/admin-dashboard']);
        } else if(response.userDetails.userType == 'ClinicAdmin') {
          this.router.navigate(['/clinic-handler']);
        }else if(response.userDetails.userType == 'OrganizationAdmin') {
          this.router.navigate(['/organization-dashboard']);
        } else if(response.userDetails.userType == 'Member') {
          this.router.navigate(['/member-dashboard']);
        } else if(response.userDetails.userType == 'Staff') {
          this.router.navigate(['/staff-dashboard']);
        } else {
          let snackBarRef = this.snackBar.open("User not supported", "Dismiss", {
            duration: 3000
          });
        }
        

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: response.title, message: response.message, status: response.status, retry: false } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.login();
          }
        })
      }
    });
    
    this.loading = false;
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    NG_ON_INIT()  
  /**
   * This function is called when the page loads
   * 
   * @description 1. Check if user is already logged in | 2. Check if their session ID (Token) is valid | 3. Populate form drop downs 
   *
   * @memberof LoginComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    //-------- Load Organisation names for Drop Down --------
    this.userManagementServicee.getAllOrganizations().subscribe((response: any) => {
      
      if (response.success == true && response.code == 200) {
        this.organizations = response.data.Organizations;
      } 
      else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Sorry there was an error loading the Organisations", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.ngOnInit();
          }
        })
      }
    });

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

}

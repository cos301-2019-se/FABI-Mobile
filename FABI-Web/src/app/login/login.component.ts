/**
 * File Name: login.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\login\login.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, October 9th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as http from '@angular/common/http';
import * as core from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as Interface from '../_interfaces/interfaces';
import { LoadingComponent } from "../_loading/loading.component";
import { AuthenticationService } from '../_services/authentication.service';
import { UserManagementAPIService } from "../_services/user-management-api.service";
import { NotificationService } from "../_services/notification.service";

@core.Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: core.ViewEncapsulation.None
})

export class LoginComponent implements core.OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /** Object for defining the login form -  @type {FormGroup} */
  loginForm: FormGroup;
  /** Object for defining the forgot password form -  @type {FormGroup} */
  forgotPasswordForm: FormGroup;
  /** Object for storing all forms that require validation-  @type {HTMLCollectionOf<Element>} */
  forms: HTMLCollectionOf<Element> = null;
  /** To check if form has been submitted - @type {boolean} */
  submitted: boolean = false;
  /** To check if form has been submitted correctly - @type {boolean} */
  valid: boolean = false;
  /** Array of Organization objects for form dropdown - @type {Organisation[]} */
  organizations: Interface.Organisation[];
  /** If page is busy loading something - @type {boolean} */
  loading: boolean = false;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          FORM VALIDATION
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  login_validation_messages = {
    'organization': [
      { type: 'required', message: 'Organization is required' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Invalid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of LoginComponent.
   * 
   * @param {AdminAPIService} authService For calling the *authentication* API service
   * @param {UserManagementAPIService} userManagementService For calling the User Management API service
   * @param {FormBuilder} formBuilder For creating the login form
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {MatDialog} dialog For dialog pop-up messages
   * @param {Router} router for routing/navigating to other components
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
    private userManagementService: UserManagementAPIService,
    private notificationService: NotificationService
  ) {

    // if(!this.previousUserData.email && this.previousUserData.email == null) {
    //   var email = '';
    // }

    // if(!this.previousUserData.organization && this.previousUserData.organization == null) {
    //   var organization = '';
    // }

    this.loginForm = this.formBuilder.group({
      organization: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    });

    this.forgotPasswordForm = this.formBuilder.group({
      forgot_email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      organization2: ['', Validators.required],
      new_password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      new_password2: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    });
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
    this.userManagementService.getAllOrganizations().subscribe((response: any) => {

      if (response.success == true && response.code == 200) {
        this.organizations = response.data.Organizations;
      }
      else {
        //POPUP MESSAGE
        this.notificationService.showWarningNotification('Error', 'There was an error loading the organizations');
      }
    }, (err: http.HttpErrorResponse) => {
      this.notificationService.showWarningNotification('Error', 'There was an error loading the organizations');
      //Handled in error-handler
  });

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

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Logging in..." } });

    // Get form details
    const Lemail = this.loginForm.controls.email.value;
    const Lpassw = this.loginForm.controls.password.value;
    const Lorg = this.loginForm.controls.organization.value;

    // User details to be passed to API
    const details: Interface.LoginInfo = { email: Lemail, password: Lpassw, orgName: Lorg };

    this.authService.login(details).subscribe((response: any) => {

      loadingRef.close();

      // API Request successful
      if (response.success == true && response.code == 200) {

        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open(`Welcome ${response.userDetails.fname}`, "Dismiss", {
          duration: 3000
        });

        // Navigate to specific dashboard, based on user's type
        if (response.userDetails.userType == 'SuperUser') {
          this.router.navigate(['/admin-dashboard']);
        } else if (response.userDetails.userType == 'ClinicAdmin') {
          this.router.navigate(['/clinic-handler']);
        } else if (response.userDetails.userType == 'OrganizationAdmin') {
          this.router.navigate(['/organization-dashboard']);
        } else if (response.userDetails.userType == 'Member') {
          this.router.navigate(['/member-dashboard']);
        } else if (response.userDetails.userType == 'Staff') {
          this.router.navigate(['/staff-dashboard']);
        } else {
          this.notificationService.showErrorNotification('User not supported', '');
        }

      } else  {
        //POPUP MESSAGE
        this.notificationService.showErrorNotification('Login Failed', 'An error occured while logging in. \n Please try again.');
      }
    }, (err: http.HttpErrorResponse) => {
        loadingRef.close();
        this.notificationService.showErrorNotification('Login Failed', 'An error occured while logging in. \n Please try again.');
        //Handled in error-handler
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                              FORGOT PASSWORD
  /**
   * This function is used to set a new password if the user has forgotten their password.
   * 
   * @memberof LoginComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  forgotPassword(){
    // // Check if form input is valid 
    // if (this.forgotPasswordForm.invalid) {
    //   return;
    // }

    // const forgot_email = this.forgotPasswordForm.controls.forgot_email.value;
    // const forgot_organization = this.forgotPasswordForm.controls.organization2.value;
    // const forgot_password = this.forgotPasswordForm.controls.new_password.value;
    // const forgot_password2 = this.forgotPasswordForm.controls.new_password2.value;
    // var forgot_id = "";

    // if(forgot_password != forgot_password2){
    //   //Display error that the passwords do not match
    // }
    // else{
    //   this.userManagementService.getSessionlessUserDetails(forgot_organization, forgot_email).subscribe((response: any) => {
    //     if(response.success == true){
    //       forgot_id = response.data;
    //     }
    //   });

    //   if(forgot_id == ""){
    //     //Display error message that this is not a registered user
    //   }
    //   else{
    //     if(forgot_organization == "FABI"){
    //       this.userManagementService.resetFABIPassword(forgot_password, forgot_id).subscribe((response: any) => {
    //         if(response.success == true){
    //           //Indicate that their password has been successfully changed
    //         }
    //         else{
    //           //Indicate that their password has not been successfully changed
    //         }
    //       });
    //     }
    //     else{
    //       this.userManagementService.resetOrgMemberPassword(forgot_password, forgot_id, forgot_organization).subscribe((response: any) => {
    //         if(response.success == true){
    //           //Display that password was reset
    //         }
    //         else{
    //           //Display that something went wrong
    //         }
    //       });
    //     }   
    //   }
    // }
  }

}
/**
 * File Name: login.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\login\login.component.ts
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


import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ErrorComponent } from '../errors/error-component/error.component';
import * as Interface from '../interfaces/interfaces';


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
  /** Selected user type on dropdown - @type {string} */
  selectedUserType: string;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of LoginComponent.
   * 
   * @param {AdminAPIService} service For calling the API service
   * @param {FormBuilder} formBuilder For creating the login form
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {MatDialog} dialog For dialog pop-up messages
   * @param {Router} router For navigating to other modules/components
   * @memberof LoginComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private service: HttpService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) {
    this.loginForm = this.formBuilder.group({
      organization: ['', Validators.required],
      userType: ['', Validators.required],
      login_email: ['', Validators.required],
      login_password: ['', Validators.required]
    })
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                              LOGIN
  /**
   * This function calls the *http* service to authenticate the user's login details. If the user is authenticated, they're directed 
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
    const Lemail = this.loginForm.controls.login_email.value;
    const Lpassw = this.loginForm.controls.login_password.value;
    const Lorg = this.loginForm.controls.organization.value;
    const LuserType = this.loginForm.controls.userType.value;

    // User details to be passed to API
    const details: Interface.LoginInfo = { email: Lemail, password: Lpassw, orgName: Lorg, userType: LuserType };

    this.service.login(details).subscribe((response: any) => {

     console.log(response);

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
        let snackBarRef = this.snackBar.open("Successfully Logged In", "Dismiss", {
          duration: 3000
        });

        this.service.setSessionVariables(response.token, details.orgName, details.userType);
        // this.service.setLoggedin();

        // Navigate to specific dashboard, based on user's type
        if (details.orgName == "FABI") {
          if (details.userType == "Admin" || details.userType == "Database Admin") {
            try {
              this.router.navigate(['admin-dashboard']);
            } catch (err) {
              console.log("Could not redirect to dashboard: " + err.message);
            }

          }
          else {
            try {
              this.router.navigate(['staff-dashboard']);
            } catch (err) {
              console.log("Could not redirect to dashboard: " + err.message);
            }
          }
        }
        else {
          if (details.userType == "Admin") {
            try {
              this.router.navigate(['org-admin-dashboard']);
            } catch (err) {
              console.log("Could not redirect to dashboard: " + err.message);
            }
          } else {
            try {
              this.router.navigate(['org-member-dashboard']);
            } catch (err) {
              console.log("Could not redirect to dashboard: " + err.message);
            }
          }
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

    this.displayUserTypes();
    
    // this.loggedIn = this.service.isLoggedIn();
    // if (this.loggedIn == true) {
    //   // Navigate to respective dashboard
    // }

    //-------- Load Organisation names for Drop Down --------
    this.service.getAllOrganizations().subscribe((response: any) => {
      
      if (response.success == true && response.code == 200) {
        console.log(response);
        console.log(response.data);
        this.organizations = response.data.Organizations;

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Sorry there was an error loading the Organisations", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.ngOnInit();
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

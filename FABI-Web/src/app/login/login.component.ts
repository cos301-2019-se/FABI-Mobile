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
<<<<<<< HEAD
import { LoginInfo } from '../admin-api.service';
import { AdminAPIService } from '../admin-api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../error/error.component';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
//import { userInfo } from 'os';


//Object for defining how a organization is structured
export interface Organization {
  ID: string; //This will contain the ID retreived from the DB 
  Name: string; //This will be the name of the organization
}

//Object for defining how a userType is structured
export interface UserType {
  ID: string; //This will contain the ID retreived from the DB 
  Name: string; //This will be the name of the type
}
=======
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { UserManagementAPIService } from "../_services/user-management-api.service";
import { ErrorComponent } from '../_errors/error-component/error.component';
import * as Interface from '../_interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';

>>>>>>> develop

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

<<<<<<< HEAD
  /*
    GLOBALS
  */
  loginForm: FormGroup;             // FormGroup object to reference add user type form
  submitted: boolean = false;       // if form has been submitted
  success: boolean = false;         // if form was succesfully filled out
  loggedIn: boolean = false;        // to check if user is logged in
  selectedOrganization: boolean = false;
  organizations: Object;            //array for Organization dropdown
  userTypes: Object;                //array for User Type dropdown
  loading: boolean = false;
  selectedOrg: string;

  /*
     CONSTRUCTOR
   */
  constructor(private service: AdminAPIService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) {
=======
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

>>>>>>> develop
    this.loginForm = this.formBuilder.group({
      organization: ['', Validators.required],
      email: ['',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.required]
    })
  }

<<<<<<< HEAD
=======

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
>>>>>>> develop
  login() {

    this.submitted = true;

    // Check if form input is valid 
    if (this.loginForm.invalid) {
      return;
    }
<<<<<<< HEAD

    this.success = true;
    this.loading = true;

    const Lemail = this.loginForm.controls.login_email.value;
    const Lpassw = this.loginForm.controls.login_password.value;
    const Lorg = this.loginForm.controls.organization.value;
    const LuserType = this.loginForm.controls.userType.value;

    const details: LoginInfo = { email: Lemail, password: Lpassw, organization: Lorg, userType: LuserType };

    this.service.login(details).subscribe((response: any) => {

      this.loading = false;
      
      if (response.success == true) {
=======

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

>>>>>>> develop
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Welcome", "Dismiss", {
          duration: 3000
        });

<<<<<<< HEAD
        this.service.setToken(response.data.token);
        this.service.setLoggedin();

        if(details.organization == "FABI")
        {
          if(details.userType == "Admin" || details.userType == "Database Admin")
          {
            try {
              this.router.navigate(['fabi-admin-dashboard']);
            } catch(err) {
              console.log("Could not redirect to dashboard: " + err.message);
            }
            
          }
          else {
            try {
              this.router.navigate(['fabi-staff-dashboard']);
            } catch(err) {
              console.log("Could not redirect to dashboard: " + err.message);
            }
          }
        }
        else
        {
          if(details.userType == "Admin")
          { 
            try {
              this.router.navigate(['org-admin-dashboard']);
            } catch(err) {
              console.log("Could not redirect to dashboard: " + err.message);
            }
          } else
          {
            try {
              this.router.navigate(['org-member-dashboard']);
            } catch(err) {
              console.log("Could not redirect to dashboard: " + err.message);
            }
          }
        }
=======
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
        
>>>>>>> develop

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: response.title, message: response.message, status: response.status, retry: false } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.login();
          }
        })
      }
<<<<<<< HEAD

      this.loading = false;

    }, (err: HttpErrorResponse) => {
      //POPUP MESSAGE
      let dialogRef = this.dialog.open(ErrorComponent, { data: { error: "Could Not Log In", message: err.message } });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == "Retry") {
          this.login();
        }
      })
      console.log("ERROR:" + err.message);
      this.loading = false;
    })
  }

  ngOnInit() {
    this.loggedIn = this.service.isLoggedIn();
    if (this.loggedIn == true) {
      this.router.navigate(['sample-form']);
    }

    this.service.getAllOrganizations().subscribe((response:any) => {
      if(response.success == true) {
        // var orgs = response.data.content.qs.Organizations;
        // forEach(var i in orgs)
        // {
        //   this.organizations.push(i);
        // }
        this.organizations = response.data.content.qs.Organizations;
        
      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, {data: {error: "Could Not Load Organizations", message: response.error.message}});
        dialogRef.afterClosed().subscribe((result) => {
          if(result == "Retry") {
            this.ngOnInit();
          }
        })
      }    
    }, (err: HttpErrorResponse) => {
      //POPUP MESSAGE
      let dialogRef = this.dialog.open(ErrorComponent, {data: {error: "Could Not Load Organizations", message: err.message}});
      dialogRef.afterClosed().subscribe((result) => {
        if(result == "Retry") {
          this.ngOnInit();
        }
      })
      console.log("ERROR:" + err.message);
    })

  }

  displayUserTypes() 
  {
    if(this.selectedOrg == "FABI")
    {
      this.userTypes = [
        {
          "ID":1,
          "Name":"Admin"
        },
        {
          "ID":2,
          "Name":"Staff"
        },
        {
          "ID":3,
          "Name":"Database Admin"
        }
      ]

    }
    else {
      this.userTypes = [
        {
          "ID":1,
          "Name":"Admin"
        },
        {
          "ID":2,
          "Name":"Member"
        }
      ]
    }
  }
=======
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
>>>>>>> develop

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginInfo } from '../api-connection.service';
import { ApiConnectionService } from '../api-connection.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../error/error.component';
import { Router } from '@angular/router';

//Object for defining how a organization is structured
export interface Organization {
  value: string; //This will contain the ID retreived from the DB 
  viewValue: string; //This will be the name of the organization
}

//Object for defining how a userType is structured
export interface UserType {
  value: string; //This will contain the ID retreived from the DB 
  viewValue: string; //This will be the name of the type
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  /*
    GLOBALS
  */
  loginForm: FormGroup;             // FormGroup object to reference add user type form
  submitted: boolean = false;       // if form has been submitted
  success: boolean = false;         // if form was succesfully filled out
  loggedIn: boolean = false;        // to check if user is logged in
  selectedOrganization: boolean = false;

  /*
     CONSTRUCTOR
   */
  constructor(private api: ApiConnectionService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) {
    this.loginForm = this.formBuilder.group({
      organization: ['', Validators.required],
      userType: ['', Validators.required],
      login_email: ['', Validators.required],
      login_password: ['', Validators.required]
    })
  }

  //Temp Array for Organization dropdown - Should be populated off of an API call
  organizations: Organization[] = [
    { value: '0', viewValue: 'Forestry ABC' },
    { value: '1', viewValue: 'Stick Foundation' },
    { value: '2', viewValue: 'FABI' }
  ];

  /*
    DISPLAY USER TYPE 
      - onclick event handler for the Organization dropdown
      - This function is used to indicate that an organization has been 
        selected and we can now display the user types available for the organization
  */
  //Function used to display the user type 
  displayUserType() {
    this.selectedOrganization = true;
  }

  //Temp Array for UserType dropdown - Should be populated off of an API call
  userTypes: UserType[] = [
    { value: '0', viewValue: 'Admin' },
    { value: '1', viewValue: 'Staff' }
  ];

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.success = true;
    const Lemail = this.loginForm.controls.login_email.value;
    const Lpassw = this.loginForm.controls.login_password.value;

    const details: LoginInfo = { email: Lemail, password: Lpassw };

    this.api.login(details).subscribe((response: any) => {
      if (response.success == true) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Successfully Logged In", "Dismiss", {
          duration: 3000
        });

        this.api.setLogin();
        this.loggedIn = this.api.isLoggedIn();
        this.router.navigate(['sample-form']);

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error: "Could Not Log In", message: response.message } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.login();
          }
          //Take out when authenication is working - Just for test/demp purposes
          this.router.navigate(['sample-form']);
          //
        })
      }
    }, (err: HttpErrorResponse) => {
      //POPUP MESSAGE
      let dialogRef = this.dialog.open(ErrorComponent, { data: { error: "Could Not Log In", message: err.message } });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == "Retry") {
          this.login();
        }
        //Take out when authenication is working - Just for test/demp purposes
        this.router.navigate(['sample-form']);
        //
      })
      console.log("ERROR:" + err.message);
    })
  }

  ngOnInit() {
    this.loggedIn = this.api.isLoggedIn();
    if (this.loggedIn == true) {
      this.router.navigate(['sample-form']);
    }

  }

}

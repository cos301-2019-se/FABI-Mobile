import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginInfo } from '../api-connection.service';
import { ApiConnectionService } from '../api-connection.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../error/error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;             // FormGroup object to reference add user type form
  submitted: boolean = false;       // if form has been submitted
  success: boolean = false;         // if form was succesfully filled out
  loggedIn: boolean = false;                // to check if user is logged in

  // api: APIconnectionService;

  //   loginForm = new FormGroup({
  //   email: new FormControl(),
  //   password: new FormControl()
  // });

  constructor(private api: ApiConnectionService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) {
    this.loginForm = this.formBuilder.group({
      login_email: ['', Validators.required],
      login_password: ['', Validators.required]
    })
  }

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
      let dialogRef = this.dialog.open(ErrorComponent, { data: { error: "Could Not Log In" ,message: err.message } });
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

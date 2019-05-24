import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  organizations: Object;            //array for Organization dropdown
  userTypes: Object;                //array for User Type dropdown
  loading: boolean = false;
  selectedOrg: string;

  /*
     CONSTRUCTOR
   */
  constructor(private service: AdminAPIService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) {
    this.loginForm = this.formBuilder.group({
      organization: ['', Validators.required],
      userType: ['', Validators.required],
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
    this.loading = true;

    const Lemail = this.loginForm.controls.login_email.value;
    const Lpassw = this.loginForm.controls.login_password.value;
    const Lorg = this.loginForm.controls.organization.value;
    const LuserType = this.loginForm.controls.userType.value;

    const details: LoginInfo = { email: Lemail, password: Lpassw, organization: Lorg, userType: LuserType };

    this.service.login(details).subscribe((response: any) => {

      this.loading = false;
      
      if (response.success == true) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Successfully Logged In", "Dismiss", {
          duration: 3000
        });

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

}

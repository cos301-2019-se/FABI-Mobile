import { Component, OnInit } from '@angular/core';

import { AdminAPIService } from '../../admin-api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../../error/error.component';
import { Router } from '@angular/router';

import { OrganizationInfo } from '../../admin-api.service';
import { OrganizationAdmin } from '../../admin-api.service';



@Component({
  selector: 'app-organization-handler',
  templateUrl: './organization-handler.component.html',
  styleUrls: ['./organization-handler.component.scss']
})
export class OrganizationHandlerComponent implements OnInit {

  /*
    GLOBALS
  */
 createOrgForm: FormGroup;          // FormGroup object to reference add user type form
 submitted: boolean = false;       // if form has been submitted
 success: boolean = false;         // if form was succesfully filled out
  
  constructor(private service: AdminAPIService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) 
  {
    this.createOrgForm = this.formBuilder.group({
      organization_name: ['', Validators.required],
      organization_location: ['', Validators.required],
      admin_name: ['', Validators.required],
      admin_surname: ['', Validators.required],
      admin_email: ['', Validators.required],
      admin_phone: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  createOrg()
  {
    this.submitted = true;

    if (this.createOrgForm.invalid) {
      return;
    }

    this.success = true;

    const LorgName = this.createOrgForm.controls.organization_name.value;
    const LorgLocation = this.createOrgForm.controls.organization_location.value;
    const LadminName = this.createOrgForm.controls.admin_name.value;
    const LadminSurname = this.createOrgForm.controls.admin_surname.value;
    const LadminEmail = this.createOrgForm.controls.admin_email.value;
    const LadminPhone = this.createOrgForm.controls.admin_phone.value;

    const org_details: OrganizationInfo = { orgName: LorgName, location: LorgLocation };
    const admin_details: OrganizationAdmin = { name: LadminName, surname: LadminSurname, email: LadminEmail, phone: LadminPhone};

    this.service.createOrganization(org_details, admin_details).subscribe((response: any) => {
      if (response.success == true) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Successfully Created Organization! Temp Password :" + response.data.content.tempPassword, "Dismiss", {
          duration: 6000
        });

        console.log("Temp Password: " + response.data.content.tempPassword);

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error: "Could not create organization ", message: response.message } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.createOrg();
          }
        })
      }
    }, (err: HttpErrorResponse) => {
      //POPUP MESSAGE
      let dialogRef = this.dialog.open(ErrorComponent, { data: { error: "Could not create organization ", message: err.message } });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == "Retry") {
          this.createOrg();
        }
      })
      console.log("ERROR:" + err.message);
    })
  }

}

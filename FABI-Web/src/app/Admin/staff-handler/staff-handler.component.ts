import { Component, OnInit } from '@angular/core';

import { AdminAPIService } from '../../admin-api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../../error/error.component';
import { Router } from '@angular/router';

import { StaffInfo } from '../../admin-api.service';


@Component({
  selector: 'app-staff-handler',
  templateUrl: './staff-handler.component.html',
  styleUrls: ['./staff-handler.component.scss']
})
export class StaffHandlerComponent implements OnInit {

  /*
    GLOBALS
  */
 addStaffForm: FormGroup;          // FormGroup object to reference add user type form
 submitted: boolean = false;       // if form has been submitted
 success: boolean = false;         // if form was succesfully filled out

  constructor(private service: AdminAPIService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router)
  { 
    this.addStaffForm = this.formBuilder.group({
      staff_name: ['', Validators.required],
      staff_surname: ['', Validators.required],
      staff_email: ['', Validators.required],
      staff_phone: ['', Validators.required],
      staff_position: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  addStaff()
  {
    this.submitted = true;

    if (this.addStaffForm.invalid) {
      return;
    }

    this.success = true;

    const LstaffName = this.addStaffForm.controls.staff_name.value;
    const LstaffSurname = this.addStaffForm.controls.staff_surname.value;
    const LstaffEmail = this.addStaffForm.controls.staff_email.value;
    const LstaffPhone = this.addStaffForm.controls.staff_phone.value;
    const LstaffPosition = this.addStaffForm.controls.staff_positon.value;

    const staff_details: StaffInfo = { name: LstaffName, surname:LstaffSurname, email:LstaffEmail, phone:LstaffPhone, position:LstaffPosition };

    this.service.addStaffMember(staff_details).subscribe((response: any) => {
      if (response.success == true) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Successfully added staff member! Temp Password: " + response.data.content.tempPassword, "Dismiss", {
          duration: 6000
        });

        console.log("Temp Password: " + response.data.content.tempPassword);

      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error: "Could not add staff member ", message: response.message } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.addStaff();
          }
        })
      }
    }, (err: HttpErrorResponse) => {
      //POPUP MESSAGE
      let dialogRef = this.dialog.open(ErrorComponent, { data: { error: "Could not add staff member", message: err.message } });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == "Retry") {
          this.addStaff();
        }
      })
      console.log("ERROR:" + err.message);
    })
  }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MemberInfo } from '../../organization-api.service';
import { OrganizationInfo } from '../../organization-api.service';
import { OrganizationApiService } from '../../organization-api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../../error/error.component';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { AdminAPIService } from '../../admin-api.service';


@Component({
  selector: 'app-member-handler',
  templateUrl: './member-handler.component.html',
  styleUrls: ['./member-handler.component.scss']
})
export class MemberHandlerComponent implements OnInit {

   /*
    GLOBALS
  */
 addMemberForm: FormGroup;         // FormGroup object to reference add user type form
 submitted: boolean = false;       // if form has been submitted
 success: boolean = false;         // if form was succesfully filled out
 organizations: Object;            //array for Organization dropdown
  
  constructor(private service: OrganizationApiService, private adminService: AdminAPIService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router)
   {
    this.addMemberForm = this.formBuilder.group({
      organization: ['', Validators.required],
      member_name: ['', Validators.required],
      member_surname: ['', Validators.required],
      member_location: ['', Validators.required],
      member_email: ['', Validators.required],
      member_phone: ['', Validators.required]

    })
  }

  sidenavToggle(){
    if(document.getElementById("sidenav_div").style.width == "22%")
    {
      document.getElementById("sidenav_div").style.width = "0";
    }
    else{
      document.getElementById("sidenav_div").style.width = "22%";
    } 
  }

  closeNav(){
    document.getElementById("sidenav_div").style.width = "0";
  }

  ngOnInit() {

    this.adminService.getAllOrganizations().subscribe((response:any) => {
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


  addMember()
  {
    this.submitted = true;

    if (this.addMemberForm.invalid) {
      return;
    }

    this.success = true;

    const LorgName = this.addMemberForm.controls.organization.value;
    const LmemberLocation = this.addMemberForm.controls.member_location.value;
    const LmemberName = this.addMemberForm.controls.member_name.value;
    const LmemberSurname = this.addMemberForm.controls.member_surname.value;
    const LmemberEmail = this.addMemberForm.controls.member_email.value;
    const LmemberPhone = this.addMemberForm.controls.member_phone.value;

    const org_details: OrganizationInfo = { orgName: LorgName };
    const member_details: MemberInfo = { name: LmemberName, surname: LmemberSurname, location: LmemberLocation , email: LmemberEmail, phone: LmemberPhone};


    this.service.addOrgMember(org_details, member_details).subscribe((response: any) => {
      if (response.success == true) {
        //POPUP MESSAGE
        let snackBarRef = this.snackBar.open("Successfully added member! Temp Password: " + response.data.content.tempPassword, "Dismiss", {
          duration: 6000
        });

        console.log("Temp Password: " + response.data.content.tempPassword);

      } else if (response.success == false) {
        console.log("---- HERE ----");
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error: "Could not add member", message: response.message } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.addMember();
          }
          //Take out when authenication is working - Just for test/demp purposes
          this.router.navigate(['sample-form']);
          //
        })
      }
    }, (err: HttpErrorResponse) => {
      //POPUP MESSAGE
      let dialogRef = this.dialog.open(ErrorComponent, { data: { error: "Could not add member", message: err.message } });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == "Retry") {
          this.addMember();
        }
      })
      console.log("ERROR:" + err.message);
    })
  }

}

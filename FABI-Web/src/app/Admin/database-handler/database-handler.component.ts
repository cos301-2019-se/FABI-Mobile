/**
 * File Name: database-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\database-handler\database-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, June 25th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { ErrorComponent } from '../../errors/error-component/error.component';

//Import the porting service for DB creation
import { Porting } from '../../services/porting.service';


@Component({
  selector: 'app-database-handler',
  templateUrl: './database-handler.component.html',
  styleUrls: ['./database-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatabaseHandlerComponent implements OnInit {

  /**
   *  GLOBALS
   */
  loading: boolean = false;

  portCSV: Porting = new Porting();

  constructor(private service: HttpService, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) { }

  // sidenavToggle(){
  //   if(document.getElementById("sidenav_div").style.width == "22%")
  //   {
  //     document.getElementById("sidenav_div").style.width = "0";
  //   }
  //   else{
  //     document.getElementById("sidenav_div").style.width = "22%";
  //   } 
  // }

  // closeNav(){
  //   document.getElementById("sidenav_div").style.width = "0";
  // }

  ngOnInit() {
  }

  public submitCSV(input) {

    this.loading = true;

    const reader = new FileReader();
    reader.onload = () => {
      let text = reader.result;
      console.log("porting data:");
      let jsonData = this.portCSV.convertToJSON(text); //converts file to JSON Object
      //console.log(jsonData);

      this.service.porting(jsonData).subscribe((response:any) => {
        this.loading = false;
        if(response.success == true && response.code == 200) {
          //POPUP MESSAGE
          let snackBarRef = this.snackBar.open("Successfully ported CSV file", "Dismiss", {
            duration: 3000
          });
        } else if (response.success == false) {

          //POPUP MESSAGE
          let dialogRef = this.dialog.open(ErrorComponent, {data: {error: "Could not port CSV file", message: response.error.message}});
          dialogRef.afterClosed().subscribe((result) => {
            if(result == "Retry") {
              this.ngOnInit();
            }
          })
        }    
      }, (err: HttpErrorResponse) => {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, {data: {error: "Could not port CSV file", message: err.message}});
        dialogRef.afterClosed().subscribe((result) => {
          if(result == "Retry") {
            this.ngOnInit();
          }
        })
        console.log("ERROR:" + err.message);
      });
    };
    reader.readAsText(input.files[0]);
  }

}

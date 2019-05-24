import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminAPIService } from '../../admin-api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { ErrorComponent } from '../../error/error.component';

//Import the porting service for DB creation
import { Porting } from '../../porting.service';


@Component({
  selector: 'app-database-handler',
  templateUrl: './database-handler.component.html',
  styleUrls: ['./database-handler.component.scss']
})
export class DatabaseHandlerComponent implements OnInit {

  /**
   *  GLOBALS
   */
  loading: boolean = false;

  portCSV: Porting = new Porting();

  constructor(private service: AdminAPIService, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
  }

  public submitCSV(input) {

    this.loading = true;

    const reader = new FileReader();
    reader.onload = () => {
      let text = reader.result;
      let jsonData = this.portCSV.convertToJSON(text); //converts file to JSON Object
      console.log(jsonData);


      // ** place api calls here ** //
      this.service.porting(jsonData).subscribe((response:any) => {
        this.loading = false;
        if(response.success == true) {
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
      })
    };
    reader.readAsText(input.files[0]);
  }

}

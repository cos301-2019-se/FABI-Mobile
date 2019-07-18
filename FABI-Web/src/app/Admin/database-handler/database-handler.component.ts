/**
 * File Name: database-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\database-handler\database-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, July 18th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../_services/http.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { ErrorComponent } from '../../_errors/error-component/error.component';

//Import the porting service for DB creation
import { Porting } from '../../_services/porting.service';


@Component({
  selector: 'app-database-handler',
  templateUrl: './database-handler.component.html',
  styleUrls: ['./database-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatabaseHandlerComponent implements OnInit {

  displayedColumns: string[];
  dataSource = new MatTableDataSource([]);
  columns: any[] = [];

  databases: any[];
  databasePrivileges: any = {'create': false, 'retrieve': true, 'update': false, 'delete': false};
  
  selectedDatabase: string;
  /**
   *  GLOBALS
   */
  loading: boolean = false;

  portCSV: Porting = new Porting();

  jsonData: any;
  

  @ViewChild("rpDBname") rPort : ElementRef;
  @ViewChild("pDBname") port : ElementRef;

  constructor(private service: HttpService, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {

    //-------- Load Databases for Drop Down --------
    const user = this.service.currentUserValue;
    this.databases = user.databases;

  }

  public submitCSV(input) {

    this.loading = true;
    let dbname = this.port.nativeElement.value;

    if(dbname == ""){
      let snackBarRef = this.snackBar.open("Please enter a name for the database", "Dismiss", { duration: 3000 });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      let text = reader.result;
      console.log("porting data:");
      this.jsonData = this.portCSV.convertToJSON(text); //converts file to JSON Object
      //console.log(jsonData);
      
      var headings = [];

      var columnsIn = this.jsonData[0];
      for(var key in columnsIn){
        // console.log(key);
        headings.push(key);
      } 
      
      for(var i =0; i<this.jsonData.length; i++){
        var columnsIn = this.jsonData[i];
        for(var key in columnsIn){
          console.log(this.jsonData[i][key]);
        } 
      }

      // Print to screen somehow...

      this.service.porting(dbname, this.jsonData).subscribe((response:any) => {
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

  public getCSV(){

    let data = "";
    let dbname = this.rPort.nativeElement.value;
    // console.log(dbname);

    this.service.reversePorting(dbname).subscribe((response:any) => {
        this.loading = false;
        if(response.success == true && response.code == 200) {
          data = response.data.docs;
          let CSVdata = this.portCSV.extractDatabase(data, dbname);
          
          //Save data in csv file and show download dialog
          var blob = new Blob([CSVdata], {type: 'application/csv;charset=utf-8'});
          var downloadLink = document.createElement('a');
          downloadLink.setAttribute('download', dbname+".csv" );
          downloadLink.setAttribute('href', window.URL.createObjectURL(blob) );
          var event = new MouseEvent("click");
          downloadLink.dispatchEvent(event);

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
    
  }


  public viewDatabase() {

    this.service.retrieveDatabase(this.selectedDatabase).subscribe((response: any) => {
      if (response.success == true && response.code == 200) {
        

        Object.keys(response.data.docs[0]).forEach((column) => {

          let obj = {
            'name': column
          }
          this.columns.push(obj);

        });

        this.displayedColumns= this.columns.map(column => column.name);

        var databaseDetails = this.databases.find(database => {
          return database.name == this.selectedDatabase;
        });

        if(databaseDetails && databaseDetails.privileges.indexOf('create') != -1) {
          this.databasePrivileges.create = true;
        }
        if(databaseDetails && databaseDetails.privileges.indexOf('retrieve') != -1) {
          this.databasePrivileges.retrieve = true;
        }
        if(databaseDetails && databaseDetails.privileges.indexOf('update') != -1) {
          this.databasePrivileges.update = true;
          this.displayedColumns.push("Update");
        }
        if(databaseDetails && databaseDetails.privileges.indexOf('delete') != -1) {
          this.databasePrivileges.delete = true;
          this.displayedColumns.push("Remove");
        }

        this.dataSource = new MatTableDataSource(response.data.docs);
        // this.dataSource.paginator = this.paginator;
  
      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Sorry there was an error loading the data", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.ngOnInit();
          }
        })
      }
    });

  }
  
  

}

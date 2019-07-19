/**
 * File Name: organization-view-samples.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization\organization-view-samples\organization-view-samples.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Friday, July 19th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewEncapsulation } from '@angular/core';
//Include Material Components
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpService } from 'src/app/_services/http.service';
import { ErrorComponent } from 'src/app/_errors/error-component/error.component';

@Component({
  selector: 'app-organization-view-samples',
  templateUrl: './organization-view-samples.component.html',
  styleUrls: ['./organization-view-samples.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class OrganizationViewSamplesComponent implements OnInit {

  displayedColumns: string[];
  dataSource = new MatTableDataSource([]);
  fields: any[] = [];

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */   
  private toggle_status : boolean = false;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of OrganizationViewSamplesComponent.
   * 
   * @memberof OrganizationViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private service: HttpService, private dialog: MatDialog) { }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                           TOGGLE_NOTIFICATIONS_TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof OrganizationViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab(){
    this.toggle_status = !this.toggle_status; 
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    NG_ON_INIT()  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  ngOnInit() {
    this.viewSamples();
  }

  viewSamples() {
    this.service.retrieveAllSamples().subscribe((response: any) => {
      if (response.success == true && response.code == 200) {

        console.log("---- RESPONSE: " + JSON.stringify(response));
        
        Object.keys(response.data.samples[0]).forEach((column) => {

          let obj = {
            'name': column
          }
          this.fields.push(obj);

        });

        this.displayedColumns= this.fields.map(field => field.name);
        this.dataSource = new MatTableDataSource(response.data.samples);
        
      } else if (response.success == false) {
        //POPUP MESSAGE
        let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: "Error Getting Samples", message: response.message, retry: true } });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "Retry") {
            this.viewSamples();
          }
        })
      }
    });
  }

}

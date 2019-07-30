/**
 * File Name: member-view-samples.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization-Member\member-view-samples\member-view-samples.component.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Sunday, July 28th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Component, OnInit, ViewEncapsulation } from '@angular/core';
//Include Material Components
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ErrorComponent } from 'src/app/_errors/error-component/error.component';
import { Router } from '@angular/router';
import { DiagnosticClinicAPIService } from 'src/app/_services/diagnostic-clinic-api.service';

@Component({
  selector: 'app-member-view-samples',
  templateUrl: './member-view-samples.component.html',
  styleUrls: ['./member-view-samples.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemberViewSamplesComponent implements OnInit {

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
   * Creates an instance of MemberViewSamplesComponent.
   * 
   * @memberof MemberViewSamplesComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService, 
    private clinicService: DiagnosticClinicAPIService,
    private dialog: MatDialog, 
    private router: Router
    ) { }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                           TOGGLE_NOTIFICATIONS_TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof MemberViewSamplesComponent
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

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  viewSamples() {
    this.clinicService.retrieveMemberSamples().subscribe((response: any) => {
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

/**
 * File Name: notification.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services\notification.service.ts
 * Project Name: fabi-web
 * Created Date: Friday, June 21st 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, July 18th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ErrorComponent } from '../_errors/error-component/error.component';
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class NotificationService {

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private toastr: ToastrService) {}

  showToastNotification(message: string) {
    console.log("------------------- NOTIFICATION ------------------");
    console.log("------------------- " + message + " ------------------");

    
      // return this.toastr.success(message, 'Oops');

      // this.snackBar.open(message, "Dismiss", {
      //   duration: 1000
      // });
  }

  showDialogNotification(message) {
    // let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: error.error.title, status: error.status, type: error.name, error: error.message } });
    //   dialogRef.afterClosed().subscribe((result) => {
    //     if (result == "Retry") {
    //     }
    //   })
  }

}
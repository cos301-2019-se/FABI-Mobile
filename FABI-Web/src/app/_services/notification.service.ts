/**
 * File Name: notification.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services\notification.service.ts
 * Project Name: fabi-web
 * Created Date: Friday, June 21st 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Monday, October 7th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as core from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@core.Injectable()

export class NotificationService {

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private toastr: ToastrService) { }

  showErrorNotification(title: string, message?: string) {
    this.toastr.error(message, title);
  }

  showWarningNotification(title: string, message?: string) {
    this.toastr.warning(message, title);
  }

  showSuccessNotification(title: string, message?: string) {
    this.toastr.success(message, title);
  }

  showDialogNotification(message) {
    // let dialogRef = this.dialog.open(ErrorComponent, { data: { error_title: error.error.title, status: error.status, type: error.name, error: error.message } });
    //   dialogRef.afterClosed().subscribe((result) => {
    //     if (result == "Retry") {
    //     }
    //   })
  }

}
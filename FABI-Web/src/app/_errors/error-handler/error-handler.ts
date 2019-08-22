/**
 * File Name: error-handler.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services\error-handler.ts
 * Project Name: fabi-web
 * Created Date: Friday, June 21st 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 1st 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { NotificationService } from '../../_services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/_services/authentication.service';

// import * as StackTraceParser from 'error-stack-parser';


@Injectable()
export class ErrorsHandler implements ErrorHandler {
    
  constructor(
    private injector: Injector, 
    private authService: AuthenticationService,
    ) {}

  handleError(error: Error | HttpErrorResponse) {

    console.log("------------------- ERROR HANDLER ------------------");

    const notificationService = this.injector.get(NotificationService);
    const router = this.injector.get(Router);
    
    if (error instanceof HttpErrorResponse) {
      // Server error happened      
      if (!navigator.onLine) {
        // No Internet connection
        this.authService.logoutUser();
        router.navigate(['/login']);
        notificationService.showErrorNotification('No Internet Connection','Please Check Your Internet Connection');
      }

      console.log("------------------- ERROR HANDLER 1 ------------------");
      console.log("------------ ERROR: " + error);
      // Http Error
      notificationService.showErrorNotification(`${error.error.code} ${error.error.title}`, `${error.error.message} - ${error.message}`);
      
    } else {
      console.log("------------------- ERROR HANDLER 2 ------------------");
      console.log("------ ERROR: " + error);

      // Client Error Happend      
      notificationService.showErrorNotification(error.name, error.message);
      
    }
    // Log the error anyway
    console.error(error);
  }
}

/**
 * File Name: error-handler.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services\error-handler.ts
 * Project Name: fabi-web
 * Created Date: Friday, June 21st 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, August 22nd 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

import * as core from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../../_services/notification.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

/**
 *  This class is responsible for `handling all client-side and server-side Errors` in the system
 *
 * @export
 * @class ErrorsHandler
 * @implements {core.ErrorHandler}
 */
@core.Injectable()
export class ErrorsHandler implements core.ErrorHandler {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR 
  /**
   * Creates an instance of ErrorsHandler.
   * @param {core.Injector} injector 
   * @param {AuthenticationService} authService used to call the *authentication* service
   * @memberof ErrorsHandler
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private injector: core.Injector,
    private authService: AuthenticationService,
  ) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        HANDLE ERROR FUNCTION
  /**
   * This function handles all system errors
   * 
   * @description The function identifies whether it is a `client-side` or `server-side` error and handles it accordingly. 
   *  The function calls the notify service to notify the client. 
   *
   * @param {(Error | HttpErrorResponse)} error
   * @memberof ErrorsHandler
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        notificationService.showErrorNotification('No Internet Connection', 'Please Check Your Internet Connection');
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

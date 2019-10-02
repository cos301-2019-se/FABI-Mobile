/*
 * File Name: server-error-interceptor
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\errors\server-error-interceptor
 * Project Name: fabi-web
 * Created Date: Friday, June 21st 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Friday, June 21st 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as core from "@angular/core";
import * as Http from "@angular/common/http";
import { catchError, retry } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject, of, from } from "rxjs";
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/_services/notification.service';

@core.Injectable()
export class ServerErrorInterceptor implements Http.HttpInterceptor {

  constructor(
    private authService: AuthenticationService, 
    private router: Router,
    private notificationServie: NotificationService
  ) { }

  private AUTH_HEADER = "Authorization";
  private session = this.authService.getCurrentSessionValue;
  // private refreshTokenInProgress = false;
  // private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(request: Http.HttpRequest<any>, next: Http.HttpHandler): Observable<Http.HttpEvent<any>> {

    console.log("------------------- INTERCEPTOR ------------------");

    request = this.addJWTToken(request);

    return next.handle(request).pipe(
      // retry(1),
      catchError((error: Http.HttpErrorResponse) => {
        if (error && error.status === 401) {
          
          if(this.authService.isLoggedIn == true) {
            // refresh token
            // Prefill User's Email in login form
            this.authService.logoutUser();
            this.router.navigate(['/login']);
          } else {
            this.notificationServie.showWarningNotifiction("Invalid Login Details", error.error.message);
          }
          
          console.log("Server Error: " + error);
          return throwError(error);

        } else if(error && error.status === 403) {
          this.authService.logoutUser();
          this.router.navigate(['/login']);
          // this.notificationServie.showErrorNotification("Forbidden", "");
        } else if(error && error.status === 404) {
          this.notificationServie.showWarningNotifiction(error.error.title, error.error.message);
        } else {
          console.log("Server Error: " + error.message);
          return throwError(error);
        }
      })
    );
  }

  private addJWTToken(request: Http.HttpRequest<any>): Http.HttpRequest<any> {  
    if(this.session && this.session != null && this.session != '') {
      let token = this.session.token;

      if (token && token != null && token != '') {
        return request.clone({
          headers: request.headers.set(
            this.AUTH_HEADER, `Bearer ${token}`
          )
        });
      }
    }else {
      return request;
    }  
  }
}
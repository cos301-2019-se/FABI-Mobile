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

@core.Injectable()
export class ServerErrorInterceptor implements Http.HttpInterceptor {

  private AUTH_HEADER = "Authorization";
  private token = localStorage.getItem('token');
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }


  intercept(request: Http.HttpRequest<any>, next: Http.HttpHandler): Observable<Http.HttpEvent<any>> {

    console.log("------------------- INTERCEPTOR ------------------");

    return next.handle(request).pipe(
      retry(2),
      catchError((error: Http.HttpErrorResponse) => {
        if (error && error.status === 401) {
          // refresh token
          return throwError(error);
        } else {
          return throwError(error);
        }
      })
    );
  }
}
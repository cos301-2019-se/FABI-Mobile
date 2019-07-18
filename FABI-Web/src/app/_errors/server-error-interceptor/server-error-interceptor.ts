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
import { HttpService } from 'src/app/_services/http.service';
import { HttpRequest } from '@angular/common/http';

@core.Injectable()
export class ServerErrorInterceptor implements Http.HttpInterceptor {

  constructor(private service: HttpService) { }

  private AUTH_HEADER = "Authorization";
  private token = this.service.currentSessionValue;
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(request: Http.HttpRequest<any>, next: Http.HttpHandler): Observable<Http.HttpEvent<any>> {

    console.log("------------------- INTERCEPTOR ------------------");

    request = this.addAuthenticationToken(request);

    return next.handle(request).pipe(
      retry(2),
      catchError((error: Http.HttpErrorResponse) => {
        if (error && error.status === 401) {
          // refresh token
          console.log("Server Error: " + error);
          return throwError(error);
        } else {
          console.log("Server Error: " + error.message);
          return throwError(error);
        }
      })
    );
  }

  private addAuthenticationToken(request: Http.HttpRequest<any>): Http.HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    if (!this.token) {
      return request;
    }
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, "Bearer " + this.token)
    });
  }
}
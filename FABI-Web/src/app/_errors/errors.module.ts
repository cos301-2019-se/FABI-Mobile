/**
 * File Name: errors.module.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\errors\errors.module.ts
 * Project Name: fabi-web
 * Created Date: Friday, June 21st 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, July 24th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../materials';

import { ErrorsHandler } from './error-handler/error-handler';
import { ServerErrorInterceptor } from './server-error-interceptor/server-error-interceptor'; 


// import { ErrorRoutingModule } from './error-routing/error-routing.module';

import { ErrorComponent } from './error-component/error.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
    // ErrorRoutingModule,
  ],
  entryComponents: [ErrorComponent],
  declarations: [
    ErrorComponent
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    }
  ]
})
export class ErrorsModule { }
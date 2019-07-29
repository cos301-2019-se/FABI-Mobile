/**
 * File Name: errors-routing.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\_errors\errors-routing.ts
 * Project Name: fabi-web
 * Created Date: Wednesday, July 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, July 24th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthenticationGuard } from '../_guards/authentication.guard';
import { LoginComponent } from '../login/login.component';



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }



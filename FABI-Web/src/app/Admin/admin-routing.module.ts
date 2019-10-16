/**
 * File Name: admin-routing.module.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\admin-routing.module.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Wednesday, October 16th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as core from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthenticationGuard } from '../_guards/authentication.guard';
import { Role } from '../_interfaces/role';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from "./admin-profile/admin-profile.component";
import { ClinicHandlerComponent } from './clinic-handler/clinic-handler.component';
import { DatabaseHandlerComponent } from './database-handler/database-handler.component';
import { OrganizationHandlerComponent } from './organization-handler/organization-handler.component';
import { ReportingComponent } from './reporting/reporting.component';
import { StaffHandlerComponent } from './staff-handler/staff-handler.component';
import { ViewFormsComponent } from './view-forms/view-forms.component';




const routes: Routes = [
  { 
    path: '',   
    redirectTo: '/admin-dashboard', 
    pathMatch: 'full' 
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [Role.ClinicAdmin, Role.SuperUser] }
  },
  {
    path: 'staff-handler',
    component: StaffHandlerComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [Role.SuperUser] }
  },
  {
    path: 'organization-handler',
    component: OrganizationHandlerComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [Role.SuperUser] }
  },
  {
    path: 'clinic-handler',
    component: ClinicHandlerComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [Role.SuperUser, Role.ClinicAdmin] }
  },
  {
    path: 'database-handler',
    component: DatabaseHandlerComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [Role.SuperUser] }
  },
  {
    path: 'admin-profile',
    component: AdminProfileComponent,
    data: { roles: [Role.SuperUser, Role.ClinicAdmin] }
  },
  {
    path: 'reporting',
    component: ReportingComponent,
    data: { roles: [Role.SuperUser] }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'view-forms',
    component: ViewFormsComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@core.NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

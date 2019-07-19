/**
 * File Name: admin-routing.module.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\admin-routing.module.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Friday, July 19th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StaffHandlerComponent } from './staff-handler/staff-handler.component';
import { OrganizationHandlerComponent } from './organization-handler/organization-handler.component';
import { ClinicHandlerComponent } from './clinic-handler/clinic-handler.component';
import { DatabaseHandlerComponent } from './database-handler/database-handler.component';
import { AdminProfileComponent } from "./admin-profile/admin-profile.component";

import { AuthenticationGuard } from '../_guards/authentication.guard';
import { Role } from '../_interfaces/role';
import { ReportingComponent } from './reporting/reporting.component';


const routes: Routes = [
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.ClinicAdmin, Role.SuperUser] }
  },
  {
    path: 'staff-handler', 
    component: StaffHandlerComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.SuperUser]}
  },
  {
    path: 'organization-handler',
    component: OrganizationHandlerComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.SuperUser]}
  },
  {
    path: 'clinic-handler', 
    component: ClinicHandlerComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.ClinicAdmin, Role.SuperUser] }
  },
  {
    path: 'database-handler', 
    component: DatabaseHandlerComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.SuperUser, Role.ClinicAdmin, Role.Staff]}
  },
  {
    path: 'admin-profile', 
    component: AdminProfileComponent
  },
  {
    path: 'reporting', 
    component: ReportingComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

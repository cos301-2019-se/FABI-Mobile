/**
 * File Name: admin-routing.module.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Admin\admin-routing.module.ts
 * Project Name: fabi-web
 * Created Date: Friday, May 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, June 25th 2019
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


const routes: Routes = [
  {path: 'admin-dashboard', component: AdminDashboardComponent},
  {path: 'staff-handler', component: StaffHandlerComponent},
  {path: 'organization-handler', component: OrganizationHandlerComponent},
  {path: 'clinic-handler', component: ClinicHandlerComponent},
  {path: 'database-handler', component: DatabaseHandlerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

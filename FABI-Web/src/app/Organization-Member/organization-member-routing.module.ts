/**
 * File Name: organization-member-routing.module.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization-Member\organization-member-routing.module.ts
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
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MemberViewSamplesComponent } from './member-view-samples/member-view-samples.component';
import { SampleFormComponent } from '../sample-form/sample-form.component';
import { AuthenticationGuard } from '../_guards/authentication.guard';
import { Role } from '../_interfaces/role';


const routes: Routes = [
  {
    path: 'member-dashboard', 
    component: MemberDashboardComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Member] }
  },
  {
    path: 'member-profile', 
    component: MemberProfileComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Member] }
  },
  {
    path: 'member-view-samples', 
    component: MemberViewSamplesComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Member] }
  },
  {
    path: 'submit-sample', 
    component: SampleFormComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Member] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationMemberRoutingModule { }

/**
 * File Name: organization-routing.module.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization\organization-routing.module.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, July 18th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationDashboardComponent } from './organization-dashboard/organization-dashboard.component';
// import { MemberHandlerComponent } from './member-handler/member-handler.component';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import { OrganizationViewSamplesComponent } from './organization-view-samples/organization-view-samples.component';
import { SampleFormComponent } from '../sample-form/sample-form.component';
import { MemberHandlerComponent } from "./member-handler/member-handler.component";

const routes: Routes = [
  {path: 'organization-dashboard', component: OrganizationDashboardComponent},
  {path: 'member-handler', component: MemberHandlerComponent},
  {path: 'organization-profile', component: OrganizationProfileComponent},
  {path: 'organization-view-samples', component: OrganizationViewSamplesComponent},
  {path: 'submit-sample', component: SampleFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }

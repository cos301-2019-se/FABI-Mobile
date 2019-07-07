/**
 * File Name: organization-member-routing.module.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization-Member\organization-member-routing.module.ts
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
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MemberViewSamplesComponent } from './member-view-samples/member-view-samples.component';
import { MemberSubmitSampleComponent } from './member-submit-sample/member-submit-sample.component';


const routes: Routes = [
  {path: 'member-dashboard', component: MemberDashboardComponent},
  {path: 'member-profile', component: MemberProfileComponent},
  {path: 'member-view-samples', component: MemberViewSamplesComponent},
  {path: 'member-submit-sample', component: MemberSubmitSampleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationMemberRoutingModule { }

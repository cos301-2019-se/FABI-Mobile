import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';

import { StaffSubmitSampleComponent } from './staff-submit-sample/staff-submit-sample.component';
import { CmwMenuComponent } from './cmw-menu/cmw-menu.component';

import { SubmitCmwRequestComponent } from './submit-cmw-request/submit-cmw-request.component';
import { SubmitCmwDepositComponent } from './submit-cmw-deposit/submit-cmw-deposit.component';
import { SubmitCmwRevitalizationComponent } from './submit-cmw-revitalization/submit-cmw-revitalization.component';
import { Role } from '../_interfaces/role';
import { AuthenticationGuard } from '../_guards/authentication.guard';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { LoginComponent } from '../login/login.component';
import { StaffViewDatabasesComponent } from "./staff-view-databases/staff-view-databases.component";
import { StaffViewSamplesComponent } from "./staff-view-samples/staff-view-samples.component";
import { StaffHelpComponent } from "./staff-help/staff-help.component";
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'staff-dashboard', 
    component: StaffDashboardComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Staff] }
  },
  {
    path: 'staff-profile', 
    component: StaffProfileComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Staff] }
  },
  {
    path: 'staff-submit-sample', 
    component: StaffSubmitSampleComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Staff] }
  },
  {
    path: 'cmw-menu', 
    component: CmwMenuComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Staff] }
  },
  {
    path: 'submit-cmw-request', 
    component: SubmitCmwRequestComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Staff] }
  },
  {
    path: 'submit-cmw-deposit', 
    component: SubmitCmwDepositComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Staff] }
  },
  {
    path: 'submit-cmw-revitalization', 
    component: SubmitCmwRevitalizationComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Staff] }
  },
  {
    path: 'staff-view-databases', 
    component: StaffViewDatabasesComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Staff] }
  },
  {
    path: 'staff-view-samples', 
    component: StaffViewSamplesComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Staff] }
  },
  {
    path: 'staff-help', 
    component: StaffHelpComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Staff] }
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  { 
    path:"**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';

import { SampleFormComponent } from '../sample-form/sample-form.component';

import { SubmitCbsRequestComponent } from './submit-cbs-request/submit-cbs-request.component';
import { SubmitCbsDepositComponent } from './submit-cbs-deposit/submit-cbs-deposit.component';

import { SubmitCmwRequestComponent } from './submit-cmw-request/submit-cmw-request.component';
import { SubmitCmwDepositComponent } from './submit-cmw-deposit/submit-cmw-deposit.component';
import { SubmitCmwRevitalizationComponent } from './submit-cmw-revitalization/submit-cmw-revitalization.component';
import { Role } from '../_interfaces/role';
import { AuthenticationGuard } from '../_guards/authentication.guard';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';

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
    path: 'submit-sample', 
    component: SampleFormComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Staff] }
  },
  {
    path: 'submit-cbs-request', 
    component: SubmitCbsRequestComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Staff] }
  },
  {
    path: 'submit-cbs-deposit', 
    component: SubmitCbsDepositComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }

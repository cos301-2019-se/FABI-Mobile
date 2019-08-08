import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AdminDashboardComponent } from "./Admin/admin-dashboard/admin-dashboard.component";
import { OrganizationDashboardComponent } from "./Organization/organization-dashboard/organization-dashboard.component";
import { StaffDashboardComponent } from "./Staff/staff-dashboard/staff-dashboard.component";
import { MemberDashboardComponent } from "./Organization-Member/member-dashboard/member-dashboard.component";

import { Role } from "./_interfaces/role";
import { AuthenticationGuard } from './_guards/authentication.guard';
import { UpdateComponent } from './update/update.component';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { ReportingComponent } from './Admin/reporting/reporting.component';
import { SubmitCmwRequestComponent } from './Staff/submit-cmw-request/submit-cmw-request.component';
import { SubmitCmwDepositComponent } from './Staff/submit-cmw-deposit/submit-cmw-deposit.component';
import { SubmitCmwRevitalizationComponent } from './Staff/submit-cmw-revitalization/submit-cmw-revitalization.component';

const routes: Routes = [
  {
    path: 'home', 
    component: HomeComponent
  },
  { 
    path: '',   
    redirectTo: '/home', 
    pathMatch: 'full' 
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'admin-dashboard', 
    component: AdminDashboardComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [Role.SuperUser, Role.ClinicAdmin] }
  },
  {
    path: 'organization-dashboard',
    component: OrganizationDashboardComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [Role.OrganizationAdmin] }
  },
  {
    path: 'staff-dashboard',
    component: StaffDashboardComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [Role.Staff] }
  },
  {
    path: 'member-dashboard', 
    component: MemberDashboardComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [Role.Member] }
  },
  {
    path: 'update',
    component: UpdateComponent,
  },
  {
    path: 'submit-sample', 
    component: SampleFormComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Member] }
  },
  {
    path: 'reporting',
    component: ReportingComponent
  },
  {
    path: 'submit-cmw-request',
    component: SubmitCmwRequestComponent
  },
  {
    path: 'submit-cmw-deposit',
    component: SubmitCmwDepositComponent
  },
  {
    path: 'submit-cmw-revitalization',
    component: SubmitCmwRevitalizationComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

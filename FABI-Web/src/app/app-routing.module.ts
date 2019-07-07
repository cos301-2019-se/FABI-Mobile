import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./login/login.component";
// import { SampleFormComponent } from './sample-form/sample-form.component';
import { AdminDashboardComponent } from "./Admin/admin-dashboard/admin-dashboard.component";
import { OrganizationDashboardComponent } from "./Organization/organization-dashboard/organization-dashboard.component";
import { StaffDashboardComponent } from "./Staff/staff-dashboard/staff-dashboard.component";
import { MemberDashboardComponent } from "./Organization-Member/member-dashboard/member-dashboard.component";



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  // {path: 'sample-form', component: SampleFormComponent},
  {path: '', component: LoginComponent},
  {path: 'fabi-admin-dashboard', component: AdminDashboardComponent},
  {path: 'org-admin-dashboard', component: OrganizationDashboardComponent},
  {path: 'fabi-staff-dashboard', component: StaffDashboardComponent},
  {path: 'org-member-dashboard', component: MemberDashboardComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

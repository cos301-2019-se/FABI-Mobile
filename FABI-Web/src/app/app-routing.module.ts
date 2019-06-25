import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AdminDashboardComponent } from "./Admin/admin-dashboard/admin-dashboard.component";
import { OrganizationDashboardComponent } from "./Organization/organization-dashboard/organization-dashboard.component";
import { StaffDashboardComponent } from "./Staff/staff-dashboard/staff-dashboard.component";
import { MemberDashboardComponent } from "./Organization-Member/member-dashboard/member-dashboard.component";

import { StaffHandlerComponent } from './Admin/staff-handler/staff-handler.component';
import { OrganizationHandlerComponent } from './Admin/organization-handler/organization-handler.component';
import { ClinicHandlerComponent } from './Admin/clinic-handler/clinic-handler.component';
import { DatabaseHandlerComponent } from './Admin/database-handler/database-handler.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent}
  // {path: 'fabi-admin-dashboard', component: AdminDashboardComponent},
  // {path: 'org-admin-dashboard', component: OrganizationDashboardComponent},
  // {path: 'fabi-staff-dashboard', component: StaffDashboardComponent},
  // {path: 'org-member-dashboard', component: MemberDashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

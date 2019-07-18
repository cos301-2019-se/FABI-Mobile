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
    data: { roles: [Role.Organisation] }
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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
import { ClinicHandlerComponent } from './Admin/clinic-handler/clinic-handler.component';
import { PreDiagnosisComponent } from './pre-diagnosis/pre-diagnosis.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminProfileComponent } from './Admin/admin-profile/admin-profile.component';
import { DatabaseHandlerComponent } from './Admin/database-handler/database-handler.component';
import { StaffHandlerComponent } from './Admin/staff-handler/staff-handler.component';
import { OrganizationHandlerComponent } from './Admin/organization-handler/organization-handler.component';
import { ViewFormsComponent } from './Admin/view-forms/view-forms.component';
import { MemberHandlerComponent } from './Organization/member-handler/member-handler.component';
import { OrganizationProfileComponent } from './Organization/organization-profile/organization-profile.component';
import { OrganizationViewSamplesComponent } from './Organization/organization-view-samples/organization-view-samples.component';
import { MemberProfileComponent } from './Organization-Member/member-profile/member-profile.component';
import { MemberViewSamplesComponent } from './Organization-Member/member-view-samples/member-view-samples.component';
import { StaffViewDatabasesComponent } from './Staff/staff-view-databases/staff-view-databases.component';
import { StaffViewSamplesComponent } from './Staff/staff-view-samples/staff-view-samples.component';
import { StaffHelpComponent } from './Staff/staff-help/staff-help.component';
import { CmwMenuComponent } from './Staff/cmw-menu/cmw-menu.component';
import { StaffSubmitSampleComponent } from './Staff/staff-submit-sample/staff-submit-sample.component';
import { StaffProfileComponent } from './Staff/staff-profile/staff-profile.component';

const routes: Routes = [

  // HOME ROUTES
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
    path: 'update',
    component: UpdateComponent,
  },
  {
    path: 'submit-sample', 
    component: SampleFormComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Member, Role.Staff, Role.OrganizationAdmin] }
  },
  {
    path: 'pre-diagnosis',
    component: PreDiagnosisComponent
  },
  // { 
  //   path: "**",
  //   component: PageNotFoundComponent
  // },

  // ADMIN ROUTES
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.ClinicAdmin, Role.SuperUser] }
  },
  {
    path: 'staff-handler', 
    component: StaffHandlerComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.SuperUser]}
  },
  {
    path: 'organization-handler',
    component: OrganizationHandlerComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.SuperUser]}
  },
  {
    path: 'clinic-handler', 
    component: ClinicHandlerComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.SuperUser, Role.ClinicAdmin] }
  },
  {
    path: 'database-handler', 
    component: DatabaseHandlerComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.SuperUser]}
  },
  {
    path: 'admin-profile', 
    component: AdminProfileComponent,
    data: {roles: [Role.SuperUser, Role.ClinicAdmin]}
  },
  {
    path: 'reporting', 
    component: ReportingComponent,
    data: {roles: [Role.SuperUser]}
  },
  {
    path: 'view-forms',
    component: ViewFormsComponent
  },

  // ORGANIZATION ADMIN ROUTES
  {
    path: 'organization-dashboard', 
    component: OrganizationDashboardComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.OrganizationAdmin] }
  },
  {
    path: 'member-handler', 
    component: MemberHandlerComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.OrganizationAdmin] }
  },
  {
    path: 'organization-profile', 
    component: OrganizationProfileComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.OrganizationAdmin] }
  },
  {
    path: 'organization-view-samples', 
    component: OrganizationViewSamplesComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.OrganizationAdmin] }
  },

  // ORGANIZATION MEMBER ROUTES
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

  // STAFF ROUTES
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

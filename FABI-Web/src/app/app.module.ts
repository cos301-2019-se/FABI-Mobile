import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule} from './materials';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { ErrorComponent } from './error/error.component';

import {ReactiveFormsModule} from '@angular/forms';
import { AdminModule } from './Admin/admin.module';
import { StaffModule } from './Staff/staff.module';
import { OrganizationModule } from './Organization/organization.module';
import { OrganizationMemberModule } from './Organization-Member/organization-member.module';
import { DatabaseHandlerComponent } from './admin/database-handler/database-handler.component';
import { ClinicHandlerComponent } from './admin/clinic-handler/clinic-handler.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { StaffHandlerComponent } from './admin/staff-handler/staff-handler.component';
import { OrganizationHandlerComponent } from './admin/organization-handler/organization-handler.component';
import { MemberHandlerComponent } from './organization/member-handler/member-handler.component';
import { OrganizationDashboardComponent } from './organization/organization-dashboard/organization-dashboard.component';
import { OrganizationProfileComponent } from './organization/organization-profile/organization-profile.component';
import { OrganizationSubmitSampleComponent } from './organization/organization-submit-sample/organization-submit-sample.component';
import { OrganizationViewSamplesComponent } from './organization/organization-view-samples/organization-view-samples.component';
import { MemberDashboardComponent } from './organization-member/member-dashboard/member-dashboard.component';
import { MemberProfileComponent } from './organization-member/member-profile/member-profile.component';
import { MemberSubmitSampleComponent } from './organization-member/member-submit-sample/member-submit-sample.component';
import { MemberViewSamplesComponent } from './organization-member/member-view-samples/member-view-samples.component';
import { SplashComponent } from './splash/splash.component';
import { StaffDashboardComponent } from './staff/staff-dashboard/staff-dashboard.component';
import { StaffSubmitSampleComponent } from './staff/staff-submit-sample/staff-submit-sample.component';
import { SubmitCbsRequestComponent } from './staff/submit-cbs-request/submit-cbs-request.component';
import { SubmitCbsDepositComponent } from './staff/submit-cbs-deposit/submit-cbs-deposit.component';
import { SubmitCmwRequestComponent } from './staff/submit-cmw-request/submit-cmw-request.component';
import { SubmitCmwDepositComponent } from './staff/submit-cmw-deposit/submit-cmw-deposit.component';
import { SubmitCmwRevitalizationComponent } from './staff/submit-cmw-revitalization/submit-cmw-revitalization.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SampleFormComponent,
    ErrorComponent,
    DatabaseHandlerComponent,
    ClinicHandlerComponent,
    AdminDashboardComponent,
    StaffHandlerComponent,
    OrganizationHandlerComponent,
    MemberHandlerComponent,
    OrganizationDashboardComponent,
    OrganizationProfileComponent,
    OrganizationSubmitSampleComponent,
    OrganizationViewSamplesComponent,
    MemberDashboardComponent,
    MemberProfileComponent,
    MemberSubmitSampleComponent,
    MemberViewSamplesComponent,
    SplashComponent,
    StaffDashboardComponent,
    StaffSubmitSampleComponent,
    SubmitCbsRequestComponent,
    SubmitCbsDepositComponent,
    SubmitCmwRequestComponent,
    SubmitCmwDepositComponent,
    SubmitCmwRevitalizationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    NoopAnimationsModule,
    AdminModule,
    StaffModule,
    OrganizationModule,
    OrganizationMemberModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

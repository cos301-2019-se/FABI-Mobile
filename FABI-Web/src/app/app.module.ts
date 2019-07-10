import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule} from './materials';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SampleFormComponent } from './sample-form/sample-form.component';

import {ReactiveFormsModule} from '@angular/forms';

import { AdminModule } from './Admin/admin.module';
import { StaffModule } from './Staff/staff.module';

import { ErrorsModule } from "./errors/errors.module";
import { NotificationService } from './services/notification.service';

import { OrganizationModule } from './Organization/organization.module';
import { OrganizationMemberModule } from './Organization-Member/organization-member.module';
import { DatabaseHandlerComponent } from './Admin/database-handler/database-handler.component';
import { ClinicHandlerComponent } from './Admin/clinic-handler/clinic-handler.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { StaffHandlerComponent } from './Admin/staff-handler/staff-handler.component';
import { OrganizationHandlerComponent } from './Admin/organization-handler/organization-handler.component';
import { MemberHandlerComponent } from './Organization/member-handler/member-handler.component';
import { OrganizationDashboardComponent } from './Organization/organization-dashboard/organization-dashboard.component';
import { OrganizationProfileComponent } from './Organization/organization-profile/organization-profile.component';
import { OrganizationSubmitSampleComponent } from './Organization/organization-submit-sample/organization-submit-sample.component';
import { OrganizationViewSamplesComponent } from './Organization/organization-view-samples/organization-view-samples.component';
import { MemberDashboardComponent } from './Organization-Member/member-dashboard/member-dashboard.component';
import { MemberProfileComponent } from './Organization-Member/member-profile/member-profile.component';
import { MemberSubmitSampleComponent } from './Organization-Member/member-submit-sample/member-submit-sample.component';
import { MemberViewSamplesComponent } from './Organization-Member/member-view-samples/member-view-samples.component';
import { SplashComponent } from './splash/splash.component';
import { StaffDashboardComponent } from './Staff/staff-dashboard/staff-dashboard.component';
import { StaffSubmitSampleComponent } from './Staff/staff-submit-sample/staff-submit-sample.component';
import { SubmitCbsRequestComponent } from './Staff/submit-cbs-request/submit-cbs-request.component';
import { SubmitCbsDepositComponent } from './Staff/submit-cbs-deposit/submit-cbs-deposit.component';
import { SubmitCmwRequestComponent } from './Staff/submit-cmw-request/submit-cmw-request.component';
import { SubmitCmwDepositComponent } from './Staff/submit-cmw-deposit/submit-cmw-deposit.component';
import { SubmitCmwRevitalizationComponent } from './Staff/submit-cmw-revitalization/submit-cmw-revitalization.component';
import { ConfirmComponent } from './confirm/confirm.component';

import { ErrorComponent } from './errors/error-component/error.component';
import { HomeComponent } from './home/home.component';
import { AdminDivComponent } from './Dynamic-Components/admin-div/admin-div.component';
import { StaffDivComponent } from './Dynamic-Components/staff-div/staff-div.component';
import { UpdateComponent } from './update/update.component';
import { NotificationDivComponent } from './Dynamic-Components/notification-div/notification-div.component';
import { SampleDivComponent } from './Dynamic-Components/sample-div/sample-div.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SampleFormComponent,
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
    SubmitCmwRevitalizationComponent,
    ConfirmComponent,
    UpdateComponent,
    AdminDivComponent,
    StaffDivComponent,
    NotificationDivComponent,
    SampleDivComponent
  ],
  entryComponents: [
    ConfirmComponent,
    AdminDivComponent,
    StaffDivComponent,
    NotificationDivComponent,
    SampleDivComponent,
    ErrorComponent
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
    OrganizationMemberModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ErrorsModule,
    LayoutModule
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule { }

import * as core from "@agm/core";
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { config } from "../environments/environment.prod";
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { AdminHelpComponent } from './Admin/admin-help/admin-help.component';
import { AdminMenuComponent } from './Admin/admin-menu/admin-menu.component';
import { AdminNotificationComponent } from './Admin/admin-notification/admin-notification.component';
import { AdminProfileComponent } from './Admin/admin-profile/admin-profile.component';
import { AdminModule } from './Admin/admin.module';
import { ClinicAdminViewSamplesComponent } from './Admin/clinic-admin-view-samples/clinic-admin-view-samples.component';
import { ClinicHandlerComponent } from './Admin/clinic-handler/clinic-handler.component';
import { DatabaseHandlerComponent } from './Admin/database-handler/database-handler.component';
import { OrganizationHandlerComponent } from './Admin/organization-handler/organization-handler.component';
import { ReportingComponent } from './Admin/reporting/reporting.component';
import { StaffHandlerComponent } from './Admin/staff-handler/staff-handler.component';
import { ViewFormsComponent } from './Admin/view-forms/view-forms.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDivComponent } from './Dynamic-Components/admin-div/admin-div.component';
import { NotificationDivComponent } from './Dynamic-Components/notification-div/notification-div.component';
import { SampleDivComponent } from './Dynamic-Components/sample-div/sample-div.component';
import { StaffDivComponent } from './Dynamic-Components/staff-div/staff-div.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MapsWindowComponent } from './maps-window/maps-window.component';
import { MaterialModule } from './materials';
import { MemberDashboardComponent } from './Organization-Member/member-dashboard/member-dashboard.component';
import { MemberHelpComponent } from './Organization-Member/member-help/member-help.component';
import { MemberMenuComponent } from './Organization-Member/member-menu/member-menu.component';
import { MemberNotificationComponent } from './Organization-Member/member-notification/member-notification.component';
import { MemberProfileComponent } from './Organization-Member/member-profile/member-profile.component';
import { MemberSubmitSampleComponent } from './Organization-Member/member-submit-sample/member-submit-sample.component';
import { MemberViewSamplesComponent } from './Organization-Member/member-view-samples/member-view-samples.component';
import { OrganizationMemberModule } from './Organization-Member/organization-member.module';
import { MemberHandlerComponent } from './Organization/member-handler/member-handler.component';
import { OrganizationDashboardComponent } from './Organization/organization-dashboard/organization-dashboard.component';
import { OrganizationHelpComponent } from './Organization/organization-help/organization-help.component';
import { OrganizationMenuComponent } from './Organization/organization-menu/organization-menu.component';
import { OrganizationNotificationComponent } from './Organization/organization-notification/organization-notification.component';
import { OrganizationProfileComponent } from './Organization/organization-profile/organization-profile.component';
import { OrganizationSubmitSampleComponent } from './Organization/organization-submit-sample/organization-submit-sample.component';
import { OrganizationViewSamplesComponent } from './Organization/organization-view-samples/organization-view-samples.component';
import { OrganizationModule } from './Organization/organization.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PreDiagnosisComponent } from './pre-diagnosis/pre-diagnosis.component';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { CmwMenuComponent } from './Staff/cmw-menu/cmw-menu.component';
import { StaffDashboardComponent } from './Staff/staff-dashboard/staff-dashboard.component';
import { StaffHelpComponent } from './Staff/staff-help/staff-help.component';
import { StaffMenuComponent } from './Staff/staff-menu/staff-menu.component';
import { StaffNotificationComponent } from './Staff/staff-notification/staff-notification.component';
import { StaffProfileComponent } from './Staff/staff-profile/staff-profile.component';
import { StaffSubmitSampleComponent } from './Staff/staff-submit-sample/staff-submit-sample.component';
import { StaffViewDatabasesComponent } from './Staff/staff-view-databases/staff-view-databases.component';
import { StaffViewSamplesComponent } from './Staff/staff-view-samples/staff-view-samples.component';
import { StaffModule } from './Staff/staff.module';
import { SubmitCmwDepositComponent } from './Staff/submit-cmw-deposit/submit-cmw-deposit.component';
import { SubmitCmwRequestComponent } from './Staff/submit-cmw-request/submit-cmw-request.component';
import { SubmitCmwRevitalizationComponent } from './Staff/submit-cmw-revitalization/submit-cmw-revitalization.component';
import { ErrorComponent } from './_errors/error-component/error.component';
import { ErrorsModule } from "./_errors/errors.module";
import { LoadingComponent } from './_loading/loading.component';
import { FilterPipe } from './_pipes/filter.pipe';
import { NotificationService } from './_services/notification.service';
import { CookieService } from "ngx-cookie-service";
import { AgmCoreModule } from '@agm/core';

// import { DataTablesModule } from 'angular-datatables';

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
    StaffDashboardComponent,
    StaffSubmitSampleComponent,
    SubmitCmwRequestComponent,
    SubmitCmwDepositComponent,
    SubmitCmwRevitalizationComponent,
    LoadingComponent,
    AdminDivComponent,
    StaffDivComponent,
    NotificationDivComponent,
    SampleDivComponent,
    AdminProfileComponent,
    StaffProfileComponent,
    ViewFormsComponent,
    ReportingComponent,
    MapsWindowComponent,
    CmwMenuComponent,
    AdminNotificationComponent,
    StaffNotificationComponent,
    OrganizationNotificationComponent,
    MemberNotificationComponent,
    AdminHelpComponent,
    StaffHelpComponent,
    OrganizationHelpComponent,
    MemberHelpComponent,
    AdminMenuComponent,
    StaffMenuComponent,
    OrganizationMenuComponent,
    MemberMenuComponent,
    FilterPipe,
    ClinicAdminViewSamplesComponent,
    PreDiagnosisComponent,
    StaffViewDatabasesComponent,
    StaffViewSamplesComponent,
    PageNotFoundComponent
  ],
  entryComponents: [
    LoadingComponent,
    AdminDivComponent,
    StaffDivComponent,
    NotificationDivComponent,
    SampleDivComponent,
    ErrorComponent,
    MapsWindowComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
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
    // DataTablesModule,
    ErrorsModule,
    LayoutModule,
    MatAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: config.APIKEy,
      libraries: ["places"]
    })
  ],
  providers: [
    NotificationService,
    FilterPipe,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

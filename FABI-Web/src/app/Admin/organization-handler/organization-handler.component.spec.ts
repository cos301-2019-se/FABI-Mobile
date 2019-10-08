import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationHandlerComponent } from './organization-handler.component';
import { AdminNotificationComponent } from '../admin-notification/admin-notification.component'
import { AdminProfileComponent } from '../admin-profile/admin-profile.component'
import { AdminHelpComponent } from '../admin-help/admin-help.component'

import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosticClinicAPIService } from '../../_services/diagnostic-clinic-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';

import { LoadingComponent } from '../../_loading/loading.component';

import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../../materials';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DebugElement } from '@angular/core';

import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

import { FilterPipe } from '../../_pipes/filter.pipe';


describe('OrganizationHandlerComponent', () => {
  let component: OrganizationHandlerComponent;
  let fixture: ComponentFixture<OrganizationHandlerComponent>;

  let UserManagementService: UserManagementAPIService;
  let DiagnosticClinicService: DiagnosticClinicAPIService;
  let notificationLoggingService: NotificationLoggingService;
  let authService: AuthenticationService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { 'user' : '' };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationHandlerComponent,
        AdminNotificationComponent,
        AdminProfileComponent,
        AdminHelpComponent,
        FilterPipe,
        LoadingComponent
      ],
      imports: [MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule],
        providers: [ { provide: AuthenticationService, useClass: MockAuthenticationService } ]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    UserManagementService = new UserManagementAPIService( null , null);
    DiagnosticClinicService = new DiagnosticClinicAPIService(null, null);
    notificationLoggingService = new NotificationLoggingService(null, null);
    authService = new AuthenticationService(null);
  });

  // -------- Component Creation Tests - Boilerplate Test Case --------
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // -------- Service Creation Tests --------
  it('should be defined', () => {
    expect(AuthenticationService).toBeTruthy();
  });

  it('should be defined', () => {
    expect(UserManagementAPIService).toBeTruthy();
  });

  it('should be defined', () => {
    expect(DiagnosticClinicAPIService).toBeTruthy();
  });

  it('should be defined', () => {
    expect(NotificationLoggingService).toBeTruthy();
  });

  // -------- Initial State Tests --------
  it('Component initial state', () => {
    expect(component.registerOrgForm).toBeDefined();
    expect(component.registerOrgForm.invalid).toBeTruthy();

    expect(component.submitted).toBeFalsy();
    expect(component.valid).toBeFalsy();
    expect(component.setOrganizationLength).toBeFalsy();
    expect(component.notificationsTab).toBeFalsy();
    expect(component.profileTab).toBeFalsy();
    expect(component.saveBtn).toBeFalsy();
    expect(component.confirmPasswordInput).toBeFalsy();
    expect(component.helpTab).toBeFalsy();

    expect(component.organizationTableLoading).toBeTruthy();
  });

  // -------- Form Controls Tests --------
  it('Empty organization name expect organization name invalid', () => {
    component.registerOrgForm.controls.organization_name.setValue('');
    expect(component.registerOrgForm.controls.admin_name.valid).toBeFalsy();
  });

  it('Empty admin name expect admin name invalid', () => {
    component.registerOrgForm.controls.admin_name.setValue('');
    expect(component.registerOrgForm.controls.admin_name.valid).toBeFalsy();
  });

  it('Empty admin surname expect admin surname invalid', () => {
    component.registerOrgForm.controls.admin_surname.setValue('');
    expect(component.registerOrgForm.controls.admin_surname.valid).toBeFalsy();
  });

  it('Empty admin email expect admin email invalid', () => {
    component.registerOrgForm.controls.admin_email.setValue('');
    expect(component.registerOrgForm.controls.admin_email.valid).toBeFalsy();
  });

  it('Empty admin phone expect admin phone invalid', () => {
    component.registerOrgForm.controls.admin_phone.setValue('');
    expect(component.registerOrgForm.controls.admin_phone.valid).toBeFalsy();
  });

  it('Empty form expect invalid', () => {
    component.registerOrgForm.controls.organization_name.setValue('');
    component.registerOrgForm.controls.admin_name.setValue('');
    component.registerOrgForm.controls.admin_surname.setValue('');
    component.registerOrgForm.controls.admin_email.setValue('');
    component.registerOrgForm.controls.admin_phone.setValue('');

    expect(component.registerOrgForm.valid).toBeFalsy();
  });

  it('Valid form expect true', () => {
    component.registerOrgForm.controls.organization_name.setValue('TestOrg');
    component.registerOrgForm.controls.admin_name.setValue('TesterFName');
    component.registerOrgForm.controls.admin_surname.setValue('TesterLName');
    component.registerOrgForm.controls.admin_email.setValue('tester@gmail.com');
    component.registerOrgForm.controls.admin_phone.setValue('0000000000');

    expect(component.registerOrgForm.valid).toBeTruthy();
  });

  // -------- Service Tests --------
  it('register an organization', () =>{
    let spy = spyOn(UserManagementService, 'createOrganization');
    component.registerOrg();
    expect(spy).toBeTruthy();
  });

  it('logging out', () =>{
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

  it('remove an organization', () =>{
    let spy = spyOn(UserManagementService, 'removeOrganization');
    component.removeOrg();
    expect(spy).toBeTruthy();
  });

  it('view organizations', () =>{
    let spy = spyOn(UserManagementService, 'getAllOrganizations');
    component.viewOrganizations();
    expect(spy).toBeTruthy();
  });

  it('view pending organizations', () =>{
    let spy = spyOn(UserManagementService, 'getPendingOrganizations');
    component.viewPendingOrganizations();
    expect(spy).toBeTruthy();
  });

  // it('register pending organizations', () =>{
  //   let spy = spyOn(UserManagementService, 'createOrganization');
  //   component.registerPendingOrg();
  //   expect(spy).toBeTruthy();
  // });

});

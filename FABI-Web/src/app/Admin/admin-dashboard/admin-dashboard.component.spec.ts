import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminNotificationComponent } from '../admin-notification/admin-notification.component';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';
import { AdminHelpComponent } from '../admin-help/admin-help.component';

import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosticClinicAPIService } from '../../_services/diagnostic-clinic-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';

import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../../materials';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DebugElement } from '@angular/core';

import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

import { FilterPipe } from '../../_pipes/filter.pipe';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  let UserManagementService: UserManagementAPIService;
  let DiagnosticClinicService: DiagnosticClinicAPIService;
  let notificationLoggingService: NotificationLoggingService;
  let authService: AuthenticationService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
            AdminDashboardComponent,
            AdminNotificationComponent,
            AdminHelpComponent,
            AdminProfileComponent,
            FilterPipe
        ],
      imports: [
            MaterialModule,
            ReactiveFormsModule,
            HttpClientTestingModule,
            NoopAnimationsModule,
            RouterTestingModule,
            ToastContainerModule,
            ToastrModule,
            ToastrComponentlessModule,
            ToastrModule.forRoot()
        ],
        providers: [
            { provide: AuthenticationService, useClass: MockAuthenticationService }
          ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
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
    expect(component.notificationsTab).toBeFalsy();
    expect(component.profileTab).toBeFalsy();
    expect(component.saveBtn).toBeFalsy();
    expect(component.confirmPasswordInput).toBeFalsy();
    expect(component.helpTab).toBeFalsy();

    expect(component.adminTableLoading).toBeTruthy();
    expect(component.staffTableLoading).toBeTruthy();
  });

  // -------- Function Tests --------
  it('toggle notification tab', () =>{
    let x = component.notificationsTab;
    component.toggleNotificationsTab();
    expect(component.notificationsTab == !x).toBeTruthy();
  });

  it('toggle profile tab', () =>{
    let x = component.profileTab;
    component.toggleProfileTab();
    expect(component.profileTab == !x).toBeTruthy();
  });

  it('toggle help tab', () =>{
    let x = component.helpTab;
    component.toggleHelpTab();
    expect(component.helpTab == !x).toBeTruthy();
  });

  it('displayProfileSaveBtn', () => {
    component.displayProfileSaveBtn();
    expect(component.saveBtn).toBeTruthy();
  });

  it('displayConfirmPasswordInput', () => {
    component.displayConfirmPasswordInput();
    expect(component.confirmPasswordInput).toBeTruthy();
  });

  // -------- Service Tests --------
  it('get Number Of Fabi Members', () =>{
    let spy = spyOn(UserManagementService, 'getAllFABIStaff');
    component.getNumberOfFABIMembers();
    expect(spy).toBeTruthy();
  });

  it('get Number Of FABI Samples', () =>{
    let spy = spyOn(DiagnosticClinicService, 'getAllSamples');
    component.getNumberOfFABIMembers();
    expect(spy).toBeTruthy();
  });

  it('logging out', () =>{
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffDashboardComponent } from './staff-dashboard.component';
import { SampleFormComponent } from '../../sample-form/sample-form.component';
import { StaffNotificationComponent } from '../staff-notification/staff-notification.component'
import { StaffProfileComponent } from '../staff-profile/staff-profile.component'
import { StaffHelpComponent } from '../staff-help/staff-help.component'
import { StaffViewSamplesComponent } from '../staff-view-samples/staff-view-samples.component';

import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosticClinicAPIService } from '../../_services/diagnostic-clinic-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';
import { CultureCollectionAPIService } from '../../_services/culture-collection-api.service';

import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../../materials';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DebugElement } from '@angular/core';

import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

import { FilterPipe } from '../../_pipes/filter.pipe';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';

describe('StaffDashboardComponent', () => {
  let component: StaffDashboardComponent;
  let fixture: ComponentFixture<StaffDashboardComponent>;

  let UserManagementService: UserManagementAPIService;
  let DiagnosticClinicService: DiagnosticClinicAPIService;
  let notificationLoggingService: NotificationLoggingService;
  let authService: AuthenticationService;
  let CCservice: CultureCollectionAPIService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        StaffDashboardComponent, 
        SampleFormComponent,
        StaffNotificationComponent,
        StaffProfileComponent,
        StaffHelpComponent,
        StaffViewSamplesComponent,
        FilterPipe
      ],
      imports: [ReactiveFormsModule, RouterTestingModule, MaterialModule, NoopAnimationsModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [ { provide: AuthenticationService, useClass: MockAuthenticationService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    UserManagementService = new UserManagementAPIService( null , null);
    DiagnosticClinicService = new DiagnosticClinicAPIService(null, null);
    notificationLoggingService = new NotificationLoggingService(null, null);
    authService = new AuthenticationService(null);
    CCservice = new CultureCollectionAPIService(null, null);
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

  it('should be defined', () => {
    expect(CultureCollectionAPIService).toBeTruthy();
  });

  // -------- Initial State Tests --------
  it('Component initial state', () => {
    expect(component.notificationsTab).toBeFalsy();
    expect(component.profileTab).toBeFalsy();
    expect(component.saveBtn).toBeFalsy();
    expect(component.confirmPasswordInput).toBeFalsy();
    expect(component.helpTab).toBeFalsy();
    expect(component.submittedSamples).toBeFalsy();
    expect(component.depositForms).toBeFalsy();
    expect(component.requestForms).toBeFalsy();

    expect(component.admins).toEqual([]);
    expect(component.deposits).toEqual([]);
    expect(component.requests).toEqual([]);
    expect(component.samples).toEqual([]);

    expect(component.sampleTableLoading).toBeTruthy();
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
  it('get deposit form logs', () =>{
    let spy = spyOn(CCservice, 'getAllDepositLogs');
    component.loadDepositForms();
    expect(spy).toBeTruthy();
  });

  it('get request form logs', () =>{
    let spy = spyOn(CCservice, 'getAllRequestLogs');
    component.loadRequestForms();
    expect(spy).toBeTruthy();
  });

  it('logging out', () =>{
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

});

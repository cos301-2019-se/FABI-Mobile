import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingComponent } from './reporting.component';
import { AdminNotificationComponent } from '../admin-notification/admin-notification.component'
import { AdminProfileComponent } from '../admin-profile/admin-profile.component'
import { AdminHelpComponent } from '../admin-help/admin-help.component'

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
import { NotificationService } from '../../_services/notification.service';
import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

import { FilterPipe } from '../../_pipes/filter.pipe';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';

describe('ReportingComponent', () => {
  let component: ReportingComponent;
  let fixture: ComponentFixture<ReportingComponent>;
  let UserManagementService: UserManagementAPIService;
  let NotificationLogService: NotificationLoggingService;
  let CCservice: CultureCollectionAPIService;
  let authService: AuthenticationService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingComponent,
        AdminNotificationComponent,
        AdminProfileComponent,
        AdminHelpComponent,
        FilterPipe
      ],
      imports: [MatSnackBarModule, ToastContainerModule, ToastrModule.forRoot(), ToastrComponentlessModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        NotificationService,
        ToastrService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MatSnackBar, useValue: {} },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    UserManagementService = new UserManagementAPIService( null , null);
    NotificationLogService = new NotificationLoggingService(null, null);
    CCservice = new CultureCollectionAPIService(null, null);
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
    expect(CCservice).toBeTruthy();
  });

  it('should be defined', () => {
    expect(NotificationLoggingService).toBeTruthy();
  });

  // -------- Initial State Tests --------
  it('Component initial state', () => {
    expect(component.userLogs).toBeFalsy();
    expect(component.databaseLogs).toBeFalsy();
    expect(component.accessLogs).toBeFalsy();
    expect(component.errorLogs).toBeFalsy();
    expect(component.requestLogs).toBeFalsy();
    expect(component.depositLogs).toBeFalsy();
    expect(component.revitalizationLogs).toBeFalsy();
    expect(component.errorReport).toBeFalsy();
    expect(component.requestReport).toBeFalsy();
    expect(component.depositReport).toBeFalsy();
    expect(component.revitalizationReport).toBeFalsy();

    expect(component.notificationsTab).toBeFalsy();
    expect(component.profileTab).toBeFalsy();
    expect(component.saveBtn).toBeFalsy();
    expect(component.confirmPasswordInput).toBeFalsy();
    expect(component.helpTab).toBeFalsy();
    expect(component.reportingTab).toBeFalsy();
    expect(component.logsTab).toBeFalsy();

    expect(component.userLogsArray).toEqual([]);
    expect(component.databaseLogsArray).toEqual([]);
    expect(component.accessLogsArray).toEqual([]);
    expect(component.errorLogsArray).toEqual([]);
    expect(component.requestLogsArray).toEqual([]);
    expect(component.depositLogsArray).toEqual([]);
    expect(component.revitalizationLogsArray).toEqual([]);
  });

  // -------- Function Tests --------
  it('load user details', () => {
    expect(component.loadUserDetails("")).toEqual('');
  });

  it('get Date (format)', () => {
    expect(component.getDate("Mon Jan 14 2019")).toEqual("14 Monday January 2019");
  });

  it('get empty Date ', () => {
    expect(component.getDate("")).toEqual("undefined undefined");
  });

  // -------- Service Tests --------
  it('get All staff', () =>{
    let spy = spyOn(UserManagementService, 'getAllFABIStaff');
    component.getAllStaff();
    expect(spy).toBeTruthy();
  });

  it('generate Error Report', () =>{
    let spy = spyOn(NotificationLogService, 'getAllErrorLogs');
    component.generateErrorReport();
    expect(spy).toBeTruthy();
  });

  it('generate Request Report', () =>{
    let spy = spyOn(CCservice, 'getAllRequestLogs');
    component.generateRequestReport();
    expect(spy).toBeTruthy();
  });

  it('generate Deposit Report', () =>{
    let spy = spyOn(CCservice, 'getAllDepositLogs');
    component.generateDepositReport();
    expect(spy).toBeTruthy();
  });

  it('generate Revitalization Report', () =>{
    let spy = spyOn(CCservice, 'getAllRevitalizationLogs');
    component.generateRevitalizationReport();
    expect(spy).toBeTruthy();
  });

  it('logging out', () =>{
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

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

  it('toggle Report Section', () => {
    let x = component.reportingTab;
    component.toggleReportSection();
    expect(component.logsTab).toBeFalsy();
    expect(component.userLogs).toBeFalsy();
    expect(component.requestLogs).toBeTruthy();
    expect(component.requestReport).toBeTruthy();
    expect(component.reportingTab == !x).toBeTruthy();
  });

  it('toggle Log Section', () => {
    let x = component.logsTab;
    component.toggleLogSection();
    expect(component.reportingTab).toBeFalsy();
    expect(component.requestLogs).toBeFalsy();
    expect(component.userLogs).toBeTruthy();
    expect(component.requestReport).toBeFalsy();
    expect(component.logsTab == !x).toBeTruthy();
  });

  it('set user Log table', () => {
    component.setUserLogTable();
    expect(component.userLogs).toBeTruthy();
    expect(component.accessLogs).toBeFalsy();
    expect(component.databaseLogs).toBeFalsy();
    expect(component.errorLogs).toBeFalsy();
  });

  it('set access Log table', () => {
    component.setAccessLogTable();
    expect(component.userLogs).toBeFalsy();
    expect(component.accessLogs).toBeTruthy();
    expect(component.databaseLogs).toBeFalsy();
    expect(component.errorLogs).toBeFalsy();
  });

  it('set error Log table', () => {
    component.setErrorLogTable();
    expect(component.userLogs).toBeFalsy();
    expect(component.accessLogs).toBeFalsy();
    expect(component.databaseLogs).toBeFalsy();
    expect(component.errorLogs).toBeTruthy();
  });

  it('set error Log table', () => {
    component.setDatabaseLogTable();
    expect(component.userLogs).toBeFalsy();
    expect(component.accessLogs).toBeFalsy();
    expect(component.databaseLogs).toBeTruthy();
    expect(component.errorLogs).toBeFalsy();
  });

});

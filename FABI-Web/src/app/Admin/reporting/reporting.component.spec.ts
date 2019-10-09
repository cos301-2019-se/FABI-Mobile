import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingComponent } from './reporting.component';
import { AdminNotificationComponent } from '../admin-notification/admin-notification.component'
import { AdminProfileComponent } from '../admin-profile/admin-profile.component'
import { AdminHelpComponent } from '../admin-help/admin-help.component'
//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';

import { FilterPipe } from '../../_pipes/filter.pipe';
import { AuthenticationService } from 'src/app/_services/authentication.service'
import { UserManagementAPIService } from '../../_services/user-management-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { CultureCollectionAPIService } from '../../_services/culture-collection-api.service';

describe('ReportingComponent', () => {
  let component: ReportingComponent;
  let fixture: ComponentFixture<ReportingComponent>;
  let UserManagementService: UserManagementAPIService;
  let NotificationLogService: NotificationLoggingService;
  let CCservice: CultureCollectionAPIService;
  let authService : AuthenticationService;

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
      imports: [MatSnackBarModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load user details', () => {
    expect(component.loadUserDetails("")).toEqual('');
  });

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

  it('get Date (format)', () => {
    expect(component.getDate("Mon Jan 14 2019")).toEqual("14 Monday January 2019");
  });

  it('get empty Date ', () => {
    expect(component.getDate("")).toEqual("undefined undefined");
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

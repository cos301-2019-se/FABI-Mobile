import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';

import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../../materials';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../_services/notification.service';
import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DebugElement } from '@angular/core';

import { AdminNotificationComponent } from './admin-notification.component';

describe('AdminNotificationComponent', () => {
  let component: AdminNotificationComponent;
  let fixture: ComponentFixture<AdminNotificationComponent>;
  let de: DebugElement;
  let UserManagementService: UserManagementAPIService;
  let notifService: NotificationLoggingService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
         MaterialModule, ToastContainerModule, ToastrModule.forRoot(), ToastrComponentlessModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule, BrowserAnimationsModule 
      ],
      declarations: [  AdminNotificationComponent ],
      providers: [
        NotificationService,
        ToastrService,
        { provide: AuthenticationService, useClass: MockAuthenticationService } 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotificationComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    UserManagementService = new UserManagementAPIService( null , null);
    notifService = new NotificationLoggingService(null, null);

    component.ngOnInit();
    fixture.autoDetectChanges();
  });

  // -------- Component Creation Tests - Boilerplate Test Case --------
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // -------- Service Creation Tests --------
  it('should be defined', () => {
    expect(UserManagementAPIService).toBeTruthy();
  });

  // -------- Service Tests --------
  it('get All Staff', () => {
    let spy = spyOn(UserManagementService, 'getAllFABIStaff');
    component.getAllStaff();
    expect(spy).toBeTruthy();
  });

  it('get Date (format)', () => {
    expect(component.getDate("Mon Jan 14 2019")).toEqual("14 Monday January 2019");
  });

  it('get empty Date ', () => {
    expect(component.getDate("")).toEqual("undefined undefined");
  });

  it('load logs ', () => {
    let spy = spyOn(notifService, 'getUserLogs');
    component.loadLogs();
    expect(spy).toBeTruthy();
  });

  it('load Notifications', () => {
    let spy1 = spyOn(component, 'getAllStaff');
    let spy2 = spyOn(component, 'loadLogs');
    component.loadNotifications();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('load empty User details', () => {
    expect(component.loadUserDetails("")).toEqual("");
  });

  it('remove notification', () => {
    let spy = spyOn(notifService, 'updateFABIMemberNotifications');
    component.removeNotification("7412589630");
    expect(spy).toBeTruthy();
  });


});

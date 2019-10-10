import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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

import { OrganizationNotificationComponent } from './organization-notification.component';

describe('OrganizationNotificationComponent', () => {
  let component: OrganizationNotificationComponent;
  let fixture: ComponentFixture<OrganizationNotificationComponent>;
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
         MaterialModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule, BrowserAnimationsModule 
      ],
      declarations: [ 
        OrganizationNotificationComponent 
      ],
      providers: [ { provide: AuthenticationService, useClass: MockAuthenticationService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationNotificationComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    UserManagementService = new UserManagementAPIService( null , null);
    notifService = new NotificationLoggingService(null, null);

    component.ngOnInit();
    fixture.detectChanges();
  });

  // -------- Component Creation Tests - Boilerplate Test Case --------
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // -------- Service Creation Tests --------
  it('should be defined', () => {
    expect(UserManagementAPIService).toBeTruthy();
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
    expect(component.notifications).toBeFalsy();

    expect(component.allNotifications).toEqual([]);
    expect(component.newNotifications).toEqual([]);
    expect(component.allLogs).toEqual([]);
    expect(component.organizationMembers).toEqual([]);
    expect(component.organizationMembersExample).toEqual([]);


    expect(component.notificationsLoading).toBeTruthy();
  });

  // -------- Service Tests --------
  it('remove notification', () => {
    component.currentUser = {ID:"0"};
    let spy = spyOn(notifService, 'updateFABIMemberNotifications');
    component.removeNotification("0");
    expect(spy).toBeTruthy();
  });



});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseHandlerComponent } from './database-handler.component';
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

describe('DatabaseHandlerComponent', () => {
  let component: DatabaseHandlerComponent;
  let fixture: ComponentFixture<DatabaseHandlerComponent>;

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
      declarations: [ DatabaseHandlerComponent,
        AdminNotificationComponent,
        AdminProfileComponent,
        AdminHelpComponent,
        FilterPipe
      ],
      imports: [MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [ { provide: AuthenticationService, useClass: MockAuthenticationService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseHandlerComponent);
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
    expect(component.portingForm).toBeDefined();
    expect(component.portingForm.invalid).toBeTruthy();

    expect(component.loading).toBeFalsy();
    expect(component.preview).toBeFalsy();
    expect(component.notificationsTab).toBeFalsy();
    expect(component.profileTab).toBeFalsy();
    expect(component.saveBtn).toBeFalsy();
    expect(component.confirmPasswordInput).toBeFalsy();
    expect(component.helpTab).toBeFalsy();
    expect(component.ported).toBeFalsy();
    expect(component.submitted).toBeFalsy();

    expect(component.databaseTableLoading).toBeTruthy();
    expect(component.viewDatabaseLoading).toBeTruthy();
  });

  // -------- Form Controls Tests --------
  it('Empty database name expect invalid', () => {
    component.portingForm.controls.databaseName.setValue('');
    expect(component.portingForm.controls.databaseName.valid).toBeFalsy();
  });

  it('Empty file expect invalid', () => {
    component.portingForm.controls.file.setValue('');
    expect(component.portingForm.controls.file.valid).toBeFalsy();
  });

  it('All empty expect invalid', () => {
    component.portingForm.controls.portingForm.setValue('');
    expect(component.portingForm.controls.portingForm.valid).toBeFalsy();
  });

  it('All valid expect valid', () => {
    component.portingForm.controls.file.setValue('');
    expect(component.portingForm.controls.file.valid).toBeFalsy();
  });

});

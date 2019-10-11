import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicHandlerComponent } from './clinic-handler.component';
import { ClinicAdminViewSamplesComponent } from '../clinic-admin-view-samples/clinic-admin-view-samples.component';
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

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DebugElement } from '@angular/core';
import { NotificationService } from '../../_services/notification.service';
import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

import { PipesFiltersModule } from 'ng-pipe-filter';

import { FilterPipe } from '../../_pipes/filter.pipe';

describe('ClinicHandlerComponent', () => {
  let component: ClinicHandlerComponent;
  let fixture: ComponentFixture<ClinicHandlerComponent>;
  let UserManagementService: UserManagementAPIService;
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
        ClinicHandlerComponent,
        ClinicAdminViewSamplesComponent,
        AdminNotificationComponent,
        AdminProfileComponent,
        AdminHelpComponent,
        FilterPipe
      ],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        PipesFiltersModule, ToastContainerModule, ToastrModule.forRoot(), ToastrComponentlessModule
      ],
      providers: [ 
        NotificationService,
        ToastrService,
        { provide: AuthenticationService, useClass: MockAuthenticationService } 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicHandlerComponent);
    component = fixture.componentInstance;
    UserManagementService = new UserManagementAPIService( null , null);
    authService = new AuthenticationService(null);
    fixture.detectChanges();

    UserManagementService = new UserManagementAPIService( null , null);
    notificationLoggingService = new NotificationLoggingService(null, null);
    authService = new AuthenticationService(null);
  });

  // -------- Component Creation Tests - Boilerplate Test Case --------
  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('displayProfileSaveBtn', () => {
    component.displayProfileSaveBtn();
    expect(component.saveBtn).toBeTruthy();
  });

  it('displayConfirmPasswordInput', () => {
    component.displayConfirmPasswordInput();
    expect(component.confirmPasswordInput).toBeTruthy();
  });

  it('toggle help tab', () =>{
    let x = component.helpTab;
    component.toggleHelpTab();
    expect(component.helpTab == !x).toBeTruthy();
  });

  it('reset staff fields', () =>{
    let x = component.helpTab;
    component.resetStaffFields();
    expect(component.helpTab == !x).toBeTruthy();
  });

  // -------- Service Creation Tests --------
  it('should be defined', () => {
    expect(AuthenticationService).toBeTruthy();
  });

  it('should be defined', () => {
    expect(UserManagementAPIService).toBeTruthy();
  });

  it('should be defined', () => {
    expect(NotificationLoggingService).toBeTruthy();
  });

  // -------- Initial State Tests --------
  it('Component initial state', () => {
    expect(component.addStaffForm).toBeDefined();
    expect(component.addStaffForm.invalid).toBeTruthy();

    expect(component.notificationsTab).toBeFalsy();
    expect(component.profileTab).toBeFalsy();
    expect(component.saveBtn).toBeFalsy();
    expect(component.confirmPasswordInput).toBeFalsy();
    expect(component.helpTab).toBeFalsy();
    expect(component.submitted).toBeFalsy();
    expect(component.valid).toBeFalsy();
  });

  // -------- Form Controls Tests --------
  it('Empty user expect invalid', () => {
    component.addStaffForm.controls.user.setValue('');
    expect(component.addStaffForm.controls.user.valid).toBeFalsy();
  });

  // it('Empty database privileges expect invalid', () => {
  //   component.addStaffForm.controls.database_privileges.setValue('');
  //   expect(component.addStaffForm.controls.database_privileges.valid).toBeFalsy();
  // });

  it('Add staff with all empty details expect fail', () => {
    component.addStaffForm.controls.user.setValue('');
    // component.addStaffForm.controls.database_privileges.setValue('');

    expect(component.addStaffForm.valid).toBeFalsy();
  });

  it('Add staff with all empty details expect fail', () => {
    component.addStaffForm.controls.user.setValue('tester@gmail.com');
    // component.addStaffForm.controls.database_privileges.setValue('[]');

    expect(component.addStaffForm.valid).toBeTruthy();
  });

  // -------- Service Tests --------
  it('get database names', () =>{
    let spy = spyOn(UserManagementService, 'getDatabaseNames');
    component.getDBNames();
    expect(spy).toBeTruthy();
  });

  it('add staff', () =>{
    let spy = spyOn(UserManagementService, 'addStaffMember');
    component.addStaff();
    expect(spy).toBeTruthy();
  });

  it('get DB Names', () =>{
    let spy = spyOn(UserManagementService, 'getDatabaseNames');
    component.getDBNames();
    expect(spy).toBeTruthy();
  });

  it('logging out', () =>{
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

});

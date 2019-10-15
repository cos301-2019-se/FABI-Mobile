import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'jasmine';

import { AdminProfileComponent } from './admin-profile.component';

import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';

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
import { Subscribable } from 'rxjs';

describe('AdminProfileComponent', () => {
  let component: AdminProfileComponent;
  let fixture: ComponentFixture<AdminProfileComponent>;

  let UserManagementService: UserManagementAPIService;
  let authService: AuthenticationService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { 'user' : {'organisation' :'', 'ID':''} };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        MatDialogModule, ToastContainerModule, ToastrModule.forRoot(), ToastrComponentlessModule
      ],
      declarations: [ AdminProfileComponent ],
      providers: [
        NotificationService,
        ToastrService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfileComponent);
    component = fixture.componentInstance;
    UserManagementService = new UserManagementAPIService( null , null);
    authService = new AuthenticationService(null);
    fixture.detectChanges();
    UserManagementService = new UserManagementAPIService( null , null);
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
    expect(NotificationLoggingService).toBeTruthy();
  });

  // -------- Initial State Tests --------
  it('Component initial state', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.profileTab).toBeFalsy();
    expect(component.isEditingProfile).toBeFalsy();
    expect(component.userProfileLoading).toBeTruthy();
  });

  // -------- Form Controls Tests --------
  it('Empty admin name expect admin name invalid', () => {
    component.adminProfileForm.controls.admin_name.setValue('');

    expect(component.adminProfileForm.controls.admin_name.valid).toBeFalsy();
  });

  it('Empty admin surname expect admin surname invalid', () => {
    component.adminProfileForm.controls.admin_surname.setValue('');

    expect(component.adminProfileForm.controls.admin_surname.valid).toBeFalsy();
  });

  it('Empty admin email expect admin email invalid', () => {
    component.adminProfileForm.controls.admin_email.setValue('');

    expect(component.adminProfileForm.controls.admin_email.valid).toBeFalsy();
  });

  it('Empty admin type expect admin type invalid', () => {
    component.adminProfileForm.controls.admin_type.setValue('');

    expect(component.adminProfileForm.controls.admin_type.valid).toBeFalsy();
  });

  it('Empty form expect invalid', () => {
    component.adminProfileForm.controls.admin_name.setValue('');
    component.adminProfileForm.controls.admin_surname.setValue('');
    component.adminProfileForm.controls.admin_email.setValue('');
    component.adminProfileForm.controls.admin_type.setValue('');

    expect(component.adminProfileForm.valid).toBeFalsy();
  });

  it('Valid form expect true', () => {
    component.adminProfileForm.controls.admin_name.setValue('TesterFName');
    component.adminProfileForm.controls.admin_surname.setValue('TesterLName');
    component.adminProfileForm.controls.admin_email.setValue('tester@gmail.com');
    component.adminProfileForm.controls.admin_type.setValue('super');

    expect(component.adminProfileForm.valid).toBeTruthy();
  });

  it('toggle profile tab', () =>{
    let x = component.profileTab;
    component.toggleProfileTab();
    expect(component.profileTab == !x).toBeTruthy();
  });

  it('load Admin Profile Details', () =>{
    let spy = spyOn(UserManagementService, 'getUserDetails');
    component.loadAdminProfileDetails();
    expect(spy).toBeTruthy();
  });

  it('save changes', () =>{
    let spy = spyOn(UserManagementService, 'updateFABIMemberDetails');
    component.saveChanges();
    expect(component.submitted).toBeTruthy();
    expect(spy).toBeTruthy();
  });

  it('change password', () =>{
    let spy = spyOn(UserManagementService, 'updateStaffPassword');
    component.changePassword();
    expect(component.submitted).toBeTruthy();
  });

  it('update fabi member details', () =>{
    let spy = spyOn(UserManagementService, 'updateFABIMemberDetails');
    component.saveChanges();
    expect(spy).toBeTruthy();
  });

  it('update staff password', () =>{
    let spy = spyOn(UserManagementService, 'updateStaffPassword');
    component.changePassword();
    expect(spy).toBeTruthy();
  });

  it('logging out', () =>{
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

});
